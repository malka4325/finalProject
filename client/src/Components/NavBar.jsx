import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
    const token = useSelector(state => state.TokenSlice.token);
    const user = useSelector(state => state.UserSlice.user)
    const items = [
        {
            label: 'דף הבית',
            icon: 'pi pi-palette',
            url:"/"
        },
        {
            label: 'נופשים',
            icon: 'pi pi-palette',
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
            icon: 'pi pi-palette',
            items: [
                { label: 'צפון', url: '/Vacations' },
                { label: 'דרום', url: '/unstyled' },
                { label: 'מרכז', url: '/Vacations' },
                { label: 'אזור ירושלים', url: '/unstyled' }
            ]
        },
        {
            label: 'הרגע האחרון',
            icon: 'pi pi-palette',
            items: [
                { label: 'Styled', url: '/Vacations' },
                { label: 'Unstyled', url: '/unstyled' }
            ]
        },
        {
            label: 'עשה זאת בעצמך',
            icon: 'pi pi-palette',
            items: [
                { label: 'Styled', url: '/Vacations' },
                { label: 'Unstyled', url: '/unstyled' }
            ]
        },{},{},{},{},{},{},{},{},{},{},{},
        {
            label: token ? 'אזור אישי' : 'התחברות',
            url: token ? '' : '/Login',
            icon: <FaUser style={{ fontSize: '24px' }} />,
            items: token ? [
                { label: 'הזמנות שלי', url: '/Orders/myOrders' },
                ...(user?.role === 'Admin' ? [{ label: 'כל ההזמנות', url: '/Orders/allOrders' }] : []),
               // { label: 'עדכון פרטים', url: '/Orders/myOrders' },
                {
                    label: 'התנתקות',
                    url: '/',
                    command: () => {
                        const currentValue = localStorage.getItem('persist:root');
                        const parsedValue = JSON.parse(currentValue);
                        parsedValue.TokenSlice = JSON.stringify({ token: '' });
                        localStorage.setItem('persist:root', JSON.stringify(parsedValue));
                    }
                }
            ] : []
        }
    ];

    return (
        <div className="card" style={{ direction: "rtl", backgroundColor: "ButtonFace", width: "100%" }}>
            <div style={{ display: 'flex', alignItems: 'center' }} >
                <Link to="/">
                    <img src="/images/logo2.png" alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
                </Link>
                <Menubar model={items} style={{ backgroundColor: "white", borderWidth: "0", fontSize: "18px", backgroundColor: "ButtonFace", marginLeft: 'auto' }} />
            </div>
        </div>
    );
}

export default NavBar;
