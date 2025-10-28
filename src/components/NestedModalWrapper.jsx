import { useState } from "react";
import Modal from "./Modal";

export default function NestedModalWrapper() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOuterOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Open Nested Modal
      </button>

      <Modal isOpen={outerOpen} onClose={() => setOuterOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 relative">
          <h3 className="text-xl font-bold mb-2">Outer Modal</h3>
          <p className="text-gray-600 mb-4">
            This modal contains another modal to test nested behavior.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setInnerOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Open Inner Modal
            </button>
            <button
              onClick={() => setOuterOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>

          <Modal isOpen={innerOpen} onClose={() => setInnerOpen(false)}>
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h4 className="text-lg font-semibold mb-2">Inner Modal</h4>
              <p className="text-gray-600 mb-4">
                Nested content inside the inner modal.
              </p>
              <button
                onClick={() => setInnerOpen(false)}
                className="bg-gray-800 hover:bg-black text-white font-semibold py-2 px-4 rounded-lg"
              >
                Close Inner
              </button>
            </div>
          </Modal>
        </div>
      </Modal>
    </div>
  );
}


