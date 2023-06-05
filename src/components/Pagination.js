import { Link } from 'react-router-dom';

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    const pages = [];
    if (numberOfPages > 1) {
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
    }

    if (currentPage === numberOfPages && currentPage === 1) return null;
    return (
      <nav
        aria-label="Page navigation example"
        className="flex flex-row  justify-center items-center mt-5"
      >
        <ul className="inline-flex -space-x-px ">
          {currentPage !== 1 && currentPage > 1 && (
            <li>
              <Link
                to={`/?page=${currentPage - 1}`}
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                className="px-3 py-2 mx-1 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </Link>
            </li>
          )}

          {pages.map((pageNumber) => {
            return (
              <li key={pageNumber}>
                <Link
                  to={`/?page=${pageNumber}`}
                  onClick={() => dispatch(setCurrentPage(pageNumber))}
                  className="px-3 py-2 rounded mx-1 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}

          {currentPage !== numberOfPages && currentPage < numberOfPages && (
            <li>
              <Link
                to={`/?page=${currentPage + 1}`}
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                className="px-3 py-2 mx-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  return renderPagination();
};

export default Pagination;
