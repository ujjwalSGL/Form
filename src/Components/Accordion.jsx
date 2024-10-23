import React from 'react';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const Accordion = ({ title, children, isOpen, onToggle, stepNum, activeState, ...props }) => {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleAccordion = () => {
    //     setIsOpen(!isOpen);
    // };
    return (
        <div className="border rounded-sm ">
            <button className="flex justify-between items-center w-full p-8 font-extrabold h-8 text-left focus:outline-none bg-slate-100 ">
                <span className="font-semibold ">
                    <div className='flex'>
                        <div className={`px-3 py-[2px] mx-2 pt-1 rounded-[4px] font-semibold text-xs
                                ${!isOpen && activeState > stepNum
                                ? "bg-green-500 text-white"
                                : !isOpen ? "bg-slate-200 text-black"
                                    : "bg-black text-white"
                            }
                            `}>
                            {!isOpen && activeState > stepNum ? <span className='text-white'>✓</span> : stepNum}
                        </div>
                        <div>
                            {title}
                        </div>
                    </div>
                </span>
                <div onClick={onToggle} className="cursor-pointer">

                    {/* onclick(()=>setActiveStep(stepNum+1)) */}
                    <div className={`height-[40px] text-sm`}>
                        {/* <FaChevronUp /> */}
                        {stepNum < activeState ? (
                            <span className="text-blue-800  font-medium">
                                <u>Change</u>
                            </span>
                        ) : ("")
                        }
                    </div>
                </div>
            </button>
            <div
                className={`transition-[max-height] duration-700 ease-in-out overflow-hidden border-t-2 ${isOpen ? "max-h-[3000px]" : "max-h-0"
                    } bg-white  `}
            >{isOpen && <div className="p-4">{children}</div>}</div>

        </div>
    );
};


export default Accordion;