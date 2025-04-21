
import './App.css';
import HomePage from './Components/HomePage';
import UserProvider from "./context/Provider";
import {react,useState} from 'react';
import Trips from './Components/Trips/Trips';
import AuthPage from './Components/AuthPage';
import OneVacation from './Components/Vacations/OneVacation'
import Vacations from './Components/Vacations/Vacations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './Components/Upload';
import NewOrder from './Components/Orders/NewOrder';
import NavBar from './Components/NavBar';
import AddVacation from './Components/Vacations/AddVacation';
import OldOrders from './Components/Orders/OldOrders';


function App() {
  // const [token, setToken] = useState();
  // const setTokenCallback = (token) => {
  //   setToken(token);
  // }
  return (
  // <div className='card'>
    <Router>
    <div className="App">
         <img
        src="/images/logo2.png"
        alt="לוגו קטן"
        className="fixed-logo"
      />
      <NavBar/>
 {/* <Vacation/>
  <OneVacation vacation={{location:" מלון כינר",area:"צפון",TargetAudience:"משפחה",price:100,startDate:'05/12/2016',endDate:'05/12/2016',images:['/images/cineret.jpg', '/images/cineret.jpg', '/images/cineret.jpg','/images/logo.jpg'],activities:[{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"}]}}></OneVacation>  
 */}
{/* <AuthPage/> */}
{/* <UserProvider  accessToken={token}> */}

  
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/Login" element={<AuthPage/>} />

                <Route path="/Vacations/:area" element={<Vacations />} />
                <Route path="/Vacations/AddVacation" element={<AddVacation />} />
                <Route path="/Vacations/:area/:id" element={<OneVacation  />} />
                <Route path="/upload" element={<Upload/>}/>
                <Route path="/Orders/newOrder/:id" element={<NewOrder  />} />
                <Route path="/Orders/myOrders" element={<OldOrders/>} />

            </Routes>
      
        {/* </UserProvider> */}

    </div>  </Router>
    // {/* </div> */}
  );
}

export default App;
