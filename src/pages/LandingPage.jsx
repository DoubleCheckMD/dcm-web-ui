import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import SecondOpinionLogo from '../components/SecondOpinionLogo';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
              <SecondOpinionLogo width={180} showText={true} />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                How It Works
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                Benefits
              </button>
              <button onClick={() => scrollToSection('doctors')} className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                Our Doctors
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                Contact
              </button>
              <ThemeToggle />
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-accent to-accent-dark text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Patient Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 fade-in">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-left text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('benefits')} className="text-left text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                  Benefits
                </button>
                <button onClick={() => scrollToSection('doctors')} className="text-left text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                  Our Doctors
                </button>
                <button onClick={() => scrollToSection('faq')} className="text-left text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                  FAQ
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                  Contact
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Theme:</span>
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-accent to-accent-dark text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Patient Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Get Expert Medical <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">Second Opinions</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Upload your medical documents and receive professional insights from qualified doctors within 48 hours. Make confident health decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-accent to-accent-dark text-white px-8 py-4 rounded-lg font-medium text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="border-2 border-accent text-accent px-8 py-4 rounded-lg font-medium text-lg hover:bg-accent hover:text-white transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="scale-in" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Within 48 Hours</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Licensed & Board-Certified Doctors</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Secure & Confidential</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">No Redundant Appointments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Simple, secure, and efficient</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Your Reports',
                description: 'Submit your existing doctor\'s notes, lab results, imaging scans, or other supporting medical documents through our secure portal.',
                icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              },
              {
                step: '2',
                title: 'Create Your Case',
                description: 'Add relevant background, context, or specific questions you\'d like addressed in the second opinion.',
                icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
              },
              {
                step: '3',
                title: 'Case Review by a Doctor',
                description: 'A licensed physician will thoroughly review your submitted case, ensuring every detail is considered.',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              },
              {
                step: '4',
                title: 'Receive Feedback',
                description: 'Within 48 hours, receive clear, doctor-written notes with insights, answers, and next-step recommendations.',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              }
            ].map((item, idx) => (
              <div key={idx} className="scale-in hover:shadow-lg transition-shadow duration-300 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-accent">Step {item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Key Benefits</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Why choose Second Opinion?</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Peace of Mind',
                description: 'Get a professional second opinion before committing to treatment',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              },
              {
                title: 'No Redundant Appointments',
                description: 'We use your existing medical documentation',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              },
              {
                title: 'Secure & Confidential',
                description: 'All information is encrypted and handled with full patient privacy in mind',
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              },
              {
                title: 'Fast Turnaround',
                description: 'Most reviews completed within 48 hours',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="scale-in bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Doctors</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Licensed, experienced, and specialized</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-accent/10 to-accent-dark/10 dark:from-accent/5 dark:to-accent-dark/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Qualifications</h3>
              <div className="space-y-4">
                {[
                  'Licensed and board-certified in their specialty',
                  'Vetted for clinical experience and bedside manner',
                  'Trained in providing virtual second opinions',
                  'Matched to cases based on relevant experience'
                ].map((qual, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{qual}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Specialties</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Internal Medicine',
                  'Oncology',
                  'Neurology',
                  'Orthopedics',
                  'Cardiology',
                  'Pediatrics'
                ].map((specialty, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Example Use Cases</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  case: 'Patient diagnosed with a herniated disc',
                  seeking: 'Wants to explore non-surgical alternatives'
                },
                {
                  case: 'Parent of a child with ADHD diagnosis',
                  seeking: 'Seeks confirmation and options for behavioral therapy'
                },
                {
                  case: 'Individual recommended for chemotherapy',
                  seeking: 'Desires a second perspective before proceeding'
                },
                {
                  case: 'Elderly parent prescribed long-term medication',
                  seeking: 'Family wants to review possible alternatives'
                }
              ].map((useCase, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border-l-4 border-accent hover:shadow-md transition-shadow duration-300">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">{useCase.case}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{useCase.seeking}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to know</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How long does it take to get a second opinion?',
                a: 'Most standard cases are completed within 48 hours. Priority reviews are available within 24 hours.'
              },
              {
                q: 'Are the doctors licensed?',
                a: 'Yes. All doctors are licensed, verified, and matched based on the details of your case.'
              },
              {
                q: 'What if I don\'t have digital versions of my documents?',
                a: 'You can scan or take clear photos of your documents using your smartphone before uploading.'
              },
              {
                q: 'Can I speak to the doctor directly?',
                a: 'Currently, feedback is delivered in written form. Follow-up questions may be submitted depending on the review tier.'
              },
              {
                q: 'Is my information private?',
                a: 'Absolutely. We follow strict data protection standards to keep your personal health data secure.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-accent flex-shrink-0">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Have questions? We're here to help.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="scale-in" style={{ animationDelay: '0ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">support@secondopinion.com</p>
            </div>

            <div className="scale-in" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">1-800-SECOND-OP</p>
            </div>

            <div className="scale-in" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Support Hours</h3>
              <p className="text-gray-600 dark:text-gray-400">Mon-Fri: 9AM - 6PM EST</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent to-accent-dark p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="mb-6 text-blue-100">
              Join thousands of patients who have made confident health decisions with Second Opinion.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-accent px-8 py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Create Your Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-lg">
                  <img 
                    src="/Second Opinion Logo.png" 
                    alt="Second Opinion" 
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold">Second Opinion</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Expert medical second opinions for confident health decisions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-white transition-colors text-sm">Home</button>
                <button onClick={() => scrollToSection('how-it-works')} className="block text-gray-400 hover:text-white transition-colors text-sm">How It Works</button>
                <button onClick={() => scrollToSection('benefits')} className="block text-gray-400 hover:text-white transition-colors text-sm">Benefits</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('doctors')} className="block text-gray-400 hover:text-white transition-colors text-sm">Our Doctors</button>
                <button onClick={() => scrollToSection('faq')} className="block text-gray-400 hover:text-white transition-colors text-sm">FAQ</button>
                <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition-colors text-sm">Contact</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">HIPAA Compliance</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Second Opinion. All rights reserved. All information is encrypted and handled with strict patient privacy standards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
