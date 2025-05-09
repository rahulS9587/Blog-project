import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData , setformData] = useState({
    emailadress:"",
    password:"",
  });
  const changeHandler = (e) =>{
    setformData({...formData, [e.target.name]:e.target.value});
  }
  const LoginAuthor = async () =>{
    if (!formData.emailadress || !formData.password )
    {
      alert("Please fill all fields");
      return;
    }
    console.log('sign in  function executed : ' , formData)
    
    try{
    const response = await fetch('http://localhost:9000/Internote/Login' ,{
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
        console.log(responseData)
        alert('Login successfully');
        navigate('/authorProfile');
    } else{
      alert(responseData.errors || 'Login  failed');
    }

    }catch(error) {
      console.error('Error to Login ', error);
      alert('Something went wrong . please try again');
    }
  }
  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
    <h1 className='text-center'>Sign In as AUTHOR</h1>
    <br />
    <form className="bg-dark shadow-lg p-50" onSubmit={(e) => {e.preventDefault(); LoginAuthor() }}>   
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

  
      <button type="submit" class="text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" style={{padding:"15px 48px",marginLeft:"20%"}}>Register</button>
      <h6 class="mt-2 text-sm text-gray-500 dark:text-gray-400">Don't Have an account ?
        <Link to={'/registerAuthor'}>
        <span className='font-medium text-blue-600 hover:underline dark:text-blue-500'>Sign In</span> 
        </Link>
        </h6>
    </form>
  </div>
  )
}

export default SignIn
