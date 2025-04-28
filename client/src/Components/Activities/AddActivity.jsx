import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from 'react-redux';

const AddActivity = () => {
    const nameRef = useRef("")
    const descriptionRef = useRef("")
 
    const targetAudienceRef = useRef("")
    const token = useSelector(state => state.TokenSlice.token)


    const [imageUrl, setImageUrl] = useState("");

    const newActivity = {
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
                newActivity.imageSrc = fullUrl;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    const [selectedType, setSelectedType] = useState(null);
    const types = [
        { name: 'מסלול', code: 'NY' },
        { name: 'אטרקציה', code: 'RM' },
        { name: 'תכנית', code: 'LDN' },
    ];
  
    const addActivity = async () => {


        if (!newActivity.imageSrc) newActivity.imageSrc = 'http://localhost:4300/uploads/logo.jpg';
        

        if (nameRef.current.value) newActivity.name = nameRef.current.value
        if (descriptionRef.current.value) newActivity.description = descriptionRef.current.value
        if (selectedType) newActivity.type = selectedType.name
        if (targetAudienceRef.current.value) newActivity.targetAudience = targetAudienceRef.current.value


        try {
            const res = await axios.post('http://localhost:4300/api/activities', newActivity, {
                headers: {
                    'Authorization': `Bearer ${token}`, // שליחת הטוקן בכותרת Authorization
                },
            })
            console.log(res);
            if (res.status === 200) {
                console.log("res.data", res.data);
                // props.setTrips(res.data)
                // navigate('/Trips/הכל');
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const [visibleAddActivity, setVisibleAddActivity] = useState(false);
    return (

        <div className="card flex justify-content-center">
            <Button label="הוספת פעילות" icon="pi pi-user" onClick={() => setVisibleAddActivity(true)} />
            <Dialog
                visible={visibleAddActivity}
                modal
                onHide={() => { if (!visibleAddActivity) return; setVisibleAddActivity(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ maxHeight: '80vh', overflowY: 'auto',borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם האטרקציה
                            </label>
                            <InputText id="name" label="name" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={nameRef}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="description" className="text-primary-50 font-semibold">
                                תאור האטרקציה
                            </label>
                            <InputText id="description" label="description" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={descriptionRef} ></InputText>
                        </div>                 <div className="card flex justify-content-center">
                        <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="name"
                            placeholder="בחר סוג אטרקציה" className="w-full md:w-14rem" />
                    </div>
                     
                        <div className="inline-flex flex-column gap-2">
                        <label htmlFor="targetAudience" className="text-primary-50 font-semibold">
                            קהל יעד
                        </label>
                        <InputText id="targetAudience" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={targetAudienceRef}></InputText>
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
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) =>{ hide(e);addActivity()}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>

    )
};

export default AddActivity;           
