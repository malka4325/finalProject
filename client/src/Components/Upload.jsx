import React, { useState } from "react";
import axios from "axios";
import { FileUpload } from 'primereact/fileupload';
const Upload = () => {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("נא לבחור קובץ!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await axios.post("http://localhost:4300/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setImageUrl(`http://localhost:4300${response.data.imageUrl}`);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>העלה תמונה</button>
//       {imageUrl && (
//         <div>
//       {console.log(imageUrl)}
      
//           <h3>התמונה שהועלתה:</h3>
//           <img src={imageUrl} alt="Uploaded" width="300" />
//         </div>
//       )}
//     </div>
//   );
// };


        
    return (
        <div className="card">
            <FileUpload name="image" url={'http://localhost:4300/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>
    )
}
        
export default Upload;
