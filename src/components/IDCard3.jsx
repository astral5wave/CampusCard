import { motion } from "framer-motion";
import Barcode from "react-barcode";
import {
  FaIdCard,
  FaSchool,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const IDCard3 = ({ studentImage, studentInfo,universityInfo }) => {
  const barcodeData = `${studentInfo.rollNumber}`;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 justify-center w-full h-full">
      <motion.div
        id="front-id"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-[280px] h-[420px] overflow-hidden rounded-3xl shadow-md flex flex-col"
        style={{
          background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
        }}
      >
        <div className="p-3 text-center bg-white/10">
          <h3 className="text-sm font-bold text-white tracking-wide">
            {universityInfo.universityName}
          </h3>
        </div>

        <div className="flex flex-col items-center p-4">
          <img
            src={studentImage}
            alt="student"
            className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <h2 className="text-lg font-bold text-white mt-3">
            {studentInfo.name}
          </h2>
          <p className="text-xs text-gray-200">
            {studentInfo.schoolAcronym} | {studentInfo.departmentAcronym}
          </p>
        </div>

        <div className="flex-1 px-4 py-2 text-sm text-white space-y-2">
          <div className="flex items-center gap-2">
            <FaIdCard size={16} />{" "}
            <span>{studentInfo.registrationNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaSchool size={16} />{" "}
            <span className="truncate">{studentInfo.departmentName}</span>
          </div>
          {studentInfo.dateOfBirth && (
            <div className="flex items-center gap-2">
              <FaCalendarAlt size={16} />{" "}
              <span>{new Date(studentInfo.dateOfBirth).toLocaleDateString()}</span>
            </div>
          )}
          {studentInfo.phoneNumber && (
            <div className="flex items-center gap-2">
              <FaPhone size={16} /> <span>{studentInfo.phoneNumber}</span>
            </div>
          )}
          {studentInfo.email && (
            <div className="flex items-center gap-2 break-all">
              <FaEnvelope size={16} />{" "}
              <span className="truncate">{studentInfo.email}</span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        id="back-id"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative w-[280px] h-[420px] overflow-hidden rounded-3xl shadow-md flex flex-col"
        style={{
          background: "linear-gradient(135deg, #1f2937, #111827)",
        }}
      >
        <div className="p-3 text-center bg-white/10">
          <h3 className="text-sm font-bold text-white tracking-wide">
            University Information
          </h3>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-6 text-white space-y-3">
          <FaSchool className="text-3xl mb-2 text-white" />
          <h2 className="text-lg font-bold text-center">
            {studentInfo.schoolName} ({studentInfo.schoolAcronym})
          </h2>
          <div className="text-xs text-center space-y-2">
            <p className="flex items-start gap-2 text-left">
              <FaMapMarkerAlt size={16} className="mt-0.5 shrink-0" />
              <span>{universityInfo.universityAddress}</span>
            </p>
            <p className="flex items-start gap-2 text-left">
              <FaEnvelope size={16} className="mt-0.5 shrink-0" />
              <span>{universityInfo.universityEmail}</span>
            </p>
            <p className="flex items-start gap-2 text-left">
              <FaPhone size={16} className="mt-0.5 shrink-0" />
              <span>{universityInfo.universityPhone}</span>
            </p>
          </div>
        </div>

        <div className="bg-white/10 py-3 flex flex-col items-center space-y-2">
          <p className="text-xs italic text-white text-center px-3">
            "Empowering Students Through Innovation & Education"
          </p>
          <Barcode value={barcodeData} height={40} width={1} displayValue={false} />
        </div>
      </motion.div>
    </div>
  );
};

export default IDCard3;
