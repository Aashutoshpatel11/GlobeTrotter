export class BudgetCalculator {
    /**
     * Calculates full financial summary for a trip.
     * @param {Object} trip
     * @param {Array} expenses
     * @param {Array} days
     */
    static computeSummary(trip, expenses = [], days = []) {
        const totalBudget = parseFloat(trip.total_budget || 0);

        const categoryBreakdown = {
            TRANSPORT: 0,
            STAY: 0,
            ACTIVITIES: 0,
            MEALS: 0,
            MISC: 0,
        };

        const dailyExpensesMap = {};

        let totalSpent = 0;

        for (const exp of expenses) {
            const amount = parseFloat(exp.amount || 0);
            totalSpent += amount;

            if (categoryBreakdown[exp.category] !== undefined) {
                categoryBreakdown[exp.category] += amount;
            } else {
                categoryBreakdown.MISC += amount;
            }

            const dateKey = exp.expense_date;
            if (!dailyExpensesMap[dateKey]) {
                dailyExpensesMap[dateKey] = 0;
            }
            dailyExpensesMap[dateKey] += amount;
        }

        const remainingBudget = totalBudget - totalSpent;
        const totalDays = Math.max(1, days.length);
        const averageDailyCost = totalSpent > 0 ? parseFloat((totalSpent / totalDays).toFixed(2)) : 0;

        // Overbudget days detection
        const overBudgetDays = [];
        for (const day of days) {
            const dateKey = day.date;
            const actualSpent = dailyExpensesMap[dateKey] || 0;
            const maxBudget = parseFloat(day.daily_budget_max || 0);

            if (maxBudget > 0 && actualSpent > maxBudget) {
                overBudgetDays.push({
                    dayId: day.id,
                    dayNumber: day.day_number,
                    date: day.date,
                    allocatedMax: maxBudget,
                    actualSpent: parseFloat(actualSpent.toFixed(2)),
                    variance: parseFloat((actualSpent - maxBudget).toFixed(2)),
                });
            }
        }

        return {
            totalBudget,
            totalSpent: parseFloat(totalSpent.toFixed(2)),
            remainingBudget: parseFloat(remainingBudget.toFixed(2)),
            averageDailyCost,
            categoryBreakdown: {
                transport: parseFloat(categoryBreakdown.TRANSPORT.toFixed(2)),
                stay: parseFloat(categoryBreakdown.STAY.toFixed(2)),
                activities: parseFloat(categoryBreakdown.ACTIVITIES.toFixed(2)),
                meals: parseFloat(categoryBreakdown.MEALS.toFixed(2)),
                misc: parseFloat(categoryBreakdown.MISC.toFixed(2)),
            },
            overBudgetDays,
        };
    }
}

export default BudgetCalculator;
