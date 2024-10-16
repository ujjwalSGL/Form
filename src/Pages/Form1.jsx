import React, { useState } from 'react'
import Accordion from '../Components/Accordion'

function Form1() {

    return (
        <Accordion title={" Consigner Details"}>
            <form >
                <div className='text-sm mx-4'>
                    <p className='pb-2 '>Search Customer</p>
                    <select className='w-[700px] h-10 border appearance-none p-2 pl-4 font-bold text-sm text-gray-400 justify-center items-center' name="Select customer.." id="customer">
                        <option>Select Customer</option>
                        <option>Ujjwal</option>
                        <option>Aman</option>
                        <option>Gaurav</option>

                    </select>
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