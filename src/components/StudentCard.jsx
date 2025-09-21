import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCopy,
  FaDownload,
  FaHome,
  FaMoon,
  FaSun,
  FaSave,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import IDCard1 from "./IDCard1";
import IDCard2 from "./IDCard2";
import IDCard3 from "./IDCard3";
import IDCard4 from "./IDCard4";
import IDCard5 from "./IDCard5";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import Barcode from "react-barcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const StudentCard = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [studentImage, setStudentImage] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [universityInfo, setUniversityInfo] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  useEffect(() => {
    const image = localStorage.getItem("studentImage");
    const stdInfo = localStorage.getItem("studentInfo");
    const uniInfo = localStorage.getItem("universityInfo");
    if (!image || !stdInfo || !uniInfo) {
      navigate("/");
    } else {
      setStudentImage(image);
      setStudentInfo(JSON.parse(stdInfo));
      setUniversityInfo(JSON.parse(uniInfo));
    }
  }, [navigate]);

  if (!studentImage || !studentInfo || !universityInfo) return null;

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    const frontDiv = document.getElementById("front-id");
    const backDiv = document.getElementById("back-id");

    if (!frontDiv || !backDiv) return;

    const frontData = await toPng(frontDiv, { pixelRatio: 3 });
    const backData = await toPng(backDiv, { pixelRatio: 3 });

    zip.file(
      `id-template-${selectedTemplate}-front.png`,
      frontData.split(",")[1],
      { base64: true }
    );
    zip.file(
      `id-template-${selectedTemplate}-back.png`,
      backData.split(",")[1],
      { base64: true }
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${studentInfo.registrationNumber}.zip`);
  };

  const handlePDFDownload = async () => {
    const frontDiv = document.getElementById("front-id");
    const backDiv = document.getElementById("back-id");

    if (!frontDiv || !backDiv) return;

    const frontImage = await toPng(frontDiv, { pixelRatio: 3 });
    const backImage = await toPng(backDiv, { pixelRatio: 3 });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const portrait = { w: 280 * 0.264583, h: 420 * 0.264583 };
    const landscape = { w: 465 * 0.264583, h: 293 * 0.264583 };

    const getCardDims = (div) => {
      const rect = div.getBoundingClientRect();
      return rect.width > rect.height ? landscape : portrait;
    };

    const frontDims = getCardDims(frontDiv);
    const backDims = getCardDims(backDiv);
    const gap = 5;
    const totalHeight = frontDims.h + backDims.h + gap;
    const startY = (pageHeight - totalHeight) / 2;

    const frontX = (pageWidth - frontDims.w) / 2;
    const backX = (pageWidth - backDims.w) / 2;

    pdf.addImage(frontImage, "PNG", frontX, startY, frontDims.w, frontDims.h);
    pdf.addImage(
      backImage,
      "PNG",
      backX,
      startY + frontDims.h + gap,
      backDims.w,
      backDims.h
    );

    pdf.save(`${studentInfo.registrationNumber}.pdf`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(studentInfo, null, 2));
    alert("Student info copied to clipboard!");
  };

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return (
          <IDCard1
            studentImage={studentImage}
            studentInfo={studentInfo}
            universityInfo={universityInfo}
          />
        );
      case 2:
        return (
          <IDCard2
            studentImage={studentImage}
            studentInfo={studentInfo}
            universityInfo={universityInfo}
          />
        );
      case 3:
        return (
          <IDCard3
            studentImage={studentImage}
            studentInfo={studentInfo}
            universityInfo={universityInfo}
          />
        );
      case 4:
        return (
          <IDCard4
            studentImage={studentImage}
            studentInfo={studentInfo}
            universityInfo={universityInfo}
          />
        );
      case 5:
        return (
          <IDCard5
            studentImage={studentImage}
            studentInfo={studentInfo}
            universityInfo={universityInfo}
          />
        );
      default:
        return (
          <IDCard1
            studentImage={studentImage}
            studentInfo={studentInfo}
            universityInfo={universityInfo}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300`}
    >
      <header className="bg-primary backdrop-blur-md border-b-light px-6 py-3 shadow-sm flex items-center justify-between">
        <h1 className="text-xl font-bold text-theme">Student ID Generator</h1>
        <button onClick={toggleTheme} className="btn-secondary p-2 rounded-lg">
          {isDarkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-blue-400" />
          )}
        </button>
      </header>

      <div className="flex flex-1 bg-secondary">
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div
            className=" bg-primary max-w-3xl flex items-center justify-around py-2 px-4 overflow-hidden rounded-lg border border-gray-200 shadow-md"
          >
            {renderSelectedTemplate()}
          </div>
        </div>

        <aside className="w-80 card-modern p-6 m-6 flex flex-col gap-6 rounded-lg border border-gray-200">
          <div>
            <label className="text-theme font-semibold flex items-center gap-2 mb-2">
              Choose Template
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedTemplate(num)}
                  className={`p-3 btn-secondary rounded-lg border text-sm font-medium transition-all ${
                    selectedTemplate === num
                      ? "border-pink-500 bg-pink-50 text-pink-600 shadow-sm"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownloadZip}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2 rounded-lg"
            >
              <FaDownload /> PNG
            </button>
            <button
              onClick={handlePDFDownload}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white"
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              }}
            >
              <FaSave /> PDF
            </button>
            <button
              onClick={copyToClipboard}
              className="btn-secondary w-full flex items-center justify-center gap-2 py-2 rounded-lg"
            >
              <FaCopy /> Copy Data
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("studentImage");
                localStorage.removeItem("studentInfo");
                localStorage.removeItem("universityInfo");
                navigate("/")
              }}
              className="btn-secondary w-full flex items-center justify-center gap-2 py-2 rounded-lg"
            >
              <FaHome /> Create New
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 pt-4 border-t border-gray-200">
            <Barcode
              value={studentInfo.registrationNumber}
              height={60}
              displayValue={true}
            />
            <p className="text-theme-secondary text-xs font-medium">
              Student Barcode
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StudentCard;
