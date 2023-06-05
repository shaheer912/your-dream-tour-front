import { NavLink } from 'react-router-dom';

const navLinkClassNames =
  'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white';
const navLinkActiveClassNames =
  'block px-4 py-2 text-sm text-blue-700 md:text-blue-700 md:dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500 dark:text-gray-200 dark:hover:text-white';
const DashboardBarLink = ({ to, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive, isPending }) => {
        return isActive ? navLinkActiveClassNames : navLinkClassNames;
      }}
      aria-current="page"
    >
      {children}
    </NavLink>
  );
};

export default DashboardBarLink;
