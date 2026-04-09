import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function DeleteModal({ darkMode, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className={`relative w-full max-w-md p-8 rounded-[40px] shadow-2xl border ${
          darkMode ? 'bg-[#1e1e1e] border-white/10 text-white' : 'bg-white border-white text-black'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`p-4 rounded-full mb-6 ${darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-500'}`}>
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-2xl font-black tracking-tighter mb-2 uppercase">Clear All Notes?</h2>
          <p className={`text-sm font-medium mb-8 leading-relaxed ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
            This action cannot be undone. All your saved tasks will be permanently deleted.
          </p>
          
          <div className="flex w-full gap-4">
            <button 
              onClick={onCancel}
              className={`flex-1 py-4 rounded-[20px] text-[10px] font-black tracking-widest transition-all ${
                darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
            >
              CANCEL
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-4 rounded-[20px] text-[10px] font-black tracking-widest bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
            >
              DELETE ALL
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}