import axios from 'axios'
import { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from "primereact/radiobutton";
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
const AddVacation = () => {
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const token = useSelector(state => state.TokenSlice.token)
    const [activities, setActivities] = useState([]);

    const [selectedArea, setSelectedArea] = useState(null);
    const areas = [
        { name: 'צפון', code: 'NY' },
        { name: 'דרום', code: 'RM' },
        { name: 'אזור ירושלים', code: 'LDN' },
        { name: 'מרכז', code: 'IST' }

    ];
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

    // const location = useLocation();
    // const props = location.state || {};
    const locationRef = useRef("")
    const descriptionRef = useRef("")
    const targetAudienceRef = useRef("")
    const maxParticipantsRef = useRef("")
    const priceRef = useRef("")
    const ratingRef = useRef("")

    const [file, setFile] = useState(null);

    const [imageUrl, setImageUrl] = useState("");
    const newVacation = {
        imageSrc: imageUrl
    };

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
    const addVacation = async () => {


        if (!newVacation.imageSrc) newVacation.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        console.log("response", newVacation.imageSrc);

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

            const res = await axios.post('http://localhost:4300/api/vacations', newVacation, {
                headers: {
                    'Authorization': `Bearer ${token}`, // שליחת הטוקן בכותרת Authorization
                },
            })
            console.log(res);
            if (res.status === 200) {
                console.log("res.data", res.data);
                // props.setVacations(res.data)
                navigate('/Vacations/הכל');
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const [visibleChooseActivity, setVisibleChooseActivity] = useState(false);
    const [ingredient, setIngredient] = useState('');
    return (
        <>

            <div className="card flex justify-content-center">
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            מיקום
                        </label>
                        <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={locationRef}></InputText>

                    </div>
               
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={areas} optionLabel="name"
                            placeholder="בחר אזור" className="w-full md:w-14rem" />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="description" className="text-primary-50 font-semibold">
                            תאור
                        </label>
                        <InputText id="description" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={descriptionRef}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            קהל יעד
                        </label>
                        <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={targetAudienceRef}></InputText>
                    </div>
                    <Button label="פעיליות" icon="pi pi-user" onClick={() => {getActivities();setVisibleChooseActivity(true)}} />
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            תאריך התחלה
                        </label>
                        <Calendar id="buttondisplay" value={startDate} onChange={(e) => setStartDate(e.value)} showIcon dateFormat="dd/mm/yy" />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            תאריך סיום
                        </label>
                        <Calendar id="buttondisplay" value={endDate} onChange={(e) => setEndDate(e.value)} showIcon dateFormat="dd/mm/yy" />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            מקסימום משתתפים
                        </label>
                        <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={maxParticipantsRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            מחיר
                        </label>
                        <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={priceRef}></InputText>
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
                            className="w-full max-w-xs"
                        />
                        {imageUrl && (
                            <div>
                                {console.log(imageUrl)}

                                <h3>התמונה שהועלתה:</h3>
                                <img src={imageUrl} alt="Uploaded" width="300" />
                            </div>
                        )}

                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            ניקוד
                        </label>
                        <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={ratingRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="הוסף" onClick={(e) => { addVacation(); }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="ביטול" onClick={(e) => navigate('/Trips/הכל')} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
                
            </div>
            
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
                <RadioButton inputId="ingredient4" name="pizza" value={activity.name} onChange={(e) => setIngredient(e.value)} checked={ingredient === activity.name} />
                <Image src={activity.imageSrc} alt={activity.name} width="170px" height="100"  style={{ borderRadius: '10px',width: '100%', height: '100%', }} />
                <h3 className="text-lg font-semibold">{activity.name}</h3>
                <p><strong>קהל יעד:</strong> {activity.targetAudience}</p>
                <p><strong>סוג:</strong> {activity.type}</p>
                <p><strong>תיאור:</strong> {activity.description}</p>
                <Button label="למידע נוסף" icon="pi pi-info-circle" className="p-button-secondary" />
                </Card>
            </div>
            ))}
        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) =>{ hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </>
    )
}

export default AddVacation




  
        // <div className="card flex justify-content-center">
        //     <div className="flex flex-wrap gap-3">
        //         <div className="flex align-items-center">
        //             <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
        //             <label htmlFor="ingredient1" className="ml-2">Cheese</label>
        //         </div>
        //         <div className="flex align-items-center">
        //             <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
        //             <label htmlFor="ingredient2" className="ml-2">Mushroom</label>
        //         </div>
        //         <div className="flex align-items-center">
        //             <RadioButton inputId="ingredient3" name="pizza" value="Pepper" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Pepper'} />
        //             <label htmlFor="ingredient3" className="ml-2">Pepper</label>
        //         </div>
        //         <div className="flex align-items-center">
        //             <RadioButton inputId="ingredient4" name="pizza" value="Onion" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Onion'} />
        //             <label htmlFor="ingredient4" className="ml-2">Onion</label>
        //         </div>
        //     </div>
        // </div>
 
        
