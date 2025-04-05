
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import axios from "axios"; 
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OldOrders = () => {
  
      const token = useSelector(state => state.TokenSlice.token)
      const myorders= async ()=>{
        try {
          const res = await axios.get(  'http://localhost:4300/api/orders',{headers: {
            "Authorization": `Bearer ${token}`,
          }} );
          if (res.status === 200) {
              console.log(res.data);
              
          }
      } catch (e) {
          alert(e.response.data.message.toString())
      }
      }
      return (
        <Button onClick={myorders}>gg</Button>
         )
    };
    
   
export default OldOrders;
