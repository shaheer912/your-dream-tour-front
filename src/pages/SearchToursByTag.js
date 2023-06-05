import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchToursByTag } from '../redux/features/tourSlice';
import Tour from '../components/Tour';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';

const SearchToursByTag = () => {
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const { tag } = useParams();

  useEffect(() => {
    dispatch(searchToursByTag(tag));
  }, [tag]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Search Results
      </h1>

      <div className="content-start h-56 grid grid-cols-4 gap-4 ">
        {tagTours.map((tour) => {
          return <Tour tour={tour} key={tour._id} />;
        })}
      </div>
    </div>
  );
};

export default SearchToursByTag;
