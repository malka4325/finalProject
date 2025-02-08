
import './App.css';
import HomePage from './Components/HomePage';
import Trips from './Components/Trips/Trips';

import OneVacation from './Components/Vacations/OneVacation'
import Vacation from './Components/Vacations/Vacation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
 <Vacation/>
  <OneVacation vacation={{location:" מלון כינר",area:"צפון",TargetAudience:"משפחה",price:100,startDate:'05/12/2016',endDate:'05/12/2016',images:['/images/cineret.jpg', '/images/cineret.jpg', '/images/cineret.jpg','/images/7239120.gif'],activities:[{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"}]}}></OneVacation> 


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
