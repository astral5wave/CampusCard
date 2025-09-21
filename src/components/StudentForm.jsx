import { useRef, useReducer } from "react";
import {
  FaEdit,
  FaRegEye,
  FaMoon,
  FaSun,
  FaCamera,
  FaUser,
  FaIdCard,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaSchool,
  FaUniversity,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getDepartments,
  getSchools,
  getSchoolAcronym,
  getDepartmentAcronym,
} from "../utils/universityStructureHelper";
import { getStates, getDistricts } from "../utils/statesAndDistrictHelper";
import ProfileImageModal from "./ProfileImageModal";

const initialState = {
  image: null,
  imageModal: false,
  name: "",
  registrationNumber: "",
  schoolName: "",
  departmentName: "",
  fatherName: "",
  dateOfBirth: null,
  phoneNumber: "",
  email: "",
  stateName: "",
  districtName: "",
  universityName: "",
  universityAddress: "",
  universityEmail: "",
  universityPhone: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_IMAGE":
      return { ...state, image: action.value };
    case "TOGGLE_MODAL":
      return { ...state, imageModal: action.value };
    case "SET_ERROR":
      return { ...state, error: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const StudentForm = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const {
    image,
    imageModal,
    name,
    registrationNumber,
    schoolName,
    departmentName,
    fatherName,
    dateOfBirth,
    phoneNumber,
    email,
    stateName,
    districtName,
    universityName,
    universityAddress,
    universityEmail,
    universityPhone,
    error,
  } = state;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) dispatch({ type: "SET_IMAGE", value: file });
  };

  const handleSubmit = async () => {
    if (
      !image ||
      !name ||
      !registrationNumber ||
      !schoolName ||
      !departmentName ||
      !fatherName ||
      !dateOfBirth ||
      !phoneNumber ||
      !email ||
      !stateName ||
      !districtName ||
      !universityName ||
      !universityAddress ||
      !universityEmail ||
      !universityPhone
    ) {
      dispatch({ type: "SET_ERROR", value: "All fields are required" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,4}[-\s]?|)?\d{10}$/;

    if (!emailRegex.test(email)) {
      dispatch({ type: "SET_ERROR", value: "Invalid student email" });
      return;
    }
    if (!emailRegex.test(universityEmail)) {
      dispatch({ type: "SET_ERROR", value: "Invalid university email" });
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      dispatch({ type: "SET_ERROR", value: "Invalid student phone number" });
      return;
    }
    if (!phoneRegex.test(universityPhone)) {
      dispatch({ type: "SET_ERROR", value: "Invalid university phone number" });
      return;
    }
    dispatch({ type: "SET_ERROR", value: "" });

    const studentInfo = {
      name,
      registrationNumber,
      schoolName,
      schoolAcronym: getSchoolAcronym(schoolName),
      departmentName,
      departmentAcronym: getDepartmentAcronym(schoolName, departmentName),
      fatherName,
      stateName,
      districtName,
      phoneNumber,
      email,
      dateOfBirth,
    };

    const universityInfo = {
      universityName,
      universityAddress,
      universityEmail,
      universityPhone,
    };

    const imageDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });

    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
    localStorage.setItem("universityInfo", JSON.stringify(universityInfo));
    localStorage.setItem("studentImage", imageDataUrl);

    navigate("/studentCard");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "gradient-bg"
      }`}
    >
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 btn-secondary p-3 rounded-lg shadow-md"
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-blue-400" />
        )}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card-modern w-full max-w-4xl p-8 md:p-10 space-y-8 rounded-lg"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-theme">
          Create Student ID Card
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaUser className="text-pink-500" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "name",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaIdCard className="text-purple-500" /> Registration Number
            </label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "registrationNumber",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter your roll number"
            />
          </div>

          <div className="md:col-span-2 border-t border-[var(--border-light)] my-2"></div>
          <div className="inputField md:col-span-2 rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2 mb-2">
              <FaSchool className="text-fuchsia-500" /> School & Department
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                className="selectbox flex-1 rounded-lg"
                value={schoolName}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "schoolName",
                    value: e.target.value,
                  })
                }
              >
                <option value="">School</option>
                {getSchools().map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className="selectbox flex-1 rounded-lg"
                value={departmentName}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "departmentName",
                    value: e.target.value,
                  })
                }
              >
                <option value="">Department</option>
                {getDepartments(schoolName).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="inputField md:col-span-2 rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" /> State & District
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                className="selectbox flex-1 rounded-lg"
                value={stateName}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "stateName",
                    value: e.target.value,
                  })
                }
              >
                <option value="">State</option>
                {getStates().map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className="selectbox flex-1 rounded-lg"
                value={districtName}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "districtName",
                    value: e.target.value,
                  })
                }
              >
                <option value="">District</option>
                {getDistricts(stateName).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaPhone className="text-green-500" /> Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "phoneNumber",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter phone number"
            />
          </div>

          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaEnvelope className="text-red-500" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "email",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter email address"
            />
          </div>

          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaUser className="text-blue-500" /> Father's Name
            </label>
            <input
              type="text"
              value={fatherName}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "fatherName",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter parent's name"
            />
          </div>

          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaCalendarAlt className="text-orange-500" /> Date of Birth
            </label>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "dateOfBirth",
                  value: date,
                })
              }
              dateFormat="dd/MM/yyyy"
              className="inputBox w-full rounded-lg"
              placeholderText="Select D.O.B"
              showYearDropdown
              showMonthDropdown
              maxDate={new Date()}
            />
          </div>

          <div className="md:col-span-2 border-t border-[var(--border-light)] my-2"></div>

          <h2 className="md:col-span-2 font-bold text-theme text-lg flex items-center gap-2">
            <FaUniversity className="text-indigo-500" /> University Information
          </h2>

          <div className="inputField md:col-span-2 rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaUniversity className="text-indigo-500" /> University Name
            </label>
            <input
              type="text"
              value={universityName}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "universityName",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter university name"
            />
          </div>

          <div className="inputField md:col-span-2 rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" /> University Address
            </label>
            <input
              type="text"
              value={universityAddress}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "universityAddress",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter university full address"
            />
          </div>

          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaEnvelope className="text-red-500" /> University Email
            </label>
            <input
              type="email"
              value={universityEmail}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "universityEmail",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter university email"
            />
          </div>

          <div className="inputField rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaPhone className="text-green-500" /> University Phone
            </label>
            <input
              type="tel"
              value={universityPhone}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "universityPhone",
                  value: e.target.value,
                })
              }
              className="inputBox rounded-lg"
              placeholder="Enter university phone"
            />
          </div>

          <div className="md:col-span-2 border-t border-[var(--border-light)] my-2"></div>
          <div className="inputField md:col-span-2 rounded-lg">
            <label className="text-theme font-medium flex items-center gap-2">
              <FaCamera className="text-indigo-500" /> Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            {!image ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                className="btn-primary w-full py-3 rounded-lg"
                onClick={() => inputRef.current.click()}
              >
                Upload Profile Image
              </motion.button>
            ) : (
              <div className="flex items-center justify-between w-full p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-light)]">
                <span className="truncate max-w-[200px]">{image?.name}</span>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    type="button"
                    onClick={() => inputRef.current.click()}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                  >
                    <FaEdit className="text-blue-600 text-xl" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    type="button"
                    onClick={() =>
                      dispatch({ type: "TOGGLE_MODAL", value: true })
                    }
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
                  >
                    <FaRegEye className="text-green-600 text-xl" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </form>

        {error && (
          <div className="text-center text-red-500 mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <span className="font-semibold">* {error}</span>
          </div>
        )}

        <div className="flex items-center gap-10 justify-center-safe">
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="btn-primary px-10 py-3 text-lg font-bold shadow-md rounded-lg"
              onClick={() => dispatch({ type: "RESET" })}
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              }}
            >
              Reset
            </motion.button>
          </div>

          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="btn-primary px-10 py-3 text-lg font-bold shadow-md rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {imageModal && (
        <ProfileImageModal
          image={image}
          setImageModal={(val) =>
            dispatch({ type: "TOGGLE_MODAL", value: val })
          }
        />
      )}
    </div>
  );
};

export default StudentForm;
