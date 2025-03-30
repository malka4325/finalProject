
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';

const NavBar = () => {
   
       
        const items = [
            {
               
                label:'דף הבית',
                icon: 'pi pi-palette',
                
            },
            {
               
                label:'נופשים',
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
                label:'טיולים',
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
                label:'הרגע האחרון',
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
                label:'עשה זאת בעצמך',
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
            
        ];

        return (

            <div className="card"style={{direction:"rtl",backgroundColor:"ButtonFace"}}>
                  <div style={{ display: 'flex', alignItems: 'center' }} >
                  <Link to="/">
            <img    src="/images/logo2.png"
         alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
         </Link>
            <Menubar model={items} style={{backgroundColor:"white",borderWidth:"0",fontSize:"18px",backgroundColor:"ButtonFace"}} />
        </div>
                
            </div>
        )
    }
            

export default NavBar
