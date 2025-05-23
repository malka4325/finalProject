import React from 'react';


import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import { Tag } from 'primereact/tag';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Image } from 'primereact/image';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
const MyTrips = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const forAdmin = queryParams.get('forAdmin')
    const navigate = useNavigate();
    const token = useSelector(state => state.TokenSlice.token)
    const user = useSelector(state => state.UserSlice.user)
    console.log(user);
    const isAdmin = () => {
        if (!user)
            return false
        return user.role == "Admin"
    }
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    useEffect(() => {
        getTrips()
    }, [])
    const getTrips = async () => {
        try {
            let res;
            if (forAdmin) {
                res = await axios.get(`http://localhost:4300/api/trips?sort=isApproved&madeByType=Client`)
            }
            else
                res = await axios.get(`http://localhost:4300/api/trips?sort=date&madeById=${user._id}`)
            if (res.status === 200) {
                setTrips(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }

    const approvedTrip = async (event, trip) => {
        event.stopPropagation();
        if (isAdmin()) {
            try {
                const res = await axios.put(`http://localhost:4300/api/trips/${trip._id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                    alert("טיול אושר");
                    getTrips();
                     const ownerTrip=await getOwnerTrip(trip.madeById)
                    console.log(ownerTrip);
                    
                    await  handleEmail(ownerTrip);
                }
            } catch (e) {
                console.error(e)
            }
        }
    }
    const getOwnerTrip = async ( id) => {
    
       
            try {
                const res = await axios.get(`http://localhost:4300/api/users/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                  const user =res.data;
                  return user
                }
            } catch (e) {
                console.error(e)
            }
        }
    
      const handleEmail = async (user) => {
    
        try {
            const response = await axios.post('http://localhost:4300/send-email', {
                email:user.email,
                subject: "הטיול אושר",
                message:`שלום ${user.name} הטיול שלך אושר!\n\n אתה יכול להכנס לאתר ולהזמין אותו`,
            });
            alert('Email sent successfully!');
        } catch (error) {
            console.error("There was an error sending the email:", error);
            alert('Failed to send email.');
        }
    };

    const updateTrip = (event, trip) => {
        //setSelectedTrip(trip)
        event.stopPropagation();
        if (token && user.role == "Admin")
            navigate('/Trips/AddTrip', { state: { tripToUpdate: trip, isEditing: true } });
    }
    
    const handleOrder = (trip) => {
        if (token)
            navigate(`/Orders/newOrder/${trip._id}?num=${trip.currentParticipants}&type=trip`);
    }
    const gridItem = (trip) => {


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
                    
                    <div style={{ position: 'relative', width: '370px', height: '200px', overflow: 'hidden' }}>
                        <Image src={trip.imageSrc} alt={trip.location} width="370px" height="200" style={{ width: '100%', height: '100%' }} />
                        <div className="flex flex-wrap align-items-center justify-content-between gap-1" style={{ position: 'absolute', top: '5px', left: '5px', margin: 8 }}>
                            <i className="pi pi-map-marker"></i>
                            <span className="font-semibold text-xl">{trip.area}</span>
                        </div>
                        {console.log(trip.isApproved)}
                        <Tag className="mr-2 text-lg " value={"לא אושר עדין"} severity={'info'} style={{
                            visibility: trip.isApproved ? "hidden" : "visible",
                            position: "absolute",
                            top: '10px', 
                            right: '10px',
                            whiteSpace: 'nowrap',
                            zIndex: 2
                        }}></Tag>
                    </div>
                    <div className="flex justify-content w-full  gap-2" >
                        <Button icon="pi pi-pen-to-square" visible={!trip.isApproved} rounded text severity="help" aria-label="update" onClick={(event) => updateTrip(event, trip)} />
                        <Button icon="pi pi-verified" visible={isAdmin()} rounded text severity="help" aria-label="update" onClick={(event) => approvedTrip(event, trip)} />
                       
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
                    
                    <Button label="הזמן" rounded aria-label="Filter" disabled={!trip.isApproved} onClick={() => { handleOrder(trip) }} />

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

    return (
        <>
            <div className="card" style={{ margin: "40px" }}>
                <h1>הטיולים שלי</h1>
                <DataView value={trips} listTemplate={listTemplate} />
               
                <Outlet />
            </div> </>
    )
}


export default MyTrips;