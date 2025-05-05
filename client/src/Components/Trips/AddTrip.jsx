import axios from 'axios'
import { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import ChooseActivities from '../Activities/ChooseActivities';
const AddTrip = () => {
    const navigate = useNavigate()
    const [date, setEndDate] = useState(null);
    const token = useSelector(state => state.TokenSlice.token)
    const [selectedArea, setSelectedArea] = useState(null);
    const [showChooseActivities, setShowChooseActivities] = useState(false); 
    const [chooseActivities, setChooseActivities] = useState([]);


    const areas = [
        { name: 'צפון', code: 'NY' },
        { name: 'דרום', code: 'RM' },
        { name: 'אזור ירושלים', code: 'LDN' },
        { name: 'מרכז', code: 'IST' }

    ];

    // const mainActivity = useLocation()
    // const props = mainActivity.state || {};
    const mainActivityRef = useRef("")
    const descriptionRef = useRef("")
    const targetAudienceRef = useRef("")
    const maxParticipantsRef = useRef("")
    const priceRef = useRef("")

    //const [file, setFile] = useState(null);

    const [imageUrl, setImageUrl] = useState("");

    const newTrip = {
        imageSrc: imageUrl,
        activities:chooseActivities

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
                newTrip.imageSrc = fullUrl;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    const addTrip = async () => {


        if (!newTrip.imageSrc) newTrip.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        console.log("response", newTrip.imageSrc);

        console.log(newTrip);

        if (selectedArea) newTrip.area = selectedArea.name;
        if (mainActivityRef.current.value) newTrip.mainActivity = mainActivityRef.current.value;
        if (targetAudienceRef.current.value) newTrip.targetAudience = targetAudienceRef.current.value;
        if (descriptionRef.current.value) newTrip.description = descriptionRef.current.value;
        if (date) newTrip.date = date;
        //if (activities) newTrip.activities = activities;
        if (maxParticipantsRef.current.value) newTrip.maxParticipants = maxParticipantsRef.current.value;
        if (priceRef.current.value) newTrip.price = priceRef.current.value;

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

            <div className="card flex justify-content-center">

                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="tripname" className="text-primary-50 font-semibold">
                            מיקום
                        </label>
                        <InputText id="tripname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={mainActivityRef}></InputText>

                    </div>
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={areas} optionLabel="name"
                            placeholder=" בחר אזור" className="w-full md:w-14rem" />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="description" className="text-primary-50 font-semibold">
                            תאור
                        </label>
                        <InputText id="description" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={descriptionRef}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="tripname" className="text-primary-50 font-semibold">
                            קהל יעד
                        </label>
                        <InputText id="tripname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={targetAudienceRef}></InputText>
                    </div>

                    <Button label="פעיליות" icon="pi pi-user" onClick={() => setShowChooseActivities(true)} />
                    {showChooseActivities && (
                     <ChooseActivities
                     chooseActivities={newTrip.activities}
                     setChooseActivities={setChooseActivities}
                     visible={showChooseActivities} // העברת הנראות לדיאלוג
                     setVisible={setShowChooseActivities} // פונקציה לסגירת הדיאלוג
                 />
            )}
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            תאריך
                        </label>
                        <Calendar id="buttondisplay" value={date} onChange={(e) => setEndDate(e.value)} showIcon dateFormat="dd/mm/yy" />
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="tripname" className="text-primary-50 font-semibold">
                            מקסימום משתתפים
                        </label>
                        <InputText id="tripname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={maxParticipantsRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="tripname" className="text-primary-50 font-semibold">
                            מחיר
                        </label>
                        <InputText id="tripname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={priceRef}></InputText>
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
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="הוסף" onClick={(e) => { addTrip(); }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="ביטול" onClick={(e) =>  navigate('/Trips/הכל')} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
              
            </div>
        </>
    )
}

export default AddTrip