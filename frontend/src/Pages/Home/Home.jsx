import React, { useState } from 'react';
import DisplayPost from '../../Component/displayPost/DisplayAllPost';
import DisplayPostByCategory from '../../Component/displayPost/DisplayPostByCategory';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "Technologies", "Informatique", "Restaurent", "Jobs"];

  return (
    <div className="home">
      <div className="hero text-center py-20">
        <h1 className="text-5xl font-bold">Welcome to VibeHub!</h1>
        <p className="mt-4 text-xl">
          Create, Share, and Explore content across a range of categories.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 my-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 
              ${selectedCategory === category ? "bg-gray-900" : "bg-gray-700"}
            `}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory === "ALL" ? <DisplayPost /> : <DisplayPostByCategory category={selectedCategory} />}
    </div>
  );
};

export default Home;
