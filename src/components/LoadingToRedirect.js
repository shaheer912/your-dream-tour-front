import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);
  // return <div>Redirecting you to login in {count} seconds</div>;
  return (
    <div className="grid h-96 place-items-center">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Redirecting...
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          You will be redirected to <Link to="/login">Login page</Link> in{' '}
          {count} seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
