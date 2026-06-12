import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DatabaseIcon } from "../Icons/index";
import { useSource } from "../..//context/SourceContext";
import { Button } from "../common/Button";

export const MovilNavbar = ({ menuChange }) => {
  const location = useLocation();
  const { nameSource, changeSource } = useSource();
  return (
    <nav className="grow nav:hidden">
      <ul className="p-2 border border-gray-400 rounded-sm m-2 text-sm">
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/"}
            className={`${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            HOME
          </Link>
        </li>
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/dashboard"}
            className={`${location.pathname.startsWith("/dashboard") ? "text-blue-600" : "text-gray-600"}`}
          >
            DASHBOARD
          </Link>
        </li>
        <li className="m-1" onClick={menuChange}>
          <Link to={"/dashboard/add-product"} className="text-gray-600">
            ADD PRODUCT
          </Link>
        </li>
        <li className="m-1">
          <Button
            className={`flex gap-0.5 cursor-pointer font-normal ${nameSource === "LOCAL" ? "text-blue-600" : "text-gray-600"}`}
            variant="cristal"
            onClick={() => {
              changeSource("local");
              menuChange();
            }}
          >
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              LOCAL
            </span>
          </Button>
        </li>
        <li className="m-1">
          <Button
            className={`flex gap-0.5 cursor-pointer font-normal ${nameSource === "DB" ? "text-blue-600" : "text-gray-600"}`}
            variant="cristal"
            onClick={() => {
              changeSource("db");
              menuChange();
            }}
          >
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              DB
            </span>
          </Button>
        </li>
        <li className="m-1">
          <Button
            className={`flex gap-0.5 cursor-pointer font-normal ${nameSource === "API" ? "text-blue-600" : "text-gray-600"}`}
            variant="cristal"
            onClick={() => {
              changeSource("api");
              menuChange();
            }}
          >
            <DatabaseIcon className="w-5 h-5" />
            <span className="border border-gray-400 rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-semibold text-xxs bg-gray-200">
              API
            </span>
          </Button>
        </li>
        <li className="m-1" onClick={menuChange}>
          <Link
            to={"/"}
            className={`${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
          >
            LOGOUT
          </Link>
        </li>
      </ul>
    </nav>
  );
};
