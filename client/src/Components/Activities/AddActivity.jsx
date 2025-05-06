import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const AddActivity = () => {
    const location = useLocation()
    const { activityToUpdate, isEditing } = location.state || {};
    const nameRef = useRef("")
    const descriptionRef = useRef("")
    const targetAudienceRef = useRef("")
    const priceRef = useRef("")
    const token = useSelector(state => state.TokenSlice.token)
    const navigate = useNavigate()



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
    const [selectedType, setSelectedType] = useState({ name: 'בחר סוג', code: 'LDN' });
    const types = [
        { name: 'מסלול', code: 'NY' },
        { name: 'אטרקציה', code: 'RM' },
        { name: 'תכנית', code: 'LDN' },
    ];
    const [selectedArea, setSelectedArea] = useState(null);
    const areas = [
        { name: 'צפון', code: 'NY' },
        { name: 'דרום', code: 'RM' },
        { name: 'אזור ירושלים', code: 'LDN' },
        { name: 'מרכז', code: 'IST' }

    ];

    useEffect(() => {
        console.log("Editing:", isEditing, "Activity to update:", activityToUpdate);
        if (isEditing && activityToUpdate) {
            setSelectedArea(areas.find(area => area.name === activityToUpdate.area));
            setSelectedType(types.find(type => type.name === activityToUpdate.type));
            nameRef.current.value = activityToUpdate.name;
            targetAudienceRef.current.value = activityToUpdate.targetAudience;
            descriptionRef.current.value = activityToUpdate.description;
            priceRef.current.value = activityToUpdate.price;
            setImageUrl(activityToUpdate.imageSrc);
        }
    }, [isEditing, activityToUpdate]);
    const addOrUpdateActivity = async () => {

        if (!newActivity.imageSrc) newActivity.imageSrc = 'http://localhost:4300/uploads/logo.jpg';


        if (nameRef.current.value) newActivity.name = nameRef.current.value
        if (descriptionRef.current.value) newActivity.description = descriptionRef.current.value
        if (selectedArea) newActivity.area = selectedArea.name
        if (selectedType) newActivity.type = selectedType.name
        if (targetAudienceRef.current.value) newActivity.targetAudience = targetAudienceRef.current.value
        if (priceRef.current.value) newActivity.price = priceRef.current.value
        try {
            let res;
            if (isEditing) {
                // אם אנחנו במצב עדכון, בצע עדכון
                newActivity._id = activityToUpdate._id
                console.log(newActivity);
                res = await axios.put(`http://localhost:4300/api/activities`, newActivity, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }

            else
        {
                     res = await axios.post('http://localhost:4300/api/activities', newActivity, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // שליחת הטוקן בכותרת Authorization
                        },
                    })
                }
                    if (res.status === 200) {
                        navigate(-1);              
                          }
        

                } catch (e) {
                    alert(e.response.data.message)
                }
        
    }


    return (

        <div className="card flex justify-content-center">
   <div className="custom-form-container flex flex-column px-8 py-5 gap-4">

    
    <div className="inline-flex flex-column gap-2">
      <label htmlFor="username" className="custom-label">
        שם האטרקציה
      </label>
      <InputText id="name" className="custom-input" ref={nameRef} />
    </div>

    <div className="inline-flex flex-column gap-2">
      <label htmlFor="description" className="custom-label">
        תיאור האטרקציה
      </label>
      <InputText id="description" className="custom-input" ref={descriptionRef} />
    </div>

    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedType}
        onChange={(e) => setSelectedType(e.value)}
        options={types}
        optionLabel="name"
        placeholder="בחר סוג אטרקציה"
        className="custom-input w-full md:w-10rem"
      />
    </div>

    {selectedType?.name !== 'תכנית' && (
      <div className="card flex justify-content-center">
        <Dropdown
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.value)}
          options={areas}
          optionLabel="name"
          placeholder="בחר אזור"
          className="custom-input w-full md:w-10rem"
        />
      </div>
    )}

    <div className="inline-flex flex-column gap-2">
      <label htmlFor="targetAudience" className="custom-label">
        קהל יעד
      </label>
      <InputText id="targetAudience" className="custom-input" ref={targetAudienceRef} />
    </div>

    <div className="inline-flex flex-column gap-2">
      <label htmlFor="activityname" className="custom-label">
        מחיר
      </label>
      <InputText id="activityname" className="custom-input" ref={priceRef} />
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
      <Button
        label={isEditing ? 'עדכן' : 'הוסף'}
        onClick={addOrUpdateActivity}
        className="custom-button w-full"
      />
      <Button
        label="ביטול"
        onClick={() => navigate(-1)}
        className="custom-button secondary w-full"
      />
    </div>
  </div>
</div>



    )
};

export default AddActivity;




