import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const NewOrder = () => {
    const [order, setOrder] = useState({
        name: "",
        address: "",
        product: null,
        date: null
    });
    
    const products = [
        { label: "Laptop", value: "laptop" },
        { label: "Phone", value: "phone" },
        { label: "Headphones", value: "headphones" }
    ];

    const toast = useRef(null);

    const handleSubmit = () => {
        toast.current.show({ severity: "success", summary: "Order Submitted", detail: `Order for ${order.name} confirmed!` });
    };

    return (
        <div className="flex justify-content-center p-4" style={{ background: '#f0f8ff', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Toast ref={toast} />
            <Card className="shadow-4 p-5" style={{ width: '420px', borderRadius: '12px', background: 'white', border: '2px solid #007bff' }}>
                <h2 className="text-center" style={{ color: '#007bff' }}>Order Form</h2>
                <Divider />
                <div className="p-field">
                    <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Name</label>
                    <InputText className="w-full p-inputtext-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.name} onChange={(e) => setOrder({ ...order, name: e.target.value })} />
                </div>
                <div className="p-field mt-3">
                    <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Address</label>
                    <InputText className="w-full p-inputtext-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.address} onChange={(e) => setOrder({ ...order, address: e.target.value })} />
                </div>
                <div className="p-field mt-3">
                    <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Product</label>
                    <Dropdown className="w-full p-dropdown-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.product} options={products} onChange={(e) => setOrder({ ...order, product: e.value })} placeholder="Select a product" />
                </div>
                <div className="p-field mt-3 mb-4">
                    <label className="block mb-2" style={{ color: '#ff6600', fontWeight: 'bold' }}>Delivery Date</label>
                    <Calendar className="w-full p-calendar-lg" style={{ borderRadius: '8px', border: '1px solid #007bff' }} value={order.date} onChange={(e) => setOrder({ ...order, date: e.value })} showIcon />
                </div>
                <Button label="Submit Order" onClick={handleSubmit} className="w-full p-button-lg p-button-raised p-button-rounded" style={{ background: '#007bff', borderColor: '#007bff', color: 'white', fontWeight: 'bold', borderRadius: '8px' }} />
            </Card>
        </div>
    );
};

export default NewOrder;
