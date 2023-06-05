import RelatedTour from './RelatedTour';

const RelatedTours = ({ relatedTours, currentTourId }) => {
  if (relatedTours.length < 2) {
    return <></>;
  }
  return (
    <>
      <div class="inline-flex items-center justify-center w-full">
        <hr class="ml-3 mr-3 w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span class="absolute px-3 -translate-x-1/2 left-1/2 ml-3 mr-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 text-1xl font-bold leading-none tracking-tight">
          Related Tours
        </span>
      </div>

      <div className="content-start grid grid-cols-4 gap-4 pl-5 pb-5">
        {relatedTours
          .filter((tour) => tour._id !== currentTourId)
          .splice(0, 3)
          .map((tour) => {
            return <RelatedTour tour={tour} key={tour._id} />;
          })}
      </div>
    </>
  );
};

export default RelatedTours;
