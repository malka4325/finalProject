import { useState } from "react";
import OneVacation from "./OneVacation";

import Vacations from "./Vacations";
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
        <Vacations onSelectVacation={handleSelectVacation} />
    )}
   
    {selectedVacation && (
        <OneVacation vacation={selectedVacation} onBack={handleBack} />
    )}
</div>
);
        };

export default MainVacations;
