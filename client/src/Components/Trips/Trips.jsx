
import React from "react";

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import { Tag } from 'primereact/tag';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Image } from 'primereact/image';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
const Trips = () => {
    

    const navigate = useNavigate();
    const token = useSelector(state => state.TokenSlice.token)
    const user = useSelector(state => state.UserSlice.user)
    console.log(user);
    const { area } = useParams();
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    useEffect(() => {
        switch (area) {
            case 'הכל': getTrips()
                break
            case 'קרוב': getCloseTrips()
                break
            default: getTripsByArea()
        }
    }, [area])
    
    const getTrips = async () => {
        try {
            const res = await axios.get(`http://localhost:4300/api/trips?fromDate=${new Date()}&madeByType=Admin`)
            if (res.status === 200) {
                setTrips(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }
    const getCloseTrips = async () => {
        
        const now = new Date();
        const towWeeksFromNow = new Date();
        towWeeksFromNow.setDate(towWeeksFromNow.getDate() + 14);
        try {
            const res = await axios.get(`http://localhost:4300/api/trips?fromDate=${now}&toDate=${towWeeksFromNow}&madeByType=Admin`)
            if (res.status === 200) {
                setTrips(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }
    const getTripsByArea = async () => {
        try {
            const res = await axios.get(`http://localhost:4300/api/trips?fromDate=${new Date()}&area=${area}&madeByType=Admin`)
            if (res.status === 200) {
                setTrips(res.data);
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
    const freeParticipants = (trip) => {
        const tmp = trip.maxParticipants - trip.currentParticipants;

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
    const updateTrip=(event,trip)=>{
        setSelectedTrip(trip)
        event.stopPropagation();
        if (token && user.role == "Admin")
        navigate('/Trips/AddTrip',{ state: { tripToUpdate: trip, isEditing: true } });
       }
  
       
    const handleButton = (trip) => {
        if (token)
            navigate(`/Trips/${trip.area}/${trip._id}`);
        else
            navigate('/Login')
    }

    const gridItem = (trip) => {

        freeParticipants(trip);
        console.log(trip);
        

        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-1" key={trip._id}
            >

                
                <div className=" border-1 surface-border surface-card border-round" style={{
                    width: "370px", 
                    height: '370px', 
                    overflow: 'hidden', 
                    padding: 0, margin: 0
                }}>
                    <button onClick={() => { handleButton(trip) }} style={{ position: 'relative', backgroundColor: "white", borderWidth: "0px", padding: 0, margin: 0 }}>
                        <div style={{ position: 'relative', width: '370px', height: '200px', overflow: 'hidden' }}>
                            <Image src={trip.imageSrc} alt={trip.location} width="370px" height="200" style={{ width: '100%', height: '100%' }} />
                            <div className="flex flex-wrap align-items-center justify-content-between gap-1" style={{ position: 'absolute', top: '5px', left: '5px', margin: 8 }}>
                                <i className="pi pi-map-marker"></i>
                                <span className="font-semibold text-xl">{trip.area}</span>
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
                        <div className="flex justify-content w-full  gap-2" >
        <Button icon="pi pi-pen-to-square"visible={isAdmin()} rounded text severity="help" aria-label="update"onClick={(event) => updateTrip(event, trip)} />
    </div>
                        <div className="flex flex-column align-items-center gap-2 py-2">


                            <div className="text-2xl font-bold">{trip.location}</div>
                            <div className="flex gap-5 mb-1" style={{ marginTop: "7px" }}>

                                <div className="flex-1" style={{ whiteSpace: 'nowrap' }}>
                                    <div className="font-semibold text-gray-600">בתאריך </div>
                                    <div className="text-xl text-gray-800">
                                        {new Date(trip.date).toLocaleDateString('he-IL', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                               
                            </div>

                            
                        </div>
                    </button>
                    <div className="flex align-items-center justify-content-between" style={{ padding: "1px" }}>
                        <span style={{ marginLeft: "8px", }}>
                            <span className="text-xl font-semibold">{trip.price}$</span>
                            <br /><span className="text-m font-semibold">ללילה</span>
                        </span>
                        <span className="text-m font-semibold">{trip.targetAudience}</span>



                        
                    </div>
                </div>

            </div>
        );
    };
    const listTemplate = (trips) => {
        return <div className="grid grid-nogutter">{trips.map((trip) => gridItem(trip))}</div>;
    };
    const isAdmin = () => {
        if (!user)
            return false
        return user.role == "Admin"
    }
    return (
        <>
            <div className="card" style={{ margin: "40px" }}>
                <h1>{area == 'הכל' ? 'כל הטיולים' : `טיולים ב${area}`}</h1>
                <DataView value={trips} listTemplate={listTemplate} />
                <Outlet />
            </div> </>
    )
}
export default Trips









