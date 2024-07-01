export class User {
    constructor(id, firstname, lastname, email, password, role, company, experience, skills) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.company = company;
        this.experience = experience;
        this.skills = skills;
    }

    // Setters
    setFirstName(firstName) {
        this.firstname = firstName;
    }

    setLastName(lastName) {
        this.lastname = lastName;
    }

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

    setRole(role) {
        this.role = role;
    }

    setCompany(company) {
        this.company = company;
    }

    setExperience(experience) {
        this.experience = experience;
    }

    setSkills(skills) {
        this.skills = skills;
    }

    // Getters
    getId() {
        return this.id;
    }

    getFirstName() {
        return this.firstname;
    }

    getLastName() {
        return this.lastname;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    getCompany() {
        return this.company;
    }

    getExperience() {
        return this.experience;
    }

    getSkills() {
        return this.skills;
    }
}



