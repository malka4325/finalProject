import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import ChooseActivities from '../Activities/ChooseActivities';
const AddTrip = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState(null);
    const token = useSelector(state => state.TokenSlice.token)
    const location = useLocation();
    const { tripToUpdate, isEditing } = location.state || {};
    const [selectedArea, setSelectedArea] = useState(null);
    const [showChooseActivities, setShowChooseActivities] = useState(false); 
    const [chooseActivities, setChooseActivities] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);


    const areas = [
        { name: 'צפון', code: 'NY' },
        { name: 'דרום', code: 'RM' },
        { name: 'אזור ירושלים', code: 'LDN' },
        { name: 'מרכז', code: 'IST' }

    ];

    // const mainActivity = useLocation()
    // const props = mainActivity.state || {};
    const locationRef = useRef("")
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
    // const addTrip = async () => {


    //     if (!newTrip.imageSrc) newTrip.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
    //     console.log("response", newTrip.imageSrc);

    //     console.log(newTrip);

    //     if (selectedArea) newTrip.area = selectedArea.name;
    //     if (mainActivityRef.current.value) newTrip.location = mainActivityRef.current.value;
    //     if (targetAudienceRef.current.value) newTrip.targetAudience = targetAudienceRef.current.value;
    //     if (descriptionRef.current.value) newTrip.description = descriptionRef.current.value;
    //     if (date) newTrip.date = date;
    //     //if (activities) newTrip.activities = activities;
    //     if (maxParticipantsRef.current.value) newTrip.maxParticipants = maxParticipantsRef.current.value;
    //     if (priceRef.current.value) newTrip.price = priceRef.current.value;

    //     try {
    //         const res = await axios.post('http://localhost:4300/api/trips', newTrip, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`, // שליחת הטוקן בכותרת Authorization
    //             },
    //         })
    //         console.log(res);
    //         if (res.status === 200) {
    //             console.log("res.data", res.data);
    //             // props.setTrips(res.data)
    //             navigate('/Trips/הכל');
    //         }
    //     } catch (e) {
    //         alert(e.response.data.message)
    //     }
    // }
    useEffect(() => {
        console.log("Editing:", isEditing, "Trip to update:", tripToUpdate);
        if (isEditing && tripToUpdate) {
            // אם אנחנו במצב עדכון, מלא את השדות עם הנתונים הקיימים
            setDate(new Date(tripToUpdate.date));
            setSelectedArea(areas.find(area => area.name === tripToUpdate.area));
            locationRef.current.value = tripToUpdate.location;
            targetAudienceRef.current.value = tripToUpdate.targetAudience;
            descriptionRef.current.value = tripToUpdate.description;
            maxParticipantsRef.current.value = tripToUpdate.maxParticipants;
            priceRef.current.value = tripToUpdate.price;
            setImageUrl(tripToUpdate.imageSrc);
            setChooseActivities(tripToUpdate.activities);
        }
    }, [isEditing, tripToUpdate]);
    const addOrUpdateTrip = async () => {

        if (!newTrip.imageSrc) newTrip.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        //console.log("newTrip.imageSrc", newTrip.imageSrc);
        console.log(newTrip);
        if (selectedArea) newTrip.area = selectedArea.name;
        if (locationRef.current.value) newTrip.location = locationRef.current.value;
        if (targetAudienceRef.current.value) newTrip.targetAudience = targetAudienceRef.current.value;
        if (descriptionRef.current.value) newTrip.description = descriptionRef.current.value;
        if (date) newTrip.date = date;
        
        //if (activities) newTrip.activities = activities;
        if (maxParticipantsRef.current.value) newTrip.maxParticipants = maxParticipantsRef.current.value;
        if (priceRef.current.value) newTrip.price = priceRef.current.value;
      
        try {
            let res;
            if (isEditing) {
                // אם אנחנו במצב עדכון, בצע עדכון
                newTrip._id= tripToUpdate._id
                console.log(newTrip);
                res = await axios.put(`http://localhost:4300/api/trips`, newTrip, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } else {
                // אם אנחנו במצב הוספה, בצע הוספה
                res = await axios.post('http://localhost:4300/api/trips', newTrip, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
             debugger
            if (res.status === 200) {
                navigate('/Trips/הכל');
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
      <>

      <div className="card flex justify-content-center">
        <div className="custom-form-container flex flex-column px-8 py-5 gap-4">
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="tripname" className="custom-label">מיקום</label>
            <InputText id="tripname" className="custom-input" ref={locationRef} />
          </div>
      
          <div className="card flex justify-content-center">
            <Dropdown value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={areas} optionLabel="name"
              placeholder="בחר אזור" className="custom-input w-full md:w-10rem" />
          </div>
      
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="description" className="custom-label">תיאור</label>
            <InputText id="description" className="custom-input" ref={descriptionRef} />
          </div>
      
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="target" className="custom-label">קהל יעד</label>
            <InputText id="target" className="custom-input" ref={targetAudienceRef} />
          </div>
      
          <Button label="פעילויות" icon="pi pi-user" className="custom-button" onClick={() => setShowChooseActivities(true)} />
      
          {showChooseActivities && (
             <ChooseActivities
             chooseActivities={newTrip.activities}
             setChooseActivities={setChooseActivities}
             visible={showChooseActivities} // העברת הנראות לדיאלוג
             setVisible={setShowChooseActivities}
             sumPrice ={sumPrice}
             setSumPrice ={setSumPrice}// פונקציה לסגירת הדיאלוג
         />
          )}
      
          <div className="flex-auto">
            <label htmlFor="calendar" className="custom-label">תאריך</label>
            <Calendar id="calendar" value={date} onChange={(e) => setDate(e.value)} showIcon dateFormat="dd/mm/yy"
              className="custom-input" />
          </div>
      
          <div className="inline-flex flex-column gap-2">
            <label className="custom-label">מקסימום משתתפים</label>
            <InputText className="custom-input" ref={maxParticipantsRef} />
          </div>
      
          <div className="inline-flex flex-column gap-2">
            <label className="custom-label">מחיר</label>
            <InputText className="custom-input" ref={priceRef} />
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
      
          <div className="flex align-items-center gap-2">
            <Button label={isEditing ? 'עדכן' : 'הוסף'} onClick={addOrUpdateTrip} className="custom-button w-full" />
            <Button label="ביטול" onClick={() => navigate('/Trips/הכל')} className="custom-button secondary w-full" />
          </div>
        </div>
      </div>
      
              </>
      
    )
}

export default AddTrip