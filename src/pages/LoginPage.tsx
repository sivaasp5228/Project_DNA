import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dna, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional()
});

type LoginFormInput = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormInput) => {
    try {
      await login(data.email, data.password);
      toast.success('Successfully logged in!', {
        description: `Welcome back, ${data.email.split('@')[0]}!`
      });
      navigate('/dashboard');
    } catch (err) {
      toast.error('Authentication failed', {
        description: err instanceof Error ? err.message : 'Please check your login details and try again.'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 select-none">
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Brand logo */}
        <div className="flex flex-col items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors">
            <div className="p-2 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-xl animate-pulse-ring">
              <Dna className="h-6 w-6" />
            </div>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100 mt-2">Sign in to ProjectDNA</h1>
          <p className="text-xs text-zinc-500">Analyze code quality and demonstrate project readiness</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email address"
              type="email"
              placeholder="name@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              disabled={isSubmitting}
              {...register('register' in register ? 'email' : 'email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register('register' in register ? 'password' : 'password')}
            />

            <div className="flex items-center justify-between text-xs mt-0.5">
              <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-black"
                  {...register('register' in register ? 'rememberMe' : 'rememberMe')}
                />
                <span>Remember me</span>
              </label>
              
              <button 
                type="button"
                onClick={() => toast.info('Password Reset', { description: 'A reset link was sent to your email.' })}
                className="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <PrimaryButton 
              type="submit" 
              className="w-full mt-2" 
              isLoading={isSubmitting}
            >
              Sign In
            </PrimaryButton>
          </form>
        </div>

        {/* Redirect */}
        <p className="text-xs text-zinc-500 text-center select-none">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};
