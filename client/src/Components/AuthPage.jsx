import React, { useState,useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import { setValue } from "../Store/TokenSlice";

const AuthPage=()=> {
    const navigate=useNavigate()
    const [visible, setVisible] = useState(false);
    //const [token, setToken] = useState();

    const token = useSelector(state=> state.TokenSlice.token)
        console.log(token);
    const dispatch = useDispatch()

    const [isLogin, setIsLogin] = useState(true);  // משתנה לשלוט במעבר בין הרשמה והתחברות
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        fullName: '',
        email: '',
        phone: ''
    });

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };
    const register=async ()=>{
        try {
            const res = await axios.post('http://localhost:4300/api/auth/register', formData)
           
 

            if (res.status === 200) {
                dispatch(setValue(res.data.accessToken))

                
            }
        } catch (e) {
            alert(e.response.data.message.toString())
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
            
        }
    } catch (e) {
        alert(e.response.data.message.toString())
    }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login();  // קוראים לפונקציית התחברות
        } else {
            register();  // קוראים לפונקציית הרשמה
        }
    };
    useEffect(() => {
        if (token) {
          navigate('/Vacations');
        }
      }, [token]);
    return (
        <div className="card flex justify-content-center">
            <Button label={isLogin ? "Login" : "Sign Up"} icon="pi pi-user" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))',overflowY: 'auto' }}>
                         <Button 
                            icon="pi pi-times" 
                            className="p-button-text p-button-rounded p-button-outlined p-button-secondary absolute top-0 right-0 mt-2 mr-2"
                            onClick={() => setVisible(false)} 
                        />
                        <h2 className="text-center text-white mb-4">{isLogin ? "🔑 התחברות" : "📝 הרשמה"}</h2>

                        {/* שדה שם מלא - יוצג רק בהרשמה */}
                        {!isLogin && (
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="fullName" className="text-primary-50 font-semibold">שם מלא</label>
                                <InputText 
                                    id="fullName" 
                                    value={formData.fullName} 
                                    onChange={(e) => handleChange(e, "fullName")} 
                                    className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                />
                            </div>
                        )}

                        {/* שדה שם משתמש */}
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="userName" className="text-primary-50 font-semibold">שם משתמש</label>
                            <InputText 
                                id="userName" 
                                value={formData.userName} 
                                onChange={(e) => handleChange(e, "userName")} 
                                className="bg-white-alpha-20 border-none p-3 text-primary-50"
                            />
                        </div>

                        {/* שדה סיסמה */}
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="password" className="text-primary-50 font-semibold">סיסמה</label>
                            <Password 
                                id="password" 
                                value={formData.password} 
                                onChange={(e) => handleChange(e, "password")} 
                                toggleMask 
                                feedback={false}
                                className="bg-white-alpha-20 border-none p-3 text-primary-50"
                            />
                        </div>

                        {/* שדות נוספים - יוצגו רק בהרשמה */}
                        {!isLogin && (
                            <>
                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="email" className="text-primary-50 font-semibold">אימייל</label>
                                    <InputText 
                                        id="email" 
                                        value={formData.email} 
                                        onChange={(e) => handleChange(e, "email")} 
                                        className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                    />
                                </div>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="phone" className="text-primary-50 font-semibold">טלפון</label>
                                    <InputText 
                                        id="phone" 
                                        value={formData.phone} 
                                        onChange={(e) => handleChange(e, "phone")} 
                                        className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                    />
                                </div>
                            </>
                        )}

                        {/* כפתור שליחה */}
                        <div className="flex justify-content-between">
                            <Button 
                                label={isLogin ? "📲 התחבר" : "📩 הרשמה"} 
                                onClick={handleSubmit} 
                                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                            />
                        </div>

                        {/* כפתור מעבר בין הרשמה והתחברות */}
                        <div className="mt-3 text-center">
                            <Button 
                                label={isLogin ? "אין לך חשבון? הירשם כאן" : "כבר רשום? התחבר כאן"} 
                                onClick={() => setIsLogin(!isLogin)} 
                                className="p-button-text text-primary-50"
                            />
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    );
} 
export default AuthPage
