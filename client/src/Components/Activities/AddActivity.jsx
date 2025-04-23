import React, { useRef } from 'react';

const AddActivity = () => {
     const nameRef = useRef("")
      const description = useRef("")
      const imageSrcRef = useRef("")
      const type = useRef("")
  
  
    return (
        <div>
            <h1>הוספת אטרקציה</h1>
            <div className="flex flex-column gap-2">
                <label htmlFor="name">שם האטרקציה</label>
                <input type="text" id="name" ref={nameRef} />
                <label htmlFor="description">תיאור האטרקציה</label>
                <input type="text" id="description" ref={description} />
                <label htmlFor="imageSrc">כתובת התמונה</label>
                <input type="text" id="imageSrc" ref={imageSrcRef} />
                <label htmlFor="type">סוג האטרקציה</label>
                <input type="text" id="type" ref={type} />
            </div>
            <button>הוסף אטרקציה</button>
        </div>
    );
};

export default AddActivity;