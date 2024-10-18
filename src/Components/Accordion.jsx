import React, { isValidElement, useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const Accordion = ({ title, children, isOpen, onToggle, stepNum, activeState, ...props }) => {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleAccordion = () => {
    //     setIsOpen(!isOpen);
    // };
    return (
        <div className="border rounded-sm ">
            <button onClick={onToggle} className="flex justify-between items-center w-full p-8 font-extrabold h-8 text-left focus:outline-none bg-slate-100 ">
                <span className="font-semibold ">
                    <div className='flex'>
                        <div className={`px-3 py-[2px] mx-2 pt-1 rounded-[4px] font-semibold text-xs
                                ${!isOpen && activeState > 1
                                ? "bg-green-500 text-white"
                                : !isOpen ? "bg-slate-200 text-black"
                                    : "bg-black text-white"
                            }
                            `}>
                            {!isOpen && activeState > 1 ? <span className='text-white'>✓</span> : stepNum}
                        </div>
                        <div>
                            {title}
                        </div>
                    </div>
                </span><span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </button>
            <div
                className={`transition-[max-height] duration-700 ease-in-out overflow-hidden border-t-2 ${isOpen ? "max-h-[3000px]" : "max-h-0"
                    } bg-white  `}
            >{isOpen && <div className="p-4">{children}</div>}</div>

        </div>
    );
};
export default Accordion;