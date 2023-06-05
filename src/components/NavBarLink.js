import { NavLink } from 'react-router-dom';

const navLinkClassNames =
  'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';
const navLinkActiveClassNames =
  'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500';

const NavBarLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) => {
        return isActive ? navLinkActiveClassNames : navLinkClassNames;
      }}
      aria-current="page"
    >
      {children}
    </NavLink>
  );
};

export default NavBarLink;
