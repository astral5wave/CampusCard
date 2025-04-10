import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import IDCard1 from './IDCard1';
import IDCard2 from './IDCard2';
import { toPng } from 'html-to-image';

const StudentCard = () => {
  const navigate = useNavigate();
  const [studentImage, setStudentImage] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [toggleTheme, setToggleTheme] = useState(false);

  useEffect(() => {
    const image = localStorage.getItem("studentImage");
    const info = localStorage.getItem("studentInfo");

    if (!image || !info) {
      navigate("/");
    } else {
      setStudentImage(image);
      setStudentInfo(JSON.parse(info));
    }
  }, [navigate]);

  if (!studentImage || !studentInfo) {
    return null; // While redirecting or still loading
  }

  const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const handleDownload = () => {
    if (toggleTheme) {
      const id2 = document.getElementById('id2');
      if (id2) {
        toPng(id2)
          .then((dataUrl) => downloadImage(dataUrl, 'id2.png'))
          .catch((err) => console.error('Failed to generate image', err));
      }
    } else {
      const idFront = document.getElementById('id1.1');
      const idBack = document.getElementById('id1.2');

      if (idFront) {
        toPng(idFront)
          .then((dataUrl) => downloadImage(dataUrl, 'idfront.png'))
          .catch((err) => console.error('Failed to generate image', err));
      }

      if (idBack) {
        toPng(idBack)
          .then((dataUrl) => downloadImage(dataUrl, 'idback.png'))
          .catch((err) => console.error('Failed to generate image', err));
      }
    }
  };
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left: ID Card + QR */}
      <div className="w-3/4 flex items-center justify-center">
        {/* ID Card */}
        <div className='w-[95%] h-[90%] bg-white'>
          {!toggleTheme ? <IDCard1 studentImage={studentImage} studentInfo={studentInfo} /> :
            <IDCard2 studentImage={studentImage} studentInfo={studentInfo} />}
        </div>


      </div>

      {/* Right Sidebar: Toggle + Download */}
      <div className="w-1/4 bg-white border-l border-gray-200 p-6 shadow-inner flex flex-col justify-start items-center gap-4">
        <button className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300"
          onClick={() => setToggleTheme(!toggleTheme)}>
          Toggle Theme
        </button>
        <button className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-l from-green-500 to-indigo-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300"
          onClick={handleDownload}>
          Download ID Card
        </button>
        <div className='h-full flex items-center justify-center'>
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex flex-col items-center gap-2">
            <QRCodeSVG value={JSON.stringify(studentInfo)} size={300} level='L' />
            {/* <p className='text-xl font-bold text-slate-900'>Student QR</p> */}
          </div>
        </div>
        <button className="inline-flex  items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold shadow-md hover:bg-rose-600 transition duration-300"
          onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    </div>
  );

}

export default StudentCard