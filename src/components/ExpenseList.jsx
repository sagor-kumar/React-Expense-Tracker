/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

function ExpenseList() {

    const allExpenses = [
        { id: 1, category: "Travel", description: "Mountains, Sea-beaches, Forests", amount: 100 },
        { id: 2, category: "Entertainment", description: "Netflix Movies, Spotify Subscription", amount: 200 },
        { id: 3, category: "Travel", description: "Mountains, Sea-beaches, Forests", amount: 200 },
        { id: 4, category: "Office Supplies", description: "Desktops, Laptops, Desks, Printers", amount: 150 },
        { id: 5, category: "Entertainment", description: "Netflix Movies, Spotify Subscription", amount: 300 }
    ];

    // Expense Categories
    const categories = ["Travel", "Entertainment", "Office Supplies", "Utility Bills"];



    const [expenses, setExpenses] = useState(allExpenses);
    const [selectedCategory, setSelectedCategory] = useState("All");



    // Filter expenses dynamically based on the selected category
    const filteredExpenses = selectedCategory === "All"
        ? expenses
        : expenses.filter((expense) => expense.category === selectedCategory);

    // Handle category selection
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    // deletion of expension
    const deleteExpense = (expenseId) => {
        setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== expenseId
            ));
    };

    // sum of total expensions
    const totalAmountOfExpenses = filteredExpenses.reduce((prevValue, expense) => {
        return prevValue + parseInt(expense.amount);
    }, 0);

    return (
        <section>

            {/* Expense Form for Adding new data */}
            <ExpenseForm onSubmit={(newExpense, reset) => {
                setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]);
                reset();
            }} categories={categories} />


            {/* Category filter dropdown */}
            <div className="max-w-[900px] mx-auto mt-[50px] translate-x-[580px]">
                <label className="select select-lg text-[#696969] focus:outline-none !outline-none rounded-2xl max-w-[500px]">
                    <span className="label">Filter</span>
                    <select onChange={handleCategoryChange} className="">
                        <option value="All">All</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-w-[900px] mx-auto mt-[5px]">
                <table className="table table-zebra">
                    {/* Table head */}
                    <thead>
                        <tr className="text-2xl">
                            <th>Id</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Show Expenses */}
                        {
                            filteredExpenses.length === 0
                                ? <tr><td colSpan={5} className="text-center text-xl">No expense found!</td></tr>
                                : filteredExpenses.map((expense, index) => (
                                    <tr key={expense.id}>
                                        <th>{index + 1}</th>
                                        <td>{expense.category}</td>
                                        <td>{expense.description}</td>
                                        <td>${expense.amount}</td>
                                        <td><button onClick={() => deleteExpense(expense.id)} className="btn btn-secondary">Delete</button></td>
                                    </tr>
                                ))
                        }
                    </tbody>
                    {/* total amount section */}
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="text-lg font-bold">Total</td>
                            <td className="font-bold">${totalAmountOfExpenses}</td>
                        </tr>
                    </tfoot>
                </table>
            </div >
        </section>
    )
}

export default ExpenseList