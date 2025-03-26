
import React from 'react'; 
import { Menubar } from 'primereact/menubar';

const NavBar = () => {
   
       
        const items = [
            {
                label:'נופשים',
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
                label:'טיולים',
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
            <div className="card">
                <Menubar model={items} />
            </div>
        )
    }
            

export default NavBar
