import React, { useEffect, useState } from 'react';

const UserList = () => {
   const [Users,setUsers] = useState([]);
      useEffect(() => {
          fetch('http://localhost:9000/Internote/GetAllInternote')
            .then(response => response.json())
            .then(data => {
              console.log('Fetched posts:', data);
              setUsers(data);
            })
            .catch(error => {
              console.error("Error fetching  Users:", error);
            });
        }, []);

    const RemoveUsers = async(id) =>{
              setUsers((prev)=> prev.filter((post)=>post.id !== id));
              if(localStorage.getItem("auth-token"))
              {
                  fetch(`http://localhost:9000/Internote/DeleteInternote/${id}`,{
                      method:"DELETE",
                      headers :{
                          Accept : 'application/json',
                          'auth-token':`${localStorage.getItem('auth-token')}`,
                          'Content-type':'application/json',
                      },
                      body:JSON.stringify({user:id})
                  })
                  .then((response) =>response.json(),alert('User Removed successfully'))
                  .then((data) => console.log(data))
                  .catch((error) => console.error('Error removing users',error))
              }else{
                  alert("Please authenticate first")
              }
    }

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
   
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white border border-white">
        <thead class="text-xs text-white uppercase bg-dark border border-white">
            <tr>
              
                <th scope="col" class="px-6 py-3">
                    Full Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email Adress
                </th>
                <th scope="col" class="px-6 py-3">
                    Role
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          
        {
          Users.map(user=>(
            <tr key={user.id} class="bg-dark border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:hover:bg-gray-600">
              
            <td class="px-6 py-4">
              {user.fullName}  
            </td>
            <td class="px-6 py-4">
                {user.emailadress}
            </td>
            <td class="px-6 py-4">
                {user.role}
            </td>
            <td class="px-6 py-4">
                <button onClick={()=>RemoveUsers(user.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
            </td>
        </tr>
          ))
        }
        
        </tbody>
    </table>
</div>
  )
}

export default UserList
