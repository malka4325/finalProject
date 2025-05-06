import React, { useEffect, useRef, useState } from 'react';

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
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

const ChooseActivities = ({ chooseActivities, setChooseActivities, visible, setVisible, maxPrice, sumPrice, setSumPrice }) => {

    const [chooseActivitiesNames, setChooseActivitiesNames] = useState([]);
    const [activities, setActivities] = useState([]);
    const maxActivities = 6;
    const [selectedArea, setSelectedArea] = useState(null);
    const [maxPriceForOne, setMaxPriceForOne] = useState(null);
    const priceRef=useRef("")
    const areas = [
        { name: 'צפון', code: 'NY' },
        { name: 'דרום', code: 'RM' },
        { name: 'אזור ירושלים', code: 'LDN' },
        { name: 'מרכז', code: 'IST' }

    ];
    const [selectedWhom, setSelectedWhom] = useState(null);
    const whoms = [
        { name: 'ילדים', code: 'NY' },
        { name: 'משפחות', code: 'RM' },
        { name: 'נשים', code: 'LDN' },
        { name: 'גברים', code: 'IST' },
    ];
    const [selectedType, setSelectedType] = useState(null);
    const types = [
        { name: 'אטרקציה', code: 'NY' },
        { name: 'מסלול', code: 'RM' },
        { name: 'תוכנית', code: 'LDN' },
    ];
    useEffect(() => {
        getActivities();
        console.log();
    }, [selectedType,selectedWhom,selectedArea,maxPriceForOne]);
    const getActivities = async () => {
        try {    
             let url = 'http://localhost:4300/api/activities?';
        if (selectedArea) {
            url += `area=${selectedArea.name}&`;
           
        }
        if (selectedWhom) {
            url += `targetAudience=${selectedWhom.name}&`;
        }
        if (selectedType) {
            url += `type=${selectedType.name}&`;
        }
        if (maxPriceForOne) {
            url += `maxPrice=${maxPriceForOne}&`;
        }
        // מסיר את ה- '&' האחרון אם יש
        url = url.endsWith('&') ? url.slice(0, -1) : url;

        console.log("Fetching activities from URL:", url); // לבדוק את ה-URL

        const res = await axios.get(url);
        console.log("Activities response:", res.data); // לבדוק את הנתונים המתקבלים


            if (res.status === 200) {
                setActivities(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }
    const onChooseActivitiesChange = (e, activity) => {
        console.log(e);
        let _chooseActivities = [...chooseActivities];
        let _chooseActivitiesNames = [...chooseActivitiesNames];

        if (e.checked) {
            _chooseActivities.push(e.value);
            _chooseActivitiesNames.push(activity.name);
            if (maxPrice) { //by user
                if (_chooseActivities.length >= maxActivities) {
                    alert('לא ניתן לבחור יותר מ-6 פעילויות');
                    return;
                }

                if (sumPrice + activity.price > maxPrice) {
                    alert('חצית את התקציב המקסימלי');
                    return;
                }
            }
            setSumPrice(sumPrice + activity.price)

            // setSumPrice(sumPrice+Number(e.target.price))
        }
        else {
            _chooseActivities.splice(_chooseActivities.indexOf(e.value), 1);
            _chooseActivitiesNames.splice(_chooseActivitiesNames.indexOf(activity.name), 1);
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
    const reject = () => {
        setVisible(true)
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
                        {maxPrice && <div>{maxPrice - sumPrice}</div>}
                        <Dropdown showClear value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={areas} optionLabel="name"
                            placeholder="בחר אזור" className="w-full md:w-14rem" />
                               <Dropdown showClear value={selectedWhom} onChange={(e) => setSelectedWhom(e.value)} options={whoms} optionLabel="name"
                            placeholder="למי?" className="w-full md:w-14rem" />
                                   <Dropdown showClear value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="name"
                            placeholder="סוג" className="w-full md:w-14rem" />
                                 <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            מחיר
                        </label>
                        <InputNumber inputId="currency-us" value={maxPriceForOne} onChange={(e) =>{ setMaxPriceForOne(e.value); }}   />
                        </div>
                        <div className="grid">

                            {activities.map((activity, index) => (
                                <div className="col-12 md:col-3" key={index} style={{ margin: '3rem' }}>
                                    <Card className="activity-card p-shadow-3" style={{ borderRadius: '10px', height: '200px', width: '200px', overflow: 'hidden' }}>
                                        <Checkbox inputId={activity._id} name={activity.name} price={activity.price} value={activity._id} onChange={(e) => { onChooseActivitiesChange(e, activity) }} checked={chooseActivities.includes(activity._id)} />
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
                            <Button label="הוסף" onClick={() => { setVisibleConfirmActivities(true); }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
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




