import { QRCodeSVG } from 'qrcode.react';
import React from 'react';


const IDCard1 = ({ studentImage, studentInfo }) => {
    return (
        <div className='flex items-center gap-10 justify-center w-full h-full'>

            <div id="id1.1" className='relative flex items-center justify-around bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-xl h-[90%] w-1/3 overflow-hidden border-2 border-blue-300'>

                {/* Top Slanted Gradient */}
                <div className='absolute top-[-30px] left-0 w-full h-24 bg-gradient-to-r from-blue-400 to-blue-600 transform -skew-y-6 z-0 opacity-90 rounded-br-3xl' />

                {/* Soft background shapes */}
                <div className='absolute w-44 h-44 bg-blue-200 rounded-xl bottom-[40px] left-[-60px] rotate-12 opacity-30 z-0' />
                <div className='absolute w-36 h-36 bg-indigo-100 rounded-xl top-[240px] right-[-30px] -rotate-12 opacity-20 z-0' />

                {/* Footer slanted block */}
                <div className='absolute bottom-[-20px] right-0 w-full h-16 bg-gradient-to-l from-blue-400 to-indigo-500 transform skew-y-6 z-0 opacity-90 rounded-tl-3xl' />

                {/* Card content */}
                <div className='relative z-10 h-full w-full px-4 py-4 flex flex-col items-center gap-6'>
                    <div className='mt-4'>
                        <img
                            src={studentImage}
                            alt="studentImage"
                            className='h-40 w-40 rounded-xl object-cover border-4 border-blue-300 shadow-md'
                        />
                    </div>
                    <div className='w-full px-6 py-4 bg-transparent rounded-md flex flex-col items-center tracking-wider'>
                        <h2 className='text-3xl font-extrabold text-center text-blue-900 mb-4'>{studentInfo.name}</h2>

                        <div className='grid grid-cols-[auto_20px_1fr] gap-y-2 text-lg text-gray-800 font-medium'>
                            <span className='font-bold'>Roll No</span>
                            <span>:</span>
                            <span>{studentInfo.rollNumber}</span>

                            <span className='font-bold'>Class</span>
                            <span>:</span>
                            <span>{studentInfo.classNumber} {studentInfo.divisionVal}</span>

                            <span className='font-bold'>Rack No</span>
                            <span>:</span>
                            <span>{studentInfo.rackNumber}</span>

                            <span className='font-bold'>Route</span>
                            <span>:</span>
                            <span>{studentInfo.routeNumber}</span>

                            <span className='font-bold'>Allergies</span>
                            <span>:</span>
                            <span>{studentInfo.allergies}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="id1.2" className='relative flex items-center justify-around bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl h-[90%] w-1/3 overflow-hidden border-2 border-blue-300'>

                <div className='absolute top-[-30px] left-[-40px] w-40 h-40 bg-gradient-to-br from-blue-300 to-cyan-200 transform rotate-6 opacity-30 z-0 rounded-xl'></div>
                <div className='absolute bottom-[-30px] right-[-40px] w-44 h-44 bg-gradient-to-br from-indigo-200 to-blue-300 transform -rotate-6 opacity-30 z-0 rounded-xl'></div>
                <div className='absolute top-[90px] right-[10px] w-24 h-24 bg-blue-100 transform rotate-12 opacity-20 z-0 rounded-xl'></div>

                <div className='relative z-10 w-full h-full flex flex-col justify-between px-6 py-6 tracking-wide'>

                    <div className='text-center mb-4'>
                        <h2 className='text-xl font-extrabold text-blue-800'>Unity Public School</h2>
                        <p className='text-gray-700 text-sm'>42, Knowledge Avenue, Pune, MH - 411001</p>
                        <p className='text-gray-700 text-sm'>Email: info@unityschool.edu | Ph: +91 98765 43210</p>
                    </div>

                    <div className='text-center italic text-blue-600 text-sm'>
                        "Empowering Students Through Innovation & Education"
                    </div>
                    <div className='flex justify-center mt-6'>
                        <div className='bg-white p-2 rounded-xl shadow-md border border-blue-200'>
                            <QRCodeSVG value={JSON.stringify(studentInfo)} size={150} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default IDCard1;
