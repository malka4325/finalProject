
import React, { useRef } from "react";

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Image } from 'primereact/image';
import { useNavigate } from "react-router-dom";
import axios from "axios";


import OneVacation from "./OneVacation";
import { useSelector } from "react-redux";
const Vacations = () => {
    

    const navigate = useNavigate();
    const token = useSelector(state => state.TokenSlice.token)
    const user = useSelector(state => state.UserSlice.user)


    console.log(user);
    const { area } = useParams();
    const [vacations, setVacations] = useState([]);
    const [selectedVacation, setSelectedVacation] = useState(null);
    const toast = useRef(null);
    useEffect(() => {
        switch (area) {
            case 'הכל': getVacations()
                break
            case 'קרוב': getCloseVacations()
                break
            default: getVacationsByArea()
        }
    }, [area])
   
    const getVacations = async () => {
        try {
            const res = await axios.get(`http://localhost:4300/api/vacations?fromDate=${new Date()}`)
            if (res.status === 200) {
                setVacations(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }
    const getCloseVacations = async () => {
        const now = new Date();
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
        try {
            const res = await axios.get(`http://localhost:4300/api/vacations?fromDate=${now}&toDate=${oneMonthFromNow}`)
            if (res.status === 200) {
                setVacations(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }
    const getVacationsByArea = async () => {
        try {
            const res = await axios.get(`http://localhost:4300/api/vacations?fromDate=${new Date()}&area=${area}`)
            if (res.status === 200) {
                setVacations(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }


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

        if (tmp > 0 && tmp < 20) {
            full = 'מקומות אחרונים'
            classIcon = "pi pi-exclamation-triangle"


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
   const updateVacation=(event,vacation)=>{
    setSelectedVacation(vacation)
    event.stopPropagation();
    if (token && user.role == "Admin")
    navigate('/Vacations/AddVacation',{ state: { vacationToUpdate: vacation, isEditing: true } });
   }
   
    const handleButton = (vacation) => {
        if (token)
            navigate(`/Vacations/${vacation.area}/${vacation._id}`);
        else
            navigate('/Login')
    }

    const gridItem = (vacation) => {

        freeParticipants(vacation);
        console.log(vacation);
     

        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-1" key={vacation._id}
            >

               
                <div className=" border-1 surface-border surface-card border-round" style={{
                    width: "370px", 
                    height: '420px', 
                    overflow: 'hidden', 
                    padding: 0, margin: 0
                }}>
                    <button onClick={() => { handleButton(vacation) }} style={{ position: 'relative', backgroundColor: "white", borderWidth: "0px", padding: 0, margin: 0 }}>
                        <div style={{ position: 'relative', width: '370px', height: '200px', overflow: 'hidden' }}>
                            <Image src={vacation.imageSrc} alt={vacation.location} width="370px" height="200" style={{ width: '100%', height: '100%' }} />
                            <div className="flex flex-wrap align-items-center justify-content-between gap-1" style={{ position: 'absolute', top: '5px', left: '5px', margin: 8 }}>
                                <i className="pi pi-map-marker"></i>
                                <span className="font-semibold text-xl">{vacation.area}</span>
                            </div>
                            <Tag className="mr-2 text-lg " value={full} severity={getSeverity(full)} style={{
                                visibility: full === 'יש מקום' ? "hidden" : "visible",
                                position: "absolute",
                                top: '10px', 
                                right: '10px',
                                whiteSpace: 'nowrap',
                                zIndex: 2
                            }}><i className={classIcon} style={{ margin: "2px" }}></i></Tag>

                        </div>

                        <div className="flex flex-column align-items-center gap-2 py-2">

                        <div className="flex justify-content w-full  gap-2" >
              <Button icon="pi pi-pen-to-square"visible={isAdmin()} rounded text severity="help" aria-label="update"onClick={(event) => updateVacation(event, vacation)} />

    </div>
                            <div className="text-2xl font-bold">{vacation.location}</div>
                            <div className="flex gap-5 mb-1" style={{ marginTop: "7px" }}>

                                <div className="flex-1" style={{ whiteSpace: 'nowrap' }}>
                                    <div className="font-semibold text-gray-600">החל מ</div>
                                    <div className="text-xl text-gray-800">
                                        {new Date(vacation.startDate).toLocaleDateString('he-IL', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                                <span className="text-xl text-gray-800">__</span>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-600">עד </div>
                                    <div className="text-xl text-gray-800">
                                        {new Date(vacation.endDate).toLocaleDateString('he-IL', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>

                            <Rating value={vacation.rating} readOnly cancel={false}></Rating>
                        </div>
                    </button>
                    <div className="flex align-items-center justify-content-between" style={{ padding: "1px" }}>
                        <span style={{ marginLeft: "8px", }}>
                            <span className="text-xl font-semibold">{vacation.price}$</span>
                            <br /><span className="text-m font-semibold">ללילה</span>
                        </span>
                        <span className="text-m font-semibold">{vacation.targetAudience}</span>


                    </div>
                </div>

            </div>
        );
    };
    const listTemplate = (vacations) => {
        return <div className="grid grid-nogutter">{vacations.map((vacation) => gridItem(vacation))}</div>;
    };
    const isAdmin = () => {
        if (!user)
            return false
        return user.role == "Admin"
    }
    return (
        <>
            <div className="card" style={{ margin: "40px" }}>
                <h1>{area == 'הכל' ? 'כל הנופשים' : `נופשים ב${area}`}</h1>
                <DataView value={vacations} listTemplate={listTemplate} />
                {console.log("user&&user.role == Admin", user)}
                <Toast ref={toast} />
            
                <Outlet />
                
            </div> </>
    )
}
export default Vacations




        







