import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCog, 
  faPalette, 
  faCheckCircle, 
  faBell, 
  faServer, 
  faIcons 
} from '@fortawesome/free-solid-svg-icons'

import Modal from './components/Modal'
import Toast from './components/Toast'
import { TextLabelInput } from './components/FormFields'
import { getPosts } from './services/appServices'
import { showToast } from './redux/slices/ToastSlice'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
  })

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (err) {
      setError('Failed to fetch posts. Please try again.')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show both toast approaches
      toast.success('Form submitted successfully!')
      dispatch(showToast({ status: 'success', message: 'Data saved to Redux store!' }))
      
      // Reset form
      resetForm()
    } catch (err) {
      toast.error('Form submission failed!')
      dispatch(showToast({ status: 'error', message: 'Failed to save data!' }))
    }
  }

  const features = [
    {
      icon: faCog,
      title: 'Redux Toolkit',
      description: 'Manage global state easily with modern Redux patterns and built-in dev tools.'
    },
    {
      icon: faPalette,
      title: 'Tailwind CSS',
      description: 'Fast, responsive design system with utility-first CSS framework.'
    },
    {
      icon: faCheckCircle,
      title: 'Formik & Yup',
      description: 'Easy form validation and handling with powerful schema validation.'
    },
    {
      icon: faBell,
      title: 'Toast Notifications',
      description: 'Interactive UI feedback with customizable toast notifications.'
    },
    {
      icon: faServer,
      title: 'Axios API',
      description: 'Robust HTTP client with interceptors and error handling.'
    },
    {
      icon: faIcons,
      title: 'Font Awesome',
      description: 'Beautiful icons library with thousands of scalable vector icons.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast />
      
      {/* Section 1: Hero + Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Welcome to React-Based Tools
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                A comprehensive starter template for React applications featuring modern tools and libraries. 
                This template includes Redux Toolkit for state management, Tailwind CSS for styling, 
                Formik & Yup for forms, and much more to get your project started quickly.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Learn More About This Template
              </button>
            </div>

            {/* Right side - Form */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h2>
              <Formik
                initialValues={{ name: '', phone: '', email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <TextLabelInput
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                    />
                    <TextLabelInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                    <TextLabelInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Tools</h2>
            <p className="text-lg text-gray-600">Everything you need to build modern React applications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <FontAwesomeIcon 
                      icon={feature.icon} 
                      className="text-indigo-600 text-xl" 
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sample Posts</h2>
            <p className="text-lg text-gray-600 mb-6">Fetched from JSONPlaceholder API</p>
            <button
              onClick={fetchPosts}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Loading...' : 'Refresh Posts'}
            </button>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
                {error}
              </div>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 6).map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">About This Template</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>
              This React starter template is designed to showcase modern development tools and best practices. 
              It includes everything you need to build production-ready React applications.
            </p>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Included Tools:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Redux Toolkit:</strong> Modern state management with less boilerplate</li>
                <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for rapid UI development</li>
                <li><strong>Formik & Yup:</strong> Form handling and validation made simple</li>
                <li><strong>React Toastify:</strong> Beautiful toast notifications</li>
                <li><strong>Axios:</strong> HTTP client with interceptors and error handling</li>
                <li><strong>Font Awesome:</strong> Comprehensive icon library</li>
                <li><strong>Vite:</strong> Fast build tool and development server</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              This template demonstrates responsive design, form validation, API integration, 
              state management, and modern React patterns.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App
