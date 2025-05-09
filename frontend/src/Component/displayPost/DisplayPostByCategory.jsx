import React, { useEffect, useState } from 'react';

const DisplayPostByCategory = ({ category }) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:9000/Post/Post/${category}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(`Posts fetched for ${category}:`, data);
          if (Array.isArray(data)) {
            setPosts(data);
          }
        })
        .catch((error) => {
          console.error(`Error fetching posts for ${category}:`, error);
        });
    }, [category]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="block max-w-sm p-6 bg-dark border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <h1 className="text-center text-white">{post.title}</h1>
            <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-sm border border-gray-500">
              {post.category}
            </span>
            <p className="font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">
              {post.datepublished}
            </span>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-gray-400">No posts available for this category.</p>
      )}
    </div>
  )
}

export default DisplayPostByCategory
