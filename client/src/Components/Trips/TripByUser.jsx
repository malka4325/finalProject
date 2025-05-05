import React, { useEffect, useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';
import axios from "axios";
import { Dialog } from "primereact/dialog";
import ChooseActivities from "../Activities/ChooseActivities";
const TripByUser = () => {
    const stepperRef = useRef(null);
    const navigate = useNavigate()
    const [maxPrice, setMaxPrice] = useState(0);
    const [activities, setActivities] = useState([]);
    const user = useSelector(state => state.UserSlice.user)
    const token = useSelector(state => state.TokenSlice.token)
    const [showChooseActivities, setShowChooseActivities] = useState(true); 
    const [chooseActivities, setChooseActivities] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);
    const[BuildingTrip,setBuildingTrip]=useState({})
    const [selectedArea, setSelectedArea] = useState(null);
    const areas = [
        { name: 'צפון', code: 'NY' },
        { name: 'דרום', code: 'RM' },
        { name: 'אזור ירושלים', code: 'LDN' },
        { name: 'מרכז', code: 'IST' }

    ];
    const getActivities = async () => {
        try {
            const res = await axios.get(`http://localhost:4300/api/activities`)
            if (res.status === 200) {
                setActivities(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }
    const [date, setDate] = useState(null);

    const joinersRef = useRef("")
    //const maxPriceRef = useRef("")

    const targetAudienceRef = useRef("")
    // useEffect(() => {
    //     setMaxPrice(maxPriceRef.current.value)
    // }, [maxPriceRef]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);
    const [currentStep, setCurrentStep] = useState(0); // עוקב אחרי השלב הנוכחי

    const maxActivities = 6;
    useEffect(() => {
        getActivities();
    }, []);
    useEffect(() => {
        if (currentStep === 1) {
            setShowChooseActivities(true); // פותח את הדיאלוג
        }
    }, [currentStep]);

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1); // עדכון לשלב הבא
        stepperRef.current.nextCallback();
    };

    const handlePrevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1); // עדכון לשלב הקודם
        stepperRef.current.prevCallback();
    };

    const newTrip = {
        activities:chooseActivities
    }
 
    const buildobject=()=>{
        if (!newTrip.imageSrc) newTrip.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        console.log("response", newTrip.imageSrc);

        if (selectedArea) newTrip.area = selectedArea.name;
        if (targetAudienceRef.current.value) newTrip.targetAudience = targetAudienceRef.current.value;
        if (date) newTrip.date = date;
        if (selectedActivities) newTrip.activities = selectedActivities;
        if (joinersRef.current.value) {
            newTrip.currentParticipants = joinersRef.current.value;
            newTrip.maxParticipants = joinersRef.current.value
        }

        if (sumPrice) newTrip.price = sumPrice;
        newTrip.madeByType = 'Client';
        newTrip.madeById = user._id;
        setBuildingTrip(newTrip)
    }
    const AddTrip = async () => {
        buildobject()
       console.log(newTrip);
        try {
            const res = await axios.post('http://localhost:4300/api/trips', newTrip, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            })
            console.log(res);
            if (res.status === 200) {
                console.log("res.data", res.data);
                navigate('/Trips/הכל');
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <>
            {/* {maxPriceRef.current.value - totalPrice} */}
            {/* <div className="card flex justify-content-center" style={{ direction: 'rtl' }}>
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                    <StepperPanel header="שלב ראשון" >
                        <div className="flex flex-column h-12rem">
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="targetAudience" className="font-bold block mb-2">
                                    למי?
                                </label>
                                <InputText id="targetAudience" label="name" className="font-bold block mb-2" style={{ backgroundColor: "bisque" }} ref={targetAudienceRef}></InputText>
                            </div>
                            
                            
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="joiners" className="font-bold block mb-2">
                                    כמות משתתפים
                                </label>
                                <InputText id="joiners" label="name" className="font-bold block mb-2" style={{ backgroundColor: "bisque" }} ref={joinersRef}></InputText>
                            </div>
                            <div className="flex-auto">
                                <label htmlFor="date" className="font-bold block mb-2">
                                    תאריך
                                </label>
                                <Calendar id="date" style={{ direction: 'ltr' }} value={date} onChange={(e) => setDate(e.value)} showIcon dateFormat="dd/mm/yy" />
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="maxPrice" className="font-bold block mb-2">
                                    סכום יעד
                                </label>
                                <InputText id="maxPrice" label="name" className="font-bold block mb-2" style={{ backgroundColor: "bisque" }}  onChange={(e) => setMaxPrice(e.target.value)}></InputText>
                            </div>
                        </div>
                        <div className="flex pt-4 justify-content-end">
                            <Button label="הבא" icon="pi pi-arrow-left" iconPos="right" onClick={() => handleNextStep()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="שלב שני">
                    <Button label="פעילויות" icon="pi pi-user" onClick={() =>  setShowChooseActivities(true) } />
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={areas} optionLabel="name"
                            placeholder=" בחר אזור" className="w-full md:w-14rem" />
                    </div>
                    {showChooseActivities && (
                     <ChooseActivities
                     chooseActivities={newTrip.activities}
                     setChooseActivities={setChooseActivities}
                     visible={true} // העברת הנראות לדיאלוג
                     setVisible={setShowChooseActivities} 
                     maxPrice={maxPrice}
                     setSumPrice={setSumPrice}// פונקציה לסגירת הדיאלוג
                     sumPrice={sumPrice}// פונקציה לסגירת הדיאלוג
                 />
            )}
 
    <div className="flex pt-4 justify-content-between">
        <Button label="קודם" severity="secondary" icon="pi pi-arrow-right" onClick={() => handlePrevStep()} />
        <Button label="הבא" icon="pi pi-arrow-left" iconPos="right" onClick={() =>{handleNextStep(); buildobject()}} />
    </div>
</StepperPanel>
                    <StepperPanel header="שלב שלישי">
                        <div className="flex flex-column h-12rem">
                            <h4>{newTrip.targetAudience}</h4>
                            <h4>{user.name}</h4>
                        </div>
                        <div className="flex pt-4 justify-content-start">
                            <Button label="קודם" severity="secondary" icon="pi pi-arrow-right" onClick={() => handlePrevStep()} />
                            <Button label="לסיום" severity="secondary" icon="pi pi-arrow-left" onClick={() => {stepperRef.current.nextCallback();AddTrip();}} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </div> */}
<div className="stepper-container">
  <Stepper ref={stepperRef}>
    <StepperPanel header="פרטי טיול">
      <div className="form-section">
        <div className="grid">
          <div className="col-12 md:col-6">
            <label className="field-label">למי?</label>
            <InputText ref={targetAudienceRef} className="p-inputtext" />
          </div>

          <div className="col-12 md:col-6">
            <label className="field-label">כמות משתתפים</label>
            <InputText ref={joinersRef} className="p-inputtext" />
          </div>

          <div className="col-12 md:col-6">
            <label className="field-label">תאריך</label>
            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon dateFormat="dd/mm/yy" className="p-calendar" />
          </div>

          <div className="col-12 md:col-6">
            <label className="field-label">סכום יעד</label>
            <InputText onChange={(e) => setMaxPrice(e.target.value)} className="p-inputtext" />
          </div>
        </div>

        <div className="flex justify-content-end mt-4">
          <Button label="הבא" icon="pi pi-arrow-left" onClick={handleNextStep} />
        </div>
      </div>
    </StepperPanel>

    <StepperPanel header="בחירת פעילויות">
      <div className="form-section">
        <div className="mb-3">
          <label className="field-label">בחר אזור</label>
          <Dropdown
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.value)}
            options={areas}
            optionLabel="name"
            placeholder="בחר אזור"
            className="p-dropdown"
          />
        </div>

        <Button
          label="בחר פעילויות"
          icon="pi pi-list"
          className="mb-3"
          onClick={() => setShowChooseActivities(true)}
        />

        {showChooseActivities && (
          <ChooseActivities
            chooseActivities={newTrip.activities}
            setChooseActivities={setChooseActivities}
            visible={true}
            setVisible={setShowChooseActivities}
            maxPrice={maxPrice}
            setSumPrice={setSumPrice}
            sumPrice={sumPrice}
          />
        )}

        <div className="flex justify-content-between mt-4">
          <Button label="קודם" icon="pi pi-arrow-right" onClick={handlePrevStep} className="p-button-secondary" />
          <Button label="הבא" icon="pi pi-arrow-left" onClick={() => { handleNextStep(); buildobject(); }} />
        </div>
      </div>
    </StepperPanel>

    <StepperPanel header="סקירה ושליחה">
      <div className="form-section text-right">

        <h4>טיול עבור: {BuildingTrip.targetAudience}</h4>
        <h4>משתתפים: {BuildingTrip.currentParticipants}</h4>
        <h4>תאריך: {date?.toLocaleDateString()}</h4>
        <h4>סה"כ עלות: ₪{BuildingTrip.price}</h4>
        <h4>שם יוצר: {user?.name}</h4>

        <div className="flex justify-content-between mt-4">
          <Button label="קודם" icon="pi pi-arrow-right" onClick={handlePrevStep} className="p-button-secondary" />
          <Button label="סיום" icon="pi pi-check" severity="success" onClick={() => { stepperRef.current.nextCallback(); AddTrip(); }} />
        </div>
      </div>
    </StepperPanel>
  </Stepper>
</div>

        </>
    )

}
export default TripByUser


