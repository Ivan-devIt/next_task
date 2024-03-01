import { useState } from 'react';
import { HideSvg, ShowSvg } from '@/components/Ui';

interface I_FormInputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
  className?: string;
}

export const FormInput = ({
  type = 'text',
  id,
  name,
  value,
  placeholder,
  onChange,
  errors,
  className = ''
}: I_FormInputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);

  const defaultClasses =
    'py-2 px-3 pr-9 w-full box-shadow-sm outline-none border-none  rounded text-base placeholder-sm focus-element';
  const preparedClasses = `${defaultClasses} ${className.trim()}`.trim();

  const handleTogleShowPassword = () => {
    setShow(prev => !prev);
    setInputType(prev => (prev === 'password' && !show ? 'text' : 'password'));
  };

  return (
    <div className="w-full">
      <div className="w-full relative">
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={preparedClasses}
        />
        {type === 'password' && (
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer"
            onClick={handleTogleShowPassword}
          >
            {show ? <HideSvg /> : <ShowSvg />}
          </span>
        )}
      </div>
      {errors[name] && (
        <span className={'mt-1 text-xs text-red-500'}>{errors[name]}</span>
      )}
    </div>
  );
};
