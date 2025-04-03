import axios from 'axios'
import { useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
const AddVacation = () => {
    const navigate=useNavigate()

    // const location = useLocation();
    // const props = location.state || {};
    const areaRef = useRef("")
    const locationRef = useRef("")
    const descriptionRef=useRef("")
    const targetAudienceRef = useRef("")
    // const startDateRef = useRef("")
    // const endDateRef = useRef("")
    const maxParticipantsRef = useRef("")
    const priceRef = useRef("")
    const imageSrcRef = useRef("")
    const ratingRef = useRef("")
    const addVacation = async () => {

        // const newVacation = {
        //     area: areaRef.current.value,
        //     location: locationRef.current.value,
        //     description:descriptionRef.current.value,
        //     targetAudience: targetAudienceRef.current.value,
        //     // startDate: startDateRef.current.value,
        //     // endDate: endDateRef.current.value,
        //     maxParticipants: maxParticipantsRef.current.value,
        //     price: priceRef.current.value,
        //     imageSrc: imageSrcRef.current.value,
        //     rating: ratingRef.current.value,

        // }
        const newVacation = {};

        if (areaRef.current.value) newVacation.area = areaRef.current.value;
        if (locationRef.current.value) newVacation.location = locationRef.current.value;
        if (targetAudienceRef.current.value) newVacation.TargetAudience = targetAudienceRef.current.value;
        if (descriptionRef.current.value) newVacation.description = descriptionRef.current.value;
        //if (activities) newVacation.activities = activities;
        if (maxParticipantsRef.current.value) newVacation.maxParticipants = maxParticipantsRef.current.value;
        if (priceRef.current.value) newVacation.price = priceRef.current.value;
        if (imageSrcRef.current.value) newVacation.imageSrc = imageSrcRef.current.value;
        if (ratingRef.current.value) newVacation.rating = ratingRef.current.value;
        
        try {
            const res = await axios.post('http://localhost:4300/api/vacations', newVacation)
            console.log(res);
            if (res.status === 200) {
                console.log("res.data", res.data);
                // props.setVacations(res.data)
                navigate('/Vacations');
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
                                <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                                    מיקום
                                </label>
                                <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={locationRef}></InputText>

                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                                    אזור
                                </label>
                                <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={areaRef}></InputText>
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
                            {/* <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            תאריך התחלה
                        </label>
                        <InputText id="vacationname"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={startDateRef}></InputText>
                                     <Calendar className="w-full p-calendar-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.date} onChange={(e) => setOrder({ ...order, date: e.value })} showIcon />

                    </div> */}
                            {/* <div className="inline-flex flex-column gap-2">
                        <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                            תאריך סיום
                        </label>
                        <InputText id="vacationname"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={endDateRef}></InputText>
                    </div> */}
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
                                <label htmlFor="vacationname" className="text-primary-50 font-semibold">
                                    תמונה
                                </label>
                                <InputText id="vacationname" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={imageSrcRef}></InputText>
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
                                <Button label="הוסף" onClick={(e) => { addVacation();  }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                {/* <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button> */}
                            </div>
                        </div>
                     {/* )}
                 ></Dialog> */}
            </div>
        </>
    )
}

export default AddVacation