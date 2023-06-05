import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import Tour from '../components/Tour';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const Home = () => {
  const { tours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  //   console.log(useSelector((state) => ({ ...state.tour })));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h1 className="text-center mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Find your dream tour
        </h1>

        <div className="content-start grid grid-cols-4 gap-4 ">
          {tours.map((tour) => {
            return <Tour tour={tour} key={tour._id} />;
          })}
        </div>
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        dispatch={dispatch}
      />
    </>
  );
};

export default Home;
