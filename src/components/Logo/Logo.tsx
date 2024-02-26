interface I_LogoProps {
  text?: string;
}

export const Logo = ({ text = 'News Portal' }: I_LogoProps) => {
  return (
    <div className="inline-block px-3 font-bold text-teal-100 text-xl letter-shadow border-x-2 border-teal-100 transition-colors duration-300 hover:border-teal-300 hover:text-teal-300">
      {text}
    </div>
  );
};
