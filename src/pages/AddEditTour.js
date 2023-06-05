import React, { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { toast } from 'react-toastify';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTour, updateTour } from '../redux/features/tourSlice';
import { getUserTours } from '../redux/features/tourSlice';

const initialState = {
  title: '',
  description: '',
  tags: [],
  imageFile: '',
};

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const AddEditTour = () => {
  const converTagsToObjectArray = (tags) => {
    const newArray = [];
    tags.forEach((tag) => newArray.push({ id: tag, text: tag }));
    return newArray;
  };

  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags, imageFile } = tourData;
  const [tempTags, setTempTags] = useState(converTagsToObjectArray(tags));
  const { error, loading, userTours } = useSelector((state) => ({
    ...state.tour,
  }));

  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(getUserTours(user?.result?._id));
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      const tour = userTours.find((item) => {
        return item._id === id;
      });
      if (tour) {
        setTourData({ ...tour });
        setTempTags(converTagsToObjectArray(tour.tags));
      }
    }
  }, [id, userTours]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    setTourData({ ...tourData, tags: getTagList(tempTags) });
  }, [tempTags]);

  useEffect(() => {
    if (!id) {
      clearForm();
    }
  }, [id]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };
      if (id) {
        dispatch(updateTour({ id, updatedTourData, navigate, toast }));
      } else {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      }
      clearForm();
    }
  };
  const clearForm = () => {
    setTourData({ title: '', description: '', tags: [], imageFile: '' });
  };
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setTourData({ ...tourData, imageFile: base64 });
  };

  const handleDelete = (i) => {
    setTempTags(tempTags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTempTags([...tempTags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tempTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTempTags(newTags);
  };

  const handleTagClick = (index) => {
    // console.log('The tag at index ' + index + ' was clicked');
  };

  const getTagList = (tags) => {
    return tags.map((tag) => tag.text);
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-md">
        <form
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          method="post"
        >
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {id ? 'Update Tour' : 'Add Tour'}
          </h1>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              name="title"
              required
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
              required
              onChange={onInputChange}
              defaultValue={description}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="tags"
            >
              Tags
            </label>
            <ReactTags
              classNames={{
                tagInputField:
                  'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5',
                tag: 'bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300',
                remove: 'text-red-500 text-mg pl-2',
              }}
              tags={tempTags}
              delimiters={[188, 13]}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="inline"
              inline={true}
              autocomplete
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="tags"
            >
              Image
            </label>
            {imageFile && (
              <>
                <div className="flex w-full bg-gray-900 justify-center items-center">
                  <img
                    src={imageFile}
                    alt={title}
                    title={title}
                    className="border mt-3 mb-3 max-h-28"
                  />
                </div>
              </>
            )}

            <input
              type="file"
              name="imageFile"
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="imageFile"
              onChange={onFileChange}
              encType="multipart/form-data"
              required
            />
          </div>
          <div className="mb-6 grid grid-cols-1 gap-2 content-start">
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-700"
              type="button"
              onClick={formSubmit}
            >
              {id ? 'Update Tour' : 'Create Tour'}
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={clearForm}
            >
              Clear
            </button>

            <div role="status" className={loading ? 'visible' : 'invisible'}>
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTour;
