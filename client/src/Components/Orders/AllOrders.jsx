import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useSelector } from "react-redux";
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

      const token = useSelector(state => state.TokenSlice.token)
      const allorders= async ()=>{
        try {
          const res = await axios.get(  'http://localhost:4300/api/orders/allOrders',{headers: {
            "Authorization": `Bearer ${token}`,
          }} );
          if (res.status === 200) {
              console.log(res.data);
                setOrders(res.data)
              
          }
      } catch (e) {
          alert(e.response.data.message.toString())
      }}
      useEffect(() => {
        allorders()
    }, []);
   const itemTemplate = (data) => {
           return (
               <div className="col-12">
                   <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                       <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={data.vacation.imageSrc} alt={data.vacation.location} />
                       <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                           <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                               <div className="flex flex-column gap-1">
                                   <div className="text-2xl font-bold text-900">{data.vacation.location}</div>  
                               </div>
                               <div className="text-2xl font-bold text-900">{data.orderedBy.name}</div>
                               <div className="flex flex-column gap-2">
                                   <Rating value={data.vacation.rating} readOnly cancel={false}></Rating>
                                   <span className="flex align-items-center gap-2">
                                       <i className="pi pi-map-marker"></i>
                                       <span className="font-semibold">{data.vacation.area}</span>
                                   </span>
                               </div>
                           </div>
                           <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                               <span className="text-2xl font-semibold">₪{data.vacation.price}</span>
                               <div className="text-2xl font-bold text-900">{data.orderedBy.email}</div>
                           </div>
                       </div>
                   </div>
               </div>
               );}
         return (
           <div className="card">
               <DataScroller value={orders} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
           </div>
       )
       };
export default AllOrders