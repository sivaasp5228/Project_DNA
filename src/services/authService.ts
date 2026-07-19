import { supabase } from '../lib/supabase';
import type { User } from '../types';

export const authService = {
  async signUp(name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getUserProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      // Self-healing: Insert missing profile row from session metadata
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && session.user.id === userId) {
        const name = session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Developer';
        const { data: newProfile, error: insertError } = await supabase
          .from('users')
          .insert({
            id: userId,
            name,
            email: session.user.email || '',
            avatar: session.user.user_metadata?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
            bio: 'ProjectDNA Developer Platform user.'
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('Self-healing profile insertion failed:', insertError);
          return null;
        }
        return {
          name: newProfile.name,
          email: newProfile.email,
          avatar: newProfile.avatar || undefined,
          bio: newProfile.bio || undefined,
          joinedAt: newProfile.joined_at,
          stats: {
            totalEvaluations: 0,
            averageScore: 0,
            highestScore: 0
          }
        };
      }
      return null;
    }

    // Fetch scores from evaluations table to aggregate user statistics
    const { data: evals, error: evalsError } = await supabase
      .from('evaluations')
      .select('score')
      .eq('user_id', userId);

    if (evalsError) throw evalsError;

    const scores = evals ? evals.map((e) => e.score) : [];
    const totalEvaluations = scores.length;
    const averageScore = totalEvaluations > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / totalEvaluations) : 0;
    const highestScore = totalEvaluations > 0 ? Math.max(...scores) : 0;

    return {
      name: data.name,
      email: data.email,
      avatar: data.avatar || undefined,
      bio: data.bio || undefined,
      joinedAt: data.joined_at,
      stats: {
        totalEvaluations,
        averageScore,
        highestScore
      }
    };
  },

  async updateUserProfile(userId: string, name: string, bio: string) {
    const { error } = await supabase
      .from('users')
      .update({ name, bio })
      .eq('id', userId);
    
    if (error) throw error;
  }
};
export type { User };
