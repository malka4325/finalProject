
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
            
        ];
    
        return (
            <div className="card">
                <Menubar model={items} />
            </div>
        )
    }
            

export default NavBar
