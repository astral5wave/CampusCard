# CampusCard (Student ID Card Generator)

A React-based web application that allows universities to create student ID cards with multiple templates, barcode integration, and download options in PNG or PDF format.

**Note:** The website supports light and dark mode, but the ID card designs themselves remain the same across themes.

---


## Features

- **Student Information**
  - Fill in student details along with his/her photo, and university information.

- **ID Card Templates**
  - 5 different templates to choose from
  - Mix of portrait and landscape modes
  - Real-time preview

- **Download Options**
  - **PNG:** Front and back of the ID included in a zip file (generated using **FileSaver** + **JSZip**)
  - **PDF:** Front and back included on the same page (generated using **jsPDF**)

- **Barcode Integration**
  - Each ID card includes a barcode of the student registration number
  - Useful for scanning in campus facilities like library or canteen

- **Theme Toggle**
  - Switch between light and dark mode for the website interface (ID card design is persistent)

---

## Tech Stack

- **React.js** – Frontend framework  
- **Tailwind CSS** – Styling  
- **JavaScript (ES6+)** – Logic  
- **FileSaver + JSZip** – PNG download  
- **jsPDF** – PDF download  

---
## How to Use

1. Fill in the student and university details on the input page.
2. Preview the ID card using one of the 5 available templates.
3. Download the ID card as **PNG** (zip with front/back) or **PDF** (single page with front/back).
4. Toggle the website theme between light and dark mode for comfortable viewing.
5. Use the barcode on the ID card for campus scanning needs.

---

## Screenshots

### Student Details Input ( Dark mode )
<img src="https://github.com/user-attachments/assets/539081b3-13ba-4c2c-8f7c-5b6a34f2e41e" width="700" />

### Student Details Input ( Light mode )
<img src="https://github.com/user-attachments/assets/e714a021-4a41-467d-b1ad-e8c07c205de7" width="700" />

### Template Preview ( Landscape )
<img src="https://github.com/user-attachments/assets/c82967ab-e50e-4755-a3f9-3d02e593c7b4" width="700" />

### Template Preview ( Portrait )
<img src="https://github.com/user-attachments/assets/a7d0ff9f-f2c0-40b2-acdf-5523adaf42da" width="700" />

### Download Options ( PDF )
<img src="https://github.com/user-attachments/assets/0a69e033-d660-458c-ae0a-6b071e519a4f" width="700" />

### Download Options ( PNG )
<img src="https://github.com/user-attachments/assets/a24b0762-80ac-4c02-b491-7a7a12291ea6" width="700" />

