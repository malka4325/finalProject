import { useState } from "react";
import OneVacation from "./OneVacation";
import Vacation from "./Vacation";
const MainVacations = () => {
const [selectedVacation, setSelectedVacation] = useState(null);

const handleSelectVacation = (vacation) => {
    console.log('נבחר נופש:', vacation);
    setSelectedVacation(vacation);
};

const handleBack = () => {
    setSelectedVacation(null);
};

return (
    <div>
            {!selectedVacation && (
        <Vacation onSelectVacation={handleSelectVacation} />
    )}
   
    {selectedVacation && (
        <OneVacation vacation={selectedVacation} onBack={handleBack} />
    )}
</div>
);
        };

export default MainVacations;
