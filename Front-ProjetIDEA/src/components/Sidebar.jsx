

// components/Navbar.jsx
import React from 'react';
import { FaLightbulb, FaFolder, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ activeTab, setActiveTab, projectsCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'generate', label: 'Générer des idées', icon: FaLightbulb },
    { id: 'projects', label: 'Mes Projets', icon: FaFolder, badge: projectsCount },
    
  ];

  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-mauve-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-mauve-500/30">
            P
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">ProjectGen AI</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-mauve-500 to-purple-600 text-white shadow-lg shadow-mauve-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
             
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 pl-4">
          <button className="bg-red-500 text-white px-2 py-2 rounded-xl hover:bg-red-600">
            Deconnexion
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-mauve-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <span className="font-bold text-gray-800 text-sm">ProjectGen AI</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes className="text-gray-600" /> : <FaBars className="text-gray-600" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg py-2 px-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-mauve-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === item.id ? 'bg-white/20' : 'bg-mauve-100 text-mauve-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            
            {/* Mobile User Info */}
            <div className="pt-2 mt-2 border-t border-gray-100 flex items-center space-x-3 px-4">
              <div className="w-8 h-8 bg-gradient-to-br from-mauve-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {user.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{user.username || 'Utilisateur'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email || 'user@email.com'}</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for mobile navbar */}
      <div className="h-14 lg:h-16" />
    </>
  );
}