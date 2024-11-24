import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative w-32 h-32">
        {/* Plate */}
        <motion.div
          className="absolute inset-0 border-8 border-primary-300 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Fork */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 w-1 h-16 bg-primary-500 rounded-full"
          initial={{ rotate: -45, x: -20 }}
          animate={{ rotate: 45, x: -20 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 space-y-1">
            <div className="w-0.5 h-3 bg-primary-500 rounded-full transform -translate-x-2"></div>
            <div className="w-0.5 h-3 bg-primary-500 rounded-full transform -translate-x-1"></div>
            <div className="w-0.5 h-3 bg-primary-500 rounded-full"></div>
            <div className="w-0.5 h-3 bg-primary-500 rounded-full transform translate-x-1"></div>
          </div>
        </motion.div>

        {/* Knife */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"
          initial={{ rotate: 45, x: 20 }}
          animate={{ rotate: -45, x: 20 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-1 h-16 bg-primary-500 rounded-full"></div>
          <div className="absolute top-0 w-2 h-8 bg-primary-500 rounded-t-full"></div>
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-primary-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;