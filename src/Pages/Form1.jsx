import React, { useState } from 'react'
import Accordion from '../Components/Accordion'
import Button from '../Components/Button'
import Error from '../Components/Error'

function Form1({activeState, setActiveState }) {

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
        const errors = validateInfo(customerInfo);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            setActiveState(2);
        } else {
            console.log("Error is occuring frequently betichod")
        }
    }

    return (
        <Accordion title={" Consignor Details"}
            onToggle={() => setActiveState(1)} //remove this
            // onToggle={setActiveStep}
            isOpen={activeState === 1} //activestate===1
            stepNum={1}
            activeState={activeState}
        >
            <form onSubmit={handleSubmit}>
                <div className='text-sm mx-4'>
                    <p className='pb-2'>Search Customer</p>
                    <div>
                        <select className='w-[700px] h-10 border rounded-md appearance-none p-2 pl-4 font-bold text-sm text-gray-400 justify-center items-center' value={customerInfo.customer} onChange={inputChange} name="customer">
                            <option>Select Customer</option>
                            <option>asdfgh</option>
                            <option>qwerty</option>
                            <option>zxcvbn</option>
                        </select>
                        <Error errors={errors.customer} className={"mt-0"}/>
                    </div>

                    <div className="flex justify-end mt-5">
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-gray-100 rounded-md font-bold" >
                            Continue
                        </Button>
                    </div>

                </div>
            </form>
        </Accordion>
    )
}
export default Form1