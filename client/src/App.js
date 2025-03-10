
import './App.css';
import HomePage from './Components/HomePage';
import AuthPage from './Components/AuthPage';
import Trips from './Components/Trips/Trips';
import MainVacations from './Components/Vacations/MainVacations';

import OneVacation from './Components/Vacations/OneVacation'
import Vacation from './Components/Vacations/Vacation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
         <img
        src="/images/logo2.png"
        alt="לוגו קטן"
        className="fixed-logo"
      />
 {/* <Vacation/>
  <OneVacation vacation={{location:" מלון כינר",area:"צפון",TargetAudience:"משפחה",price:100,startDate:'05/12/2016',endDate:'05/12/2016',images:['/images/cineret.jpg', '/images/cineret.jpg', '/images/cineret.jpg','/images/logo.jpg'],activities:[{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"}]}}></OneVacation>  
 */}
 {/* <MainVacations/> */}
<AuthPage/>
{/* <Router>
  
  <Routes>
  <Route path="/" element={<HomePage />} />
      <Route path="/OneVacation" element={<OneVacation/>}/>
  </Routes>
</Router> */}
    </div>
  );
}

export default App;
