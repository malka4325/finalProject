
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import axios from "axios"; 
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSelector } from "react-redux";
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';


const OldOrders = () => {
    const [myOrders, setMyOrders] = useState([]);

      const token = useSelector(state => state.TokenSlice.token)
      const orders= async ()=>{
        try {
          const res = await axios.get(  'http://localhost:4300/api/orders',{headers: {
            "Authorization": `Bearer ${token}`,
          }} );
          if (res.status === 200) {
              console.log(res.data);
                setMyOrders(res.data)
              
          }
      } catch (e) {
          alert(e.response.data.message.toString())
      }}
      useEffect(() => {
        orders()
    }, []); 
    const getSeverity = (order) => {
        switch (order.vacation.startDate) {
            case order.vacation.startDate>new Date():
                return 'success';
            default:
                return 'warning';
        }
    };
    const itemTemplate = (data) => {
        if (data.vacation) {
            data=data.vacation;
        } else if (data.trip) {
             data=data.trip;
        } else {
            console.log("לא vacation ולא trip");
        }
       
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={data.imageSrc} alt={data.location} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.location}</div>
            
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-map-marker"></i>
                                    <span className="font-semibold">{data.area}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">₪{data.price}</span>
                            {/* <Tag value={data.vacation.inventoryStatus} severity={getSeverity(data)}></Tag> */}
                        </div>
                    </div>
                </div>
            </div>
            );}
      return (
        <div className="card">
            <DataScroller value={myOrders} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
        </div>
    )
    };
    
   
export default OldOrders;


    

        