import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getRelatedToursByTags, getTour } from '../redux/features/tourSlice';
import moment from 'moment/moment';
import UserIcon from '../clock-icon.svg';
import Loading from '../components/Loading';
import RelatedTours from '../components/RelatedTours';
import SmallLoader from '../components/SmallLoader';
import DisqusThread from '../components/DisqusThread';

const SingleTour = () => {
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const { id } = useParams();
  const tags = tour?.tags;

  useEffect(() => {
    dispatch(getTour(id));
  }, [id]);

  useEffect(() => {
    tags && dispatch(getRelatedToursByTags(tags));
  }, [tags]);

  if (!tour || Object.keys(tour).length === 0) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex w-full justify-center items-center p-2 bg-gray-700 border-1">
        <img
          className="rounded-lg max-h-fit"
          src={tour?.imageFile}
          alt={tour?.title}
        />
      </div>
      <div className="pl-5 pt-5">
        <p className="font-bold tracking-tight text-slate-600 dark:text-gray-600 text-sm">
          {tour &&
            tour?.name &&
            `Added ${moment(tour.createdAt).fromNow()}, by ${tour?.name}`}
        </p>
      </div>
      <div className="p-5 pt-2">
        {tour?.tags?.map((tag) => {
          return (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          );
        })}
        <h1 className="mb-2 pt-3 pb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {tour?.title}
        </h1>
        <p className="mb-3 text-1xl font-normal text-gray-700 dark:text-gray-400">
          {tour?.description}
        </p>
      </div>
      {relatedTours && relatedTours.length > 0 ? (
        <RelatedTours relatedTours={relatedTours} currentTourId={id} />
      ) : (
        <SmallLoader />
      )}
      <div className="p-3">
        <DisqusThread
          id={id}
          title={tour?.title}
          path={`/tour/${id}`}
        ></DisqusThread>
      </div>
    </div>
  );
};

export default SingleTour;
