import axios from 'axios'
import { useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
const AddTrip = () => {
    const navigate = useNavigate()
    const [date, setEndDate] = useState(null);
    const token = useSelector(state => state.TokenSlice.token)

    // const mainActivity = useLocation();
    // const props = mainActivity.state || {};
    const areaRef = useRef("")
    const mainActivityRef = useRef("")
    const descriptionRef = useRef("")
    const targetAudienceRef = useRef("")
    const startDateRef = useRef(null)
    const dateRef = useRef(null)
    const maxParticipantsRef = useRef("")
    const priceRef = useRef("")
    const imageSrcRef = useRef("")

    const [file, setFile] = useState(null);

    const [imageUrl, setImageUrl] = useState("");
    const newTrip = {
        imageSrc: imageUrl
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
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
                setImageUrl(`http://localhost:4300${response.data.imageUrl}`);
                newTrip.imageSrc = `http://localhost:4300${response.data.imageUrl}`;
            }

        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
    const addTrip = async () => {


        if (!newTrip.imageSrc) newTrip.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        console.log("response", newTrip.imageSrc);

        console.log(newTrip);


        if (areaRef.current.value) newTrip.area = areaRef.current.value;
        if (mainActivityRef.current.value) newTrip.mainActivity = mainActivityRef.current.value;
        if (targetAudienceRef.current.value) newTrip.targetAudience = targetAudienceRef.current.value;
        if (descriptionRef.current.value) newTrip.description = descriptionRef.current.value;
        if (date) newTrip.date = date;
        //if (activities) newTrip.activities = activities;
        if (maxParticipantsRef.current.value) newTrip.maxParticipants = maxParticipantsRef.current.value;
        if (priceRef.current.value) newTrip.price = priceRef.current.value;
        // if (imageSrcRef.current.value) newTrip.imageSrc = imageSrcRef.current.value;
        
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
                navigate('/Trips');
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <>

            <div className="card flex justify-content-center">

                {/* <Dialog style={{ direction: "rtl" }} */}
                {/* // visible={props.visible} */}
                {/* modal */}
                {/* // onHide={() => { if (!props.visible) return; props.setVisible(false); }} */}
                {/* content={({ hide }) => ( */}
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="tripname" className="text-primary-50 font-semibold">
                            מיקום
                        </label>
                        <InputText id="tripname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={mainActivityRef}></InputText>

                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="tripname" className="text-primary-50 font-semibold">
                            אזור
                        </label>
                        <InputText id="tripname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={areaRef}></InputText>
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
                  
              
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            תאריך 
                        </label>
                        <Calendar id="buttondisplay" value={date} onChange={(e) => setEndDate(e.value)} showIcon dateFormat="dd/mm/yy"/>
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
                    {/* <div className="inline-flex flex-column gap-2">
                                <label htmlFor="tripname" className="text-primary-50 font-semibold">
                                    תמונה
                                </label>
                                <InputText id="tripname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={imageSrcRef}></InputText>
                            </div> */}
                    <div>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>העלה תמונה</button>
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
                        {/* <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button> */}
                    </div>
                </div>
                {/* )}
                 ></Dialog> */}
            </div>
        </>
    )
}

export default AddTrip