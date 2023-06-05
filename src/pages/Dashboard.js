import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTours } from '../redux/features/tourSlice';
import Tour from '../components/Tour';
import Loading from '../components/Loading';
import SimpleMessage from '../components/SimpleMessage';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(getUserTours(user?.result?._id));
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {userTours.length === 0 ? (
        <>
          <SimpleMessage heading="Dashboard">
            You have not created any tours
          </SimpleMessage>
        </>
      ) : (
        <>
          <h1 className="text-center mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Dashboard
          </h1>
          <div className="content-start h-56 grid grid-cols-4 gap-4 ">
            {userTours.map((tour) => {
              return <Tour tour={tour} key={tour._id} showControls={true} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
