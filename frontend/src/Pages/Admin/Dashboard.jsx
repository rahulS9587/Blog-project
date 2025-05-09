import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [posts,setposts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/Post/AllPost')
          .then(response => response.json())
          .then(data => {
            console.log('Fetched posts:', data);
            setposts(data);
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
        setposts((prev)=> prev.filter((post)=>post.id !== id));
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

   

     

  return (
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="pb-4 bg-dark">
        
        <label for="table-search" class="sr-only">Search</label>
   
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white border border-white">
        <thead class="text-xs text-white uppercase bg-dark border border-white">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Post name
                </th>
                <th scope="col" class="px-6 py-3">
                    Post Content
                </th>
                <th scope="col" class="px-6 py-3">
                    author
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
                <tr key={post.id} className="bg-dark border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:hover:bg-gray-600">
                           
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {post.title}
                            </th>
                            <td className="px-6 py-4">
                               {post.content}
                            </td>
                            <td className="px-6 py-4">
                               {post.internote ? post.internote.fullName:'NO Author'}
                            </td>
                            <td className="px-6 py-4">
                               {post.category}
                            </td>
                            <td className="px-6 py-4">
                               {new Date(post.datepublished).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <button type='submit'  onClick={() => removePost(post.id) } className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                            </td>
                        </tr>   
            ))}
        </tbody>
    </table>
</div>

  )
}

export default Dashboard
