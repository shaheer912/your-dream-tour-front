import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTours } from '../redux/features/tourSlice';
import Tour from '../components/Tour';
import Loading from '../components/Loading';
import { useLocation } from 'react-router-dom';
import SimpleMessage from '../components/SimpleMessage';

const SearchTours = () => {
  const { tours, loading } = useSelector((state) => ({ ...state.tour }));
  //   console.log(useSelector((state) => ({ ...state.tour })));
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(searchTours(location.search.replace('?searchQuery=', '')));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Search Results
      </h1>

      {tours.length === 0 ? (
        <>
          <SimpleMessage>No results found</SimpleMessage>
        </>
      ) : (
        <div className="content-start h-56 grid grid-cols-4 gap-4 ">
          {tours.map((tour) => {
            return <Tour tour={tour} key={tour._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchTours;
