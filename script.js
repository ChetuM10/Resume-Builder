function addAchievement() {
    const container = document.getElementById('achievementsContainer');
    const template = document.querySelector('.achievement-item').cloneNode(true);
    // Clear input values
    template.querySelectorAll('input').forEach(input => input.value = '');
    container.appendChild(template);
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const template = document.querySelector('.experience-item').cloneNode(true);
    // Clear input values
    template.querySelectorAll('input').forEach(input => input.value = '');
    container.appendChild(template);
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    const template = document.querySelector('.education-item').cloneNode(true);
    // Clear input values
    template.querySelectorAll('input').forEach(input => input.value = '');
    container.appendChild(template);
}

function addProject() {
    const container = document.getElementById('projectsContainer');
    const template = document.querySelector('.project-item').cloneNode(true);
    // Clear input values
    template.querySelectorAll('input').forEach(input => input.value = '');
    container.appendChild(template);
}

function addSkill() {
    const container = document.getElementById('skillsContainer');
    const template = document.querySelector('.skill-item').cloneNode(true);
    // Clear input values
    template.querySelectorAll('input').forEach(input => input.value = '');
    container.appendChild(template);
}

function removeItem(button) {
    const parentContainer = button.closest('.achievement-item, .experience-item, .education-item, .project-item, .skill-item');
    const grandparentContainer = parentContainer.parentElement;

    // Only remove if it's not the last item
    if (grandparentContainer.children.length > 1) {
        grandparentContainer.removeChild(parentContainer);
    } else {
        // Clear values instead of removing if it's the last one
        parentContainer.querySelectorAll('input').forEach(input => input.value = '');
    }
}

