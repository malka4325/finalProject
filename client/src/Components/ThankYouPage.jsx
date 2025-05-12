import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import  './Style.css'
const ThankYouPage = () => {
    return (
        <div className="thank-you-container">
            <Card title="תודה רבה!" className="thank-you-card">

                <Message severity="success" text="ההזמנה שלך התקבלה!" />
                <p className="thank-you-message">נשמח לעזור בכל שאלה נוספת.</p>
                <Button label="חזור לדף הבית" onClick={() => window.location.href = '/'} className="thank-you-button" />
            </Card>
        </div>
    );
};

export default ThankYouPage;
