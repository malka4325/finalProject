
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {

    const token = useSelector(state => state.TokenSlice.token)
    const items = [
        {

            label: 'דף הבית',
            icon: 'pi pi-palette',

        },
        {

            label: 'נופשים',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'צפון',
                    url: '/Vacations'
                },
                {
                    label: 'דרום',
                    url: '/unstyled'
                },
                {
                    label: 'מרכז',
                    url: '/Vacations'
                },
                {
                    label: 'אזור ירושלים',
                    url: '/Vacations'
                }
            ]

        },
        {
            label: 'טיולים',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'צפון',
                    url: '/Vacations'
                },
                {
                    label: 'דרום',
                    url: '/unstyled'
                },
                {
                    label: 'מרכז',
                    url: '/Vacations'
                },
                {
                    label: 'אזור ירושלים',
                    url: '/unstyled'
                }
            ]

        },
        {
            label: 'הרגע האחרון',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    url: '/Vacations'
                },
                {
                    label: 'Unstyled',
                    url: '/unstyled'
                }
            ]

        },
        {
            label: 'עשה זאת בעצמך',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    url: '/Vacations'
                },
                {
                    label: 'Unstyled',
                    url: '/unstyled'
                }
            ]

        }, {
            label: token ? 'אזור אישי' : 'התחברות',
            // url:'/',
            items:token? [
                { label: 'הזמנות שלי',
                 url: '/Orders/myOrders' },
                {
                    label: 'התנתקות', 
                    url: '/', 
                    command: () => {
                        // שלב 1: קרא את הערך הנוכחי מ-localStorage
                        const currentValue = localStorage.getItem('persist:root');

                        // שלב 2: פרש את הערך ל-JSON
                        const parsedValue = JSON.parse(currentValue);

                        // שלב 3: עדכן את ה-token
                        parsedValue.TokenSlice = JSON.stringify({ token: '' }); // החלף ב-token החדש שלך

                        // שלב 4: שמור את הערך המעודכן חזרה ל-localStorage
                        localStorage.setItem('persist:root', JSON.stringify(parsedValue));
                    }
                }]
            :[  {label:'התחברות',
             url:'/'}]
        }

    ];

    return (

        <div className="card" style={{ direction: "rtl", backgroundColor: "ButtonFace", width: "100%" }}>
            <div style={{ display: 'flex', alignItems: 'center' }} >
                <Link to="/">
                    <img src="/images/logo2.png"
                        alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
                </Link>
                <Menubar model={items} style={{ backgroundColor: "white", borderWidth: "0", fontSize: "18px", backgroundColor: "ButtonFace" }} />
            </div>

        </div>
    )
}


export default NavBar
