import { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import { FaAngleRight } from "react-icons/fa6";


const Order = () => {
        const [activeState, setActiveState] = useState(1);
        function nextStep() {
            setActiveState((prevStep) => Math.min(prevStep + 1, 4))
        }
        function toggleStep(step) {
            setActiveState(step);
        }
        
    return (
 
        <div className=" grid justify-center items-center mx-64 my-10 gap-2 ">
            <div>
                <h1 className="pb-10 text text-4xl font-bold">Create CSB-IV Order </h1>
                <h1 className="flex mb-10 text-gray-400">Orders <span className="pt-[5px] text-gray-400"><FaAngleRight /></span><span className="text-black">Create CSB-IV Order</span></h1>
            </div>
            <Form1 
                isOpen={activeState === 1}
                onToggle={() => toggleStep(1)}
                nextStep={nextStep} 
                activeState={activeState}
                />
            <Form2
                isOpen={activeState === 2}
                onToggle={() => toggleStep(2)}
                nextStep={nextStep} 
                activeState={activeState}/>
            <Form3 
                isOpen={activeState === 3}
                onToggle={() => toggleStep(3)}
                nextStep={nextStep}
            />
            <Form4
                stepNumber={4}
                isOpen={activeState === 4}
                onToggle={() => toggleStep(4)}
            />    
        </div>
    )
};

export default Order;