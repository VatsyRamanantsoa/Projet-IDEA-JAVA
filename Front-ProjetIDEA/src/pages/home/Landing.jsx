import React from 'react';
import "../../Style/Style.css"

import { useNavigate } from "react-router-dom";





export default function Landing() {

const navigate = useNavigate();


  return (
    <div className="bg-mauve-300 text-gray-900 font-inter overflow-x-hidden">
      
      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-0 w-full z-50 bg-mauve-300/80 backdrop-blur-md border-b border-mauve-400/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-50 h-10 rounded-xl bg-gradient-to-br from-mauve-600 to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-mauve-600/20">
              Generation de Projet
            </div>
            
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <a href="#features" className="hover:text-mauve-700 transition-colors font-medium">Fonctionnalités</a>
            <a href="#how-it-works" className="hover:text-mauve-700 transition-colors font-medium">Comment ça marche</a>
            <a href="#pricing" className="hover:text-mauve-700 transition-colors font-medium">Tarifs</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            
            <button 
              onClick={() => navigate("/register")}
              className="px-5 py-2.5 bg-gradient-to-r from-mauve-600 to-purple-700 rounded-full text-sm font-semibold text-white hover:from-mauve-700 hover:to-purple-800 transition-all shadow-lg shadow-mauve-600/30 hover:shadow-mauve-600/50"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-mauve-200/50 via-transparent to-mauve-400/30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          
          {/* Badge */}
          <div className="fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-mauve-400/40 text-sm text-mauve-800 font-medium mb-8 shadow-sm" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Propulsé par Mistral AI
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 fade-in-up text-gray-900" style={{ animationDelay: '0.2s' }}>
            Générez vos<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mauve-700 via-purple-700 to-mauve-700">
              idées de projet
            </span><br />
            avec l'IA
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 fade-in-up" style={{ animationDelay: '0.3s' }}>
            Décrivez votre vision, et notre IA alimentée par <strong className="text-gray-900">Mistral</strong> génère des idées de projet innovantes, structurées et prêtes à être réalisées.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
           
            
          </div>

         
        </div>

       
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-mauve-400/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Pourquoi <span className="text-transparent bg-clip-text bg-gradient-to-r from-mauve-700 to-purple-700">ProjectGen AI</span> ?
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Une plateforme complète pour passer de l'idée à la réalisation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/70 backdrop-blur-sm border border-mauve-300/40 rounded-3xl p-8 card-hover shadow-lg hover:shadow-mauve-500/20 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-mauve-500 to-mauve-700 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md">🧠</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">IA Mistral Intégrée</h3>
              <p className="text-gray-700 leading-relaxed">
                Notre modèle Mistral AI analyse votre prompt et génère des idées de projet pertinentes, innovantes et adaptées à votre contexte.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white/70 backdrop-blur-sm border border-mauve-300/40 rounded-3xl p-8 card-hover shadow-lg hover:shadow-mauve-500/20 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Gestion de Projet CRUD</h3>
              <p className="text-gray-700 leading-relaxed">
                Sélectionnez l'idée qui vous inspire et gérez votre projet : modifiez, mettez à jour, suivez l'avancement et organisez tout en un seul endroit.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white/70 backdrop-blur-sm border border-mauve-300/40 rounded-3xl p-8 card-hover shadow-lg hover:shadow-mauve-500/20 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Interface Intuitive</h3>
              <p className="text-gray-700 leading-relaxed">
                Design moderne et épuré, navigation fluide, animations subtiles — une expérience utilisateur pensée pour la productivité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="relative py-32">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-mauve-700 to-purple-700">fonctionne</span> ?
            </h2>
            <p className="text-gray-700 text-lg">3 étapes simples pour donner vie à vos idées</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-mauve-500 to-mauve-700 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg">1</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Décrivez votre idée</h3>
              <p className="text-gray-700">Écrivez un prompt détaillant le type de projet que vous souhaitez créer. Soyez aussi précis que possible.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg">2</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">L'IA génère des idées</h3>
              <p className="text-gray-700">Mistral AI analyse votre demande et génère plusieurs idées de projet structurées avec titres, descriptions et détails.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg">3</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Choisissez & Gérez</h3>
              <p className="text-gray-700">Sélectionnez le projet qui vous correspond et utilisez les outils CRUD pour le développer et le suivre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/70 backdrop-blur-md border border-mauve-300/40 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-xl">
            {/* Decorative orbs */}
            <div className="absolute w-64 h-64 bg-mauve-400/30 rounded-full blur-3xl -top-20 -right-20 pointer-events-none" />
            <div className="absolute w-48 h-48 bg-purple-400/30 rounded-full blur-3xl -bottom-16 -left-16 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Prêt à créer votre prochain projet ?</h2>
              <p className="text-gray-700 text-lg mb-8 max-w-xl mx-auto">
                Rejoignez des milliers d'utilisateurs qui utilisent ProjectGen AI pour transformer leurs idées en réalité.
              </p>
              <button 
                onClick={() => navigate("/login")}
                className="px-10 py-4 bg-gradient-to-r from-mauve-600 to-purple-700 rounded-full text-lg font-semibold text-white hover:from-mauve-700 hover:to-purple-800 transition-all shadow-xl shadow-mauve-600/30 hover:shadow-mauve-600/50"
              >
                Commencer →
              </button>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}