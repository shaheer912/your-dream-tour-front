import { Link } from 'react-router-dom';

const maxDescriptionLength = 42;

const RelatedTour = (props) => {
  const { imageFile, title, _id, tags } = props.tour;
  let { description } = props.tour;

  if (description.length > maxDescriptionLength) {
    description = description.substr(0, maxDescriptionLength - 3) + '...';
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link
        to={'/tour/' + _id}
        className="flex w-full justify-center items-center"
      >
        <img className="mt-5 max-h-24 border" src={imageFile} alt={title} />
      </Link>
      <div className="p-5">
        {tags.map((tag) => {
          return (
            <Link to={`/tours/tag/${tag}`}>
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            </Link>
          );
        })}

        <Link to={'/tour/' + _id}>
          <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
          <Link to={'/tour/' + _id}>{description}</Link>
        </p>
      </div>
    </div>
  );
};

export default RelatedTour;
