import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa"; // N'oublie pas d'importer les icônes

export default function Navbar() {
  

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 shadow-xl bg-[#0f172a]/80 backdrop-blur-md">
  
  <div className="max-w-7xl mx-auto flex items-center justify-between">

    {/* LEFT */}
    <div className="flex items-center gap-3">
      <div className="h-15 w-55 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
        Generation de projet
      </div>
    </div>

    {/* CENTER */}
    <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
      <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
      <a href="#how-it-works" className="hover:text-white transition-colors">Comment ça marche</a>
      <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">
      <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
        Connexion
      </button>
      <button className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-brand-500/30 transition-all btn-glow">
        Commencer
      </button>
    </div>

  </div>
</nav>

  );
}
