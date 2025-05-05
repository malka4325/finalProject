import React, { useEffect,useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Checkbox } from "primereact/checkbox";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import axios from 'axios';
import { ConfirmDialog } from 'primereact/confirmdialog';

const ChooseActivities = ({ chooseActivities, setChooseActivities, visible, setVisible }) => {
    
    const [chooseActivitiesNames, setChooseActivitiesNames] = useState([]);
    const [activities, setActivities] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);

    useEffect(() => {
        getActivities();
        console.log();
    }, []);
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
    const onChooseActivitiesChange = (e) => {
        console.log(e);
        let _chooseActivities = [...chooseActivities];
        let _chooseActivitiesNames = [...chooseActivitiesNames];

        if (e.checked) {
            _chooseActivities.push(e.value);
            _chooseActivitiesNames.push(e.target.name);

            // setSumPrice(sumPrice+Number(e.target.price))
        }
        else {
            _chooseActivities.splice(_chooseActivities.indexOf(e.value), 1);
            _chooseActivitiesNames.splice(_chooseActivitiesNames.indexOf(e.target.name), 1);
        }
        setChooseActivities(_chooseActivities);
        setChooseActivitiesNames(_chooseActivitiesNames);
    }
    const [visibleConfirmActivities, setVisibleConfirmActivities] = useState(false);
    const toast = useRef(null);
    const accept = () => {
        if (chooseActivities.length != 0)
        toast.current.show({ severity: 'success', summary: 'הצליח', detail: 'פעילויות נוספו', life: 3000 });
        setVisible(false);
        setVisibleConfirmActivities(false)
    }
    useEffect(() => {
        const total = chooseActivities.reduce((total, activityId) => {
            const activity = activities.find(activity => activity._id === activityId);
            return activity ? total + activity.price : total;
        }, 0);
    
        setChooseActivitiesNames(
            chooseActivities.map(activityId => {
                const activity = activities.find(activity => activity._id === activityId);
                return activity ? activity.name : null;
            }).filter(name => name !== null)
        );
    
        setSumPrice(total);
    }, [chooseActivities, activities]);
    // useEffect(() => {
    //     const total = chooseActivities?.reduce((total, activityId) => {
    //         const activity = activities.find(activity => activity._id === activityId);
    //         if(activity)
    //         chooseActivitiesNames.push(activity.name)
    //         return activity ? total + activity.price : total;
    //     }, 0);
    //     setSumPrice(total);
    // }, []);
    const reject = () => {
        setVisible(true)
        setVisibleConfirmActivities(false)

    }


    const message = (
        <div>
            <span>הפעילויות שבחרת:</span>
            <br />
            <div>{chooseActivitiesNames.join(", ")}</div>

            <span>במחיר כולל:</span>
            <br />
            <span>{sumPrice}</span>
        </div>
    )
    return (

        <>
            <Dialog
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ maxHeight: '80vh', overflowY: 'auto', borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="grid">
                            {activities.map((activity, index) => (
                                <div className="col-12 md:col-3" key={index} style={{ margin: '3rem' }}>
                                    <Card className="activity-card p-shadow-3" style={{ borderRadius: '10px', height: '200px', width: '200px', overflow: 'hidden' }}>
                                        <Checkbox inputId={activity._id} name={activity.name} price={activity.price} value={activity._id} onChange={onChooseActivitiesChange} checked={chooseActivities.includes(activity._id)} />
                                        <Image src={activity.imageSrc} alt={activity.name} width="170px" height="100" style={{ borderRadius: '10px', width: '100%', height: '100%', }} />
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
                            <Button label="הוסף" onClick={() => {  setVisibleConfirmActivities(true);  }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
            <Toast ref={toast} />

            <ConfirmDialog group="declarative" visible={visibleConfirmActivities} onHide={() => setVisibleConfirmActivities(false)} message={message}

                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
        </>
    )
};

export default ChooseActivities;




