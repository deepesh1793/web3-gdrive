import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const jsw = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZjYxMWU2Yy1mNWQ0LTQ0NjItYjhjMS0yNGExZWI1OWQ1MDkiLCJlbWFpbCI6ImRlZXBlc2gxNzkzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0ZjdmNzY3NzA3MzA0ZTgzMjJkZiIsInNjb3BlZEtleVNlY3JldCI6Ijc4ZTg4NDhjZGZlYTZmNDQ0M2E1NzJjZTgzNzRmZGZmNDI3OWFkNzczN2Q2MmQ4ZmJiMGFjYTE3NDczNTRlMjkiLCJpYXQiOjE3MDkzMTE2Nzl9.WqkOjLnLUapODr_DojpcSzmbcnv7kNDt7SI6UgVsBbk"
const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZjYxMWU2Yy1mNWQ0LTQ0NjItYjhjMS0yNGExZWI1OWQ1MDkiLCJlbWFpbCI6ImRlZXBlc2gxNzkzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0ZjdmNzY3NzA3MzA0ZTgzMjJkZiIsInNjb3BlZEtleVNlY3JldCI6Ijc4ZTg4NDhjZGZlYTZmNDQ0M2E1NzJjZTgzNzRmZGZmNDI3OWFkNzczN2Q2MmQ4ZmJiMGFjYTE3NDczNTRlMjkiLCJpYXQiOjE3MDkzMTE2Nzl9.WqkOjLnLUapODr_DojpcSzmbcnv7kNDt7SI6UgVsBbk`,
                    },
                    body: formData,
                });
                const resData = await res.json();
                console.log(resData);

                const ImgHash = `ipfs://${resData.IpfsHash}`;
                contract.add(account, ImgHash);
                //console.log(ImgHash);
                alert("Successfully Image Uploaded");
            } catch (e) {
                alert("Unable to upload image to Pinata");
                console.log(e)
            }
        }

        setFileName("No image selected");
        setFile(null);
    };
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                    Choose Image
                </label>
                <input
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={retrieveFile}
                />
                <span className="textArea">Image: {fileName}</span>
                <button type="submit" className="upload" disabled={!file}>
                    Upload File
                </button>
            </form>
        </div>
    );
};
export default FileUpload;