import { motion } from "framer-motion";
import Barcode from "react-barcode";

const IDCard5 = ({ studentImage, studentInfo, universityInfo }) => {
  const barcodeData = `${studentInfo.rollNumber}`;

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <motion.div
        id="front-id"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-[465px] h-[293px] overflow-hidden rounded-3xl shadow-md flex flex-col bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 border-4 border-yellow-300"
      >
        <div className="absolute top-0 left-0 w-full h-10 bg-white/10 flex items-center justify-center">
          <h3 className="text-sm font-bold text-white tracking-wide">
            {universityInfo.universityName}
          </h3>
        </div>

        <div className="flex flex-1 relative z-10">
          <div className="flex flex-col justify-center items-center w-1/3 p-4">
            <img
              src={studentImage}
              alt="student"
              className="h-28 w-28 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
            />
            <h2 className="text-sm font-bold text-white mt-2 text-center">
              {studentInfo.name}
            </h2>
            <p className="text-xs text-white">
              {studentInfo.schoolAcronym} | {studentInfo.departmentAcronym}
            </p>
          </div>

          <div className="flex-1 mt-6 p-6 space-y-1 text-white text-sm">
            <div>
              <p className="text-xs">Registration No. :</p>
              <p className="font-bold">{studentInfo.registrationNumber}</p>
            </div>
            <div>
              <p className="text-xs">Department :</p>
              <p className="font-bold">{studentInfo.departmentName}</p>
            </div>
            <div>
              <p className="text-xs">D.O.B :</p>
              <p className="font-bold">
                {new Date(studentInfo.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs">Phone No. :</p>
              <p className="font-bold">{studentInfo.phoneNumber}</p>
            </div>
            <div>
              <p className="text-xs">Email :</p>
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
        className="relative w-[465px] h-[293px] overflow-hidden rounded-3xl shadow-md flex flex-col justify-between p-6 bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-yellow-300"
      >
        <div className="absolute top-0 left-0 w-full h-10 bg-white/10 flex items-center justify-center">
          <h3 className="text-sm font-bold text-white tracking-wide">
            University Information
          </h3>
        </div>

        <div className="text-center text-white relative z-10 flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-1">
            {studentInfo.schoolName} ({studentInfo.schoolAcronym})
          </h2>
          <p className="text-xs">{universityInfo.universityAddress}</p>
          <p className="text-xs">{universityInfo.universityEmail}</p>
          <p className="text-xs">{universityInfo.universityPhone}</p>
        </div>

        <div className="flex flex-col items-center relative z-10 mb-2">
          <p className="text-xs italic text-white mb-2 text-center">
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

export default IDCard5;
