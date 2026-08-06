// ===== Calculator.js =====

export class Calculator {
    constructor(data) {
        this.equipPrice = data.equipPrice || 0;
        this.staffCount = data.staffCount || 2;
        this.salaryPerStaff = data.salaryPerStaff || 10000;
        this.components = data.components || [];
        this.marketPrice = data.marketPrice || 0;
    }

    getDailyOverhead() {
        const amort = this.equipPrice / 5 / 365;
        const salaryCost = (this.staffCount * this.salaryPerStaff) / 30;
        return amort + salaryCost;
    }

    getRawMaterialCost() {
        return this.components.reduce((sum, c) => sum + (c.qty * c.price), 0);
    }

    getRequiredPerf() {
        const raw = this.getRawMaterialCost();
        const overhead = this.getDailyOverhead();
        if (raw <= 0) return 0;
        return Math.ceil(overhead / (raw * 0.1));
    }

    getTotalUnitCost() {
        const raw = this.getRawMaterialCost();
        const perf = this.getRequiredPerf();
        const overhead = this.getDailyOverhead();
        const machineShare = perf > 0 ? overhead / perf : 0;
        return raw + machineShare;
    }

    getMonthlyProfit() {
        const perf = this.getRequiredPerf();
        const unitCost = this.getTotalUnitCost();
        const profitPerDay = perf * (this.marketPrice - unitCost);
        return Math.round(profitPerDay * 30);
    }

    getPaybackDays() {
        const perf = this.getRequiredPerf();
        const unitCost = this.getTotalUnitCost();
        const profitPerDay = perf * (this.marketPrice - unitCost);
        return profitPerDay > 0 ? Math.ceil(this.equipPrice / profitPerDay) : Infinity;
    }
}