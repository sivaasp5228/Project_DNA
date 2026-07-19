import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, ShieldAlert, Award, Calendar, Activity, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { PrimaryButton } from '../components/PrimaryButton';
import { Avatar } from '../components/Avatar';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  bio: z.string().max(200, { message: 'Bio cannot exceed 200 characters.' })
});

type ProfileFormInput = z.infer<typeof profileSchema>;

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(profileSchema),
    values: {
      name: user?.name || '',
      bio: user?.bio || ''
    }
  });

  const onSubmit = async (data: ProfileFormInput) => {
    try {
      await updateProfile(data.name, data.bio);
      toast.success('Profile updated', {
        description: 'Your account modifications have been saved.'
      });
    } catch (err) {
      toast.error('Save failed', {
        description: 'An error occurred while saving your profile.'
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Mock activity log
  const activities = [
    { text: 'Profile information updated', time: 'Just now', type: 'edit' },
    { text: 'Evaluated "DocuMind PDF Semantic Search"', time: '1 day ago', type: 'eval' },
    { text: 'Evaluated "FinFlow AI Predictor"', time: '4 days ago', type: 'eval' },
    { text: 'Account registered with projectdna.ai', time: '2 weeks ago', type: 'system' }
  ];

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 text-left select-none">
      {/* Header title */}
      <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
        <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg">
          <User className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Settings</span>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">User Profile</h2>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left/Middle Column: Profile Overview Card & Edit Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card Overview */}
          <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[35%] h-[150%] bg-blue-500/3 rounded-full blur-[60px] pointer-events-none" />
            <Avatar src={user.avatar} name={user.name} size="xl" />
            
            <div className="flex flex-col gap-2 flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-zinc-200">{user.name}</h3>
                  <span className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Mail className="h-3.5 w-3.5" />
                    {user.email}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-600/10 border border-blue-500/15 text-blue-500 rounded-lg text-[9px] font-bold uppercase tracking-wider h-fit w-fit select-none">
                  <Award className="h-3 w-3" />
                  <span>Developer Level 1</span>
                </div>
              </div>

              <p className="text-xs text-zinc-450 leading-relaxed italic mt-1 max-w-lg">
                "{user.bio || 'No bio provided. Update your bio in the form below.'}"
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-2">
                <Calendar className="h-3.5 w-3.5 text-zinc-550" />
                <span>Joined {formatDate(user.joinedAt)}</span>
              </div>
            </div>
          </div>

          {/* Edit Form Card */}
          <div className="bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-3 mb-5">
              Edit Account Information
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  placeholder="Your display name"
                  error={errors.name?.message}
                  disabled={isSubmitting}
                  {...register('name')}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  value={user.email}
                  disabled
                  helperText="Primary email cannot be updated on mockup plans."
                />
              </div>

              <Textarea
                label="Short Bio"
                placeholder="A short description of your developer profile..."
                error={errors.bio?.message}
                disabled={isSubmitting}
                rows={3}
                helperText="Maximum 200 characters. Showcases under dashboard titles."
                {...register('bio')}
              />

              <div className="border-t border-zinc-900 pt-4 flex justify-end">
                <PrimaryButton
                  type="submit"
                  variant="primary"
                  disabled={!isDirty}
                  isLoading={isSubmitting}
                  leftIcon={<Check className="h-4 w-4" />}
                >
                  Save Modifications
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Activity log */}
        <div className="flex flex-col gap-4">
          <div className="border-b border-zinc-900 pb-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Activity Log</h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-850 rounded-xl p-5 flex flex-col gap-4">
            {activities.map((act, idx) => (
              <div key={idx} className="flex gap-3 items-start text-xs border-b border-zinc-900/60 last:border-0 pb-3 last:pb-0">
                <div className="p-1.5 bg-zinc-950 border border-zinc-850 rounded-lg text-zinc-500 shrink-0 mt-0.5">
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="font-medium text-zinc-300 leading-normal">{act.text}</span>
                  <span className="text-[10px] text-zinc-550">{act.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Settings Notice */}
          <div className="bg-zinc-900/10 border border-zinc-850 border-dashed rounded-xl p-5 flex items-start gap-3">
            <ShieldAlert className="h-4.5 w-4.5 text-zinc-500 shrink-0 mt-0.5" />
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-semibold text-zinc-400">Mock Sandbox Platform</span>
              <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                Account verification tokens, API keys, and authorization settings are managed within a mock developer sandbox environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
