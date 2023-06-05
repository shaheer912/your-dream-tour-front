const SimplePage = ({ heading, children }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 pt-2">
        <h1 className="mb-2 pt-3 pb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {heading}
        </h1>
        <p className="mb-3 text-1xl font-normal text-gray-700 dark:text-gray-400">
          {children}
        </p>
      </div>
    </div>
  );
};

export default SimplePage;
