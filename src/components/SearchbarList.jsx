import { Link } from "react-router-dom";

export const SearchbarList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <Link>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};