// Function to collect all form data
function collectFormData() {
    return new Promise((resolve) => {
        const formData = {
            personal: {
                firstName: document.getElementById('firstname').value || '',
                lastName: document.getElementById('lastname').value || '',
                fullName: (document.getElementById('firstname').value + ' ' + document.getElementById('lastname').value).trim() || 'Your Name',
                designation: document.getElementById('designation').value || '',
                location: document.getElementById('address').value || '',
                email: document.getElementById('email').value || '',
                phone: document.getElementById('phone').value || '',
                summary: document.getElementById('summary').value || '',
                profileImage: null // Will be set later if available
            },
            achievements: [],
            experience: [],
            education: [],
            projects: [],
            skills: []
        };

        // Handle profile image if uploaded
        const profileImageInput = document.getElementById('profileImage');
        if (profileImageInput && profileImageInput.files && profileImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                formData.personal.profileImage = e.target.result;
                continueProcessing();
            };
            reader.readAsDataURL(profileImageInput.files[0]);
        } else {
            continueProcessing();
        }

        function continueProcessing() {
            // Collect achievements
            document.querySelectorAll('.achievement-item').forEach(item => {
                const title = item.querySelector('input[name="achieve_title"]')?.value || '';
                const description = item.querySelector('input[name="achieve_description"]')?.value || '';
                if (title || description) {
                    formData.achievements.push({ title, description });
                }
            });

            // Collect experience
            document.querySelectorAll('.experience-item').forEach(item => {
                const title = item.querySelector('input[name="exp_title[]"]')?.value || '';
                const organization = item.querySelector('input[name="exp_organization[]"]')?.value || '';
                const location = item.querySelector('input[name="exp_location[]"]')?.value || '';
                const startDate = item.querySelector('input[name="exp_start_date[]"]')?.value || '';
                const endDate = item.querySelector('input[name="exp_end_date[]"]')?.value || '';
                const description = item.querySelector('input[name="exp_description[]"]')?.value || '';

                if (title || organization) {
                    formData.experience.push({
                        title,
                        organization,
                        location,
                        startDate: formatDate(startDate),
                        endDate: formatDate(endDate),
                        description
                    });
                }
            });

            // Collect education
            document.querySelectorAll('.education-item').forEach(item => {
                const school = item.querySelector('input[name="edu_school[]"]')?.value || '';
                const degree = item.querySelector('input[name="edu_degree[]"]')?.value || '';
                const city = item.querySelector('input[name="edu_city[]"]')?.value || '';
                const startDate = item.querySelector('input[name="edu_start_date[]"]')?.value || '';
                const endDate = item.querySelector('input[name="edu_graduation_date[]"]')?.value || '';
                const description = item.querySelector('input[name="edu_description[]"]')?.value || '';

                if (school || degree) {
                    formData.education.push({
                        school,
                        degree,
                        city,
                        startDate: formatDate(startDate),
                        endDate: formatDate(endDate),
                        description
                    });
                }
            });

            // Collect projects
            document.querySelectorAll('.project-item').forEach(item => {
                const title = item.querySelector('input[name="proj_title[]"]')?.value || '';
                const link = item.querySelector('input[name="proj_link[]"]')?.value || '';
                const description = item.querySelector('input[name="proj_description[]"]')?.value || '';

                if (title || description) {
                    formData.projects.push({ title, link, description });
                }
            });

            // Collect skills
            document.querySelectorAll('.skill-item').forEach(item => {
                const skill = item.querySelector('input[name="skill[]"]')?.value || '';
                if (skill) {
                    formData.skills.push(skill);
                }
            });

            resolve(formData);
        }
    });
}

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString) return 'Present';

    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${month} ${year}`;
}

// Function to generate the resume HTML template
function generateResumeHTML(data) {
    return `
    <div id="resume-container">
        <div class="resume-header">
            <div>
                <h1>${data.personal.fullName || 'Your Name'}</h1>
                <p>${data.personal.designation || 'Your Designation'}</p>
                <p>${data.personal.location || 'Your Location'}</p>
                <div class="contact-info">
                    ${data.personal.email ? `<div class="contact-item">${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div class="contact-item">${data.personal.phone}</div>` : ''}
                </div>
            </div>
            ${data.personal.profileImage ? `<img src="${data.personal.profileImage}" class="profile-image" crossorigin="anonymous">` : ''}
        </div>

        <!-- Summary -->
        ${data.personal.summary ? `
        <div class="resume-section">
            <h2>Professional Objective</h2>
            <p>${data.personal.summary}</p>
        </div>
        ` : ''}

        <!-- Experience -->
        ${data.experience.length > 0 ? `
        <div class="resume-section">
            <h2>Experience</h2>
            ${data.experience.map(exp => `
                <div class="resume-item">
                    <h3>${exp.title || 'Position'} <span>${exp.startDate || ''} - ${exp.endDate || 'Present'}</span></h3>
                    <p><strong>${exp.organization || ''}, ${exp.location || ''}</strong></p>
                    <p>${exp.description || ''}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Education -->
        ${data.education.length > 0 ? `
        <div class="resume-section">
            <h2>Education</h2>
            ${data.education.map(edu => `
                <div class="resume-item">
                    <h3>${edu.degree || 'Degree'} <span>${edu.startDate || ''} - ${edu.endDate || 'Present'}</span></h3>
                    <p><strong>${edu.school || ''}, ${edu.city || ''}</strong></p>
                    <p>${edu.description || ''}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Projects -->
        ${data.projects.length > 0 ? `
        <div class="resume-section">
            <h2>Projects</h2>
            ${data.projects.map(proj => `
                <div class="resume-item">
                    <h3>${proj.title || 'Project Title'} ${proj.link ? `<a href="${proj.link}" class="project-link">${proj.link}</a>` : ''}</h3>
                    <p>${proj.description || ''}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Achievements -->
        ${data.achievements.length > 0 ? `
        <div class="resume-section">
            <h2>Achievements</h2>
            <ul class="resume-list">
                ${data.achievements.map(achieve => `
                    <li><strong>${achieve.title || ''}</strong> - ${achieve.description || ''}</li>
                `).join('')}
            </ul>
        </div>
        ` : ''}

        <!-- Skills -->
        ${data.skills.length > 0 ? `
        <div class="resume-section">
            <h2>Skills</h2>
            <div class="skills-container">
                ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}
    </div>
    `;
}

// Function to generate PDF from HTML with proper image handling
function generatePDF(formData) {
    return new Promise((resolve, reject) => {
        // Create a temporary container to render the resume
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.innerHTML = generateResumeHTML(formData);
        document.body.appendChild(tempContainer);

        // Wait for images to load before generating PDF
        const images = tempContainer.querySelectorAll('img');
        let imagesLoaded = 0;

        if (images.length === 0) {
            // No images, proceed with PDF generation
            proceedWithPDFGeneration();
        } else {
            // Wait for all images to load
            images.forEach(img => {
                if (img.complete) {
                    imagesLoaded++;
                    if (imagesLoaded === images.length) {
                        proceedWithPDFGeneration();
                    }
                } else {
                    img.onload = function () {
                        imagesLoaded++;
                        if (imagesLoaded === images.length) {
                            proceedWithPDFGeneration();
                        }
                    };
                    img.onerror = function () {
                        console.error('Image failed to load');
                        imagesLoaded++;
                        if (imagesLoaded === images.length) {
                            proceedWithPDFGeneration();
                        }
                    };
                }
            });
        }

        function proceedWithPDFGeneration() {
            // Use html2canvas to capture the resume as an image
            html2canvas(tempContainer, {
                scale: 2, // Higher scale for better quality
                useCORS: true, // Enable CORS for images
                allowTaint: true, // Allow tainted canvas
                logging: false // Disable logging
            }).then(canvas => {
                // Remove the temporary container
                document.body.removeChild(tempContainer);

                // Initialize jsPDF
                const pdf = new jspdf.jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                // Canvas dimensions
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                // Calculate the scaling factor to fit the canvas to the PDF page
                const ratio = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);
                const imgWidth = canvasWidth * ratio;
                const imgHeight = canvasHeight * ratio;

                // Center the image in the page
                const x = (pageWidth - imgWidth) / 2;
                const y = 10; // Small margin from the top

                // Add the image to the PDF
                pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);

                // If the content is too long for one page, handle pagination
                if (imgHeight > pageHeight - 20) { // 20mm margin
                    let remainingHeight = imgHeight;
                    let sourceY = 0;
                    const pageHeightInPx = (pageHeight - 20) / ratio;

                    // Remove the first page that was added by default
                    pdf.deletePage(1);

                    // Add pages as needed
                    let pageCount = 0;
                    while (remainingHeight > 0 && pageCount < 10) { // Prevent infinite loop with a reasonable limit
                        pageCount++;
                        pdf.addPage();
                        const chunkHeight = Math.min(pageHeightInPx, remainingHeight / ratio);

                        pdf.addImage(
                            imgData,
                            'JPEG',
                            x,
                            y,
                            imgWidth,
                            imgHeight,
                            null,
                            null,
                            null,
                            sourceY / canvasHeight
                        );

                        sourceY += chunkHeight;
                        remainingHeight -= chunkHeight * ratio;
                    }
                }

                resolve(pdf);
            }).catch(err => {
                console.error('Error generating PDF:', err);
                reject(err);
            });
        }
    });
}

// Function to download the PDF
function downloadResume() {
    // Show loading indicator
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) {
        console.error('Submit button not found');
        alert('Error: Submit button not found. Please check your HTML structure.');
        return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Generating PDF...';
    submitBtn.disabled = true;

    // Collect form data with proper image handling
    collectFormData()
        .then(formData => {
            console.log('Form data collected successfully');
            // Generate and download PDF
            return generatePDF(formData)
                .then(pdf => {
                    // Generate file name based on user's name
                    const fileName = formData.personal.firstName && formData.personal.lastName
                        ? `${formData.personal.firstName}_${formData.personal.lastName}_Resume.pdf`
                        : 'Resume.pdf';

                    // Save the PDF
                    pdf.save(fileName);

                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;

                    // Show success message
                    alert('Resume generated successfully! Your download should begin shortly.');
                });
        })
        .catch(error => {
            console.error('Error creating PDF:', error);
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            // Show error message
            alert('There was an error generating your resume. Please try again. Error: ' + error.message);
        });
}

// Initialize the form when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded, initializing resume builder');

    // Set up form submission
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        console.log('Resume form found, attaching event listener');
        resumeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Form submitted, generating resume');
            downloadResume();
        });
    } else {
        console.error('Resume form not found in the DOM');
    }
});

// Fallback initialization in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function () {
        const resumeForm = document.getElementById('resumeForm');
        if (resumeForm && !resumeForm.hasAttribute('data-initialized')) {
            console.log('Late initialization of resume form');
            resumeForm.setAttribute('data-initialized', 'true');
            resumeForm.addEventListener('submit', function (e) {
                e.preventDefault();
                downloadResume();
            });
        }
    }, 500);
}