import React from 'react';


const update = async () => {
    const nameRef = useRef(null)
    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const addressRef = useRef(null)
    const phoneRef = useRef(null)
    const user = useSelector(state => state.UserSlice.user)
    const [visible, setVisible] = useState(false);
    const newuser={
        _id:user._id,
        userName:usernameRef.current.value,
        password:user.password,
        name:nameRef.current.value,
        email:emailRef.current.value,
        address:addressRef.current.value,
        phone:phoneRef.current.value,
        role:user.role
     }
       
   try {
       const res = await axios.put('http://localhost:4300/api/users',newuser)
       console.log(res.data);
       if (res.status === 200) {
           
       }
   } catch (e) {
    alert(e.response.data.message.toString())
   }


    return(
    <>
     <Button label="עדכן" icon="pi pi-pencil" onClick={() => setVisible(true)} rounded aria-label="Filter" severity='info' />
      <Dialog style={{ direction: "rtl" }}
                      visible={visible}
                      modal
                      onHide={() => { if (!visible) return; setVisible(false); }}
                      content={({ hide }) => (
                          <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
      
                              <div className="inline-flex flex-column gap-2">
                                  <label htmlFor="username" className="text-primary-50 font-semibold">
                                      שם
                                  </label>
                                  <InputText id="username" defaultValue={user.name} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={nameRef}></InputText>
                              </div>
                              <div className="inline-flex flex-column gap-2">
                                  <label htmlFor="username" className="text-primary-50 font-semibold">
                                      שם משתמש
                                  </label>
                                  <InputText id="username" defaultValue={user.userName}  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={usernameRef}></InputText>
                              </div>
                              <div className="inline-flex flex-column gap-2">
                                  <label htmlFor="username" className="text-primary-50 font-semibold">
                                      אמייל
                                  </label>
                                  <InputText id="username" defaultValue={user.email}  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={emailRef}></InputText>
                              </div>
                              <div className="inline-flex flex-column gap-2">
                                  <label htmlFor="username" className="text-primary-50 font-semibold">
                                      כתובת
                                  </label>
                                  <InputText id="username" defaultValue={user.address} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={addressRef}></InputText>
                              </div>
                              <div className="inline-flex flex-column gap-2">
                                  <label htmlFor="username" className="text-primary-50 font-semibold">
                                      טלפון
                                  </label>
                                  <InputText id="username" defaultValue={user.phone}  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={phoneRef}></InputText>
                              </div>
                              <div className="flex align-items-center gap-2">
                                  <Button label="עדכן" onClick={(e) => { update(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                  <Button label="ביטול" onClick={(e) => { hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                              </div>
                          </div>
                      )}
                  ></Dialog>
    </>

    );
}

export default UpdateUser;
