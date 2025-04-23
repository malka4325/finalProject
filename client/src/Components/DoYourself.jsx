import React from 'react';


const DoYourself = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        phone: ''
    });
    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };
    const update=async ()=>{
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
    return(
    <></>
    );
}

export default DoYourself;
