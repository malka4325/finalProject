
import React from "react";

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Link, Outlet } from 'react-router-dom';
import { Image } from 'primereact/image';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../../context/Context"

import OneVacation from "./OneVacation";
import { useSelector } from "react-redux";
const Vacations = () => {
    // const context = useContext(Context);
    
    const navigate = useNavigate();
    const token = useSelector(state => state.TokenSlice.token)
const user=useSelector(state => state.UserSlice.user)
console.log(user);

    const [vacations, setVacations] = useState([]);
    useEffect(() => { getVacations() }, [])
    const getVacations = async () => {
        try {
            const res = await axios.get('http://localhost:4300/api/vacations')
            if (res.status === 200) {
                setVacations(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }
    // useEffect(() => {
    //     VacationService.getVacations().then((data) =setVacations> (data.slice(0, 12)));
    // }, []);

    const getSeverity = (full) => {
        switch (full) {

            case 'מקומות אחרונים':
                return 'warning';

            case 'מלא':
                return 'danger';

            default:
                return null;
        }
    };

    let full = '';
    let classIcon = ""
    const freeParticipants = (vacation) => {
        const tmp = vacation.maxParticipants - vacation.currentParticipants;

        console.log(tmp)
        if (tmp > 0 && tmp < 20) {
            full = 'מקומות אחרונים'
            classIcon = "pi pi-exclamation-triangle"
            console.log(full)

        }
        else {
            if (tmp === 0) {
                full = 'מלא'
                classIcon = "pi pi-minus-circle"
            }
            else
                full = 'יש מקום'
        }

    }
    // useEffect(() => {
    //     console.log(context.token.accessToken);
    // }, [])
    const handleButton = (vacation) => {
        // console.log(vacation);
        if (token)
            navigate(`/Vacations/${vacation._id}`); // שינוי URL עם state
    }
    const handleButtonAddVacation = () => {
        // console.log(vacation);
        
        if (token)//add check if its manager!!!!!!!
            navigate('/Vacations/AddVacation'); // שינוי URL עם state
    }
    const gridItem = (vacation) => {

        freeParticipants(vacation);
        // console.log(vacation.imageSrc);

        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={vacation._id}
            >

                {/* {oneVacationVis && <OneVacation vacation={vacation} setOneVacationVis={setOneVacationVis} oneVacationVis={oneVacationVis} />} */}
                <div className=" border-1 surface-border surface-card border-round" style={{
                    width: "370px", /* רוחב קבוע */
                    height: '370px', /* גובה קבוע */
                    overflow: 'hidden', /* מסתיר תוכן שגדול מהכרטיס */
                    padding: 0, margin: 0
                }}> <button onClick={() => { handleButton(vacation) }} style={{ position: 'relative', backgroundColor: "white", borderWidth: "0px", padding: 0, margin: 0 }}>
                        <div style={{ position: 'relative', width: '370px', height: '200px', overflow: 'hidden' }}>
                            <Image src={vacation.imageSrc} alt={vacation.location} width="370px" height="200" style={{ width: '100%', height: '100%' }} />
                            <div className="flex flex-wrap align-items-center justify-content-between gap-2" style={{ position: 'absolute', top: '5px', left: '5px', margin: 8 }}>
                                <i className="pi pi-map-marker"></i>
                                <span className="font-semibold text-xl">{vacation.area}</span>
                            </div>
                            <Tag className="mr-2 text-lg " value={full} severity={getSeverity(full)} style={{
                                visibility: full === 'יש מקום' ? "hidden" : "visible",
                                position: "absolute",
                                top: '10px', // התאם את המיקום
                                right: '10px',
                                whiteSpace: 'nowrap',
                                zIndex: 2
                            }}><i className={classIcon} style={{ margin: "2px" }}></i></Tag>

                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">



                            <div className="text-2xl font-bold">{vacation.location}</div>
                            <Rating value={vacation.rating} readOnly cancel={false}  ></Rating>

                           
                        </div> </button>
                    <div className="flex align-items-center justify-content-between" style={{ padding: "7px" }}>
                        <span className="text-2xl font-semibold"></span>

                        
                        <Button  className="p-button-rounded font-semibold" style={{backgroundColor:"MenuText",borderColor:"orange" ,  boxShadow: '0 0 0 0.2rem rgba(240, 134, 80, 0.5)',
          }}  onClick={() => { handleButton(vacation) }}>הזמן עכשיו</Button>
                    </div>
                </div>

            </div>
        );
    };
    const listTemplate = (vacations) => {
        return <div className="grid grid-nogutter">{vacations.map((vacation) => gridItem(vacation))}</div>;
    };
    return (
        <>
            <div className="card" style={{ margin: "40px" }}>
                <h1>נופשים</h1>
                <DataView value={vacations} listTemplate={listTemplate} />
                <Button icon="pi pi-plus" visible={user.role=="Admin"} severity="Success" rounded aria-label="Filter" onClick={handleButtonAddVacation} style={{marginLeft:"50px",marginBottom:'50px' ,left: 0, bottom: 0 ,position:'fixed'}}direction="down-left" label="הוספת נופש"/>
                <Outlet />
            </div> </>
    )
}
export default Vacations









