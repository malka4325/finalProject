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
const TripByUser = () => {
    const stepperRef = useRef(null);
    const navigate = useNavigate()
    const [maxPrice, setMaxPrice] = useState(0);
    const [activities, setActivities] = useState([]);
    const user = useSelector(state => state.UserSlice.user)
    const token = useSelector(state => state.TokenSlice.token)
    const [visibleChooseActivity, setVisibleChooseActivity] = useState(false);
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
    const maxPriceRef = useRef("")

    const targetAudienceRef = useRef("")
    // useEffect(() => {
    //     setMaxPrice(maxPriceRef.current.value)
    // }, [maxPriceRef]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const maxActivities = 6;
    useEffect(() => {
        getActivities();
    }, []);
    const handleSelect = (activity) => {

        console.log("פעילות שנבחרה:", activity);

        const isSelected = selectedActivities.some((a) => a._id === activity._id);
        if (isSelected) {
            setSelectedActivities(selectedActivities.filter((a) => a._id !== activity._id));
            setTotalPrice(totalPrice - activity.price);
        } else {
            if (selectedActivities.length >= maxActivities) {
                alert('לא ניתן לבחור יותר מ-6 פעילויות');
                return;
            }

            if (totalPrice + activity.price > maxPrice) {
                alert('חצית את התקציב המקסימלי');
                return;
            }

            setSelectedActivities([...selectedActivities, activity]);
            setTotalPrice(totalPrice + activity.price);

        };
    };
    const newTrip = {}
    const AddTrip = async () => {


        if (!newTrip.imageSrc) newTrip.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        console.log("response", newTrip.imageSrc);

        if (selectedArea) newTrip.area = selectedArea.name;
        if (targetAudienceRef.current.value) newTrip.targetAudience = targetAudienceRef.current.value;
        if (date) newTrip.date = date;
        //if (activities) newTrip.activities = activities;
        if (joinersRef.current.value) {
            newTrip.currentParticipants = joinersRef.current.value;
            newTrip.maxParticipants = joinersRef.current.value
        }
        
        if (totalPrice) newTrip.price = totalPrice;
        newTrip.madeByType='Client';
        newTrip.madeById=user._id;
        try {
            const res = await axios.post('http://localhost:4300/api/trips', newTrip, {
                headers: {
                    'Authorization': `Bearer ${token}`, // שליחת הטוקן בכותרת Authorization
                },
            })
            console.log(res);
            if (res.status === 200) {
                console.log("res.data", res.data);
                // props.setTrips(res.data)
                navigate('/Trips/הכל');
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <>
            {maxPriceRef.current.value-totalPrice}
            <div className="card flex justify-content-center" style={{ direction: 'rtl' }}>
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                    <StepperPanel header="שלב ראשון">
                        <div className="flex flex-column h-12rem">
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="targetAudience" className="font-bold block mb-2">
                                    למי?
                                </label>
                                <InputText id="targetAudience" label="name" className="font-bold block mb-2" style={{ backgroundColor: "bisque" }} ref={targetAudienceRef}></InputText>
                            </div>
                            <div className="card flex justify-content-center">
                                <Dropdown value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={areas} optionLabel="name"
                                    placeholder=" בחר אזור" className="w-full md:w-14rem" />
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
                                <InputText id="maxPrice" label="name" className="font-bold block mb-2" style={{ backgroundColor: "bisque" }} ref={maxPriceRef} onChange={(e) => setMaxPrice(e.target.value)}></InputText>
                            </div>
                        </div>
                        <div className="flex pt-4 justify-content-end">
                            <Button label="הבא" icon="pi pi-arrow-left" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="שלב שני">
    <div className="flex flex-column h-12rem">
        <div className="grid">
            {activities.map((activity, index) => (
                <div className="col-12 md:col-3" key={index} style={{ margin: '3rem' }}>
                    <Card className="activity-card p-shadow-3" style={{ borderRadius: '10px', height: '250px', width: '200px', overflow: 'hidden' }}>
                        <Checkbox
                            inputId={activity._id}
                            name={activity.name}
                            value={activity._id}
                            onChange={() => handleSelect(activity)}
                            checked={selectedActivities.some((a) => a._id === activity._id)}
                        />
                        <Image src={activity.imageSrc} alt={activity.name} width="170px" height="100" style={{ borderRadius: '10px', width: '100%', height: '100%' }} />
                        <h3 className="text-lg font-semibold">{activity.price} ₪</h3>
                        <p>קהל יעד: {activity.targetAudience}</p>
                        <p>סוג: {activity.type}</p>
                        <p>תיאור: {activity.description}</p>
                        <label htmlFor={activity._id}>בחר</label>
                        <Button label="למידע נוסף" icon="pi pi-info-circle" className="p-button-secondary mt-2" />
                    </Card>
                </div>
            ))}
        </div>
    </div>
    <div className="flex pt-4 justify-content-between">
        <Button label="קודם" severity="secondary" icon="pi pi-arrow-right" onClick={() => stepperRef.current.prevCallback()} />
        <Button label="הבא" icon="pi pi-arrow-left" iconPos="right" onClick={() => { stepperRef.current.nextCallback();  }} />
    </div>
</StepperPanel>
                    <StepperPanel header="שלב שלישי">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                        </div>
                        <div className="flex pt-4 justify-content-start">
                            <Button label="קודם" severity="secondary" icon="pi pi-arrow-right" onClick={() => stepperRef.current.prevCallback()} />
                            <Button label="לסיום" severity="secondary" icon="pi pi-arrow-left" onClick={() => {stepperRef.current.nextCallback();AddTrip();}} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </div>

        </>
    )

}
export default TripByUser


