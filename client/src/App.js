
import './App.css';
import HomePage from './Components/HomePage';
import UserProvider from "./context/Provider";
import { react, useState } from 'react';
import Trips from './Components/Trips/Trips';
import AuthPage from './Components/AuthPage';
import OneVacation from './Components/Vacations/OneVacation'
import Vacations from './Components/Vacations/Vacations';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Upload from './Components/Upload';
import NewOrder from './Components/Orders/NewOrder';
import NavBar from './Components/NavBar';
import AddVacation from './Components/Vacations/AddVacation';
import OldOrders from './Components/Orders/OldOrders';
import AllOrders from './Components/Orders/AllOrders';
import ThankYouPage from './Components/ThankYouPage';
import AddTrip from './Components/Trips/AddTrip';
import OneTrip from './Components/Trips/OneTrip';
import AddActivity from './Components/Activities/AddActivity';
import TripByUser from './Components/Trips/TripByUser';
import UpdateUser from './Components/UpdateUser';
import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import ChooseActivities from './Components/Activities/ChooseActivities';
import MyTrips from './Components/Trips/MyTrips';



function App() {

  const user = useSelector(state => state.UserSlice.user)
  const isAdmin = () => {
    
    if (!user)
        return false
    return user.role == "Admin"
}

    const items = [
     
        {
            label: 'הוסף פעילות',
            icon: 'pi pi-share-alt',
            command: () => {
              window.location.href = '/Activities/AddActivity';

            }
        },
        {
            label: 'הוסף טיול',
            icon: 'pi pi-map',
            command: () => {
              window.location.href = '/Trips/AddTrip';
            }
        },
        {
            label: 'הוסף נופש',
            icon: 'pi pi-sun',
            command: () => {
                window.location.href = '/Vacations/AddVacation';
            }
        }
    ];
  return (
    // <div className='card'>
    <Router>
      <div className="App">
        <img
          src="/images/logo2.png"
          alt="לוגו קטן"
          className="fixed-logo"
        />
        <NavBar />
        {/* <Vacation/>
  <OneVacation vacation={{location:" מלון כינר",area:"צפון",TargetAudience:"משפחה",price:100,startDate:'05/12/2016',endDate:'05/12/2016',images:['/images/cineret.jpg', '/images/cineret.jpg', '/images/cineret.jpg','/images/logo.jpg'],activities:[{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"}]}}></OneVacation>  
 */}
        {/* <AuthPage/> */}
        {/* <UserProvider  accessToken={token}> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<AuthPage />} />
          <Route path="/ThankYou" element={<ThankYouPage />} />
          {/* <Route path="/upload" element={<Upload/>}/> */}


          <Route path="/Vacations/:area" element={<Vacations />} />
          <Route path="/Vacations/AddVacation" element={<AddVacation />} />
          <Route path="/Vacations/:area/:id" element={<OneVacation />} />

          <Route path="/Trips/:area" element={<Trips />} />
          <Route path="/Trips/AddTrip" element={<AddTrip />} />
          <Route path="/Trips/:area/:id" element={<OneTrip />} />

          <Route path="/Trips/ByUser" element={<TripByUser/>} />
          <Route path="/Trips/MyTrips" element={<MyTrips/>} />
          <Route path="/Activities/AddActivity" element={<AddActivity/>} />
          <Route path="/Activities/ChooseActivities" element={<ChooseActivities/>} />


          <Route path="/Orders/newOrder/:id" element={<NewOrder />} />
          <Route path="/Orders/myOrders" element={<OldOrders />} />
          <Route path="/Orders/allOrders" element={<AllOrders />} />
          <Route path="/Users/update" element={<UpdateUser/>} />
        </Routes>

        {/* </UserProvider> */}
       
        <div style={{ position: 'relative', height: '350px' }}>
    <Tooltip target=".speeddial-bottom-left .p-speeddial-action" position="left"  />
    {isAdmin() && (
        <SpeedDial model={items} 
                   direction="up" 
                   className="speeddial-bottom-left left-0" 
                   buttonClassName="p-button-danger" 
                   style={{ position: 'fixed', bottom: '20px', overflow: 'visible', margin: '20px' }} />
    )}
</div>
        

      </div>  </Router>
    // {/* </div> */}
  );
}

export default App;




        
