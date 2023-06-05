const SimpleMessage = ({ heading, children }) => {
  return (
    <div className="grid h-96 place-items-center">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        {heading && heading.length > 0 && (
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {heading}
            </h5>
          </>
        )}

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {children}
        </p>
      </div>
    </div>
  );
};

export default SimpleMessage;
