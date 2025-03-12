import { useState, useEffect } from "react";
import UserContext from './Context';

const UserProvider = ({ children,accessToken}) => {
    const [token, setToken] = useState();
    useEffect(() => {
        console.log(accessToken);
        if(accessToken){
            setToken(accessToken);
        }
    }, [accessToken]);

    return (
        <UserContext.Provider value={token} >
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;