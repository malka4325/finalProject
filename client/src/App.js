
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


function App() {
  const [token, setToken] = useState();
  const setTokenCallback = (token) => {
    setToken(token);
  }
  return (
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
<UserProvider  accessToken={token}>
<Router>
  
            <Routes>
            <Route path="/" element={<AuthPage   setToken={setTokenCallback} />} />

                <Route path="/Vacations" element={<Vacations />} ></Route>
                <Route path="/Vacations/:id" element={<OneVacation  />} />
                <Route path="/upload" element={<Upload/>}/>
                <Route path="/Orders/newOrder/:id" element={<NewOrder  />} />

            </Routes>
        </Router>
        </UserProvider>

    </div>
  );
}

export default App;
