
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

const NewOrder = () => {
  const [searchParams] = useSearchParams();
  const numOfJoined = searchParams.get("num");
  const type= searchParams.get("type");
      const [name, setName] = useState("");
      const [phone, setPhone] = useState("");
      const [cardNumber, setCardNumber] = useState("");
      const [expiry, setExpiry] = useState("");
      const [cvv, setCvv] = useState("");
      const { id } = useParams();

      const token = useSelector(state => state.TokenSlice.token)
      const user = useSelector(state => state.UserSlice.user)
      const handleEmail = async () => {
    
        try {
            const response = await axios.post('/send-email', {
                email:user.email,
                subject: "Confirmation of Your Order",
                message: `שלום ${user.name},\n\nתודה על ההזמנה שלך! \n\nפרטי ההזמנה:\nשם: ${name}\nטלפון: ${phone}\nמספר כרטיס: ${cardNumber}\nתוקף: ${expiry}\nCVV: ${cvv}`,
            });
            alert('Email sent successfully!');
        } catch (error) {
            console.error("There was an error sending the email:", error);
            alert('Failed to send email.');
        }
    };
      const order= async ()=>{
        if (!name || !phone || !cardNumber || !expiry || !cvv) {
          alert('כל השדות הדרושים חייבים להיות מלאים.');
          return;
      }
        try {
          const res = await axios.post(  'http://localhost:4300/api/orders',
            { orderedBy: user._id,...(type === "vacation" && { vacation: id, numOfJoined }), 
            ...(type === "trip" && { trip: id, numOfJoined }) }, 
            {
              headers: {
                "Authorization": `Bearer ${token}`, // הכנסת ה-token לכותרת Authorization
              }
            }
          );
          if (res.status === 200) {
              //handleEmail();
              window.location.href = '/ThankYou'
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
                className={`w-full ${name === '' ? 'p-invalid' : ''}`}
                placeholder="שם בעל הכרטיס"
                required 
              />
            </div>
    
    
            {/* טלפון */}
            <div className="field">
              <label className="block text-900 font-medium mb-2">טלפון</label>
              <InputText
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full ${phone === '' ? 'p-invalid' : ''}`}
                placeholder="050-1234567"
                required 
              />
            </div>
    
            <Divider />
    
            <h3 className="text-center text-orange-500">💳 פרטי כרטיס אשראי 💳</h3>
    
            
            <div className="field">
              <label className="block text-900 font-medium mb-2">מספר כרטיס</label>
              <InputText
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={`w-full ${cardNumber === '' ? 'p-invalid' : ''}`} 
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
                  className={`w-full ${expiry === '' ? 'p-invalid' : ''}`}
                  placeholder="12/25"
                  required 
                />
              </div>
    
              {/* CVV */}
              <div className="field flex-1">
                <label className="block text-900 font-medium mb-2">CVV</label>
                <Password
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className={`w-full ${cvv === '' ? 'p-invalid' : ''}`}
                  feedback={false}
                  placeholder="123"
                  required
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
