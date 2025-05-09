import React, { useEffect, useState } from 'react';

const DisplayPost = () => {
  const[AllPost,setAllPost] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:9000/Post/AllPost`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Posts fetched:', data);
        if (Array.isArray(data)) {
        setAllPost(data);
      }
    })
    .catch((error) => {
      console.error('Error fetching Post', error);
    });
  },[])
  return (
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    {AllPost.map((post) => (
      <div
        key={post.id}
        className="block max-w-sm p-6 bg-dark  border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <h1 className=' text-center text-white dark:text-white '>{post.title}</h1>
        <span className="bg-gray-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
          {post.category}
        </span>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {post.content}
        </p>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-indigo-900 dark:text-indigo-300">
          {post.datepublished}
        </span>
      </div>
    ))}
  </div>
);
};
export default DisplayPost
