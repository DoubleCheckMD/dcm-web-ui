import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: '',
        gender: '',
        dateOfBirth: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        pincode: '',
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        const newErrors = {}
        const requiredFields = [
            'firstName',
            'lastName',
            'email',
            'password',
            'mobileNumber',
            'gender',
            'dateOfBirth',
            'address1',
            'city',
            'state',
            'pincode',
        ]
        requiredFields.forEach((field) => {
            if (!values[field]) {
                newErrors[field] = `${field} is required`
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        try {
            const response = await axios.post('http://localhost:3000/auth/register', values)
            if (response.status === 201) {
                navigate('/login')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 px-4'>
            <div className='shadow-lg px-8 py-5 border bg-white w-full max-w-lg rounded-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
                <form onSubmit={handleSumbit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className='block text-gray-700'>First Name</label>
                            <input
                                type="text"
                                placeholder='Enter First Name'
                                className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : ''}`}
                                name="firstName"
                                onChange={handleChanges}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className='block text-gray-700'>Last Name</label>
                            <input
                                type="text"
                                placeholder='Enter Last Name'
                                className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : ''}`}
                                name="lastName"
                                onChange={handleChanges}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                            name="email"
                            onChange={handleChanges}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className='block text-gray-700'>Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                            name="password"
                            onChange={handleChanges}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="mobileNumber" className='block text-gray-700'>Mobile Number</label>
                        <input
                            type="text"
                            placeholder='Enter Mobile Number'
                            className={`w-full px-3 py-2 border rounded ${errors.mobileNumber ? 'border-red-500' : ''}`}
                            name="mobileNumber"
                            onChange={handleChanges}
                        />
                        {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="gender" className='block text-gray-700'>Gender</label>
                        <select
                            name="gender"
                            onChange={handleChanges}
                            className={`w-full px-3 py-2 border rounded ${errors.gender ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="dateOfBirth" className='block text-gray-700'>Date of Birth</label>
                        <input
                            type="date"
                            className={`w-full px-3 py-2 border rounded ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                            name="dateOfBirth"
                            onChange={handleChanges}
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="address1" className='block text-gray-700'>Address 1</label>
                        <input
                            type="text"
                            placeholder='Enter Address 1'
                            className={`w-full px-3 py-2 border rounded ${errors.address1 ? 'border-red-500' : ''}`}
                            name="address1"
                            onChange={handleChanges}
                        />
                        {errors.address1 && <p className="text-red-500 text-sm">{errors.address1}</p>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="address2" className='block text-gray-700'>Address 2 (Optional)</label>
                        <input
                            type="text"
                            placeholder='Enter Address 2'
                            className='w-full px-3 py-2 border rounded'
                            name="address2"
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label htmlFor="city" className='block text-gray-700'>City</label>
                            <input
                                type="text"
                                placeholder='Enter City'
                                className={`w-full px-3 py-2 border rounded ${errors.city ? 'border-red-500' : ''}`}
                                name="city"
                                onChange={handleChanges}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div>
                            <label htmlFor="state" className='block text-gray-700'>State</label>
                            <input
                                type="text"
                                placeholder='Enter State'
                                className={`w-full px-3 py-2 border rounded ${errors.state ? 'border-red-500' : ''}`}
                                name="state"
                                onChange={handleChanges}
                            />
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="pincode" className='block text-gray-700'>Pincode</label>
                        <input
                            type="text"
                            placeholder='Enter Pincode'
                            className={`w-full px-3 py-2 border rounded ${errors.pincode ? 'border-red-500' : ''}`}
                            name="pincode"
                            onChange={handleChanges}
                        />
                        {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 mt-6 rounded hover:bg-green-700 transition">
                        Submit
                    </button>
                </form>
                <div className="text-center mt-4">
                    <span>Already have an account?</span>
                    <Link to='/login' className='text-blue-500 ml-1'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register