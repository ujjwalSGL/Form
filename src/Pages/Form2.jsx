import React, { useState } from 'react';
import Accordion from '../Components/Accordion';
import Input from '../Components/Input';
import Select from '../Components/Select';
import Button from '../Components/Button'
import Label from '../Components/Label';

const countryStateMap = {
    India: ['UP', 'MP', 'UK'],
    US: ['California', 'Texas', 'New York'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
};

function Form2({ activeState, setActiveState }) {
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
        if (!shippingAddress.firstName) {
            newErrors.firstName = 'First name is required';
        }
        if (!shippingAddress.lastName) newErrors.lastName = 'Last name is required';
        if (!/^\d{10}$/.test(shippingAddress.mobile)) newErrors.mobile = 'Invalid mobile number';
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
            const finalBillingAddress = isBillingAddressSame ? shippingAddress : billingAddress;
            console.log({
                shippingAddress, billingAddress: finalBillingAddress,
            });
            setActiveState(3);
        }

    }
    return (
        <div className='w-[1000px]'>
            <Accordion title={"Consignee Details"}
                isOpen={activeState === 2}
                onToggle={() => setActiveState(2)}
                stepNum={2}
                activeState={activeState}
            >
                <form className="space-y-4 text-sm mx-4" onSubmit={handleSubmit}>
                    <div>
                        <Label className='font-bold'>Personal Details</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            <div>
                                <Label isRequired>First Name</Label>
                                <Input type="text" placeholder="Enter First Name..."
                                    name="firstName"
                                    value={shippingAddress.firstName}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"
                                />
                                {errors.firstName && <p className="font-semibold -mt-2 text-[12px] text-red-600">{errors.firstName}</p>}
                                {/* errors.firstName && <ErrorComponent title = {errors.firstname}/> */}
                                {/* errorcomponent = > return <p clas...>{title}</p> */}
                            </div>
                            <div>
                                <Label isRequired>Last Name</Label>
                                <Input type="text" placeholder="Enter Last Name..."
                                    name="lastName"
                                    value={shippingAddress.lastName}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"

                                />
                                {errors.lastName && <p className="font-semibold text-[12px] -mt-2 text-red-600">{errors.lastName}</p>}
                            </div>
                            <div>
                                <Label isRequired>Mobile Number</Label>
                                <Input type="text" placeholder="Enter Mobile Number..."
                                    name="mobile"
                                    value={shippingAddress.mobile}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"
                                />
                                {errors.mobile && <p className="font-semibold text-[12px] -mt-2 text-red-600">{errors.mobile}</p>}
                            </div>
                            <div>
                                <Label>Email Address <span className='text-red-600'>*</span></Label>
                                <Input type="email" placeholder="Enter Email ID..."
                                    name="email"
                                    value={shippingAddress.email}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"

                                />
                                {errors.email && <p className="font-semibold text-[12px] -mt-2 text-red-600">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label className='font-bold'>Shipping Address</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            <div>
                                <Label isRequired>Address 1</Label>
                                <Input type="text" placeholder="Enter Address 1..." name="address1"
                                    value={shippingAddress.address1}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"

                                />
                                {errors.address1 && <p className="font-semibold -mt-2 text-[12px] text-red-600">{errors.address1}</p>}
                            </div>
                            <div>
                                <Label>Address 2</Label>
                                <Input type="text" placeholder="Enter Address 2..." name="address2"
                                    value={shippingAddress.address2}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"

                                />
                            </div>
                            <div>
                                <Label>Landmark</Label>
                                <Input type="text" placeholder="Enter Landmark..."
                                    name="landmark"
                                    value={shippingAddress.landmark}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"

                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
                            <div>
                                <Label>Country <span className='text-red-600'>*</span></Label>
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
                                <Label isRequired>State</Label>
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
                                <Label isRequired>City</Label >
                                <Input type="text" placeholder="Enter City..."
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"
                                />
                                {errors.city && <p className="font-semibold text-[12px] -mt-2 text-red-600">{errors.city}</p>}
                            </div>
                            <div>
                                <Label isRequired>Pincode</Label>
                                <Input type="text" placeholder="Enter Pincode..."
                                    name="pincode"
                                    value={shippingAddress.pincode}
                                    onChange={handleShippingChange}
                                    className="rounded-md w-[222px]"

                                />
                                {errors.pincode && <p className="font-semibold -mt-2 text-[12px] text-red-600">{errors.pincode}</p>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-6">
                            <input
                                type="checkbox"
                                className="border p-2 rounded-lg accent-blue-800  mt-1 cursor-pointer"
                                checked={isBillingAddressSame}
                                onChange={() => setIsBillingAddressSame(!isBillingAddressSame)}
                            />
                            <Label className='cursor-pointer'>Billing address is same as shipping address</Label>
                        </div>

                        {!isBillingAddressSame && (
                            <div className='mt-6'>
                                <div className='mb-6'>
                                    <Label className='font-bold'>Billing Address</Label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                    <div>
                                        <Label isRequired>Address 1</Label>
                                        <Input type="text" placeholder="Enter Address 1..." name="address1"
                                            value={billingAddress.address1}
                                            onChange={handleBillingChange}
                                            className="rounded-md w-[222px]"
                                        />

                                    </div>

                                    <div>
                                        <Label>Address 2</Label>
                                        <Input type="text" placeholder="Enter Address 2..." name="address2"
                                            value={billingAddress.address2}
                                            onChange={handleBillingChange}
                                            className="rounded-md w-[222px]"

                                        />
                                    </div>
                                    <div>
                                        <Label>Landmark</Label>
                                        <Input type="text" placeholder="Enter Landmark..." name="landmark"
                                            value={billingAddress.landmark}
                                            onChange={handleBillingChange}
                                            className="rounded-md w-[222px]"
                                        />
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
                                    <div>
                                        <Label isRequired>Country</Label>
                                        <Select
                                            options={countryOptions}
                                            Style="light"
                                            value={billingAddress.country}
                                            onChange={(e) => handleBillingChange({ target: { name: 'country', value: e.target.value } })}
                                            name="country"

                                        />
                                    </div>
                                    <div>
                                        <Label isRequired>State </Label>
                                        <Select
                                            options={stateOptions}
                                            Style="light"
                                            value={billingAddress.state}
                                            onChange={(e) => handleBillingChange({ target: { name: 'state', value: e.target.value } })}
                                            name="state"
                                        />
                                    </div>
                                    <div>
                                        <Label isRequired>City</Label>
                                        <Input type="text" placeholder="Enter City..." name="city"
                                            value={billingAddress.city}
                                            onChange={handleBillingChange}
                                            className="rounded-md w-[222px]"

                                        />
                                    </div>
                                    <div>
                                        <Label isRequired>Pincode </Label>
                                        <Input type="text" placeholder="Enter Pincode..." name="pincode"
                                            value={billingAddress.pincode}
                                            onChange={handleBillingChange}
                                            className="rounded-md w-[222px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end mt-5">
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-blue-900 text-gray-100 border rounded-xl font-bold "
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </form>
            </Accordion>
        </div>
    )
}

export default Form2;