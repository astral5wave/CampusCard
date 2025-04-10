

import React, { useRef, useState } from 'react';
import { FaEdit, FaRegEye } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const [image, setImage] = useState();
  const [imageModal, setImageModal] = useState(false);
  const inputRef = useRef(null);
  const [name,setName]=useState();
  const [rollNumber,setRollNumber]=useState();
  const [rackNumber,setRackNumber]=useState();
  const [classNumber,setClassNumber]=useState();
  const [divisionVal,setDivisionVal]=useState();
  const [allergies,setAllergies]=useState();
  const [routeNumber,setRouteNumber]=useState();
  const [error,setError]=useState();

  const navigate=useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if(!image || !name || !rollNumber || !rackNumber || !classNumber || !divisionVal || !allergies ||!routeNumber){
      setError("All fileds are required");
      return;
    }
    setError("");
    const studentInfo={
      name:name,
      rollNumber:rollNumber,
      rackNumber:rackNumber,
      classNumber:classNumber,
      divisionVal:divisionVal,
      allergies:allergies,
      routeNumber:routeNumber
    }
    const imageDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
    localStorage.setItem("studentImage", imageDataUrl);
    navigate("/studentCard")
  };

  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 px-6 py-10'>
      <div className='bg-white shadow-2xl rounded-3xl w-[80vw] max-h-screen p-10 relative border border-slate-200 '>
        <h1 className='text-5xl font-bold text-center text-slate-800 mb-10'>Enter Student Record</h1>
        <form className='grid grid-cols-2 gap-6'>
          <div className='inputField'>
            <label>Name:</label>
            <input type='text' name='name' value={name} className='inputBox' placeholder='Enter your full name'
            onChange={(e)=>{
              setName(e.target.value);
            }} />
          </div>
          <div className='inputField'>
            <label>Roll Number:</label>
            <input type='text' name='rollNumber' value={rollNumber} className='inputBox' placeholder='Enter your Roll Number' onChange={(e)=>{
              setRollNumber(e.target.value);
            } }/>
          </div>
          <div className='inputField'>
            <label>Rack Number:</label>
            <input type='text' name='rackNumber' value={rackNumber} className='inputBox' placeholder='Enter your Rack Number' onChange={(e)=>{
              setRackNumber(e.target.value);
            }} />
          </div>
          <div className='inputField'>
            <label>Class:</label>
            <select name='classDivision' className='selectbox w-1/3' value={classNumber} onChange={(e)=>{
              setClassNumber(e.target.value)
            }}>
              <option value="">Select</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <label>Division:</label>
            <select name='division' className='selectbox w-1/3' value={divisionVal} onChange={(e)=>{
              setDivisionVal(e.target.value)
            }}>
              <option value="">Select</option>
              {['A', 'B', 'C'].map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className='inputField'>
            <label>Allergies:</label>
            <select name='allergies' className='selectbox' value={allergies} onChange={(e)=>{
              setAllergies(e.target.value)
            }}>
              <option value="">Select</option>
              {['Peanuts', 'Dairy', 'Gluten', 'Seafood', 'Others','None'].map((a, i) => (
                <option key={i} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className='inputField'>
            <label>Bus Route Number:</label>
            <select name='busRoute' className='selectbox' value={routeNumber} onChange={(e)=>{
              setRouteNumber(e.target.value)
            }}>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{`Route ${r}`}</option>
              ))}
            </select>
          </div>
          <div className='inputField mb-0'>
            <label>Choose Photo:</label>
            <input
              type='file'
              accept='image/*'
              ref={inputRef}
              onChange={handleImageChange}
              className='hidden'
            />
            {!image ? (
              <button
                type='button'
                className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300'
                onClick={() => inputRef.current.click()}
              >
                Choose Profile Image
              </button>
            ) : (
              <div className='flex items-center gap-3 justify-between w-3/4'>
                <div className='truncate max-w-[300px] text-slate-700 font-medium'>
                  {image?.name}
                </div>
                <div className='flex gap-3'>
                  <button type='button' onClick={() => inputRef.current.click()}>
                    <FaEdit className='text-indigo-500 text-2xl hover:text-indigo-700 transition' />
                  </button>
                  <button type='button' onClick={() => setImageModal(true)}>
                    <FaRegEye className='text-blue-600 text-2xl hover:text-blue-800 transition' />
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
        {
          error && <div className='text-sm text-red-500'>
            *{error}
          </div>
        }
        <div className='absolute bottom-6 right-10'>
          <button
            type='button'
            className='bg-red-500 hover:bg-red-600 text-xl font-bold px-6 py-3 rounded-full text-white shadow-lg transition-all duration-300'
           onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {imageModal && <ImageModal image={image} setImageModal={setImageModal} />}
    </div>
  );
};

const ImageModal = ({ image, setImageModal }) => {
  let objectUrl;
  try {
    objectUrl = URL.createObjectURL(image);
  } catch (error) {
    console.log(error.message);
    objectUrl = null;
  }
  return (
    objectUrl && (
      <div className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center'>
        <button
          type='button'
          onClick={() => setImageModal(false)}
          className='absolute top-8 right-8 border-2 border-transparent hover:border-white rounded-full p-2 flex items-center justify-center transition-all duration-200'
        >
          <IoMdClose className='text-4xl text-white' />
        </button>
        <img
          src={objectUrl}
          alt='profileImage'
          className='max-w-[80%] max-h-[80%] rounded-lg shadow-lg border border-white'
        />
      </div>
    )
  );
};

export default StudentForm;
