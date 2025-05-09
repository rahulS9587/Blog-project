import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import icon_profile from '../../assests/admin.png';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [users,setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    datepublished: '',
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createPost = async (e) => {
    e.preventDefault();  // Prevent default form submission

    const token = localStorage.getItem('auth-token');
    let internoteId = '';

    if (token) {
      const decodedToken = jwtDecode(token);
      internoteId = decodedToken.sub;
      console.log('id of user:', internoteId);
    }

    const { title, content, category, datepublished } = formData;

    fetch(`http://localhost:9000/Post/addPost/${internoteId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': `${localStorage.getItem('auth-token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: internoteId,
        title,
        content,
        category,
        datepublished,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Post created successfully');
        console.log(data);
        setPosts([...posts, data]);  
        setIsModalOpen(false); 
      })
      .catch((error) => console.error('Error adding post:', error));
  };
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    let internoteId = '';

    if (token) {
      const decodedToken = jwtDecode(token);
      internoteId = decodedToken.sub;
      console.log('id of user:', internoteId);
    }

    fetch(`http://localhost:9000/Internote/GetInternote/${internoteId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('User fetched:', data);
          if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([data]); 
        }
      })
      .catch((error) => {
        console.error('Error fetching user', error);
      });
  }, []);


  return (
    <>
    {
      users.map(user=>(
        <div key={user.id} className="max-w-sm p-6 bg-dark border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <img className="w-10 h-10 rounded-full" src={icon_profile} alt="" />
          <div className="font-medium dark:text-white">
            <div>{user.fullName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400"> {user.emailadress} </div>
          </div>
        </div>
      </div>
      ))
    }
     

      {/* Create Post Button */}
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create Post
      </button>

      {/* Modal for creating post */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50"
          onClick={toggleModal}
        >
          <div
            className="relative p-4 w-full max-w-xl max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Your First Post
              </h3>

              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="p-5">
              <form onSubmit={createPost} className="max-w-sm mx-auto">
                <div className="mb-5">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                    placeholder="Enter title"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                    placeholder="Enter content"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                    placeholder="Enter category"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="datePublished" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Published Date
                  </label>
                  <input
                    type="date"
                    name="datepublished"
                    value={formData.datepublished}
                    onChange={handleChange}
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
