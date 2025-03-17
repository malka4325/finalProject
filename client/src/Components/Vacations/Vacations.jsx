
import React from "react";

import { useContext, useState, useEffect } from 'react';
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
const Vacations = () => {
    const context = useContext(Context);

    const navigate = useNavigate();

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
    let classIcon=""
    const freeParticipants = (vacation) => {
        const tmp = vacation.maxParticipants - vacation.currentParticipants;

        console.log(tmp)
        if (tmp > 0 && tmp < 20) {
            full = 'מקומות אחרונים'
            classIcon="pi pi-exclamation-triangle"
            console.log(full)

        }
        else {
            if (tmp === 0) {
                full = 'מלא'
                classIcon="pi pi-minus-circle"
            }
            else
                full = 'יש מקום'
        }

    }
    useEffect(() => {
        console.log(context.token.accessToken);
    }, [])
    const handleButton = (vacation) => {
        console.log(vacation);
        if (context.token.accessToken)
            navigate(`/Vacations/${vacation._id}`); // שינוי URL עם state
    }
    const gridItem = (vacation) => {
        // debugger
        freeParticipants(vacation);

        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={vacation._id}
            >

                {/* {oneVacationVis && <OneVacation vacation={vacation} setOneVacationVis={setOneVacationVis} oneVacationVis={oneVacationVis} />} */}
                <div className=" border-1 surface-border surface-card border-round" style={{
                    width: "430px", /* רוחב קבוע */
                    height: '370px', /* גובה קבוע */
                    overflow: 'hidden', /* מסתיר תוכן שגדול מהכרטיס */
                    padding: 0, margin: 0
                }}> <button onClick={() => { handleButton(vacation) }} style={{ position: 'relative', backgroundColor: "white", borderWidth: "0px", padding: 0, margin: 0 }}>
                        <div style={{ position: 'relative', width: '430px', height: '200px', overflow: 'hidden' }}>
                            <Image src={vacation.imageSrc} alt={vacation.location} width="430" height="200" style={{ width: '100%', height: '100%' }} />
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
                            }}><i className={classIcon}style={{margin:"2px"}}></i></Tag>

                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">



                            <div className="text-2xl font-bold">{vacation.location}</div>
                            <Rating value={vacation.rating} readOnly cancel={false}></Rating>
                        </div> </button>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${vacation.price}</span>

                        {/* <Link to="/OneVacation"></Link> */}
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
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
            <div className="card">
                <DataView value={vacations} listTemplate={listTemplate} />
                <Outlet />
            </div> </>
    )
}
export default Vacations









