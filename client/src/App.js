
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
 <OneVacation vacation={{location:" מלון כינר",area:"צפון",activities:[{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"}]}}/>
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
