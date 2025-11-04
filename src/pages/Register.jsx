import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { authService } from '../services'
import ThemeToggle from '../components/ThemeToggle'
import SecondOpinionLogo from '../components/SecondOpinionLogo'

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1)
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
    
    const totalSteps = 3

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
        }
    }

    const validateStep = (step) => {
        const newErrors = {}
        
        if (step === 1) {
            // Basic Info validation
            if (!values.firstName) newErrors.firstName = 'First name is required'
            if (!values.lastName) newErrors.lastName = 'Last name is required'
            if (!values.email) {
                newErrors.email = 'Email is required'
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                newErrors.email = 'Email is invalid'
            }
            if (!values.password) {
                newErrors.password = 'Password is required'
            } else if (values.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters'
            }
        } else if (step === 2) {
            // Contact Info validation
            if (!values.mobileNumber) newErrors.mobileNumber = 'Mobile number is required'
            if (!values.gender) newErrors.gender = 'Gender is required'
            if (!values.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
        } else if (step === 3) {
            // Address validation
            if (!values.address1) newErrors.address1 = 'Address is required'
            if (!values.city) newErrors.city = 'City is required'
            if (!values.state) newErrors.state = 'State is required'
            if (!values.pincode) newErrors.pincode = 'Pincode is required'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1)
        setErrors({})
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        if (!validateStep(currentStep)) return
        try {
            const response = await authService.register(values)
            if(response.status === 201) {
                navigate('/login')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const renderStepIndicator = () => {
        return (
            <div className="flex items-center justify-center mb-8">
                {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                            step === currentStep 
                                ? 'border-accent bg-accent text-white' 
                                : step < currentStep 
                                ? 'border-green-500 bg-green-500 text-white'
                                : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                        }`}>
                            {step < currentStep ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <span className="font-semibold">{step}</span>
                            )}
                        </div>
                        {step < 3 && (
                            <div className={`w-16 h-1 mx-2 ${
                                step < currentStep ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        )
    }

    const renderStep1 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>First Name</label>
                    <input
                        type="text"
                        placeholder='Enter First Name'
                        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChanges}
                    />
                    {errors.firstName && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Last Name</label>
                    <input
                        type="text"
                        placeholder='Enter Last Name'
                        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChanges}
                    />
                    {errors.lastName && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Email Address</label>
                <input
                    type="email"
                    placeholder='your.email@example.com'
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    name="email"
                    value={values.email}
                    onChange={handleChanges}
                />
                {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Password</label>
                <input
                    type="password"
                    placeholder='Minimum 6 characters'
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    name="password"
                    value={values.password}
                    onChange={handleChanges}
                />
                {errors.password && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>
        </div>
    )

    const renderStep2 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h3>
            <div>
                <label htmlFor="mobileNumber" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Mobile Number</label>
                <input
                    type="text"
                    placeholder='Enter Mobile Number'
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChanges}
                />
                {errors.mobileNumber && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.mobileNumber}</p>}
            </div>
            <div>
                <label htmlFor="gender" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Gender</label>
                <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChanges}
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-accent transition-all ${errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.gender}</p>}
            </div>
            <div>
                <label htmlFor="dateOfBirth" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Date of Birth</label>
                <input
                    type="date"
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-accent transition-all ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    onChange={handleChanges}
                />
                {errors.dateOfBirth && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>
        </div>
    )

    const renderStep3 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Address Details</h3>
            <div>
                <label htmlFor="address1" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Address Line 1</label>
                <input
                    type="text"
                    placeholder='Street, Building, etc.'
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.address1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    name="address1"
                    value={values.address1}
                    onChange={handleChanges}
                />
                {errors.address1 && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.address1}</p>}
            </div>
            <div>
                <label htmlFor="address2" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Address Line 2 <span className="text-gray-400 text-xs">(Optional)</span></label>
                <input
                    type="text"
                    placeholder='Apartment, Suite, Unit, etc.'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all'
                    name="address2"
                    value={values.address2}
                    onChange={handleChanges}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="city" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>City</label>
                    <input
                        type="text"
                        placeholder='Enter City'
                        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        name="city"
                        value={values.city}
                        onChange={handleChanges}
                    />
                    {errors.city && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                    <label htmlFor="state" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>State</label>
                    <input
                        type="text"
                        placeholder='Enter State'
                        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        name="state"
                        value={values.state}
                        onChange={handleChanges}
                    />
                    {errors.state && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="pincode" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Pincode</label>
                <input
                    type="text"
                    placeholder='Enter Pincode'
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent transition-all ${errors.pincode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    name="pincode"
                    value={values.pincode}
                    onChange={handleChanges}
                />
                {errors.pincode && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.pincode}</p>}
            </div>
        </div>
    )

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8 relative transition-colors duration-200'>
            {/* Theme Toggle */}
            <div className="fixed top-6 right-6 z-[100]">
                <ThemeToggle />
            </div>
            
            {/* Back to Home - Top Left */}
            <Link
                to="/"
                className="fixed top-6 left-6 z-[100] inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-200 hover:gap-3 group"
            >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Home</span>
            </Link>
            
            {/* Logo & Branding */}
            <div className="absolute top-20 left-8 flex items-center gap-2 z-10">
                <SecondOpinionLogo showText={false} width={40} />
                <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Second Opinion</span>
            </div>
            
            <div className='shadow-2xl px-8 py-8 border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm w-full max-w-2xl rounded-3xl transition-colors duration-200 fade-in'>
                <h2 className='text-3xl font-bold mb-2 text-center bg-primary-gradient bg-clip-text text-transparent'>Create Account</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">Join us to get expert medical second opinions</p>
                
                {renderStepIndicator()}
                
                <form onSubmit={handleSumbit} noValidate>
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    
                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-8">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                            >
                                ← Previous
                            </button>
                        )}
                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex-1 bg-primary-gradient text-white py-3 rounded-xl hover:bg-primary-gradient-hover transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="flex-1 bg-primary-gradient text-white py-3 rounded-xl hover:bg-primary-gradient-hover transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg"
                            >
                                Complete Registration
                            </button>
                        )}
                    </div>
                </form>
                
                <div className="text-center mt-6">
                    <span className="text-gray-700 dark:text-gray-300">Already have an account?</span>
                    <Link to='/login' className='text-primary-dark dark:text-accent ml-1 hover:text-primary dark:hover:text-accent-light transition-colors font-medium'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Register