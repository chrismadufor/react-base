# React Base Starter Template - Features Documentation

## Overview

This React starter template demonstrates modern development tools and best practices. It includes everything you need to build production-ready React applications with a clean, maintainable codebase.

## 🛠️ Integrated Tools & Features

### 1. **Tailwind CSS v3.4.0** - Utility-First Styling

**What it does:** Provides utility-first CSS classes for rapid UI development.

**How it works:**
```jsx
// Responsive design with utility classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
    Content here
  </div>
</div>
```

**Key Features:**
- Responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Hover effects and transitions
- Consistent spacing and typography
- Mobile-first approach

**Configuration:** `tailwind.config.js` and `postcss.config.js`

---

### 2. **Redux Toolkit** - State Management

**What it does:** Manages global application state with modern Redux patterns.

**How it works:**
```jsx
// Store configuration
import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './slices/ToastSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    // other reducers...
  }
})

// Using in components
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from './redux/slices/ToastSlice'

const dispatch = useDispatch()
dispatch(showToast({ status: 'success', message: 'Data saved!' }))
```

**Key Features:**
- Less boilerplate than traditional Redux
- Built-in DevTools support
- Immutable updates with Immer
- TypeScript support

**Files:**
- `src/redux/store.js` - Store configuration
- `src/redux/slices/ToastSlice.js` - Toast state management
- `src/redux/provider.jsx` - Redux Provider wrapper

---

### 3. **Formik + Yup** - Form Handling & Validation

**What it does:** Simplifies form handling with built-in validation.

**How it works:**
```jsx
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
})

// Form component
<Formik
  initialValues={{ name: '', email: '' }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ isSubmitting }) => (
    <Form>
      <TextLabelInput name="name" label="Full Name" />
      <TextLabelInput name="email" label="Email" type="email" />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  )}
</Formik>
```

**Key Features:**
- Schema-based validation with Yup
- Real-time error display
- Form state management
- Custom form components

**Files:**
- `src/components/FormFields.jsx` - Pre-built form components
- `src/hooks/PasswordToggle.jsx` - Password visibility toggle

---

### 4. **React Toastify** - Toast Notifications

**What it does:** Provides beautiful, customizable toast notifications.

**How it works:**
```jsx
import { toast } from 'react-toastify'
import Toast from './components/Toast'

// Direct toast usage
toast.success('Form submitted successfully!')
toast.error('Something went wrong!')

// Redux-based toast
import { useDispatch } from 'react-redux'
import { showToast } from './redux/slices/ToastSlice'

const dispatch = useDispatch()
dispatch(showToast({ status: 'success', message: 'Data saved!' }))
```

**Key Features:**
- Multiple toast types (success, error, warning, info)
- Auto-dismiss timers
- Customizable positioning
- Redux integration

**Files:**
- `src/components/Toast.jsx` - Toast component with Redux integration

---

### 5. **Axios** - HTTP Client

**What it does:** Handles API requests with interceptors and error handling.

**How it works:**
```jsx
// Axios configuration
import axios from 'axios'

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for auth tokens
http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Service functions
export const getPosts = async () => {
  const response = await http.get('posts')
  return response.data
}
```

**Key Features:**
- Request/response interceptors
- Automatic token handling
- Error handling
- Base URL configuration

**Files:**
- `src/utils/axios.js` - Axios configuration
- `src/services/appServices.js` - API service functions

---

### 6. **Font Awesome** - Icon Library

**What it does:** Provides thousands of scalable vector icons.

**How it works:**
```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPalette, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

// Using icons
<FontAwesomeIcon icon={faCog} className="text-indigo-600 text-xl" />
<FontAwesomeIcon icon={faPalette} className="text-blue-500" />
```

**Key Features:**
- Multiple icon styles (solid, regular, brands)
- Scalable vector graphics
- Easy customization with CSS
- Tree-shaking support

**Packages:**
- `@fortawesome/react-fontawesome` - React component
- `@fortawesome/free-solid-svg-icons` - Solid icons
- `@fortawesome/free-regular-svg-icons` - Regular icons
- `@fortawesome/free-brands-svg-icons` - Brand icons

---

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── FormFields.jsx   # Form input components
│   ├── Modal.jsx        # Modal component
│   └── Toast.jsx        # Toast notifications
├── hooks/               # Custom React hooks
│   └── PasswordToggle.jsx
├── redux/               # Redux store and slices
│   ├── store.js         # Store configuration
│   ├── provider.jsx     # Redux Provider
│   └── slices/          # Redux slices
├── services/            # API service functions
│   └── appServices.js
├── utils/               # Utility functions
│   └── axios.js         # Axios configuration
└── App.jsx             # Main application component
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Server
The app runs on `http://localhost:5173` with hot module replacement.

---

## 📱 Responsive Design

The template uses a mobile-first approach with Tailwind CSS:

- **Mobile (< 768px):** Single column layout
- **Tablet (768px - 1024px):** Two column grid
- **Desktop (> 1024px):** Three column grid

### Key Responsive Classes
```jsx
// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Text sizing
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Spacing
<div className="p-4 md:p-6 lg:p-8">
```

---

## 🎨 Styling Guidelines

### Color Palette
- **Primary:** Indigo (`indigo-600`, `indigo-700`)
- **Secondary:** Blue (`blue-600`, `blue-700`)
- **Success:** Green (`green-600`, `green-700`)
- **Error:** Red (`red-600`, `red-700`)
- **Neutral:** Gray scale (`gray-50` to `gray-900`)

### Typography
- **Headings:** `font-bold` with responsive sizing
- **Body:** `text-base` or `text-lg`
- **Small text:** `text-sm`

### Spacing
- **Sections:** `py-16` (vertical padding)
- **Containers:** `max-w-7xl mx-auto px-4`
- **Cards:** `p-6` or `p-8`

---

## 🔧 Customization

### Adding New Features

1. **New Redux Slice:**
```jsx
// src/redux/slices/newSlice.js
import { createSlice } from '@reduxjs/toolkit'

const newSlice = createSlice({
  name: 'newFeature',
  initialState: { data: [] },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setData } = newSlice.actions
export default newSlice.reducer
```

2. **New API Service:**
```jsx
// src/services/newService.js
import { http } from '../utils/axios'

export const getNewData = async () => {
  const response = await http.get('new-endpoint')
  return response.data
}
```

3. **New Form Component:**
```jsx
// src/components/NewFormField.jsx
import { useField } from 'formik'

export const NewFormField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="error">{meta.error}</div>
      )}
    </div>
  )
}
```

---

## 🧪 Testing Features

### Form Validation
1. Try submitting the form with empty fields
2. Enter invalid email format
3. Enter phone number with letters
4. Submit with valid data to see success toasts

### API Integration
1. Check the posts section loads data automatically
2. Click "Refresh Posts" to fetch new data
3. Test error handling by disconnecting internet

### Responsive Design
1. Resize browser window to test breakpoints
2. Test on mobile devices
3. Verify hover effects work on desktop

---

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Formik Documentation](https://formik.org/docs/overview)
- [React Toastify Documentation](https://fkhadra.github.io/react-toastify/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Font Awesome Documentation](https://fontawesome.com/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
