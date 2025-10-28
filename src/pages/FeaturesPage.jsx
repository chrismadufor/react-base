import { useState } from "react";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiagramProject,
  faPalette,
  faCheckCircle,
  faBell,
  faServer,
  faIcons,
} from "@fortawesome/free-solid-svg-icons";

export default function FeaturesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const features = [
    { icon: faDiagramProject, title: "Redux Toolkit", description: "Global state management." },
    { icon: faPalette, title: "Tailwind CSS", description: "Utility-first styling." },
    { icon: faCheckCircle, title: "Formik & Yup", description: "Form handling & validation." },
    { icon: faBell, title: "Toast Notifications", description: "UI feedback." },
    { icon: faServer, title: "Axios API", description: "HTTP client & interceptors." },
    { icon: faIcons, title: "Font Awesome", description: "Icon library." },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Features</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Open Modal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <FontAwesomeIcon icon={f.icon} className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
              </div>
              <p className="text-gray-600 mt-1">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold mb-2">Features Modal</h3>
          <p className="text-gray-600">Modal on the Features page.</p>
        </div>
      </Modal>
    </div>
  );
}


