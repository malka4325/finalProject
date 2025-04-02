
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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const NewOrder = () => {
   
    
      const [name, setName] = useState("");
      
      const [phone, setPhone] = useState("");
      const [cardNumber, setCardNumber] = useState("");
      const [expiry, setExpiry] = useState("");
      const [cvv, setCvv] = useState("");
      const { id } = useParams();
      const token = useSelector(state => state.TokenSlice.token)
      const order= async ()=>{
        try {
          const res = await axios.post(  'http://localhost:4300/api/orders',
            { orderedBy: "67d1c9f413cc897e397a8060", vacation: id }, // ה-body של הבקשה
            {
              headers: {
                "Authorization": `Bearer ${token}`, // הכנסת ה-token לכותרת Authorization
              }
            }
          );
          if (res.status === 200) {
              alert(res.data);
          }
      } catch (e) {
          alert(e.response.data.message.toString())
      }
      }
      return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100 p-4">
          <Card className="w-30rem shadow-4 p-4">
            <h2 className="text-center text-blue-500">🔹 תשלום מאובטח 🔹</h2>
    
            <Divider />
    
            {/* שם מלא */}
            <div className="field">
              <label className="block text-900 font-medium mb-2">שם מלא</label>
              <InputText
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="שם בעל הכרטיס"
              />
            </div>
    
    
            {/* טלפון */}
            <div className="field">
              <label className="block text-900 font-medium mb-2">טלפון</label>
              <InputText
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
                placeholder="050-1234567"
              />
            </div>
    
            <Divider />
    
            <h3 className="text-center text-orange-500">💳 פרטי כרטיס אשראי 💳</h3>
    
            
            <div className="field">
              <label className="block text-900 font-medium mb-2">מספר כרטיס</label>
              <InputText
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full"
                
                placeholder="1234 5678 9012 3456"
              />
            </div>
    
            
            <div className="flex gap-3">
              {/* תוקף */}
              <div className="field flex-1">
                <label className="block text-900 font-medium mb-2">תוקף (MM/YY)</label>
                <InputText
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full"
                  placeholder="12/25"
                />
              </div>
    
              {/* CVV */}
              <div className="field flex-1">
                <label className="block text-900 font-medium mb-2">CVV</label>
                <Password
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full"
                  feedback={false}
                  placeholder="123"
                />
              </div>
            </div>
    
            <Divider />
    
            {/* כפתור תשלום */}
            <Button label="💳 שלם עכשיו" className="w-full p-button-outlined p-button-warning text-xl" onClick={order}/>
    
            <Divider />
    
            <h3 className="text-center">או התחבר באמצעות:</h3>
            <div className="flex justify-content-around mt-3">
              <Button label="Google" icon="pi pi-google" className="p-button-text text-blue-500" />
              <Button label="Facebook" icon="pi pi-facebook" className="p-button-text text-blue-700" />
            </div>
          </Card>
        </div>
      );
    };
    
   
export default NewOrder;
