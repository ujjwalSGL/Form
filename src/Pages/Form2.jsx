import React, { useState } from 'react';
import Accordion from '../Components/Accordion';
import Input from '../Components/Input';
import Select from '../Components/Select';

const countryStateMap = {
    India: ['UP', 'MP', 'UK'],
    US: ['California', 'Texas', 'New York'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
};

function Form2() {
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [errors, setErrors] = useState({});
    const [isBillingAddressSame, setIsBillingAddressSame] = useState(true);
    
    const countryOptions = [
        { value: '', label: 'Select Country' },
        { value: 'India', label: 'India' },
        { value: 'US', label: 'US' },
        { value: 'Canada', label: 'Canada' },
    ];

    const stateOptions = [
        { value: '', label: 'Select State' },
        ...states.map((state) => ({ value: state, label: state })),
    ];

    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        address1: '',
        address2: '',
        landmark: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
    });

    const [billingAddress, setBillingAddress] = useState({
        address1: '',
        address2: '',
        landmark: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
    });

    const handleCountryChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        setStates(countryStateMap[country] || []);
        setShippingAddress((prevData) => ({
            ...prevData,
            country: country,
            state: '',
        }));
        setSelectedState('');
    };

    const handleStateChange = (event) => {
        const state = event.target.value;
        setSelectedState(state);
        setShippingAddress((prevData) => ({
            ...prevData,
            state: state,
        }));
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function validateForm() {
        const newErrors = {};
        if (!shippingAddress.firstName) newErrors.firstName = 'First name is required';
        if (!shippingAddress.lastName) newErrors.lastName = 'Last name is required';
        if (!shippingAddress.mobile) newErrors.mobile = 'Mobile number is required';
        if (!/^\d{10}$/.test(shippingAddress.mobile)) newErrors.mobile = 'Invalid mobile number';
        if (!shippingAddress.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(shippingAddress.email)) newErrors.email = 'Invalid email address';
        if (!shippingAddress.address1) newErrors.address1 = 'Address 1 is required';
        if (!shippingAddress.country) newErrors.country = 'Country is required';
        if (!shippingAddress.state) newErrors.state = 'State is required';
        if (!shippingAddress.city) newErrors.city = 'City is required';
        if (!shippingAddress.pincode) newErrors.pincode = 'Pincode is required';
        if (!/^\d{6}$/.test(shippingAddress.pincode)) newErrors.pincode = 'Invalid pincode';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            const finalBillingAddress = isBillingAddressSame
                ? shippingAddress
                : billingAddress;
            console.log({
                shippingAddress,
                billingAddress: finalBillingAddress,
            });
        }
    }

    return (
        <div className='w-[1000px]'>
            <Accordion title={"Consignee Details"}>
                <form className="space-y-4 text-sm mx-4" onSubmit={handleSubmit}>
                    <div>
                        <label className='font-bold'>Personal Details</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label>First Name <span className='text-red-600'>*</span></label>
                                <Input type="text" placeholder="Enter First Name..."
                                    name="firstName"
                                    value={shippingAddress.firstName}
                                    onChange={handleShippingChange}
                                />
                                {errors.firstName && <p className="font-semibold -mt-2 text-[12px] text-red-600">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label>Last Name <span className='text-red-600'>*</span></label>
                                <Input type="text" placeholder="Enter Last Name..."
                                    name="lastName"
                                    value={shippingAddress.lastName}
                                    onChange={handleShippingChange}
                                />
                                {errors.lastName && <p className="font-semibold text-[12px] -mt-2 text-red-600">{errors.lastName}</p>}
                            </div>
                            <div>
                                <label>Mobile Number <span className='text-red-600'>*</span></label>
                                <Input type="text" placeholder="Enter Mobile Number..."
                                    name="mobile"
                                    value={shippingAddress.mobile}
                                    onChange={handleShippingChange}
                                />
                                {errors.mobile && <p className="font-semibold text-[12px] -mt-2 text-red-600">{errors.mobile}</p>}
                            </div>
                            <div>
                                <label>Email Address <span className='text-red-600'>*</span></label>
                                <Input type="email" placeholder="Enter Email ID..."
                                    name="email"
                                    value={shippingAddress.email}
                                    onChange={handleShippingChange}
                                />
                                {errors.email && <p className="font-semibold text-[12px] -mt-2 text-red-600">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className='font-bold'>Shipping Address</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            <div>
                                <label>Address 1 <span className='text-red-600'>*</span></label>
                                <Input type="text" placeholder="Enter Address 1..." name="address1"
                                    value={shippingAddress.address1}
                                    onChange={handleShippingChange}
                                />
                                {errors.address1 && <p className="font-semibold -mt-2 text-[12px] text-red-600">{errors.address1}</p>}
                            </div>
                            <div>
                                <label>Address 2</label>
                                <Input type="text" placeholder="Enter Address 2..." name="address2"
                                    value={shippingAddress.address2}
                                    onChange={handleShippingChange}
                                />
                            </div>
                            <div>
                                <label>Landmark</label>
                                <Input type="text" placeholder="Enter Landmark..."
                                    name="landmark"
                                    value={shippingAddress.landmark}
                                    onChange={handleShippingChange}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
                            <div>
                                <label>Country <span className='text-red-600'>*</span></label>
                                <Select
                                    options={countryOptions}
                                    Style="light"
                                    value={shippingAddress.country}
                                    onChange={handleCountryChange}
                                    name="country"
                                />
                                {errors.country && <p className="font-semibold text-[12px] text-red-600">{errors.country}</p>}
                            </div>
                            <div>
                                <label>State <span className='text-red-600'>*</span></label>
                                <Select
                                    options={stateOptions}
                                    Style="light"
                                    value={shippingAddress.state}
                                    onChange={handleStateChange}
                                    name="state"
                                />
                                {errors.state && <p className="font-semibold text-[12px] text-red-600">{errors.state}</p>}
                            </div>
                            <div>
                                <label>City <span className='text-red-600'>*</span></label>
                                <Input type="text" placeholder="Enter City..."
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleShippingChange}
                                />
                                {errors.city && <p className="font-semibold text-[12px] text-red-600">{errors.city}</p>}
                            </div>
                            <div>
                                <label>Pincode <span className='text-red-600'>*</span></label>
                                <Input type="text" placeholder="Enter Pincode..."
                                    name="pincode"
                                    value={shippingAddress.pincode}
                                    onChange={handleShippingChange}
                                />
                                {errors.pincode && <p className="font-semibold -mt-2 text-[12px] text-red-600">{errors.pincode}</p>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-6">
                            <input
                                type="checkbox"
                                className="border p-2 rounded-lg accent-blue-800 h-5 w-5 mt-1 cursor-pointer"
                                checked={isBillingAddressSame}
                                onChange={() => setIsBillingAddressSame(!isBillingAddressSame)}
                            />
                            <label className='cursor-pointer'>Billing address is same as shipping address</label>
                        </div>

                        {!isBillingAddressSame && (
                            <div className='mt-6'>
                                <div className='mb-6'>
                                    <label className='font-bold'>Billing Address</label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                    <div>
                                        <label>Address 1 <span className='text-red-600'>*</span></label>
                                        <Input type="text" placeholder="Enter Address 1..." name="address1"
                                            value={billingAddress.address1}
                                            onChange={handleBillingChange}
                                        />

                                    </div>

                                    <div>
                                        <label>Address 2</label>
                                        <Input type="text" placeholder="Enter Address 2..." name="address2"
                                            value={billingAddress.address2}
                                            onChange={handleBillingChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Landmark</label>
                                        <Input type="text" placeholder="Enter Landmark..." name="landmark"
                                            value={billingAddress.landmark}
                                            onChange={handleBillingChange}
                                        />
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
                                    <div>
                                        <label>Country <span className='text-red-600'>*</span></label>
                                        <Select
                                            options={countryOptions}
                                            Style="light"
                                            value={billingAddress.country}
                                            onChange={(e) => handleBillingChange({ target: { name: 'country', value: e.target.value } })}
                                            name="country"
                                        />
                                    </div>
                                    <div>
                                        <label>State <span className='text-red-600'>*</span></label>
                                        <Select
                                            options={stateOptions}
                                            Style="light"
                                            value={billingAddress.state}
                                            onChange={(e) => handleBillingChange({ target: { name: 'state', value: e.target.value } })}
                                            name="state"
                                        />
                                    </div>
                                    <div>
                                        <label>City <span className='text-red-600'>*</span></label>
                                        <Input type="text" placeholder="Enter City..." name="city"
                                            value={billingAddress.city}
                                            onChange={handleBillingChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Pincode <span className='text-red-600'>*</span></label>
                                        <Input type="text" placeholder="Enter Pincode..." name="pincode"
                                            value={billingAddress.pincode}
                                            onChange={handleBillingChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end mt-5">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-gray-100 rounded-md font-bold "
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </form>
            </Accordion>
        </div>
    );
}

export default Form2;
