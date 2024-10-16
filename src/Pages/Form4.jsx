import React from 'react'
import Accordion from '../Components/Accordion'

function Form4() {
    return (
        <div>
            <Accordion title={"Select Shipping Partner"}>
                <div className='p-4 text-sm'>
                    <div>
                        <p>All shipments via ShipGlobal services are <b>Delivered Duty Paid (DDP)</b>, hence <b>no extra duty</b> will be billed on the consignee or the shipper. Rates are inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi Hub.</p>
                        <br />
                        <p>In case any doubt, please call/whatsapp at <span className='text-indigo-800 font-semibold'>011-422 77777</span></p>
                    </div>

                    <div className="flex justify-center items-center gap-4 text-slate-500 mt-5 px-12">
                        <div className="flex flex-col justify-center items-center  py-2 min-w-[150px] border rounded-md bg-slate-100">
                            <p className='font-semibold'>1 KG</p>
                            <p className="text-sm">Dead Weight</p>
                        </div>
                        <div className="flex flex-col justify-center items-center py-2 min-w-[150px] border rounded-md bg-slate-100 ">
                            <p className='font-semibold'>0.001 KG</p>
                            <p className="text-sm">Volumetric Weight</p>
                        </div>
                        <div className="flex flex-col justify-center items-center py-2 min-w-[150px] border border-orange-600 rounded-md bg-slate-100 text-[#F59300] ">
                            <p className='font-semibold'>1 KG</p>
                            <p className="text-sm">Billed Weight</p>
                        </div>
                    </div>

                    <div className='pt-4'>
                        <p className='font-semibold'>Showing 3 Results</p>
                    </div>

                    <div className='mt-2 rounded-xl overflow-hidden'>
                        <table className=''>
                            <tr className='grid grid-cols-4 py-2 w-[900px] border rounded-md mb-4px text-gray-400 bg-slate-100'>
                                <th className="">Courier Partner</th>
                                <th className="">Delivery Time</th>
                                <th className="">Shipment Rate</th>
                                <th className="">Select</th>
                            </tr>
                            <tr className=' grid grid-cols-4 px-12 py-4 mt-2  w-[900px] border rounded-md mb-4px text-gray-500x'>
                                <td className='font-semibold'>ShipGlobal WorldWide</td>
                                <td className="ml-9">13 - 18 Days</td>
                                <td className="ml-14">Rs. 3229</td>
                                <td className='ml-28'><input className='border p-2 rounded-full accent-green-600 h-5 w-5 cursor-pointer' type="Checkbox" name="" id="" /></td>
                            </tr>
                            <tr className=' grid grid-cols-4 px-12 py-4 mt-2  w-[900px] border rounded-md mb-4px text-gray-500x'>
                                <td className='font-semibold'>Fedex</td>
                                <td className="ml-9">4 - 7 Days</td>
                                <td className="ml-14">Rs. 3465</td>
                                <td className="ml-28"><input className='border p-2 rounded-full accent-green-600 h-5 w-5 cursor-pointer' type="Checkbox" name="" id="" /></td>
                            </tr>
                            <tr className=' grid grid-cols-4 px-12 py-4 mt-2  w-[900px] border rounded-md mb-4px text-gray-500x'>
                                <td className='font-semibold'>UPS</td>
                                <td className="ml-9">4 - 7 Days</td>
                                <td className="ml-14">Rs. 5785</td>
                                <td className='ml-28'><input className='border p-2 rounded-full accent-green-600 h-5 w-5 cursor-pointer' type="Checkbox" name="" id="" /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900 text-gray-100 rounded-md font-bold text-[14px] hover:bg-blue-800 cursor-pointer"
                        >
                            Pay and Order
                        </button>
                    </div>
                </div>
            </Accordion>
        </div>
    )
}

export default Form4