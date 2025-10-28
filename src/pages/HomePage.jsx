import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/slices/postsSlice";
import { getPosts } from "../services/appServices";
import Modal from "../components/Modal";
import NestedModalWrapper from "../components/NestedModalWrapper";

export default function HomePage() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (items.length === 0) {
        setLoading(true);
        setError(null);
        try {
          const data = await getPosts();
          if (mounted) dispatch(setPosts(data));
        } catch {
          if (mounted) setError("Failed to load posts");
        } finally {
          if (mounted) setLoading(false);
        }
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [dispatch, items.length]);

  return (
    <div className="py-12">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Welcome to React-Based Tools
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Starter template with Redux Toolkit, Tailwind CSS, routing, forms,
              and modals. This page triggers initial posts fetching and
              demonstrates nested modals.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Open Modal
              </button>
              <NestedModalWrapper />
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Posts Bootstrap
            </h2>
            {loading && <p className="text-gray-600 mb-2">Loading posts...</p>}
            {error && (
              <p className="text-red-600 mb-2">{error}</p>
            )}
            <p className="text-gray-600">
              Cached posts in store: <span className="font-semibold">{items.length}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Base?</h2>
            <p className="text-lg text-gray-600">
              Opinionated defaults to ship faster while staying flexible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Productive DX</h3>
              <p className="text-gray-600">
                Vite, Tailwind, and React 19 provide instant feedback and modern APIs.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Built-in State</h3>
              <p className="text-gray-600">
                Redux Toolkit + Persist pre-wired for app-scale state and caching.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real API</h3>
              <p className="text-gray-600">
                Sample integration with JSONPlaceholder via axios and interceptors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Home Modal</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600">Example modal opened from the Home page.</p>
        </div>
      </Modal>
    </div>
  );
}


