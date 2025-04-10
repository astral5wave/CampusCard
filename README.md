# Smart Student ID Generator

A ReactJS project to generate smart student ID cards with customizable templates, QR code generation, and PNG download support.

## Tech Stack

- ReactJS 18+
- TailwindCSS
- `qrcode.react` for QR code
- `html-to-image` for downloading as PNG
- `localStorage` for persistent data

## Features

- **Student Data Form**  
  Includes:
  - Name  
  - Roll Number  
  - Class & Division (dropdown)  
  - Allergies (multi-select)  
  - Photo Upload (with preview)  
  - Rack Number  
  - Bus Route Number (dropdown)  

- **Smart ID Card Preview**  
  Displays submitted data along with:
  - QR Code (with full JSON)
  - Photo
  - Rack & Bus info
  - Allergy details (if any)
  - Download as PNG

- **Template Switching**  
  Two design templates:
  - One with front only
  - One with both front and back

- **Persistent Data**  
  Data is saved in `localStorage` so other routes can access it without passing props or using context.

## Thought Process

To simplify data flow across components and routes, I used `localStorage` to store submitted student data. This allows protected routes to access the data without relying on props or context API.

For the QR code, `qrcode.react` is used to encode the full student data as JSON.

During the download process:
- If the selected theme has only the front side, only that is downloaded.
- If the theme has both front and back, both are downloaded one after the other.
