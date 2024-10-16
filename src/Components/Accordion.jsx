import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border rounded-md">
            <button onClick={toggleAccordion} className="flex justify-between items-center w-full p-10 font-extrabold h-20 text-left focus:outline-none bg-slate-100">
                <span className="font-semibold ">{title}</span><span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

export default Accordion;