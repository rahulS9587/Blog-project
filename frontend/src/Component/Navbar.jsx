import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({isLoggedIn,role}) => {
    return (
      <div>
        <nav className="bg-dark  fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">
                VibeHub
              </span>
            </Link>
            {
              isLoggedIn ? (
                role==="ADMIN"
              ? (
                <>
                <div className="items-center justify-center">
                  <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                    <Link to={'/Dashboard'} class="block py-2 px-3 text-white  rounded-sm md:bg-transparent text-sm">
                      Dashboard
                    </Link>
                    <Link to={'/UserList'} class="block py-2 px-3 text-white  rounded-sm md:bg-transparent text-sm">
                      Users List
                    </Link>
                    <Link to={'/adminProfile'} class="block py-2 px-3 text-white  rounded-sm md:bg-transparent text-sm">
                      Profile 
                    </Link>
                  </ul>
                </div>
                </>
              ): role==="AUTHOR" ?(
                <>
                 <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                  <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                    <Link to={'/authorProfile'} class="block py-2 px-3 text-white  rounded-sm md:bg-transparent text-md">
                      Profile
                    </Link>
                  </ul>
                </div>

                </>
              ):(
                <span className="text-red">No role exist</span>
              )
            ):(
              <>
                  <div className="flex md:order-2 space-x-5 md:space-x-0 rtl:space-x-reverse">
              <Link to={'/LogAdmin'}>
              <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Sign in as admin
              </button>
              </Link>
              <Link to={'/LogAuthor'}>
              <button type="button" className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Sign in as Author 
              </button>
              </Link>
             
            </div>
              </>
            )
            }
          </div>
        </nav>
      </div>
    );
  };
  
  export default Navbar;
  