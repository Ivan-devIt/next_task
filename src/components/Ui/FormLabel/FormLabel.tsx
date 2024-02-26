interface I_FormLabelProps {
  text: string;
  htmlFor: string;
}

export const FormLabel = ({ text, htmlFor }: I_FormLabelProps) => {
  return (
    <label className={'text-base font-medium'} htmlFor={htmlFor}>
      {text}
    </label>
  );
};
