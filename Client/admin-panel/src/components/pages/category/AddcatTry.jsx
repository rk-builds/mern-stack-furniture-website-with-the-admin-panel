import React, { useRef, useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import axios from 'axios';
import Nav from '../../common/Nav';

export default function Addcat() {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (!f) return;
    // set preview
    setPreview(URL.createObjectURL(f));
    // put file into the hidden input's files using DataTransfer
    if (inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(f);
      inputRef.current.files = dt.files;   // <-- key line
      console.log('inputRef.current.files after drop:', inputRef.current.files);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setPreview(URL.createObjectURL(f));
  };

  const saveCategory = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    // debug - check the input's files directly
    console.log('inputRef files at submit:', inputRef.current ? inputRef.current.files : null);
    console.log('form entries:', [...form.entries()]); // should contain categoryImage: File
    axios.post(`${apiBaseUrl}category/create`, form)
      .then(r => r.data)
      .then(res => console.log('server:', res))
      .catch(err => console.error(err));
  };

  return (
    <>
      <Nav navlinks={[{label:'category', href:'/category/add'}, {label:'Add', href:'/category/add'}]} />
      <form onSubmit={saveCategory} encType="multipart/form-data">
        <div onDragOver={(e)=>e.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed w-64 h-64 flex items-center justify-center">
          {preview ? (
            <>
              <img src={preview} alt="preview" className="max-h-full" />
              <button type="button" onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = null; }}>X</button>
            </>
          ) : (
            <>
              <div className="text-center">
                <MdDriveFolderUpload className="text-4xl" />
                <p>Drag & Drop file here</p>
                <p>or click to upload</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                name="categoryImage"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>

        <input name="categoryName" placeholder="Category Name" />
        <input name="categoryOrder" type="number" placeholder="Order" />

        <button type="submit">Add Category</button>
      </form>
    </>
  );
}
