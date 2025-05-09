import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  
    const navigate = useNavigate();
    const [formData , setformData] = useState({
      fullName:"",
      emailadress:"",
      password:"",
      userName:"",
      role:"AUTHOR"
    });
    const changeHandler = (e) =>{
      setformData({...formData, [e.target.name]:e.target.value});
    }
    const RegisterAuthor = async () =>{
      if (!formData.fullName || !formData.emailadress || !formData.password || !formData.userName || !formData.role)
      {
        alert("Please fill all fields");
        return;
      }
      console.log('sign up function executed : ' , formData)
      try{
      const response = await fetch('http://localhost:9000/Internote/Register' ,{
        method:"POST",
        headers :{
          Accept:'application/json',
          'Content-Type':"application/json"
        },
        body:JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) 
        {
          localStorage.setItem('auth-token',responseData.token);
          alert('Registrated successfully');
          navigate('/LogAuthor');
      } else{
        alert(responseData.errors || 'Registration failed');
      }
  
      }catch(error) {
        console.error('Error during registration ', error);
        alert('Something went wrong . please try again');
      }
    }
      
  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className='text-center'>CREATE AN ACCOUNT</h1>
      <br />
      <form className="bg-dark shadow-lg p-50" onSubmit={(e) => {e.preventDefault(); RegisterAuthor() }}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="fullName"
            id="floating_full_name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.fullName} onChange={changeHandler}
            required
          />
          <label
            htmlFor="floating_full_name"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          >
            Full Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="emailadress"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="xxxxx00@gmail.com"
            value={formData.emailadress} onChange={changeHandler}

            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          >
            Email Address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="••••••••"
            value={formData.password} onChange={changeHandler}

            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          >
            Password
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="userName"
            id="floating_username"
            className="block py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="  " 
            value={formData.userName} onChange={changeHandler}

            required
          />
          <label
            htmlFor="floating_username"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          >
           Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <input
                type="text"
                name="role"
                id="floating_role"
                className="block py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.role} onChange={changeHandler}

                readOnly // Prevent user from changing it
            />
          <label
            htmlFor="floating_role"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          >
            Role
          </label>
        </div>

        <button type="submit" class="text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" style={{padding:"15px 48px",marginLeft:"20%"}}>Register</button>
        <h6 class="mt-2 text-sm text-gray-500 dark:text-gray-400">Already Have an account ?
          <Link to={'/LogAuthor'}>
          <span className='font-medium text-blue-600 hover:underline dark:text-blue-500'> Login In</span> 
          </Link>
          </h6>
      </form>
    </div>
  )
}

export default Register
