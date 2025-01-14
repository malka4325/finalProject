import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';


import axios from 'axios'

const Trips = () => {
    const [vacations, setVacations] = useState([]);
    const [layout, setLayout] = useState('grid');
    const getVacations = async () => {

        try {
            const res = await axios.get('http://localhost:4300/api/vacations')
            if (res.status === 200) {
                setVacations(res.data)

            }
        } catch (e) {
            console.error(e)
        }


    }
    useEffect(() => {
        getVacations()
    }, []);
    // const getSeverity = (vacation) => {
    //     switch (vacation.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

   

    const gridItem = (vacation) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={vacation._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{vacation.area}</span>
                        </div>
                        {/* <Tag value={vacation.inventoryStatus} severity={getSeverity(vacation)}></Tag> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src='M:\finalProject\client\src\Components\Trips\0210005.JPG' alt={vacation.location} />
                        <div className="text-2xl font-bold">{vacation.location}</div>
                        {/* <Rating value={vacation.rating} readOnly cancel={false}></Rating> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${vacation.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                    </div>
                </div>
            </div>
        );
    };

  

    const listTemplate = (vacations, layout) => {
        return <div className="grid grid-nogutter">{vacations.map((vacation) => gridItem(vacation))}</div>;
    };

   

    return (
        <div className="card">
            <DataView value={vacations} listTemplate={listTemplate}  />
        </div>
    )
}
export default Trips



