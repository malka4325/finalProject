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
import { useSelector } from 'react-redux';

const ChooseActivities = ({ chooseActivities, setChooseActivities, visible, setVisible, maxPrice, sumPrice, setSumPrice }) => {
    const navigate = useNavigate();
    const token = useSelector(state => state.TokenSlice.token)
    const user = useSelector(state => state.UserSlice.user)

    const [chooseActivitiesNames, setChooseActivitiesNames] = useState([]);
    const [activities, setActivities] = useState([]);
    const [filterActivities, setFilterActivities] = useState([]);
    const maxActivities = 6;
    const [selectedArea, setSelectedArea] = useState(null);
    const [maxPriceForOne, setMaxPriceForOne] = useState(null);
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
        { name: 'תכנית', code: 'LDN' },
    ];
    const isAdmin = () => {
        if (!user)
            return false
        return user.role == "Admin"
    }
    useEffect(() => {
        filterActivitiesFunc();
        console.log();
    }, [selectedType,selectedWhom,selectedArea,maxPriceForOne]);
    useEffect(() => {
        getActivities();
    }, []);
    const getActivities = async () => {
        try {    
             let url = 'http://localhost:4300/api/activities?';
        // if (selectedArea) {
        //     url += `area=${selectedArea.name}&`;
           
        // }
        // if (selectedWhom) {
        //     url += `targetAudience=${selectedWhom.name}&`;
        // }
        // if (selectedType) {
        //     url += `type=${selectedType.name}&`;
        // }
        // if (maxPriceForOne && maxPriceForOne < (maxPrice || Infinity)) {
        //     url += `maxPrice=${maxPriceForOne}&`;
        // }
        // else{
            if (maxPrice) {
                url += `maxPrice=${maxPrice}`;
            }
       // }
        // מסיר את ה- '&' האחרון אם יש
       // url = url.endsWith('&') ? url.slice(0, -1) : url;

        console.log("Fetching activities from URL:", url); // לבדוק את ה-URL

        const res = await axios.get(url);
        console.log("Activities response:", res.data); // לבדוק את הנתונים המתקבלים


            if (res.status === 200) {
                setActivities(res.data);
                setFilterActivities(res.data);
              
            }
        } catch (e) {
            console.error(e)
        }
    }
    const filterActivitiesFunc=()=>{
       debugger
        const filteredActivitiesNow = activities.filter(activity => {
            let matches = true;
        
            if (selectedArea) {
                matches = matches && activity.area === selectedArea.name;
            }
            if (selectedWhom) {
                matches = matches && activity.targetAudience === selectedWhom.name;
            }
            if (selectedType) {
                matches = matches && activity.type === selectedType.name;
            }
            if (maxPriceForOne && maxPriceForOne < (maxPrice || Infinity)) {
                matches = matches && activity.price <= maxPriceForOne;
            } else if (maxPrice) {
                matches = matches && activity.price <= maxPrice;
            }
        
            return matches;
        });
        setFilterActivities(filteredActivitiesNow)
        console.log("Filtered activities:", filteredActivitiesNow); // לבדוק את הנתונים המתקבלים
        
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
    const updateActivity=(event,activity)=>{
        //setSelectedActivity(activity)
        event.stopPropagation();
        if (token && user.role == "Admin")
        navigate('/Activities/AddActivity',{ state: { activityToUpdate: activity, isEditing: true } });
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
                    <div
                        className="flex flex-column px-6 py-5 gap-4"
                        style={{
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            borderRadius: '16px',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        {maxPrice && (
                            <div className="text-right font-semibold text-blue-800">
                                סכום שנותר: ₪{maxPrice - sumPrice}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 justify-between">
                            <Dropdown
                                showClear
                                value={selectedArea}
                                onChange={(e) => setSelectedArea(e.value)}
                                options={areas}
                                optionLabel="name"
                                placeholder="בחר אזור"
                                className="w-full md:w-14rem "
                            />
                            <Dropdown
                                showClear
                                value={selectedWhom}
                                onChange={(e) => setSelectedWhom(e.value)}
                                options={whoms}
                                optionLabel="name"
                                placeholder="למי?"
                                className="w-full md:w-14rem"
                            />
                            <Dropdown
                                showClear
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.value)}
                                options={types}
                                optionLabel="name"
                                placeholder="סוג"
                                className="w-full md:w-14rem"
                            />
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="activityname" className="text-blue-900 font-medium">
                                    מחיר מקסימלי לאטרקציה
                                </label>
                                <InputNumber
                                    inputId="currency-us"
                                    value={maxPriceForOne}
                                    onChange={(e) => setMaxPriceForOne(e.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="grid mt-4">
                            {filterActivities.map((activity, index) => (
                                <div className="col-12 md:col-3" key={index}>
                                    <Card
                                        className="activity-card"
                                        style={{
                                            borderRadius: '16px',
                                            padding: '1rem',
                                            backgroundColor: '#f4faff',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                            height: 'auto',
                                        }}
                                    >
                                        <div className="flex justify-between mb-2">
                                            <Checkbox
                                                inputId={activity._id}
                                                name={activity.name}
                                                price={activity.price}
                                                value={activity._id}
                                                onChange={(e) => { onChooseActivitiesChange(e, activity); }}
                                                checked={chooseActivities.includes(activity._id)}
                                            />
                                            {isAdmin() && (
                                                <Button
                                                    icon="pi pi-pen-to-square"
                                                    rounded
                                                    text
                                                    severity="help"
                                                    aria-label="update"
                                                    onClick={(event) => updateActivity(event, activity)}
                                                />
                                            )}
                                        </div>

                                        <Image
                                            src={activity.imageSrc}
                                            alt={activity.name}
                                            width="100%"
                                            height="120"
                                            style={{
                                                borderRadius: '10px',
                                                objectFit: 'cover',
                                                marginBottom: '0.5rem'
                                            }}
                                        />
                                        <h3 className="text-lg font-semibold text-blue-900">{activity.name}</h3>
                                        <p className="text-orange-600 font-semibold">₪{activity.price}</p>
                                        <p className="text-sm text-gray-700">קהל יעד: {activity.targetAudience}</p>
                                        <p className="text-sm text-gray-700">סוג: {activity.type}</p>
                                        <p className="text-sm text-gray-600">תיאור: {activity.description}</p>

                                        <Button
                                            label="למידע נוסף"
                                            icon="pi pi-info-circle"
                                            className="p-button-sm mt-2"
                                            style={{
                                                backgroundColor: '#ff9800',
                                                borderColor: '#ff9800',
                                                color: '#fff',
                                                width: '100%'
                                            }}
                                        />
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div className="flex align-items-center gap-3 mt-4">
                            <Button
                                label="הוסף"
                                onClick={() => { setVisibleConfirmActivities(true); }}
                                className="p-button-sm"
                                style={{
                                    backgroundColor: '#0288d1',
                                    color: 'white',
                                    width: '100%',
                                    borderRadius: '8px'
                                }}
                            />
                            <Button
                                label="ביטול"
                                onClick={(e) => hide(e)}
                                className="p-button-sm"
                                style={{
                                    backgroundColor: '#eeeeee',
                                    color: '#333',
                                    width: '100%',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    </div>
                )}
            />

            <Toast ref={toast} />

            <ConfirmDialog group="declarative" visible={visibleConfirmActivities} onHide={() => setVisibleConfirmActivities(false)} message={message}

                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
        </>

    )
};

export default ChooseActivities;




