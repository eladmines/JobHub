export class Connection {
    constructor(id, user_id, name, position, company, phone, accounts) {
        this.id = id; 
        this.user_id = user_id;
        this.name = name;
        this.position = position;
        this.company = company;
        this.phone = phone;
        this.accountsData = accounts;
    }

    // Getters
    get id() {
        return this._id;
    }

    get user_id() {
        return this._user_id;
    }

    get name() {
        return this._name;
    }

    get position() {
        return this._position;
    }

    get company() {
        return this._company;
    }

    get phone() {
        return this._phone;
    }

    get accounts() { 
        return this._accountsData;
    }


    set id(newId) {
        this._id = newId;
    }

    set user_id(newUserId) {
        this._user_id = newUserId;
    }

    set name(newName) {
        this._name = newName;
    }

    set position(newPosition) {
        this._position = newPosition;
    }

    set company(newCompany) {
        this._company = newCompany;
    }

    set phone(newPhone) {
        this._phone = newPhone;
    }

    set accounts(newAccounts) { 
        this._accountsData = newAccounts;
    }
}
