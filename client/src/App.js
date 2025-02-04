
import './App.css';
import Trips from './Components/Trips/Trips';
import OneVacation from './Components/Vacations/OneVacation';
function App() {
  return (
    <div className="App">
      {/* <Trips/> */}
  <OneVacation vacation={{location:"גלי צאנז",area:"צפון",activities:[{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"},{name:"aaa",type:"bbb"}]}}/>
    </div>
  );
}

export default App;
