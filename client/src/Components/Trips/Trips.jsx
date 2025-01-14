import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

import axios from 'axios'

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [layout, setLayout] = useState('grid');
    const getTrips = async () => {

        try {
            const res = await axios.get('http://localhost:4300/api/trips')
            if (res.status === 200) {
                setTrips(res.data)

            }
        } catch (e) {
            console.error(e)
        }


    }
    useEffect(() => {
        getTrips()
    }, []);
    const getSeverity = (trip) => {
        switch (trip.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (trip, index) => {
        return (
            <div className="col-12" key={trip.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/trip/${trip.image}`} alt={trip.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{trip.name}</div>
                            <Rating value={trip.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{trip.category}</span>
                                </span>
                                <Tag value={trip.inventoryStatus} severity={getSeverity(trip)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${trip.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={trip.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (trip) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={trip.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{trip.category}</span>
                        </div>
                        <Tag value={trip.inventoryStatus} severity={getSeverity(trip)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/trip/${trip.image}`} alt={trip.name} />
                        <div className="text-2xl font-bold">{trip.name}</div>
                        <Rating value={trip.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${trip.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={trip.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (trip, layout, index) => {
        if (!trip) {
            return;
        }

        if (layout === 'list') return listItem(trip, index);
        else if (layout === 'grid') return gridItem(trip);
    };

    const listTemplate = (trips, layout) => {
        return <div className="grid grid-nogutter">{trips.map((trip, index) => itemTemplate(trip, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={trips} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}
export default Trips



