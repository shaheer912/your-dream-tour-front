import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteTour, likeTour } from '../redux/features/tourSlice.js';
import { Link } from 'react-router-dom';

const maxDescriptionLength = 42;

const Tour = (props) => {
  const { imageFile, title, _id, tags, likes } = props.tour;
  const { showControls } = props;
  let { description } = props.tour;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;

  if (description.length > maxDescriptionLength) {
    description = description.substr(0, maxDescriptionLength - 3) + '...';
  }

  const Likes = () => {
    const likeCount = likes?.length;
    const isLikedByUser =
      likes && likes.find((like) => like === userId) ? true : false;

    return (
      <span>
        <Link
          to="#"
          className="font-medium text-sm dark:text-orange-400 text-blue-500 "
          onClick={() => {
            handleLike(_id);
          }}
        >
          {likeCount > 0 && (
            <span className="text-red-500 mr-1 text-1xl align-middle">
              {likeCount}
            </span>
          )}
          <svg
            className="h-5 w-5 text-red-500 inline"
            viewBox="0 0 24 24"
            fill={isLikedByUser ? 'red' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>{' '}
        </Link>
      </span>
    );
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteTour({ id, toast }));
  };

  const handleLike = (_id) => {
    if (user?.result?._id) {
      dispatch(likeTour({ _id }));
    } else {
      toast.error('Please login to like a tour');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {showControls && (
        <>
          <div className="flex justify-end px-4 pt-4">
            <button
              id={'dropdownButton' + _id}
              data-dropdown-toggle={'dropdown' + _id}
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
            <div
              id={'dropdown' + _id}
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby={'dropdownButton' + _id}>
                <li>
                  <a
                    to={'/editTour/' + _id}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    data-modal-target={'popup-modal' + _id}
                    data-modal-toggle={'popup-modal' + _id}
                    className="block font-bold text-left w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-orange-500 dark:hover:text-orange-500"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
            <div
              id={'popup-modal' + _id}
              data-modal-target={'popup-modal' + _id}
              tabIndex="-1"
              className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide={'popup-modal' + _id}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this tour?
                    </h3>
                    <button
                      data-modal-hide={'popup-modal' + _id}
                      type="button"
                      onClick={() => {
                        handleConfirmDelete(_id);
                      }}
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-hide={'popup-modal' + _id}
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <ConfirmBox /> */}
        </>
      )}
      <Link
        to={'/tour/' + _id}
        className="flex w-full justify-center items-center"
      >
        <img className="mt-5 max-h-32 border" src={imageFile} alt={title} />
      </Link>
      <div className="p-5">
        <div className="flex">
          <div className="flex-1">
            {tags.map((tag) => {
              return (
                <Link to={`/tours/tag/${tag}`} key={tag}>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    #{tag}
                  </span>
                </Link>
              );
            })}
          </div>
          <Likes />
        </div>

        <Link to={'/tour/' + _id}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <Link
          to={'/tour/' + _id}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Tour;
