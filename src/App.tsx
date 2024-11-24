import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Coffee, Cookie, Soup, Cake, Salad, Trash2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import RecipeCard from './components/RecipeCard';
import Loader from './components/Loader';

const categories = [
  { name: "All", icon: ChefHat },
  { name: "Breakfast", icon: Coffee },
  { name: "Snacks", icon: Cookie },
  { name: "Lunch", icon: Soup },
  { name: "Desserts", icon: Cake },
  { name: "Healthy", icon: Salad }
];

const initialRecipes = [
  {
    id: 1,
    title: "Quinoa Buddha Bowl",
    category: "lunch",
    description: "A healthy and filling bowl packed with proteins and vegetables",
    recipe: "1. Cook quinoa according to package instructions\n2. Roast vegetables of your choice\n3. Prepare a tahini dressing\n4. Assemble bowl with quinoa base, roasted vegetables, and drizzle with dressing",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    youtubeLink: "https://youtube.com/watch?v=example1",
    embedLink: "https://www.youtube.com/embed/example1"
  },
  {
    id: 2,
    title: "Overnight Oats",
    category: "breakfast",
    description: "Nutritious and delicious breakfast prep",
    recipe: "1. Mix oats with your choice of milk\n2. Add chia seeds and honey\n3. Refrigerate overnight\n4. Top with fresh fruits and nuts",
    imageUrl: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    youtubeLink: "https://youtube.com/watch?v=example2",
    embedLink: "https://www.youtube.com/embed/example2"
  }
];

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : initialRecipes;
  });

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const filteredRecipes = selectedCategory === "All" 
    ? recipes 
    : recipes.filter(recipe => recipe.category.toLowerCase() === selectedCategory.toLowerCase());

  const addRecipe = (newRecipe: any) => {
    const recipeWithId = { 
      ...newRecipe, 
      id: Date.now()
    };
    setRecipes(prevRecipes => [...prevRecipes, recipeWithId]);
  };

  const deleteRecipe = (id: number) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
    }
  };

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <Navbar onAdminClick={() => setShowAdmin(true)} />
      <Hero />

      <main id="recipes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Explore Our <span className="cursive text-primary-600">Recipes</span>
        </h2>

        <div className="flex overflow-x-auto space-x-4 mb-8 pb-4">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-100'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="relative">
              <RecipeCard recipe={recipe} />
              {isAuthenticated && (
                <button
                  onClick={() => deleteRecipe(recipe.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                  aria-label="Delete recipe"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {showAdmin && (
        <AdminPortal 
          onClose={() => setShowAdmin(false)} 
          onAddRecipe={addRecipe}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;