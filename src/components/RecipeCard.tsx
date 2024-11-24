import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, X } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  category: string;
  description: string;
  recipe: string;
  imageUrl: string;
  youtubeLink: string;
  embedLink: string;
}

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const [showFullScreen, setShowFullScreen] = useState(false);

  const handleCardClick = () => {
    setShowFullScreen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="recipe-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-[400px] flex flex-col"
        onClick={handleCardClick}
      >
        <div className="overflow-hidden h-48 flex-shrink-0">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-sm text-primary-500 font-medium uppercase">
            {recipe.category}
          </span>
          <h3 className="cursive text-xl font-bold mt-1">{recipe.title}</h3>
          <div className="relative flex-grow overflow-hidden">
            <p className="text-gray-600 mt-2">
              {recipe.description}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFullScreen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl mx-auto my-8 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowFullScreen(false)}
                className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <img 
                src={recipe.imageUrl} 
                alt={recipe.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">
                <span className="text-sm text-primary-500 font-medium uppercase">
                  {recipe.category}
                </span>
                <h2 className="cursive text-3xl font-bold mt-2 mb-4">{recipe.title}</h2>
                <p className="text-gray-600 mb-6">{recipe.description}</p>

                <div className="prose prose-green max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Recipe Instructions</h3>
                  <div className="whitespace-pre-line text-gray-700 mb-6">
                    {recipe.recipe}
                  </div>

                  {recipe.embedLink && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-4">Video Tutorial</h3>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          width="100%"
                          height="400"
                          src={recipe.embedLink}
                          title={recipe.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  <a
                    href={recipe.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-6 text-primary-500 hover:text-primary-600"
                  >
                    <Youtube className="w-5 h-5 mr-2" />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecipeCard;