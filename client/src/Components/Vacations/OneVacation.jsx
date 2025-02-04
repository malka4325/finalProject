
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Splitter, SplitterPanel } from 'primereact/splitter';


const oneVacation = (props) => {
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];




    const productTemplate = (activity) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <div className="card flex justify-content-center">
                        <Image src="/images/0210005.jpg" zoomSrc="/images/0210005.jpg" alt="Image" width="80" height="60" preview />
                    </div>
                </div>
                <div>
                    <h4 className="mb-1">{activity.name}</h4>
                    <h6 className="mt-0 mb-3">{activity.type}</h6>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    };

    return (<>
        {/* <div className="card flex justify-content-center">
            <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
                    
                </p>
            </Card>
        </div> */}
        
        <Splitter style={{ height: '300px',marginTop:'150px' }}>
            <SplitterPanel className="flex align-items-center justify-content-center" size={80}>
            <Image src="/images/cineret.jpg" alt={props.vacation.location} width="300" preview />
        </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={10}>אזור:{props.vacation.area}</SplitterPanel>
        </Splitter>
        <div className="card flex justify-content-center">
            <Button label="באיזה אזור אני ממוקם:" link onClick={() =>  window.open(`https://www.google.com/maps?q=${encodeURIComponent(props.vacation.location)}`, '_blank')}/>
        </div>
        <div className="card">
            <Carousel value={props.vacation.activities} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                autoplayInterval={3000} itemTemplate={productTemplate} />
        </div>
    </>
    )
}
export default oneVacation








