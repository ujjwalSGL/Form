import React from 'react'
import { useState } from 'react';
import Accordion from '../Components/Accordion'
import Input from '../Components/Input';
import { MdAdd } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


function Form3({ isOpen, onToggle, nextStep }) {

    const [errors, setErrors] = useState({});

    const [shippingInfo, setShippingInfo] = useState({
        invoiceNumber: '',
        orderReferenceID: '',
        iossNumber: '',
        invoiceCurrency: "",
        invoiceDate: "",
        deadWeight: "",
        length: "",
        breadth: "",
        height: "",
        productName: "",
        SKU: "",
        HSN: "",
        Qty: "",
        unitPrice: "",
        IGST: ""
    });
    const handleShipmentInfo = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function validateInfo() {
        const newErrors = {};
        if (!shippingInfo.invoiceNumber) newErrors.invoiceNumber = 'Please enter invoice number';
        if (!shippingInfo.invoiceDate) newErrors.invoiceDate = 'Please select invoice date';
        if (!shippingInfo.invoiceCurrency) newErrors.invoiceCurrency = 'Please select Currency';
        if (!shippingInfo.deadWeight && shippingInfo.deadWeight < 0.01) newErrors.deadWeight = 'Weight must be at least 0.01 KG';
        if (!shippingInfo.length && shippingInfo.length < 1) newErrors.length = 'Length must be at least 1 cm';
        if (!shippingInfo.breadth && shippingInfo.breadth < 1) newErrors.breadth = 'Breadth must be at least 1 cm';
        if (!shippingInfo.height && shippingInfo.height < 1) newErrors.height = 'Height must be at least 1 cm';
        if (!shippingInfo.productName) newErrors.productName = 'Required';
        if (!shippingInfo.HSN && shippingInfo.HSN.length !== 8) newErrors.HSN = 'HSN must be 8 digits long';
        if (!shippingInfo.Qty) newErrors.Qty = 'Required';
        if (!shippingInfo.IGST) newErrors.IGST = 'Required';
        if (!shippingInfo.unitPrice) newErrors.unitPrice = 'Required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validateInfo()) {
            console.log('Form Submitted', shippingInfo);
            nextStep();
        }
    }
    const [products, setProducts] = useState([
        { productName: "", sku: "", hsn: "", qty: "", untPrice: "", igst: "" }
    ]
    )
    function addProduct() {
        setProducts([
            ...products,
            { productName: "", sku: "", hsn: "", qty: "", untPrice: "", igst: "" }
        ])
    }
    function removeProduct(index) {
        const updatedProducts = []
        for(let i = 0; i<products.length; i++){
            if(i !== index){
                updatedProducts.push(products[i])
            }
            
        }
        setProducts(updatedProducts)
    }
    function handleProductChange(e) {
        const {index, field, value } = e.target;
        const updatedProducts = products.map((products, i) => {
            if(i === index) {
                return {...products, [field]: value}
            }
            return products;
        })

    }


    return (
        <div>
            <Accordion title={"Shipment Information"}
            isOpen={isOpen}
            onToggle={onToggle}
            >
                <form onSubmit={handleSubmit}>
                    <div className='text-sm'>
                        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4'>
                            <div className='mt-2'>
                                <p >Invoice Number <span className='text-red-600'>*</span></p>
                                <Input type="text" placeholder="Enter Invoice Number..."
                                    name="invoiceNumber"
                                    value={shippingInfo.invoiceNumber}
                                    onChange={handleShipmentInfo}
                                />
                                {errors.invoiceNumber && <p className=" -mt-2 font-semibold text-[12px] text-red-600">{errors.invoiceNumber}</p>}
                            </div>

                            <div className='mt-2'>
                                <p >Invoice Date<span className='text-red-600 pl-1' >*</span></p>
                                <input type="date" placeholder="Pick a date"
                                    name="invoiceDate"
                                    value={shippingInfo.invoiceDate}
                                    onChange={handleShipmentInfo}
                                    className="flex-grow p-2 pl-4 mt-[6px] border w-[222px] rounded-md h-9  focus:border-indigo-600 focus:outline-none  hover:bg-gray-50 "
                                />
                                {errors.invoiceDate && <p className="font-semibold text-[12px] text-red-600">{errors.invoiceDate}</p>}

                            </div>

                            <div className='mt-2 '>
                                <p className='mb-2'>Invoice Currency<span className='text-red-600'>*</span></p>
                                <select className='w-[222px] h-[35px] border appearance-none pl-3 justify-center items-center rounded-md'
                                    id=""
                                    name="invoiceCurrency"
                                    value={shippingInfo.invoiceCurrency}
                                    onChange={handleShipmentInfo}
                                >
                                    <option value="INR">Select Currency</option>
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                    <option value="CAD">CAD</option>
                                    <option value="AUD">AUD</option>
                                    <option value="AED">AED</option>
                                    <option value="SAR">SAR</option>
                                </select>
                                {errors.invoiceCurrency && <p className="font-semibold text-[12px] text-red-600">{errors.invoiceCurrency}</p>}

                            </div>
                            <div className='mt-4'>
                                <p >Order/Reference ID</p>
                                <Input type="text" placeholder="Enter Order/Reference ID..."
                                    name="orderReferenceID"
                                    value={shippingInfo.orderReferenceID}
                                    onChange={handleShipmentInfo}
                                />
                            </div>
                            <div className='mt-4'>
                                <p >IOSS Number</p>
                                <Input type="text" placeholder="Enter IOSS Number..."
                                    name="iossNumber"
                                    value={shippingInfo.iossNumber}
                                    onChange={handleShipmentInfo}
                                />
                            </div>

                        </div>
                        <div>
                            <div className="mt-4  px-4">
                                <h2 className=" text-sm font-bold  ">Box Measurements</h2>
                            </div>
                            <div className="grid lg:grid-cols-4 gap-6 pb-7 mt-1 py-2 px-4 md:grid-cols-2">
                                <div>
                                    <label
                                        somelabel="Dead Weight"
                                        className="block text-sm font-medium text-gray-700  "
                                    >
                                        Dead Weight
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex rounded-md mt-2">
                                        <input
                                            type="number"
                                            placeholder="Eg. 1.25"
                                            name='deadWeight'
                                            value={shippingInfo.deadWeight}
                                            onChange={handleShipmentInfo}
                                            className="flex-grow p-2 border rounded-l-md cursor-pointer focus:border-l-indigo-600 focus:border-t-indigo-600 focus:border-b-indigo-600 focus:outline-none transition-all duration-200 hover:bg-gray-50 w-28"
                                        />
                                        <span className="px-3 bg-gray-200 rounded-r-md py-1.5">kg</span>{" "}
                                    </div>
                                    {errors.deadWeight && <p className="font-semibold text-[12px] text-red-600">{errors.deadWeight}</p>}
                                </div>
                                <div>
                                    <label
                                        somelabel="Length"
                                        className="block text-sm font-medium text-gray-700 "
                                    >
                                        Length
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex mt-2">
                                        <input
                                            type="number"
                                            placeholder="Eg. 1.25"
                                            name='length'
                                            value={shippingInfo.length}
                                            onChange={handleShipmentInfo}
                                            className="flex-grow p-2 border rounded-l-md cursor-pointer focus:border-l-indigo-600 focus:border-t-indigo-600 focus:border-b-indigo-600 focus:outline-none transition-all duration-200 hover:bg-gray-50 w-28"
                                        />
                                        <span className="px-3 bg-gray-200 rounded-r-md py-1.5 ">cm</span>{" "}
                                    </div>
                                    {errors.length && <p className="font-semibold text-[12px] text-red-600">{errors.length}</p>}
                                </div>
                                <div>
                                    <label
                                        somelabel="Breadth"
                                        className="block text-sm font-medium text-gray-700  "
                                    >
                                        Breadth
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex  mt-2">
                                        <input
                                            type="number"
                                            placeholder="Eg. 1.25"
                                            name='breadth'
                                            value={shippingInfo.breadth}
                                            onChange={handleShipmentInfo}
                                            className="flex-grow p-2 border rounded-l-md cursor-pointer focus:border-l-indigo-600 focus:border-t-indigo-600 focus:border-b-indigo-600 focus:outline-none transition-all duration-200 hover:bg-gray-50 w-28"
                                        />
                                        <span className="px-3 bg-gray-200 rounded-r-md py-1.5">cm</span>{" "}
                                    </div>
                                    {errors.breadth && <p className="font-semibold text-[12px] text-red-600">{errors.breadth}</p>}

                                </div>
                                <div>
                                    <label
                                        somelabel="Height"
                                        className="block text-sm font-medium text-gray-700  "
                                    >
                                        Height
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex  mt-2">
                                        <input
                                            type="number"
                                            placeholder="Eg. 1.25"
                                            name='height'
                                            value={shippingInfo.height}
                                            onChange={handleShipmentInfo}
                                            className="flex-grow p-2 border rounded-l-md cursor-pointer focus:border-l-indigo-600 focus:border-t-indigo-600 focus:border-b-indigo-600 focus:outline-none transition-all duration-200 hover:bg-gray-50 w-28"
                                        />
                                        <span className="px-3 bg-gray-200 rounded-r-md py-1.5">cm</span>{" "}
                                    </div>
                                    {errors.height && <p className="font-semibold text-[12px] text-red-600">{errors.height}</p>}

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mx-4">
                                <p className=" font-bold">Item(s) Details <span className='cursor-pointer px-1 text-red-500 bg-yellow-100 rounded-md font-light text-[10px]'>Items that can export</span></p>
                            </div>
                        </div>
                        {products.map((products, index) => (
                            <div className={` flex flex-row ${ index === 0 ? "" : ""} px-4 gap-4 `} >
                                <div className='mt-3' key={index}>
                                    <label
                                        somelabel="Height"
                                        className="block text-sm font-medium text-gray-700 mb-1  "
                                    >
                                        Product Name
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex  mt-2">
                                        <input
                                            type="text"
                                            placeholder="Enter Product Name..."
                                            name='productName'
                                            value={products.productName }
                                            onChange={handleProductChange }
                                            className="flex-grow p-2 border rounded-md cursor-pointer  focus:border-indigo-600 focus:outline-none hover:bg-gray-50 w-36"
                                        />
                                    </div>
                                    {errors.productName && <p className="font-semibold text-[12px] text-red-600">{errors.productName}</p>}

                                </div>
                                <div className='mt-3'>
                                    <label
                                        somelabel="Height"
                                        className="block text-sm font-medium text-gray-700 mb-1  "
                                    >
                                        SKU
                                    </label>
                                    <div className="flex  mt-2">
                                        <input
                                            type="text"
                                            placeholder="Enter SKU ..."
                                            name='SKU'
                                            value={shippingInfo.SKU + "" + products.sku}
                                            onChange={handleShipmentInfo + "" + handleProductChange}
                                            className="flex-grow p-2 border rounded-md cursor-pointer  focus:border-indigo-600 focus:outline-none hover:bg-gray-50 w-36"
                                        />
                                    </div>

                                </div>
                                <div className='mt-3'>
                                    <label
                                        somelabel="Height"
                                        className="block text-sm font-medium text-gray-700 mb-1  "
                                    >
                                        HSN
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex  mt-2">
                                        <input
                                            type="text"
                                            placeholder="Enter HSN ..."
                                            name='HSN'
                                            value={shippingInfo.HSN + "" + products.hsn}
                                            onChange={handleShipmentInfo + "" + handleProductChange}
                                            className="flex-grow p-2 border rounded-md cursor-pointer  focus:border-indigo-600 focus:outline-none hover:bg-gray-50 w-36"
                                        />
                                    </div>
                                    {errors.HSN && <p className="font-semibold text-[12px] text-red-600">{errors.HSN}</p>}

                                </div>
                                <div className='mt-3'>
                                    <label
                                        somelabel="Height"
                                        className="block text-sm font-medium text-gray-700 mb-1  "
                                    >
                                        Qty
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex  mt-2">
                                        <input
                                            type="number"
                                            placeholder="Enter Qty ..."
                                            name='Qty'
                                            value={shippingInfo.Qty + "" + products.qty}
                                            onChange={handleShipmentInfo + "" + handleProductChange}
                                            className="flex-grow p-2 border rounded-md cursor-pointer  focus:border-indigo-600 focus:outline-none hover:bg-gray-50 w-36"
                                        />
                                    </div>
                                    {errors.Qty && <p className="font-semibold text-[12px] text-red-600">{errors.Qty}</p>}

                                </div>
                                <div className='mt-3'>
                                    <label
                                        somelabel="Height"
                                        className="block text-sm font-medium text-gray-700 mb-1  "
                                    >
                                        Unit Price (INR)
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex  mt-2">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            name='unitPrice'
                                            value={shippingInfo.unitPrice + "" + products.untPrice}
                                            onChange={handleShipmentInfo + "" + handleProductChange}
                                            className="flex-grow p-2 border rounded-md cursor-pointer focus:border-indigo-600 focus:outline-none hover:bg-gray-50 w-36"
                                        />
                                    </div>
                                    {errors.unitPrice && <p className="font-semibold text-[12px] text-red-600">{errors.unitPrice}</p>}

                                </div>
                                <div className='mt-3'>
                                    <label
                                        somelabel="Height"
                                        className="block text-sm font-medium text-gray-700 mb-1  "
                                    >
                                        IGST
                                        <span className="text-red-600 ml-1">*</span>{" "}
                                    </label>
                                    <div className="flex mt-2">
                                        <input
                                            type="text"
                                            disabled
                                            placeholder="0%"
                                            name='IGST'
                                            value={shippingInfo.IGST + "" + products.igst}
                                            onChange={handleShipmentInfo + "" + handleProductChange}
                                            className="flex-grow p-2 border cursor-pointer rounded-md w-16 focus:border-indigo-600 focus:outline-none hover:bg-gray-50 "
                                        />
                                    </div>
                                    {errors.IGST && <p className="font-semibold text-[12px] text-red-600">{errors.IGST}</p>}
                                </div>
                                {index>0 && (
                                    <div className='mt-6'>
                                        <div
                                            className="text-red-500 w-5 mt-5 text-[25px]  cursor-pointer rounded-md font-semibold "
                                            onClick={() => removeProduct(index)}
                                        >
                                            <RiDeleteBin6Line />
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                        
                        <div onClick={(e) => {e.preventDefault(); addProduct()}}>
                            <p className='flex m-5 text-indigo-900 text-[15px]' >
                                <div>
                                    <MdAdd className='text-xl' />
                                </div>
                                <div className='underline font-semibold cursor-pointer hover:text-indigo-800'>
                                    <p>Add Another Product</p>
                                </div>
                            </p>
                        </div>
                        <div className="flex justify-end mt-5">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-gray-100 rounded-md font-bold text-[14px] cursor-pointer"
                            >
                                Select Shipping
                            </button>
                        </div>
                    </div>
                </form>
            </Accordion>
        </div>
    )
}
export default Form3