import { Link } from "react-router-dom";

export const LinkCustom = ({ to, onClick, reset, children }) => {
  const handleClick = (e) => {
    if (reset) reset({ name: "" });
    if (onClick) onClick(e);
  };
  return (
    <Link to={to} className="hover:underline" onClick={handleClick}>
      {children}
    </Link>
  );
};
