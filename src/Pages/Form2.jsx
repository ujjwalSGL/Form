import React, { useState } from 'react';
import Accordion from '../Components/Accordion';
import Select from '../Components/Select';
import Button from '../Components/Button'
import Label from '../Components/Label';
import Data from '../Components/Data';
import Error from '../Components/Error';

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
        if (!shippingAddress.address2) newErrors.address2 = 'Address 2 is required';
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
                // onToggle={() => setActiveState(2)}
                stepNum={2}
                activeState={activeState}
            >
                <form className="space-y-4 text-sm mx-4" onSubmit={handleSubmit}>
                    <div>
                        <Label className='font-bold'>Personal Details</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                            <Data
                                isRequired
                                type="text"
                                name="firstName"
                                value={shippingAddress.firstName}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter your username"
                                error={errors.firstName}
                            >First Name</Data>
                            <Data
                                isRequired
                                type="text"
                                name="lastName"
                                value={shippingAddress.lastName}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter your username"
                                error={errors.lastName}
                            >Last Name</Data>
                            <Data
                                isRequired
                                type="text"
                                name="mobile"
                                value={shippingAddress.mobile}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter your username"
                                error={errors.mobile}

                            >Mobile Number</Data>
                            <Data
                                isRequired
                                type="text"
                                name="email"
                                value={shippingAddress.email}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter your username"
                                error={errors.email}
                            >Email Address</Data>
                        </div>
                    </div>

                    <div>
                        <Label className='font-bold'>Shipping Address</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            <Data
                                isRequired
                                type="text"
                                name="address1"
                                value={shippingAddress.address1}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter your username"
                                error={errors.address1}
                            >Address 1</Data>
                            <Data
                                isRequired
                                type="text"
                                name="address2"
                                value={shippingAddress.address2}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter your username"
                                error={errors.address2}
                            >Address 2</Data>
                            <Data
                                type="text"
                                name="landmark"
                                value={shippingAddress.landmark}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter your username"
                            >
                                Landmark
                            </Data>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
                            <div>
                                <Label>Country <span className='text-red-600'>*</span></Label>
                                <Select
                                    options={countryOptions}
                                    value={shippingAddress.country}
                                    onChange={handleCountryChange}
                                    name="country"

                                />
                                <Error errors={errors.country} className={"mt-0"} />
                            </div>
                            <div>
                                <Label isRequired>State</Label>
                                <Select
                                    options={stateOptions}
                                    value={shippingAddress.state}
                                    onChange={handleStateChange}
                                    name="state"
                                />
                                <Error errors={errors.state} className={"mt-0"} />
                            </div>
                            <Data
                                isRequired
                                type="text"
                                name="city"
                                value={shippingAddress.city}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter City..."
                                error={errors.city}
                            >
                                City
                            </Data>
                            <Data
                                isRequired
                                type="text"
                                name="pincode"
                                value={shippingAddress.pincode}
                                onChange={handleShippingChange}
                                className="rounded-md w-[222px]"
                                placeholder="Enter Pincode..."
                                error={errors.pincode}
                            >
                                Pincode
                            </Data>
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
                                    <Data
                                        isRequired
                                        type="text"
                                        name="address1"
                                        value={billingAddress.address1}
                                        onChange={handleShippingChange}
                                        className="rounded-md w-[222px]"
                                        placeholder="Enter Address 1..."
                                        error={errors.address1}
                                    >
                                        Address 1
                                    </Data>
                                    <Data
                                        isRequired
                                        type="text"
                                        placeholder="Enter Address 2..." name="address2"
                                        value={billingAddress.address2}
                                        onChange={handleShippingChange}
                                        className="rounded-md w-[222px]"
                                        error={errors.address2}

                                    >
                                        Address 2
                                    </Data>
                                    <Data
                                        type="text"
                                        value={billingAddress.landmark}
                                        onChange={handleShippingChange}
                                        className="rounded-md w-[222px]"
                                        placeholder="Enter Landmark..." name="landmark"

                                    >
                                        Landmark
                                    </Data>
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
                                        <Error errors={errors.country} className={"mt-0"} />
                                    </div>
                                    <div>
                                        <Label isRequired>State </Label>
                                        <Select
                                            options={stateOptions}
                                            Style="light"
                                            value={billingAddress.state}
                                            onChange={(e) => handleBillingChange({ target: { name: 'state', value: e.target.value } })}
                                            name="state"
                                            error={errors.state}
                                        />
                                        <Error errors={errors.state} className={"mt-1"} />
                                    </div>
                                    <Data
                                        isRequired
                                        type="text"
                                        value={billingAddress.city}
                                        onChange={handleShippingChange}
                                        className="rounded-md w-[222px]"
                                        placeholder="Enter City..." name="city"
                                        error={errors.city}
                                    >
                                        City
                                    </Data>
                                    <Data
                                        isRequired
                                        type="text"
                                        value={billingAddress.pincode}
                                        onChange={handleShippingChange}
                                        className="rounded-md w-[222px]"
                                        placeholder="Enter Pincode..." name="pincode"
                                        error={errors.pincode}
                                    >
                                        Pincode
                                    </Data>
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