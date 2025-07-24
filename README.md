A fully responsive and beginner-friendly resume builder that allows users to create and download a professional resume as a PDF. Built using HTML, CSS, Bootstrap, and JavaScript, this project operates entirely in the browser without requiring login or backend support.

✨ Features

Dynamic Form Builder: Add multiple entries for education, experience, skills, achievements, and projects.

Live Preview: Automatically generates a styled resume layout using user input.

PDF Export: Converts the resume to a downloadable PDF using html2canvas and jsPDF.

No Backend Needed: All operations are done client-side, making it lightweight and secure.

Responsive Design: Mobile-friendly using Bootstrap 5.

🚀 Quick Start

Prerequisites

Modern web browser (Chrome, Firefox, Edge)

Internet connection to load Bootstrap and JS libraries via CDN

Run the App

You can run the project locally without any installation:

Clone the repository or download the ZIP.

Open index.html in your browser.

Click on "Build Your Resume" to go to the form.

Fill in your details and click "Generate Resume".

A PDF resume will be automatically downloaded.

📖 Usage Guide

Homepage (index.html)

Intro section with navigation and call to action.

Includes an About section and visual cards explaining benefits.

Form Page (form.html)

Users can enter:

Personal info

Achievements

Work experience

Education

Projects

Skills

Upload profile picture (optional).

Buttons to add/remove dynamic sections.

"Generate Resume" button creates and downloads the PDF.

📆 Architecture

project-folder/
├── index.html            # Home Page
├── form.html             # Resume Form Page
├── style.css             # UI Styling
├── resume-style.css      # Resume-specific styling
├── script.js             # JavaScript logic for form, PDF, and resume generation

🔧 Technologies Used

HTML5 – Page structure and forms

CSS3 – Custom styles and layout design

Bootstrap 5 – Responsive and modern UI components

JavaScript (ES6) –

DOM manipulation

Dynamic form sections

Form data collection

Resume generation and PDF export

html2canvas – Captures the resume layout as an image

jsPDF – Converts the image into a downloadable PDF file

🔬 How It Works

User Input: User fills in form fields.

JavaScript:

Captures form data

Generates HTML resume preview using templates

Uses html2canvas to capture the preview

Uses jsPDF to convert canvas into PDF

PDF Download: Automatically downloads the resume with a proper filename.

🌐 Live Demo (Optional)

You can host the project on GitHub Pages or Netlify for public demo.

🚫 Limitations

No file storage or backend integration.

Image and data exist only temporarily in the browser.

🚀 Future Improvements

Save and load resumes from local storage

Export to different resume templates

Improve accessibility

Add theme options

✨ License

This project is open-source and free to use for educational or personal purposes.

❤️ Acknowledgements

Bootstrap

jsPDF

html2canvas
