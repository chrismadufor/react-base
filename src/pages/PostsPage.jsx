import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function PostsPage() {
  const { items, status, error } = useSelector((s) => s.posts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Posts</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Open Modal
          </button>
        </div>

        {status === "loading" && (
          <p className="text-gray-600">Loading posts...</p>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
            {error}
          </div>
        )}
        {status !== "loading" && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.slice(0, 12).map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 block"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold mb-2">Posts Modal</h3>
          <p className="text-gray-600">Modal on the Posts page.</p>
        </div>
      </Modal>
    </div>
  );
}


