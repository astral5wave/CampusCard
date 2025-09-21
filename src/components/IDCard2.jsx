import { motion } from "framer-motion";
import Barcode from "react-barcode";

const IDCard2 = ({ studentImage, studentInfo, universityInfo }) => {
  const barcodeData = `${studentInfo.registrationNumber}`;

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <motion.div
        id="front-id"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-[465px] h-[293px] overflow-hidden rounded-xl shadow-lg flex flex-col bg-white border-2 border-blue-500"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rotate-45 pointer-events-none rounded-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 -rotate-12 pointer-events-none rounded-xl"></div>

        <div className="absolute top-0 left-0 w-full h-10 bg-blue-500/20 pointer-events-none flex items-center justify-center">
          <h3 className="text-sm font-bold text-blue-700 tracking-wide">
            {universityInfo.universityName}
          </h3>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-10 bg-blue-500/20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rotate-45 pointer-events-none rounded-xl"></div>

        <div className="flex flex-1 relative z-10">
          <div className="flex flex-col justify-center items-center w-1/3 p-4">
            <img
              src={studentImage}
              alt="student"
              className="h-28 w-28 rounded-xl object-cover border-4 border-blue-500 shadow-lg"
            />
            <h2 className="text-sm font-bold text-gray-800 mt-2 flex-wrap text-center">
              {studentInfo.name}
            </h2>
            <p className="text-xs text-gray-600">
              {studentInfo.schoolAcronym} | {studentInfo.departmentAcronym}
            </p>
          </div>

          <div className="flex-1 mt-6 p-6 space-y-1 text-gray-800 text-sm">
            <div>
              <p className="text-xs text-blue-600 font-semibold">Registration No. :</p>
              <p className="font-bold">{studentInfo.registrationNumber}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-semibold">Department :</p>
              <p className="font-bold">{studentInfo.departmentName}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-semibold">D.O.B :</p>
              <p className="font-bold">
                {new Date(studentInfo.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-semibold">Phone No. :</p>
              <p className="font-bold">{studentInfo.phoneNumber}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-semibold">Email :</p>
              <p className="font-bold truncate">{studentInfo.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="back-id"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-[465px] h-[293px] overflow-hidden rounded-xl shadow-lg flex flex-col justify-between p-6 bg-white border-2 border-pink-500"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rotate-45 pointer-events-none rounded-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300/20 -rotate-12 pointer-events-none rounded-xl"></div>

        <div className="absolute top-0 left-0 w-full h-10 bg-pink-500/20 pointer-events-none flex items-center justify-center">
          <h3 className="text-sm font-bold text-pink-700 tracking-wide">
            University Information
          </h3>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-10 bg-pink-500/20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rotate-45 pointer-events-none rounded-xl"></div>

        <div className="text-center text-pink-600 relative z-10 flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-1">
            {studentInfo.schoolName} ({studentInfo.schoolAcronym})
          </h2>
          <p className="text-xs">{universityInfo.universityAddress}</p>
          <p className="text-xs">{universityInfo.universityEmail}</p>
          <p className="text-xs">{universityInfo.universityPhone}</p>
        </div>

        <div className="flex flex-col items-center relative z-10">
          <p className="text-xs italic text-pink-600 mb-2 text-center">
            "Empowering Students Through Innovation & Education"
          </p>
          <Barcode
            value={barcodeData}
            height={40}
            width={1}
            displayValue={false}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default IDCard2;
