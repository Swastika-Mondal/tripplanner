import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowItinerary from './pages/ShowItinerary';
import GenerateItinerary from './pages/GenerateItinerary';
import Login from './pages/Login';
// import ShowItinerarySkeleton from './pages/loaders/ShowItinerarySkeleton';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import UpdateProfile from './pages/UpdateProfile';
import SavedItinerary from './pages/SavedItinerary';
import Home from './pages/Home';
import Navbar from './pages/bars/Navbar';
import Contact from './pages/Contact';
import About from './pages/About';
import AdminLayout from './pages/layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import Logout from './pages/Logout';
import { useFirebase } from './store/firebasedb';

function App() {

  const {userData} = useFirebase()
  

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/generate-itinerary' element={<GenerateItinerary/>}/>
          <Route path='/show-itinerary' element={<ShowItinerary/>}/>
          <Route path='/login' element={<Login/>}/>
          {/* <Route path='/signup' element={<Signup/>}/> */}
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/update-profile' element={<UpdateProfile/>}/>
          <Route path='/saved-itineraries' element={<SavedItinerary/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/*' element={<ErrorPage/>}/>

          {/* Admin Routes */}

          {userData.isAdmin?
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='' element={<AdminDashboard />}/>
            <Route path='users' element={<AdminUsers />}/>
            <Route path='contacts' element={<AdminContacts />}/>
          </Route>
          :
          <></>}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
