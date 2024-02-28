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
  const defaultClasses =
    'py-2 px-3 box-shadow-sm outline-none border-none  rounded text-base placeholder-sm focus-element';
  const preparedClasses = `${defaultClasses} ${className.trim()}`.trim();

  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={preparedClasses}
      />
      {errors[name] && (
        <span className={'mt-1 text-xs text-red-500'}>{errors[name]}</span>
      )}
    </>
  );
};
