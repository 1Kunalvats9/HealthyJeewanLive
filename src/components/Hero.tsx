import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-[90vh] flex items-center">
      <div
        className="absolute inset-0 z-0 blur-[2px]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/50 to-accent-500/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="cursive text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Discover the Joy of Healthy Cooking
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow">
          Explore our collection of nutritious and delicious recipes that make healthy eating a pleasure
        </p>
        <a
          href="#recipes"
          className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors shadow-lg"
        >
          Explore Recipes
          <ArrowDown className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default Hero;