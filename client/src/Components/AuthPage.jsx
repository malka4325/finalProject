import React, { useState,useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import { setValue } from "../Store/TokenSlice";
import { setValue as setUser } from "../Store/UserSlice";
import { jwtDecode } from "jwt-decode"; 

const AuthPage=()=> {
    const navigate=useNavigate()
    const [visible, setVisible] = useState(true);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState(null);
    //const [token, setToken] = useState();

    const token = useSelector(state=> state.TokenSlice.token)
        console.log(token);
    const dispatch = useDispatch()

    const [isLogin, setIsLogin] = useState(true);  // משתנה לשלוט במעבר בין הרשמה והתחברות
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        address:' '
    });

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };
    const register=async ()=>{
        try {
            const res = await axios.post('http://localhost:4300/api/auth/register', formData)
           
            if (res.status === 200) {
                dispatch(setValue(res.data.accessToken))
                const decoded = jwtDecode(res.data.accessToken) 
                dispatch(setUser(decoded));
                
            }
        } catch (e) {
            alert(e.response.data.message.toString())
        }finally{
            setConnecting(false);
        }
    }
    
    const login= async()=>{
      const log={
        userName:formData.userName,
        password:formData.password
      }
      try {
        const res = await axios.post('http://localhost:4300/api/auth/login', log)
      
        if (res.status === 200) {
            dispatch(setValue(res.data.accessToken))
            const decoded = jwtDecode(res.data.accessToken) 
            dispatch(setUser(decoded));
            
        }
    } catch (e) {
        alert(e.response.data.message.toString())
    }
    finally{
        setConnecting(false);
    }}
    const handleSubmit = (e) => {
        setConnecting(true);
        e.preventDefault();
        if (isLogin) {
            login();  // קוראים לפונקציית התחברות
        } else {
            register();  // קוראים לפונקציית הרשמה
        }
    };
    useEffect(() => {
        if (token) {
          navigate('/Vacations/הכל');
        }
      }, [token]);
    return (
        <div className="card flex justify-content-center">
            <Button label={isLogin ? "Login" : "Sign Up"} className="hover:bg-orange-500" icon="pi pi-user" onClick={() => setVisible(true)} visible={!visible}/>
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-6 py-5 gap-4"
                    style={{
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        borderRadius: '16px',
                        backgroundColor: '#ffffff',
                    }}>
                         <Button 
                            icon="pi pi-times" 
                            className="p-button-text p-button-rounded p-button-outlined p-button-secondary absolute top-0 right-0 mt-2 mr-2"
                            onClick={() => setVisible(false)} 
                        />
                        <h2 className="text-center  mb-4">{isLogin ? "🔑 התחברות" : "📝 הרשמה"}</h2>

                        {/* שדה שם מלא - יוצג רק בהרשמה */}
                        {!isLogin && (
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="name" className=" font-semibold">שם מלא</label>
                                <InputText 
                                    id="name" 
                                    value={formData.name} 
                                    onChange={(e) => handleChange(e, "name")} 
                                    className="bg-white-alpha-20  p-3"
                                />
                            </div>
                        )}

                        {/* שדה שם משתמש */}
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="userName" className=" font-semibold">שם משתמש</label>
                            <InputText 
                                id="userName" 
                                value={formData.userName} 
                                onChange={(e) => handleChange(e, "userName")} 
                                className="bg-white-alpha-20  p-3 "
                            />
                        </div>

                        {/* שדה סיסמה */}
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="password" className=" font-semibold">סיסמה</label>
                            <Password 
                                id="password" 
                                value={formData.password} 
                                onChange={(e) => handleChange(e, "password")} 
                                toggleMask 
                                feedback={false}
                                className="bg-white-alpha-20  p-3 "
                            />
                        </div>

                        {/* שדות נוספים - יוצגו רק בהרשמה */}
                        {!isLogin && (
                            <>
                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="email" className=" font-semibold">אימייל</label>
                                    <InputText 
                                        id="email" 
                                        value={formData.email} 
                                        onChange={(e) => handleChange(e, "email")} 
                                        className="bg-white-alpha-20  p-3 "
                                    />
                                </div>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="phone" className=" font-semibold">טלפון</label>
                                    <InputText 
                                        id="phone" 
                                        value={formData.phone} 
                                        onChange={(e) => handleChange(e, "phone")} 
                                        className="bg-white-alpha-20  p-3 "
                                    />
                                </div>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="address" className=" font-semibold">כתובת</label>
                                    <InputText 
                                        id="address" 
                                        value={formData.address} 
                                        onChange={(e) => handleChange(e, "address")} 
                                        className="bg-white-alpha-20  p-3 "
                                    />
                                </div>
                            </>
                        )}

                        {/* כפתור שליחה */}
                        <div className="flex justify-content-between">
                            <Button 
                                label={connecting?"connecting":isLogin ? "📲 התחבר" : "📩 הרשמה"} 
                                onClick={handleSubmit}
                                disabled={connecting} 
                                className="p-3 w-full  border-1 border-black-alpha-30 hover:bg-orange-500"
                            />
                        </div>

                        {/* כפתור מעבר בין הרשמה והתחברות */}
                        <div className="mt-3 text-center">
                            <Button 
                                label={isLogin ? "אין לך חשבון? הירשם כאן" : "כבר רשום? התחבר כאן"} 
                                onClick={() => setIsLogin(!isLogin)} 
                                className="p-button-text "
                            />
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    );
} 
export default AuthPage
