// dob.js - Date of Birth class module
export class Dob extends Date {
    constructor(dateString) {
        super(dateString);
        this.validate();
    }

    validate() {
        if (isNaN(this.getTime())) {
            throw new Error('Invalid date');
        }
        
        const today = new Date();
        if (this > today) {
            throw new Error('Date of birth cannot be in the future');
        }
    }

    getAge() {
        const today = new Date();
        let age = today.getFullYear() - this.getFullYear();
        const monthDiff = today.getMonth() - this.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < this.getDate())) {
            age--;
        }
        
        return age;
    }

    getFormattedDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return this.toLocaleDateString('en-US', options);
    }
}
