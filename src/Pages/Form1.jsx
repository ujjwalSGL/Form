import React, { useState } from 'react'
import Accordion from '../Components/Accordion'

function Form1({ onToggle, isOpen, nextStep, activeState }) {

    const [errors, setErrors] = useState({})
    const [customerInfo, setCustomerInfo] = useState({
        customer: ""
    })
    function inputChange(e) {
        e.preventDefault();
        const { name, value } = e.target
        setCustomerInfo((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     nextStep();
    // }
    function validateInfo() {
        const newErrors = {};
        if (!customerInfo.customer) {
            newErrors.customer = "Please Select Customer"
        }
        return newErrors
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = validateInfo(customerInfo)
        setErrors(errors)
        if (validateInfo()) {
            nextStep();
        }else{
            console.log(errors)
        }
    }

    return (
        <Accordion title={" Consigner Details"}
            onToggle={onToggle}
            isOpen={isOpen}
            stepNum={1}
            activeState={activeState}
        >
            <form onSubmit={handleSubmit}>
                <div className='text-sm mx-4'>
                    <p className='pb-2 '>Search Customer</p>
                    <div>
                        <select className='w-[700px] h-10 border appearance-none p-2 pl-4 font-bold text-sm text-gray-400 justify-center items-center cursor-pointer' value={customerInfo.customer} onChange={inputChange} name="customer">
                            <option>Select Customer</option>
                            <option>asdfgh</option>
                            <option>qwerty</option>
                            <option>zxcvbn</option>
                        </select>
                        {errors.customer && (<p className=" font-semibold text-[12px] text-red-600">{errors.customer} </p>)}
                    </div>

                    <div className="flex justify-end mt-5">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-gray-100 rounded-md font-bold" >
                            Continue
                        </button>
                    </div>

                </div>
            </form>
        </Accordion>
    )
}
export default Form1