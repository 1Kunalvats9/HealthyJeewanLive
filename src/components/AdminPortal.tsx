import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onAddRecipe: (recipe: any) => void;
  onLogin: (status: boolean) => void;
}

const AdminPortal: React.FC<Props> = ({ onClose, onAddRecipe, onLogin }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    recipe: '',
    imageUrl: '',
    youtubeLink: '',
    embedLink: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'healthyjeewan@kaushik' && password === 'Shekhu@hjk') {
      setIsAuthenticated(true);
      onLogin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onLogin(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecipe(formData);
    setFormData({
      title: '',
      category: '',
      description: '',
      recipe: '',
      imageUrl: '',
      youtubeLink: '',
      embedLink: ''
    });
    alert('Recipe added successfully!');
  };

  const convertToEmbedLink = (url: string) => {
    try {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return '';
    }
  };

  const handleYouTubeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const youtubeLink = e.target.value;
    const embedLink = convertToEmbedLink(youtubeLink);
    setFormData({
      ...formData,
      youtubeLink,
      embedLink
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 overflow-y-auto z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold cursive text-primary-600">
              {isAuthenticated ? 'Add New Recipe' : 'Admin Login'}
            </h2>
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-accent-400 text-white py-2 px-4 rounded-md hover:from-primary-600 hover:to-accent-500 transition-colors"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="snacks">Snacks</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="desserts">Desserts</option>
                    <option value="healthy">Healthy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Recipe Instructions</label>
                <textarea
                  value={formData.recipe}
                  onChange={(e) => setFormData({ ...formData, recipe: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={6}
                  placeholder="Enter detailed recipe instructions..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://images.unsplash.com/..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">YouTube Video Link</label>
                <input
                  type="url"
                  value={formData.youtubeLink}
                  onChange={handleYouTubeLink}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Embedded Video Link</label>
                <input
                  type="url"
                  value={formData.embedLink}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  readOnly
                  placeholder="Generated automatically from YouTube link"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This field is automatically generated from the YouTube link
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-accent-400 text-white py-2 px-4 rounded-md hover:from-primary-600 hover:to-accent-500 transition-colors"
              >
                Add Recipe
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPortal;