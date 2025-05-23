import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Menu } from 'primereact/menu';

const NavBar = () => {
    const token = useSelector(state => state.TokenSlice.token);
    const user = useSelector(state => state.UserSlice.user)
    const items = [
        {
            label: 'דף הבית',
            icon: <span style={{ marginLeft: '8px' }}><i className="pi pi-home"></i></span>,
            url: "/"
        },
        {
            label: 'נופשים',
            icon: <span style={{ marginLeft: '8px' }}><i className="pi pi-sun"></i></span>,
            items: [
                { label: 'צפון', url: '/Vacations/צפון' },
                { label: 'דרום', url: '/Vacations/דרום' },
                { label: 'מרכז', url: '/Vacations/מרכז' },
                { label: 'אזור ירושלים', url: '/Vacations/אזור ירושלים' },
                { label: ' כל הנופשים ', url: '/Vacations/הכל' }
            ]
        },
        {
            label: 'טיולים',
            icon: <span style={{ marginLeft: '8px' }}><i className="pi pi-map"></i></span>,
            items: [
                { label: 'צפון', url: '/Trips/צפון' },
                { label: 'דרום', url: '/Trips/דרום' },
                { label: 'מרכז', url: '/Trips/מרכז' },
                { label: 'אזור ירושלים', url: '/Trips/אזור ירושלים' },
                { label: ' כל הטיולים ', url: '/Trips/הכל' }
            ]
        },
        {
            label: 'הרגע האחרון',
            icon: <span style={{ marginLeft: '8px' }}><i className="pi pi-clock"></i></span>,
            items: [
                { label: 'נופשים בקרוב', url: '/Vacations/קרוב' },
                { label: 'טיולים בקרוב', url: '/Trips/קרוב' }
            ]
        },
        token ?{
            label: 'עשה זאת בעצמך',
            icon: <span style={{ marginLeft: '8px' }}><i className="pi pi-cog"></i></span>,
            url: '/Trips/ByUser'
        }: null,

        , {}, {}, {}, {}, {}, {}, {}, {}, {}, {},

        {
            label: token ? 'אזור אישי' : 'התחברות',
            url: token ? '' : '/Login',
            icon:  <FaUser style={{ fontSize: '24px' }} />,
            items: token ? [
                { label: 'הזמנות שלי', url: '/Orders/myOrders' },
                { label: ' טיולים שלי', url: '/Trips/MyTrips' },
                { label: 'לעדכון פרטים', url: '/Users/update' },
                ...(user?.role === 'Admin' ? [{ label: 'כל ההזמנות', url: '/Orders/allOrders' }] : []),
                ...(user?.role === 'Admin' ? [{ label: 'כל הטיולים שנוצרו ', url: '/Trips/MyTrips?forAdmin=true' }] : []),

                {
                    label: 'התנתקות',
                    url: '/',
                    command: () => {
                        const currentValue = localStorage.getItem('persist:root');
                        const parsedValue = JSON.parse(currentValue);
                        parsedValue.TokenSlice = JSON.stringify({ token: '' });
                        localStorage.setItem('persist:root', JSON.stringify(parsedValue));
                        parsedValue.UserSlice = JSON.stringify({ user: null });
                        localStorage.setItem('persist:root', JSON.stringify(parsedValue));
                    }
                }
            ] : []
        }
    ].filter(item => item !== null);;
   

    const end = (
        <div className="flex gap-3 ml-auto">
            <Button
                label="0556724953 -יצירת קשר"
                icon="pi pi-phone"
                className="p-button-text p-button-rounded"
                style={{
                    color: '#0288d1', // תכלת
                    border: '1px solid #0288d1',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}

            />

           

        </div>
    );


    return (
        <div className="card" style={{ direction: "rtl", backgroundColor: "ButtonFace", width: "100%" }}>
            <div style={{ display: 'flex', alignItems: 'center' }} >
                <Link to="/">
                    <img src="/images/logo2.png" alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
                </Link>
                <Menubar model={items} end={end} className="w-full" style={{ backgroundColor: "white", borderWidth: "0", fontSize: "18px", backgroundColor: "ButtonFace", marginLeft: 'auto' }} />
            </div>
        </div>
    );
}

export default NavBar;
