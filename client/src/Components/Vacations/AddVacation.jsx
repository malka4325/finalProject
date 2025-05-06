import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import ChooseActivities from '../Activities/ChooseActivities';
import Vacations from './Vacations';

const AddVacation = () => {
    const location = useLocation()
    const { vacationToUpdate, isEditing } = location.state || {};
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const token = useSelector(state => state.TokenSlice.token)
    const [chooseActivities, setChooseActivities] = useState([]);
    const [showChooseActivities, setShowChooseActivities] = useState(false); 
    const [sumPrice, setSumPrice] = useState(0);


    const [selectedArea, setSelectedArea] = useState(null);
    const areas = [
        { name: 'צפון', code: 'NY' },
        { name: 'דרום', code: 'RM' },
        { name: 'אזור ירושלים', code: 'LDN' },
        { name: 'מרכז', code: 'IST' }

    ];
 

    // const location = useLocation();
    // const props = location.state || {};
    const locationRef = useRef("")
    const descriptionRef = useRef("")
    const targetAudienceRef = useRef("")
    const maxParticipantsRef = useRef("")
    const priceRef = useRef("")
    const ratingRef = useRef("")

    //const [file, setFile] = useState(null);
 


    const handleUpload = async (e) => {
        const file = e.files[0];

        if (!file) {
            alert("נא לבחור קובץ!");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post("http://localhost:4300/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("response", response.data.imageUrl);

            if (response.data.imageUrl) {
                const fullUrl = `http://localhost:4300${response.data.imageUrl}`;
                setImageUrl(fullUrl);
                newVacation.imageSrc = fullUrl;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    // const [visibleChooseActivity, setVisibleChooseActivity] = useState(false);
    // const [chooseActivities, setChooseActivities] = useState([]);
    // const [chooseActivitiesNames, setChooseActivitiesNames] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    // const [sumPrice, setSumPrice] = useState(0);
    const newVacation = {
        imageSrc: imageUrl,
        activities:chooseActivities
    };

//     const onChooseActivitiesChange = (e) => {
//         console.log(e);
//         let _chooseActivities = [...chooseActivities];
//         let _chooseActivitiesNames = [...chooseActivitiesNames];

//         if (e.checked){
//             _chooseActivities.push(e.value);
//             _chooseActivitiesNames.push(e.target.name);
           
//            // setSumPrice(sumPrice+Number(e.target.price))
//         }
//         else{
//             _chooseActivities.splice(_chooseActivities.indexOf(e.value), 1);
//             _chooseActivitiesNames.splice(_chooseActivitiesNames.indexOf(e.target.name), 1);
// }
//         setChooseActivities(_chooseActivities);
//         setChooseActivitiesNames(_chooseActivitiesNames);
//     }
//     const [visibleConfirmActivities, setVisibleConfirmActivities] = useState(false);
//     const toast = useRef(null);
//     const accept = () => {
//         if(chooseActivities.length!=0)
//         newVacation.activities=chooseActivities
//         toast.current.show({ severity:'success', summary: 'הצליח', detail: 'פעילויות נוספו', life: 3000 });
//     }
//     useEffect(() => {
//         const total = chooseActivities.reduce((total, activityId) => {
//             const activity = activities.find(activity => activity._id === activityId);
//             return activity ? total + activity.price : total;
//         }, 0);
//         setSumPrice(total);
//     }, [chooseActivities]);
//     const reject = () => {
//         setVisibleChooseActivity(true)
//     }
    useEffect(() => {
        console.log("Editing:", isEditing, "Vacation to update:", vacationToUpdate);
        if (isEditing && vacationToUpdate) {
            // אם אנחנו במצב עדכון, מלא את השדות עם הנתונים הקיימים
            setStartDate(new Date(vacationToUpdate.startDate));
            setEndDate(new Date(vacationToUpdate.endDate));
            setSelectedArea(areas.find(area => area.name === vacationToUpdate.area));
            locationRef.current.value = vacationToUpdate.location;
            targetAudienceRef.current.value = vacationToUpdate.targetAudience;
            descriptionRef.current.value = vacationToUpdate.description;
            maxParticipantsRef.current.value = vacationToUpdate.maxParticipants;
            priceRef.current.value = vacationToUpdate.price;
            ratingRef.current.value = vacationToUpdate.rating;
            setImageUrl(vacationToUpdate.imageSrc);
            setChooseActivities(vacationToUpdate.activities);
        }
    }, [isEditing, vacationToUpdate]);
    const addOrUpdateVacation = async () => {

        if (!newVacation.imageSrc) newVacation.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        //console.log("newVacation.imageSrc", newVacation.imageSrc);
        console.log(newVacation);
        if (selectedArea) newVacation.area = selectedArea.name;
        if (locationRef.current.value) newVacation.location = locationRef.current.value;
        if (targetAudienceRef.current.value) newVacation.targetAudience = targetAudienceRef.current.value;
        if (descriptionRef.current.value) newVacation.description = descriptionRef.current.value;
        if (startDate) newVacation.startDate = startDate;
        if (endDate) newVacation.endDate = endDate;
        //if (activities) newVacation.activities = activities;
        if (maxParticipantsRef.current.value) newVacation.maxParticipants = maxParticipantsRef.current.value;
        if (priceRef.current.value) newVacation.price = priceRef.current.value;
        if (ratingRef.current.value) newVacation.rating = ratingRef.current.value;
        try {
            let res;
            if (isEditing) {
                // אם אנחנו במצב עדכון, בצע עדכון
                newVacation._id= vacationToUpdate._id
                console.log(newVacation);
                res = await axios.put(`http://localhost:4300/api/vacations`, newVacation, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } else {
                // אם אנחנו במצב הוספה, בצע הוספה
                res = await axios.post('http://localhost:4300/api/vacations', newVacation, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }

            if (res.status === 200) {
                navigate('/Vacations/הכל');
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };


    return (
        <>
            <div className="card flex justify-content-center">
                <div className="custom-form-container flex flex-column px-8 py-5 gap-4" >
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="custom-label">
                            מיקום
                        </label>
                        <InputText id="vacationname" className="custom-input" ref={locationRef}></InputText>

                    </div>
               
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={areas} optionLabel="name"
                            placeholder="בחר אזור" className="custom-input w-full md:w-14rem" />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="description" className="custom-label">
                            תאור
                        </label>
                        <InputText id="description" className="custom-input" ref={descriptionRef}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="custom-label">
                            קהל יעד
                        </label>
                        <InputText id="vacationname" className="custom-input" ref={targetAudienceRef}></InputText>
                    </div>
                    <Button label="פעיליות" icon="pi pi-user" className="custom-button" onClick={() => setShowChooseActivities(true)} />
                    {showChooseActivities && (
                     <ChooseActivities
                     chooseActivities={newVacation.activities}
                     setChooseActivities={setChooseActivities}
                     visible={showChooseActivities} // העברת הנראות לדיאלוג
                     setVisible={setShowChooseActivities}
                     sumPrice ={sumPrice}
                     setSumPrice ={setSumPrice} // פונקציה לסגירת הדיאלוג
                 />
            )}
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="custom-label">
                            תאריך התחלה
                        </label>
                        <Calendar id="buttondisplay" value={startDate} onChange={(e) => setStartDate(e.value)} showIcon dateFormat="dd/mm/yy" />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="custom-label">
                            תאריך סיום
                        </label>
                        <Calendar id="buttondisplay" value={endDate} onChange={(e) => setEndDate(e.value)} showIcon dateFormat="dd/mm/yy" />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="custom-label">
                            מקסימום משתתפים
                        </label>
                        <InputText id="vacationname" className="custom-input" ref={maxParticipantsRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="custom-label">
                            מחיר
                        </label>
                        <InputText id="vacationname" className="custom-input" ref={priceRef}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">

                        <FileUpload
                            mode="basic"
                            name="demo[]"
                            accept="image/*"
                            customUpload
                            uploadHandler={handleUpload}
                            chooseLabel="בחר והעלה תמונה"
                            auto={false}
                            className="custom-upload"
                        />
                        {imageUrl && (
                            <div>
                                <h3>התמונה שהועלתה:</h3>
                                <img src={imageUrl} alt="Uploaded" width="300" />
                            </div>
                        )}

                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="custom-label">
                            ניקוד
                        </label>
                        <InputText id="vacationname" className="custom-input" ref={ratingRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label={isEditing?'עדכן':'הוסף'} onClick={(e) => { addOrUpdateVacation(); }} className="custom-button w-full"></Button>
                        <Button label="ביטול" onClick={(e) => navigate('/Vacations/הכל')} className="custom-button secondary w-full"></Button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default AddVacation
