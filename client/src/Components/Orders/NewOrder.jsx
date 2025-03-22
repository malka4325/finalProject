// import React, { useState, useRef } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { Divider } from "primereact/divider";


//     const [order, setOrder] = useState({
//         name: "",
//         address: "",
//         product: null,
//         date: null
//     });
    
//     const products = [
//         { label: "Laptop", value: "laptop" },
//         { label: "Phone", value: "phone" },
//         { label: "Headphones", value: "headphones" }
//     ];

//     const toast = useRef(null);

//     const handleSubmit = () => {
//         toast.current.show({ severity: "success", summary: "Order Submitted", detail: `Order for ${order.name} confirmed!` });
//     };

   //return (<></>
//         <div className="flex justify-content-center p-4" style={{ background: '#f0f8ff', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
//             <Toast ref={toast} />
//             <Card className="shadow-4 p-5" style={{ width: '420px', borderRadius: '12px', background: 'white', border: '2px solid #007bff' }}>
//                 <h2 className="text-center" style={{ color: '#007bff' }}>Order Form</h2>
//                 <Divider />
//                 <div className="p-field">
//                     <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Name</label>
//                     <InputText className="w-full p-inputtext-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.name} onChange={(e) => setOrder({ ...order, name: e.target.value })} />
//                 </div>
//                 <div className="p-field mt-3">
//                     <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Address</label>
//                     <InputText className="w-full p-inputtext-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.address} onChange={(e) => setOrder({ ...order, address: e.target.value })} />
//                 </div>
//                 <div className="p-field mt-3">
//                     <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Product</label>
//                     <Dropdown className="w-full p-dropdown-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.product} options={products} onChange={(e) => setOrder({ ...order, product: e.value })} placeholder="Select a product" />
//                 </div>
//                 <div className="p-field mt-3 mb-4">
//                     <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Delivery Date</label>
//                     <Calendar className="w-full p-calendar-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.date} onChange={(e) => setOrder({ ...order, date: e.value })} showIcon />
//                 </div>
//                 <Button label="Submit Order" onClick={handleSubmit} className="w-full p-button-lg p-button-raised p-button-rounded" style={{ background: '#007bff', borderColor: '#007bff', color: 'white', fontWeight: 'bold', borderRadius: '8px' }} />
//             </Card>
//         </div>
 


import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const NewOrder = () => {
   
    
      const [name, setName] = useState("");
      
      const [phone, setPhone] = useState("");
      const [cardNumber, setCardNumber] = useState("");
      const [expiry, setExpiry] = useState("");
      const [cvv, setCvv] = useState("");
    
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
            <Button label="💳 שלם עכשיו" className="w-full p-button-outlined p-button-warning text-xl" />
    
            <Divider />
    
            {/* התחברות דרך צד ג' */}
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
