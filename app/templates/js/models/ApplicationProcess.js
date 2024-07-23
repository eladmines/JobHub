export class ApplicationProcess {
    constructor(id, jobId, date, interviewer, phone, status, notes) {
        // Initialize private properties
        this._id = id; 
        this._jobId = jobId;
        this._date = date;
        this._interviewer = interviewer;
        this._phone = phone;
        this._status = status;
        this._notes = notes;
    }

    // Getter methods
    get id() {
        return this._id;
    }

    get jobId() {
        return this._jobId;
    }

    get date() {
        return this._date;
    }

    get interviewer() {
        return this._interviewer;
    }

    get phone() {
        return this._phone;
    }

    get status() {
        return this._status;
    }

    get notes() {
        return this._notes;
    }
    
    // Setter methods
    set id(value) {
        this._id = value;
    }

    set jobId(value) {
        this._jobId = value;
    }

    set date(value) {
        this._date = value;
    }

    set interviewer(value) {
        this._interviewer = value;
    }

    set phone(value) {
        this._phone = value;
    }

    set status(value) {
        this._status = value;
    }

    set notes(value) {
        this._notes = value;
    }
}
