// script.js - Main application module
import { Contact } from './contact.js';

const form = document.getElementById('contactForm');
const contactInfo = document.getElementById('contactInfo');
const clearBtn = document.getElementById('clearBtn');

const STORAGE_KEY = 'contactInfo';

// Initialize the app
function init() {
    loadContactFromStorage();
    form.addEventListener('submit', handleFormSubmit);
    clearBtn.addEventListener('click', handleClearStorage);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    clearErrors();

    try {
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const zipcode = document.getElementById('zipcode').value.trim();
        const dob = document.getElementById('dob').value;

        // Create a new Contact object with validation
        const contact = new Contact(email, phone, zipcode, dob);

        // Save to session storage
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(contact.toJSON()));

        // Display the contact
        displayContact(contact);

        // Reset form
        form.reset();
    } catch (error) {
        displayError(error.message);
    }
}

// Display contact information
function displayContact(contact) {
    const info = contact.getDisplayInfo();
    
    const html = `
        <div class="contact-card">
            <p><strong>Email:</strong> ${info.email}</p>
            <p><strong>Phone:</strong> ${info.phone}</p>
            <p><strong>Zip Code:</strong> ${info.zipcode}</p>
            <p><strong>Date of Birth:</strong> ${info.dateOfBirth}</p>
            <p><strong>Age:</strong> ${info.age}</p>
        </div>
    `;
    
    contactInfo.innerHTML = html;
}

// Load contact from session storage
function loadContactFromStorage() {
    const data = sessionStorage.getItem(STORAGE_KEY);
    
    if (data) {
        try {
            const contactData = JSON.parse(data);
            const contact = Contact.fromJSON(contactData);
            displayContact(contact);
        } catch (error) {
            console.error('Error loading contact from storage:', error);
        }
    }
}

// Handle clear storage
function handleClearStorage() {
    sessionStorage.removeItem(STORAGE_KEY);
    form.reset();
    contactInfo.innerHTML = '<p class="no-contact">No contact information saved</p>';
    clearErrors();
}

// Clear error messages
function clearErrors() {
    const errorSpans = document.querySelectorAll('.error');
    errorSpans.forEach(span => {
        span.textContent = '';
        span.style.display = 'none';
    });
}

// Display error message
function displayError(message) {
    // Try to determine which field has the error
    let errorField = 'emailError'; // default

    if (message.includes('email')) {
        errorField = 'emailError';
    } else if (message.includes('Phone')) {
        errorField = 'phoneError';
    } else if (message.includes('Zip')) {
        errorField = 'zipcodeError';
    } else if (message.includes('date')) {
        errorField = 'dobError';
    }

    const errorSpan = document.getElementById(errorField);
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }
}

// Start the app
init();
