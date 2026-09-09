// contact.js - Contact class module
import { Dob } from './dob.js';

export class Contact {
    constructor(email, phone, zipcode, dob) {
        this.email = this.validateEmail(email);
        this.phone = this.validatePhone(phone);
        this.zipcode = this.validateZipcode(zipcode);
        this.dob = new Dob(dob);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        return email;
    }

    validatePhone(phone) {
        // Remove non-digit characters
        const digitsOnly = phone.replace(/\D/g, '');
        
        // Check if it has 10 digits (US phone number)
        if (digitsOnly.length !== 10) {
            throw new Error('Phone number must contain 10 digits');
        }
        
        // Format as (123) 456-7890
        return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    }

    validateZipcode(zipcode) {
        // Check if it's a valid 5-digit zip code
        const zipcodeRegex = /^\d{5}$/;
        if (!zipcodeRegex.test(zipcode)) {
            throw new Error('Zip code must be 5 digits');
        }
        return zipcode;
    }

    toJSON() {
        return {
            email: this.email,
            phone: this.phone,
            zipcode: this.zipcode,
            dob: this.dob.toISOString()
        };
    }

    static fromJSON(data) {
        return new Contact(data.email, data.phone, data.zipcode, data.dob);
    }

    getDisplayInfo() {
        return {
            email: this.email,
            phone: this.phone,
            zipcode: this.zipcode,
            dateOfBirth: this.dob.getFormattedDate(),
            age: this.dob.getAge()
        };
    }
}
