import React, { useEffect, useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import axios from "axios";
import { Dialog } from "primereact/dialog";
const TripByUser= () => {
    const stepperRef = useRef(null);
    const [maxPrice, setMaxPrice] = useState(0);
    const [activities, setActivities] = useState([]);
    const [visibleChooseActivity, setVisibleChooseActivity] = useState(false);

    const getActivities= async () => {
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
    
    const newTrip={}

const AddTrip=()=>{
    if (targetAudienceRef.current.value) newTrip.targetAudience = targetAudienceRef.current.value;
    if (joinersRef.current.value) {newTrip.currentParticipants = joinersRef.current.value;
        newTrip.maxParticipants = joinersRef.current.value}
    if (date) newTrip.date = date;

    console.log(newTrip);
    
}

return (
<>
{maxPrice}
<div className="card flex justify-content-center" style={{ direction: 'rtl' }}>
        <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
            <StepperPanel header="שלב ראשון">
                <div className="flex flex-column h-12rem">
                <div className="inline-flex flex-column gap-2">
                            <label htmlFor="targetAudience" className="font-bold block mb-2">
                               למי? 
                            </label>
                            <InputText id="targetAudience" label="name" className="font-bold block mb-2" style={{backgroundColor:"bisque"}}ref={targetAudienceRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                            <label htmlFor="joiners" className="font-bold block mb-2">
                               כמות משתתפים
                            </label>
                            <InputText id="joiners" label="name" className="font-bold block mb-2" style={{backgroundColor:"bisque"}}ref={joinersRef}></InputText>
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
                            <InputText id="maxPrice" label="name" className="font-bold block mb-2" style={{backgroundColor:"bisque"}}ref={maxPriceRef}onChange={(e) => setMaxPrice(e.target.value)}></InputText>
                    </div>
                </div>
                <div className="flex pt-4 justify-content-end">
                    <Button label="הבא" icon="pi pi-arrow-left" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel header="שלב שני">
                <div className="flex flex-column h-12rem">
                <Button label="פעיליות" icon="pi pi-user" onClick={() => {getActivities();setVisibleChooseActivity(true)}} />

                 <Dialog
                 visible={visibleChooseActivity}
                 modal
                 onHide={() => { if (!visibleChooseActivity) return; setVisibleChooseActivity(false); }}
                content={({ hide }) => ( 
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ maxHeight: '80vh', overflowY: 'auto',borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
   <div className="grid">
            {activities.map((activity, index) => (
    <div className="col-12 md:col-3" key={index} style={{ margin: '3rem' }}>
                <Card className="activity-card p-shadow-3" style={{ borderRadius: '10px',height:'200px',width:'200px',overflow: 'hidden' }}>
                {/* <Checkbox inputId={activity._id} name={activity.name} price={activity.price}value={activity._id} onChange={onChooseActivitiesChange} checked={chooseActivities.includes(activity._id)} /> */}
                <Image src={activity.imageSrc} alt={activity.name} width="170px" height="100"  style={{ borderRadius: '10px',width: '100%', height: '100%', }} />
                {/* <h3 className="text-lg font-semibold">{activity.name}</h3> */}
                <h3 className="text-lg font-semibold">{activity.price}</h3>
                <p>קהל יעד: {activity.targetAudience}</p>
                <p>סוג: {activity.type}</p>
                <p>תיאור: {activity.description}</p>
                <Button label="למידע נוסף" icon="pi pi-info-circle" className="p-button-secondary" />
                </Card> 
            </div>
            ))}
        </div>
                        <div className="flex align-items-center gap-2">
                            {/* <Button label="הוסף" onClick={(e) =>{ console.log('chooseActivities',chooseActivities,chooseActivitiesNames);setVisibleConfirmActivities(true);hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button> */}
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                 )}
            ></Dialog> 
                    
                </div>
                <div className="flex pt-4 justify-content-between">
                    <Button label="קודם" severity="secondary" icon="pi pi-arrow-right"  onClick={() => stepperRef.current.prevCallback()} />
                    <Button label="הבא"  icon="pi pi-arrow-left"iconPos="right" onClick={() => {stepperRef.current.nextCallback();AddTrip();}} />
                </div>
            </StepperPanel>
            <StepperPanel header="שלב שלישי">
                <div className="flex flex-column h-12rem">
                    <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                </div>
                <div className="flex pt-4 justify-content-start">
                    <Button label="קודם" severity="secondary" icon="pi pi-arrow-right" onClick={() => stepperRef.current.prevCallback()} />
                </div>
            </StepperPanel>
        </Stepper>
    </div>

</>
)
}
export default TripByUser


        