'use client';
import { loginShema } from '@/utils/validation/schemas';
import { useState } from 'react';
import { ZodError } from 'zod';
import { signIn } from 'next-auth/react';
import { E_DashboardRoutes } from '@/types/routes.enum';
import { useRouter, useSearchParams } from 'next/navigation';
import { E_SearchParam } from '@/types/search.params.enum';
import toast from 'react-hot-toast';

interface I_User {
  email: string;
  password: string;
}

export const useSignInForm = () => {
  const [formData, setFormData] = useState<I_User>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get(E_SearchParam.callbackUrl);

  const handleValidateFields = async () => {
    try {
      // Validate form data using the form schema
      loginShema.parse(formData);
      // Form data is valid, submit the form
      setErrors({});

      return true;
    } catch (error) {
      // Form data is invalid, set errors
      if (error instanceof ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
          const fieldName = err.path.join('.');
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (!!Object.values(errors).length) {
      await handleValidateFields();
    }
  };

  const handleSignIn = async (formData: I_User) => {
    const signInData = await signIn('credentials', {
      ...formData,
      // callbackUrl: E_DashboardRoutes.dashboard
      redirect: false
    });

    if (!!signInData && !signInData.error) {
      // router.refresh();
      router.push(
        !!callbackUrl ? `/${callbackUrl}` : E_DashboardRoutes.dashboard
      );
    }

    if (!!signInData && !!signInData.error) {
      toast.error(signInData.error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCheckSuccess = await handleValidateFields();

    if (!!isCheckSuccess) {
      await handleSignIn(formData);
    }
  };

  return { handleSubmit, formData, handleChange, errors };
};
