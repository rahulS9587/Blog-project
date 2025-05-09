import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../assests/profile.png';
const ProfileAuthor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMyPostsModalOpen, setIsMyPostsModalOpen] = useState(false);
    const [isPostUpdateModalOpen,setisPostUpdateModalOpen] = useState(false);
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
    const toggleMyPostsModal = () => {
      setIsMyPostsModalOpen(!isMyPostsModalOpen);
    };
    const togglepostUpdate = ()=>{
      setisPostUpdateModalOpen(!isPostUpdateModalOpen)
    }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const createPost = async (e) => {
          e.preventDefault(); 
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
          fetch(`http://localhost:9000/Post/GetAllByid/${internoteId}`)
            .then(response => response.json())
            .then(data => {
              console.log('Fetched posts:', data);
              setPosts(data);
            })
            .catch(error => {
              console.error("Error fetching posts:", error);
            });
        }, []);
           const removePost = async (id) =>{
                const token = localStorage.getItem("auth-token");
                let userId = null;
                if (token)
                {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.sub;
                    console.log(userId);
                }
                setPosts((prev)=> prev.filter((post)=>post.id !== id));
                if(localStorage.getItem("auth-token"))
                {
                    fetch(`http://localhost:9000/Post/${id}/${userId}`,{
                        method:"DELETE",
                        headers :{
                            Accept : 'application/json',
                            'auth-token':`${localStorage.getItem('auth-token')}`,
                            'Content-type':'application/json',
                        },
                        body:JSON.stringify({posts:id,user:userId})
                    })
                    .then((response) =>response.json(),alert('Post Removing successfully'))
                    .then((data) => console.log(data))
                    .catch((error) => console.error('Error removing post',error))
                }else{
                    alert("Please authenticate first")
                }
             }
             const UpdatePost = async (id) => {
              const token = localStorage.getItem('auth-token');
              let internoteId = '';
              if (token) {
                const decodedToken = jwtDecode(token);
                internoteId = decodedToken.sub;
                console.log('id of user:', internoteId);
              }
          
              const { title, content, category, datepublished } = formData;
          
              fetch(`http://localhost:9000/Post/UpdatePost/${id}/${internoteId}`, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'auth-token': `${localStorage.getItem('auth-token')}`,
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({
                  posts:id,
                  user: internoteId,
                  title,
                  content,
                  category,
                  datepublished,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  alert('Post updated successfully');
                  console.log(data);
                  setPosts([...posts, data]);  
                  setIsModalOpen(false); 
                })
                .catch((error) => console.error('Error updating post:', error));
            };
  return (
    

<div class=" bg-dark border border-gray-200 rounded-lg shadow-sm ">
    <div class="flex justify-end px-4 pt-4">
        <button onClick={toggleDropdown} id="dropdownButton" data-dropdown-toggle="dropdown" class="text-gray-500 dark:text-gray-400   focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        {isDropdownOpen && (
        <div id="dropdown" class="z-10  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
                <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</button>
            </li>
            <li>
                <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Update</button>
            </li>
            <li>
                <button class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</button>
            </li>
            </ul>
        </div>
        )}
    </div>
    
    <div class="flex flex-col items-center pb-10">
      {
         users.map(user=>(
          <div key={user.id} class="flex flex-col items-center pb-10">
          <img class="w-24 h-24 mb-3  rounded-full shadow-lg" src={profile} alt=""/>
          <h5 class="mb-1 text-xl font-medium text-white"> {user.fullName} </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">{user.emailadress}</span>
          </div>
         ))
      }
      
        <div class="flex mt-4 md:mt-6">
        <button  onClick={toggleModal}  data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          Create Post
          </button> 
          {isModalOpen && (
          <div id="crud-modal"  tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm ">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Post
                </h3>
                <button onClick={toggleModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <form class="p-4 md:p-8" onSubmit={createPost}>
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
 )}


       <button onClick={toggleMyPostsModal} data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-blue-600 bg-white hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">My Posts</button>
       {isMyPostsModalOpen && (
       <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50">
        <div class="relative p-4 w-full max-w-4xl max-h-3/4">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    My posts
                </h3>
                <button  onClick={toggleMyPostsModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-4 md:p-5 space-y-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white border border-white">
            <thead class="text-xs text-gray-900 uppercase bg-white border border-white">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Post name
                </th>
                <th scope="col" class="px-6 py-3">
                    Post Content
                </th>
                <th scope="col" class="px-6 py-3">
                    category
                </th>
                <th scope="col" class="px-6 py-3">
                    data publiched
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {posts.map(post =>(
                <tr key={post.id} className="bg-white text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:hover:bg-gray-600">
                           
                            <th scope="row" className="px-6 py-4">
                                {post.title}
                            </th>
                            <td className="px-6 py-4">
                               {post.content}
                            </td>
                            <td className="px-6 py-4">
                               {post.category}
                            </td>
                            <td className="px-6 py-4">
                               {new Date(post.datepublished).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <Link to={`/updatePost/${post.id}`}>
                              <button type='submit'  className="font-medium text-teal-600 dark:text-teal-800 hover:underline">Update</button>
                              </Link>
                              <button type='submit' onClick={()=>removePost(post.id)}   className="font-medium text-red-600 dark:text-red-900 hover:underline">Delete</button>
                            </td>
                        </tr>   
            ))}
        </tbody>
    </table>
            </div>
        </div>
    </div>
</div>
)}
  

        </div>
        
      



    </div>
</div>

  )
}

export default ProfileAuthor
