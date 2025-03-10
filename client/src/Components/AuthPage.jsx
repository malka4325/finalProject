import { useRef, useState } from "react";
import axios from 'axios'
//import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  //const navigate = useNavigate();

  // יצירת רפרנסים לשדות
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
const register=async (userData)=>{
    try {
        const res = await axios.post('http://localhost:4300/api/auth/register', userData)
        console.log(res.data);
        if (res.status === 200) {
           alert("yay!")
        }
    } catch (e) {
        alert(e.response.data.message.toString())
    }
}
const login= async(userData)=>{
  const log={
    userName:userData.userName,
    password:userData.password
  }
  try {
    const res = await axios.post('http://localhost:4300/api/auth/login', log)
    console.log(res.data);
    if (res.status === 200) {
       alert("yayy!")
    }
} catch (e) {
    alert(e.response.data.message.toString())
}
}
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      name: nameRef.current?.value || "",
      userName: usernameRef.current?.value || "",
      address: addressRef.current?.value || "",
      email: emailRef.current?.value || "",
      phone: phoneRef.current?.value || "",
      password: passwordRef.current,
    };
    debugger
    isLogin ? login(userData) : register(userData);
    console.log("📢 נתוני משתמש:", userData);
   // navigate("/order"); // כאן ניתן לשלב שמירה של הנתונים
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <Card className="w-full max-w-sm bg-white shadow-2xl rounded-3xl p-6">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {isLogin ? "🔑 התחברות" : "🚀 הרשמה"}
        </h2>
        <p className="text-center text-gray-500 mb-4">
          {isLogin ? "הזן את פרטיך כדי להיכנס" : "צור חשבון חדש והצטרף אלינו!"}
        </p>
        <Divider />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-gray-700 font-medium">שם מלא</label>
                <InputText id="name" ref={nameRef} className="w-full p-inputtext-lg" required />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-gray-700 font-medium">כתובת</label>
                <InputText id="address" ref={addressRef} className="w-full p-inputtext-lg" required />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-gray-700 font-medium">טלפון</label>
                <InputText id="phone" ref={phoneRef} type="tel" className="w-full p-inputtext-lg" required />
              </div>
            </>
          )}

<div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-gray-700 font-medium">שם משתמש</label>
                <InputText id="username" ref={usernameRef} className="w-full p-inputtext-lg" required />
              </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium">סיסמה</label>
            <Password 
  id="password" 
  className="w-full p-inputtext-lg" 
  toggleMask 
  required 
  onChange={(e) => (passwordRef.current = e.target.value)} 
/>

          </div>

          <Button
            label={isLogin ? "🔑 התחבר" : "🚀 הירשם"}
            icon={isLogin ? "pi pi-sign-in" : "pi pi-user-plus"}
            type="submit"
            className="w-full p-button-lg p-button-rounded p-button-primary mt-3"
          />
        </form>

        <Divider />
        <p className="text-center text-gray-600">
          {isLogin ? "אין לך חשבון?" : "כבר רשום?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="block w-full text-blue-600 font-medium hover:underline mt-2"
          >
            {isLogin ? "הירשם כאן" : "התחבר כאן"}
          </button>
        </p>
      </Card>
    </div>
  );
};

export default AuthPage;
