'use client';
import { Button, FormInner, FormInput, FormLabel, Typography } from '../Ui';
import { E_ButtonType, E_ButtonVariant, E_TagVariant } from '@/types';
import { useSignInForm } from '@/hooks';

export const LoginForm = () => {
  const { handleSubmit, formData, handleChange, errors } = useSignInForm();

  return (
    <form
      noValidate={true}
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
      <div className="flex justify-between gap-5 mt-5">
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
