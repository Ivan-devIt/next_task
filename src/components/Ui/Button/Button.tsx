import { E_ButtonType, E_ButtonVariant } from '@/types';
import { FC } from 'react';

interface I_ButtonProps {
  type: E_ButtonType;
  text: string;
  variant: E_ButtonVariant;
  className?: string;
}

export const Button: FC<I_ButtonProps> = ({
  type = E_ButtonType.button,
  text,
  className = '',
  variant
}) => {
  const typeClasses = (() => {
    switch (variant) {
      case E_ButtonVariant.submit:
        return 'bg-indigo-700 text-slate-50 hover:bg-indigo-600 hover:text-slate-100';

      default:
        return 'bg-slate-200 text-indigo-900 hover:bg-slate-300 hover:text-indigo-800';
    }
  })();

  const defaultClasse = `flex items-center justify-center w-full py-1 px-2 font-semibold box-shadow-sm rounded text-base transition-colors duration-300 hover:cursor-pointer hover:box-shadow-xl focus-element`;
  const preparedClasses =
    `${defaultClasse} ${typeClasses} ${className.trim()}`.trim();

  return (
    <button className={preparedClasses} type={type}>
      {text}
    </button>
  );
};
