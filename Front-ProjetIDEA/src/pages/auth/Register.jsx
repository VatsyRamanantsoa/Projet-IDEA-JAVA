import React, { useState } from 'react';
import computer from "../../assets/images/retrocomputer.webp";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onBack, onLoginSuccess }) {
  const navigate = useNavigate();

  // ✅ Changement : email → username
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // ✅ Correction : nom cohérent
  
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // ✅ Changement : utilisation directe du username
      const user = {
        name: username,
        username: username
      };
      onLoginSuccess(user);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-mauve-300 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* ========== CONTAINER PRINCIPAL ========== */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
          
          {/* ========== PANNEAU GAUCHE (Illustration) ========== */}
          <div className="md:w-1/2 bg-gradient-to-br from-mauve-400 via-purple-300 to-mauve-300 p-8 flex flex-col justify-center items-center relative overflow-hidden">
            
            {/* Bouton Accueil */}
            <button 
              className="absolute top-5 left-5 text-sm px-6 py-1 rounded-full hover:scale-105 transition-transform duration-300 flex items-center space-x-2 bg-white font-semibold"
              onClick={() => navigate("/")}
            >
              <FaArrowLeft size={15} />
              <span>Accueil</span>
            </button>

            {/* Illustration Ordinateur Rétro */}
            <div className="relative z-10 mt-12">
              <img
                alt="computer image"
                loading="lazy"
                src={computer}
                className="w-120 h-120"
              />
            </div>
          </div>

          {/* ========== PANNEAU DROIT (Formulaire) ========== */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            
            {/* Titre */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Créer votre compte
              </h1>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* ✅ Username Field (remplace Email) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <input 
                  type="text"  // ✅ Changé de "email" à "text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}  // ✅ Changé
                  onBlur={() => setFocusedField(null)}
                  placeholder="votre nom d'utilisateur"  // ✅ Changé
                  required
                  className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 ${
                    focusedField === 'username'  // ✅ Changé
                      ? 'border-mauve-500 bg-white shadow-lg shadow-mauve-200/50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input 
                    type="password"  // ✅ Ajouté pour masquer le mot de passe
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••" 
                    required
                    className={`w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 ${
                      focusedField === 'password' 
                        ? 'border-mauve-500 bg-white shadow-lg shadow-mauve-200/50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation mot de passe
                </label>
                <div className="relative">
                  <input 
                    type="password"  // ✅ Ajouté pour masquer le mot de passe
                    value={confirmPassword}  // ✅ Correction : était "password"
                    onChange={(e) => setConfirmPassword(e.target.value)}  // ✅ Correction
                    onFocus={() => setFocusedField('confirmPassword')}  // ✅ Changé
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••" 
                    required
                    className={`w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 ${
                      focusedField === 'confirmPassword'  // ✅ Changé
                        ? 'border-mauve-500 bg-white shadow-lg shadow-mauve-200/50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-mauve-600 to-purple-700 text-white font-semibold rounded-xl hover:from-mauve-700 hover:to-purple-800 transition-all shadow-lg shadow-mauve-600/30 hover:shadow-mauve-600/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création...
                  </>
                ) : (
                  <span>Créer un compte</span>  // ✅ Texte cohérent avec "Créer votre compte"
                )}
              </button>
            </form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <Link to="/login" className="text-center text-sm mt-3 underline underline-offset-4">
                Déjà un compte ? Connectez-vous
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}