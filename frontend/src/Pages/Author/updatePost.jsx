import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        datepublished: '',
      });
    
      const { id } = useParams();
      const navigate = useNavigate();
    
      useEffect(() => {
        fetch(`http://localhost:9000/GetByid/${id}`)
          .then(response => response.json())
          .then(data => setFormData({
            title: data.title,
            content: data.content,
            category: data.category,
            datepublished: data.datepublished,
          }))
          .catch(error => console.error('Error fetching post:', error));
      }, [id]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleUpdatePost = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          console.error("No token found");
          return;
        }
    
        const decodedToken = jwtDecode(token);
        const internoteId = decodedToken.sub; 
    
        const { title, content, category, datepublished } = formData;
    
        try {
          const response = await fetch(`http://localhost:9000/Post/UpdatePost/${id}/${internoteId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'auth-token': token,
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              user: internoteId,
              title,
              content,
              category,
              datepublished,
            }),
          });
    
          const data = await response.json();
          console.log(data);
          alert('Post updated successfully');
          navigate('/authorProfile');
        } catch (error) {
          console.error('Error updating post:', error);
        }
      };
  return (
    
        <div id="crud-modal"   class="  fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50">
  <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm ">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Your Post
              </h3>
          </div>
          <form class="p-4 md:p-8" onSubmit={(e) => {e.preventDefault();handleUpdatePost() }}>
              <div class="grid  mb-4 grid-cols-2">
                  <div class="col-span-2">
                      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type post name" required=""/>
                  </div>
                  <div class="col-span-2 ">
                      <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
                      <textarea name="content" id="content" value={formData.content} onChange={handleChange}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type post content" required=""></textarea>
                  </div>
                  <div class="col-span-2 ">
                      <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <select id="category" name='category' value={formData.category} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          <option selected="">Select category</option>
                          <option value="Restaurent">Restaurent</option>
                          <option value="Informatique">Informatique</option>
                          <option value="Technologies">Technologies</option>
                          <option value="Jobs">Jobs</option>
                      </select>
                  </div>
                  <div class="col-span-2">
                      <label for="datepublished" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published Date</label>
                      <input type="datetime-local" value={formData.datepublished} onChange={handleChange} name="datepublished" id="datepublished"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type date " required="" />
                  </div>
              </div>
              <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  Save
              </button>
          </form>
      </div>
  </div>
</div> 

  )
}

export default UpdatePost
