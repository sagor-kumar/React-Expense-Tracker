/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useForm } from "react-hook-form"

function ExpenseForm({ onSubmit, categories }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => console.log(data);
    const handleFormSubmit = (newExpense) => {
        onSubmit(newExpense, reset);
    }

    return (
        <div className="max-w-[900px] mx-auto mt-[20px]">
            <h1 className="text-center text-4xl font-bold mb-[15px]">Add Expense 📝</h1>
            <form action="" onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2 mt-2">
                <input type="text" placeholder="Description" className="w-[100%] input rounded-none" {...register("description", {
                    required: "Description field should not be empty!", minLength: { value: 5, message: "Minimum length should be above 5 characters." }
                })} />
                {/* code for errors */}
                {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                )}

                <select defaultValue="" className="w-[100%] select rounded-none" {...register("category", { required: "Please select a category!" })}>
                    <option value="" disabled>Choose a category</option>
                    {
                        categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))
                    }
                </select>
                {/* code for errors */}
                {
                    errors.category && (<p className="text-red-500">{errors.category.message}</p>)
                }

                <input type="number" placeholder="Amount" className="w-[100%] input rounded-none" {...register("amount", {
                    required: "This field is required!", min: { value: 5, message: "Amount is too low." }, maxLength: { value: 10, message: "Maximum Length should not be above 10 characters!" }
                })} />
                {/* code for errors */}
                {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}

                {/* submit button */}
                <input type="submit" value="Add expense" className="w-[100%] btn btn-primary font-bold bg-[#b8d1fd] hover:bg-[#b8d1fd79] input rounded-none cursor-pointer border-none text-lg" />
            </form>
        </div>
    );
}

export default ExpenseForm