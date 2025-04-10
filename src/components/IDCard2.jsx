import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

const IDCard2 = ({ studentImage, studentInfo }) => {
    return (
        <div className='flex items-center gap-10 justify-center w-full h-full p-4'>
            <div className='relative flex h-[90%] w-full' id="id2">
                <div className='relative flex items-center justify-center bg-white rounded-l-xl shadow-lg h-full w-2/3 overflow-hidden border-l-2 border-t-2 border-b-2 border-gray-200'>
                    <div className='absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-600 to-emerald-500'></div>
                    <div className='absolute left-8 top-1/2 transform -translate-y-1/2'>
                        <div className='relative'>
                            <img
                                src={studentImage}
                                alt='student'
                                className='h-40 w-40 object-cover rounded-md border-4 border-white shadow-xl'
                            />
                            <div className='absolute -inset-2 border-2 border-blue-400 rounded-md z-0'></div>
                        </div>
                    </div>
                    <div className='ml-56 pr-8 w-full'>
                        <div className='mb-6'>
                            <h1 className='text-3xl font-bold text-gray-800'>{studentInfo.name}</h1>
                            <p className='text-sm text-gray-500 uppercase tracking-wider'>Student ID</p>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className='text-xs text-gray-500 uppercase'>Roll No</p>
                                <p className='font-semibold text-gray-700'>{studentInfo.rollNumber}</p>
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase'>Class</p>
                                <p className='font-semibold text-gray-700'>{studentInfo.classNumber} {studentInfo.divisionVal}</p>
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase'>Rack No</p>
                                <p className='font-semibold text-gray-700'>{studentInfo.rackNumber}</p>
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase'>Route</p>
                                <p className='font-semibold text-gray-700'>{studentInfo.routeNumber}</p>
                            </div>
                        </div>

                        {studentInfo.allergies && (
                            <div className='mt-6 p-3 bg-red-50 rounded-md border-l-4 border-red-400'>
                                <p className='text-xs text-gray-500 uppercase'>Medical Note</p>
                                <p className='text-sm font-medium text-red-600'>{studentInfo.allergies}</p>
                            </div>
                        )}
                    </div>
                    <div className='absolute bottom-4 right-4'>
                        <div className='text-right'>
                            <p className='text-xs text-gray-400'>Issued by</p>
                            <p className='text-sm font-semibold text-gray-600'>Unity Public School</p>
                        </div>
                    </div>
                </div>
                <div className='relative bg-gradient-to-b from-gray-50 to-white rounded-r-xl shadow-lg h-full w-1/3 overflow-hidden border-r-2 border-t-2 border-b-2 border-gray-200 p-6 flex flex-col'>
                    <div className='absolute top-0 right-0 w-16 h-16 bg-blue-500 opacity-10 rounded-bl-full'></div>
                    <div className='absolute bottom-0 left-0 w-16 h-16 bg-emerald-500 opacity-10 rounded-tr-full'></div>
                    <div className='text-center mb-6'>
                        <h2 className='text-xl font-bold text-gray-800 mb-1'>UNITY PUBLIC SCHOOL</h2>
                        <p className='text-xs text-gray-600'>42, Knowledge Avenue, Pune, MH - 411001</p>
                    </div>
                    <div className='flex-1 flex flex-col items-center justify-center'>
                        <div className='mb-4 p-3 bg-white rounded-md shadow-inner border border-gray-200'>
                            <QRCodeSVG
                                value={JSON.stringify(studentInfo)}
                                size={140}
                                level='H'
                                bgColor='#ffffff'
                                fgColor='#111827'
                            />
                        </div>
                        <p className='text-xs text-center text-gray-500 px-4'>
                            Scan this QR code to verify student identity and access emergency information
                        </p>
                    </div>
                    <div className='mt-auto text-center'>
                        <p className='text-xs text-gray-500 mb-1'>In case of emergency, please contact:</p>
                        <p className='text-xs font-medium text-gray-700'>info@unityschool.edu | +91 98765 43210</p>
                    </div>
                    <div className='absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-emerald-500'></div>
                </div>
            </div>
        </div>
    );
};

export default IDCard2;