import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dna, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { toast } from 'sonner';

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password.' })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword']
});

type SignupFormInput = z.infer<typeof signupSchema>;

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: SignupFormInput) => {
    try {
      await signup(data.name, data.email, data.password);
      toast.success('Account created successfully!', {
        description: `Welcome to ProjectDNA AI, ${data.name}!`
      });
      navigate('/dashboard');
    } catch (err) {
      toast.error('Registration failed', {
        description: err instanceof Error ? err.message : 'Something went wrong, please try again.'
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
          <h1 className="text-xl font-bold tracking-tight text-zinc-100 mt-2">Create your account</h1>
          <p className="text-xs text-zinc-500">Get detailed quality benchmarks for your software projects</p>
        </div>

        {/* Signup Card */}
        <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Alex Smith"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              disabled={isSubmitting}
              {...register('name')}
            />

            <Input
              label="Email address"
              type="email"
              placeholder="name@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              disabled={isSubmitting}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register('password')}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.confirmPassword?.message}
              disabled={isSubmitting}
              {...register('confirmPassword')}
            />

            <PrimaryButton 
              type="submit" 
              className="w-full mt-2" 
              isLoading={isSubmitting}
            >
              Create Account
            </PrimaryButton>
          </form>
        </div>

        {/* Redirect */}
        <p className="text-xs text-zinc-500 text-center select-none">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
