import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Dashboard from './Pages/Admin/Dashboard';
import Profile from './Pages/Admin/Profile';
import Register from './Pages/Admin/RegisterAdmin';
import SignIn from './Pages/Admin/SignInADMIN';
import UserList from './Pages/Admin/UserList';
import ProfileAuthor from './Pages/Author/ProfileAuthor';
import RegisterAuthor from './Pages/Author/register';
import LogIn from './Pages/Author/signIn';
import UpdatePost from './Pages/Author/updatePost';
import Home from './Pages/Home/Home';
function App() {
  const token = localStorage.getItem("auth-token");
  let role=''
  if(token){
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub; 
    const emailaddress = decodedToken.email;
    role = decodedToken.Role;
    console.log("id of user:",userId);
    console.log("email:", emailaddress);
    console.log("role:",role);
  }
  return (
    <BrowserRouter>
    
    <div className="App">
      <header className="App-header">
        <Navbar isLoggedIn={token} role={role} />
        </header>
        <div className='main'>
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route path='registerAdmin' element={<Register/> } />
          <Route path='registerAuthor' element= {<RegisterAuthor/>} />
           <Route path='LogAdmin' element={<SignIn/> } />
          <Route path='LogAuthor' element= {<LogIn/>} />
          <Route path='Dashboard' element= {<Dashboard/>}/>
          <Route path='UserList' element= {<UserList/>}/>
          <Route path='adminProfile' element= {<Profile/>}/>
          <Route path='*' element= 
          {
            <>
            <div className='text-white  text-5xl'>404 : NOT FOUND </div>
            <div className='text-white text-sm tracking-widest ml-2 rtl:ml-3' >You are requesting a page that does not exist!</div>
            </>
          }
          />
         <Route path='authorProfile' element= {<ProfileAuthor/>}/>
         <Route path='updatePost/:id' element={<UpdatePost/>}/>
        </Routes>
      </div>

    </div>
    </BrowserRouter>
  );
}

export default App;
