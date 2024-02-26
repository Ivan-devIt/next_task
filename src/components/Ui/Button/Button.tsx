import { E_ButtonType, E_ButtonVariant } from '@/types';

interface I_ButtonProps {
  type: E_ButtonType;
  text: string;
  variant: E_ButtonVariant;
  className: string;
}

export const Button = ({
  type = E_ButtonType.button,
  text,
  className = ''
}: I_ButtonProps) => {
  const typeClasses = (() => {
    switch (type) {
      case E_ButtonType.submit:
        return 'bg-indigo-700 hover:bg-indigo-600 text-slate-50 hover:text-slate-100';

      default:
        return '';
    }
  })();

  const defaultClasse = `flex items-center justify-center w-full py-1 px-2 font-semibold bg-slate-200 text-indigo-900 rounded text-base transition-colors duration-300 shadow-lg hover:bg-slate-400 hover:cursor-pointer hover:text-indigo-800`;
  const preparedClasses =
    `${defaultClasse} ${typeClasses} ${className.trim()}`.trim();

  return (
    <button className={preparedClasses} type={type}>
      {text}
    </button>
  );
};
