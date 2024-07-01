export class Profile {
    constructor(id, savedJobsCount, dailyApplicationsCount, weeklyApplicationsCount, monthlyApplicationsCount, weeklyApplicationsGoal,arrayOfMonthlyApplicationsCount) {
        this.id = id;
        this.savedJobsCount = savedJobsCount;
        this.dailyApplicationsCount = dailyApplicationsCount;
        this.weeklyApplicationsCount = weeklyApplicationsCount;
        this.monthlyApplicationsCount = monthlyApplicationsCount;
        this.weeklyApplicationsGoal = weeklyApplicationsGoal;
        this.arrayOfMonthlyApplicationsCount=arrayOfMonthlyApplicationsCount;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setSavedJobsCount(savedJobsCount) {
        this.savedJobsCount = savedJobsCount;
    }

    setDailyApplicationsCount(dailyApplicationsCount) {
        this.dailyApplicationsCount = dailyApplicationsCount;
    }

    setWeeklyApplicationsCount(weeklyApplicationsCount) {
        this.weeklyApplicationsCount = weeklyApplicationsCount;
    }

    setMonthlyApplicationsCount(monthlyApplicationsCount) {
        this.monthlyApplicationsCount = monthlyApplicationsCount;
    }

    setWeeklyApplicationsGoal(weeklyApplicationsGoal) {
        this.weeklyApplicationsGoal = weeklyApplicationsGoal;
    }

    setArrayOfMonthlyApplicationsCount(arrayOfMonthlyApplicationsCount) {
        this.arrayOfMonthlyApplicationsCount = arrayOfMonthlyApplicationsCount;
    }
    // Getters
    getId() {
        return this.id;
    }

    getSavedJobsCount() {
        return this.savedJobsCount;
    }

    getDailyApplicationsCount() {
        return this.dailyApplicationsCount;
    }

    getWeeklyApplicationsCount() {
        return this.weeklyApplicationsCount;
    }

    getMonthlyApplicationsCount() {
        return this.monthlyApplicationsCount;
    }

    getWeeklyApplicationsGoal() {
        return this.weeklyApplicationsGoal;
    }

    getArrayOfMonthlyApplicationsCount() {
        return this.arrayOfMonthlyApplicationsCount;
    }
}
