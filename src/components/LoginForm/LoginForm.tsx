'use client';

import { loginShema } from '@/utils/validation/schemas';
import { useState } from 'react';
import { ZodError } from 'zod';
import { Button, FormInner, FormInput, FormLabel, Typography } from '../Ui';
import { E_ButtonType, E_ButtonVariant, E_TagVariant } from '@/types';

export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data using the form schema
      loginShema.parse(formData);
      // Form data is valid, submit the form
      console.log('Form data is valid:', formData);
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
    }
  };

  return (
    <form
      className="mx-auto flex flex-col gap-3 text-xl w-96 rounded shadow-2xl p-5 bg-slate-50"
      onSubmit={handleSubmit}
    >
      <Typography className={'text-center mb-3'} tag={E_TagVariant.h3}>
        Sign in
      </Typography>
      <FormInner>
        <FormLabel text={'Email:'} htmlFor={'email'} />
        <FormInput
          type={'email'}
          id={'email'}
          name={'email'}
          placeholder={'Enter email'}
          value={formData.email}
          onChange={handleChange}
          errors={errors}
        />
      </FormInner>
      <FormInner>
        <FormLabel text={'Password:'} htmlFor={'password'} />
        <FormInput
          type={'password'}
          id={'password'}
          name={'password'}
          placeholder={'Enter password'}
          value={formData.password}
          onChange={handleChange}
          errors={errors}
        />
      </FormInner>
      <div className="flex justify-between gap-5">
        <Button
          type={E_ButtonType.button}
          text={'Go home'}
          variant={E_ButtonVariant.button}
        />
        <Button
          type={E_ButtonType.submit}
          text={'Login'}
          variant={E_ButtonVariant.submit}
        />
      </div>
    </form>
  );
};
