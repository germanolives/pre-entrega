export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-2 rounded-full font-bold transition-all duration-300 active:scale-95 disabled:opacity-50";
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800 shadow-md",
    secondary: "bg-amber-500 text-white hover:bg-amber-600 shadow-md",
    tertiary: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    outline: "border-2 border-blue-900 text-blue-900 hover:bg-blue-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-blue-900",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
