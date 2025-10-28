import { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/slices/ToastSlice";
import Modal from "../components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ContactPage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Too short").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    message: Yup.string().min(10, "Too short").required("Required"),
  });

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Open Modal
          </button>
        </div>

        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              await new Promise((r) => setTimeout(r, 800));
              dispatch(
                showToast({ status: "success", message: "Message submitted. Thank you!" })
              );
              resetForm();
            } catch {
              dispatch(
                showToast({ status: "error", message: "Submission failed. Try again." })
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Field
                    name="name"
                    placeholder="Your name"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.name && touched.name ? "border-red-500" : "border"
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.email && touched.email ? "border-red-500 border" : "border"
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Field
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Type your message..."
                    className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.message && touched.message ? "border-red-500 border" : "border"
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="message"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold mb-2">Contact Modal</h3>
          <p className="text-gray-600">Modal on the Contact page.</p>
        </div>
      </Modal>
    </div>
  );
}


