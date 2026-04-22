import React, { useState, useEffect } from 'react';
import { 
  FaLightbulb, FaCog, FaClock, FaFire, FaTimes, 
  FaBookmark, FaExternalLinkAlt, FaRobot, FaSave
} from 'react-icons/fa';
import { generateIdea } from '../../api/ai.api';
import { projetApi } from '../../api/projet.api';
import "../../Style/Style.css"

export default function GenerateIdeas({ onIdeaGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [nbIdeas, setNbIdeas] = useState(4);
  const [levelIndex, setLevelIndex] = useState(0);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);

  const levels = ['random', 'beginner', 'intermediate', 'advanced'];
  const levelLabels = ['Aléatoire', 'Débutant', 'Intermédiaire', 'Avancé'];
  
  const levelColors = {
    beginner: { bg: 'bg-cyan-400', text: 'text-cyan-900', shadow: 'shadow-cyan-500/30' },
    intermediate: { bg: 'bg-pink-400', text: 'text-pink-900', shadow: 'shadow-pink-500/30' },
    advanced: { bg: 'bg-purple-400', text: 'text-purple-900', shadow: 'shadow-purple-500/30' },
    random: { bg: 'bg-gray-400', text: 'text-gray-900', shadow: 'shadow-gray-500/30' }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getLevelLabel = (val) => {
    const map = { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' };
    return map[val] || val;
  };

  const getDifficultyPercent = (difficulty) => {
    if (difficulty === 'advanced') return 80;
    if (difficulty === 'intermediate') return 60;
    return 20;
  };

  const handleGenerate = async () => {
  setIsLoading(true);

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const selectedLevel = levels[levelIndex];

    const ideas = await generateIdea({
      userId: user.userId,
      prompt: prompt.trim(), // peut être vide
      nbIdeas,
      level: selectedLevel
    });

    setGeneratedIdeas(ideas);
    if (onIdeaGenerated) onIdeaGenerated(ideas);

  } catch (error) {
    console.error("Error generating ideas:", error);
    alert("Erreur lors de la génération des idées");
  } finally {
    setIsLoading(false);
  }
};


  const handleSaveProject = async (idea) => {
    try {
      setSaveLoading(true);
      await projetApi.create(idea);
      setGeneratedIdeas((prevIdeas) => prevIdeas.filter((i) => i !== idea));
      
    } catch (error) {
      console.error('Error saving project:', error);
      alert('❌ Erreur lors de la sauvegarde du projet');
    } finally {
      setSaveLoading(false);
    }
  };

  

  // 🔹 Modal style DetailModal
  const IdeaModal = ({ idea, onClose }) => {
    if (!idea) return null;
    const difficulty = idea.difficulty || levels[levelIndex];
    const colors = levelColors[difficulty] || levelColors.intermediate;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaLightbulb className="text-yellow-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{idea.title || 'Projet sans titre'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{idea.description || 'Aucune description disponible.'}"</p>
              </div>
            </div>
            <div className='relative -top-2 left-4'>
              <button onClick={() => {handleSaveProject(idea); onClose(); }} className=" rounded-lg transition-colors ml-2">
              <FaSave size={18} className='text-gray-500 hover:text-gray-800' />
              </button>
              <button onClick={onClose} className="p-2  rounded-lg transition-colors ml-4">
                <FaTimes size={18} className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            
            
          </div>

          {/* Contenu scrollable */}
          <div className="p-6 overflow-y-auto">
            {/* Meta infos */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Niveau :</span>
                <div className="flex gap-2">
                  {['Débutant', 'Intermédiaire', 'Avancé'].map((lvl) => (
                    <span 
                      key={lvl}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        getLevelLabel(difficulty) === lvl 
                          ? `${colors.bg} ${colors.text} ring-2 ring-offset-1 ring-gray-300` 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {lvl}
                    </span>
                  ))}
                </div>
              </div>
             
            </div>
            <div className='flex flex-wrap items-center gap-4 mb-3'>
               Difficulté :
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                 
                <FaFire className="text-orange-500" size={14} />
                <span className="text-sm font-medium text-gray-700">{idea.difficultyPercent || getDifficultyPercent(difficulty)}%</span>
              </div>
              
            </div>
            <div className='flex flex-wrap items-center gap-4 mb-3'>
              Durée :
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                <FaClock size={14} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {idea.duration || "Durée non définie"}
                </span>
              </div>
            </div>

            {/* Technologies */}
            {idea.technologies?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Technologies :</h4>
                <div className="flex flex-wrap gap-2">
                  {idea.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Deux colonnes : Fonctionnalités et Tâches */}
            <div className="grid grid-cols-2 gap-6">
              {idea.features?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Fonctionnalités :</h4>
                  <ul className="space-y-2">
                    {idea.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {idea.tasks?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Tâches à faire :</h4>
                  <ul className="space-y-2">
                    {idea.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden ">
      <section className=" flex-1 min-h-0 overflow-y-auto pt-10 pb-24 relative px-4 sm:px-6 lg:px-10">
        <h1 className="font-bold text-3xl mb-10 px-10">Idées De Projet</h1>

        {isLoading && (
          <div className="loader absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-20"></div>
        )}

        <div className="flex max-lg:flex-col flex-wrap gap-5 px-5 sm:px-10">
          {!isLoading && generatedIdeas.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center w-full flex flex-col items-center justify-center h-110">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <FaRobot className="text-purple-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Prêt à créer ?</h3>
              <p className="text-gray-500 text-sm max-w-xs">Décrivez votre projet dans le panneau de droite</p>
            </div>
          )}

          {generatedIdeas.map((idea, index) => {
            const difficulty = idea.difficulty || levels[levelIndex];
            const colors = levelColors[difficulty] || levelColors.intermediate;
            
            return (
              <div 
                key={index} 
                className={`group transition-all duration-300 ease-out hover:-translate-y-1 bg-white border border-gray-400 shadow-lg hover:${colors.shadow} rounded-xl p-3 max-lg:w-full`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-xs font-semibold flex rounded-e-full -translate-x-4 px-5 py-1 ${colors.bg} ${colors.text} ${colors.shadow}`}>
                    <p className="-translate-x-1">{getLevelLabel(difficulty)}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 max-lg:opacity-100 transition-opacity">
                    <button 
                      className="relative group/item flex items-center border rounded-full px-2 py-1 text-gray-500 hover:text-gray-800" 
                      onClick={() => { handleSaveProject(idea);  }}
                    >
                      {saveLoading ? (
                        <div className="btn-loader mx-auto"></div>
                      ) : (
                        <>
                          <span className="max-sm:hidden text-xs max-w-0 max-lg:mx-2 max-lg:max-w-full overflow-hidden whitespace-nowrap transition-all duration-300 group-hover/item:mx-2 group-hover/item:max-w-[80px]">
                            Enregistrer
                          </span>
                          <FaSave size={18} />
                        </>
                      )}
                    </button>
                    <button 
                      className="relative group/item flex items-center border rounded-full px-2 py-1 text-gray-500 hover:text-gray-800" 
                      onClick={() => setSelectedIdea(idea)}
                    >
                      <span className="max-sm:hidden text-xs max-w-0 max-lg:mx-2 max-lg:max-w-full overflow-hidden whitespace-nowrap transition-all duration-300 group-hover/item:mx-2 group-hover/item:max-w-[120px]">
                        Plus de détail
                      </span>
                      <FaExternalLinkAlt size={18} />
                    </button>
                  </div>
                </div>
                <h2 className="font-semibold text-md mb-2">{idea.title || `Idée ${index + 1}`}</h2>
                <p className="text-xs mb-5 max-sm:hidden">{truncateText(idea.description, 80)}</p>
                <p className="text-xs mb-5 lg:hidden">{truncateText(idea.description, 150)}</p>
                <div className="flex items-center justify-start space-x-3">
                  <div className="bg-gray-100 rounded-full py-1 px-3 flex items-center space-x-2 text-gray-700">
                     <FaClock size={18} className="text-black" />
                    <p className="text-xs">
                      {idea.duration || "Durée non définie"}
                    </p>
                  </div>
                  <div className="bg-gray-100 rounded-full py-1 px-3 flex items-center space-x-2 text-gray-700">
                    <FaFire size={18} className="text-orange-500" />
                    <p className="text-xs">{getDifficultyPercent(difficulty)}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sidebar - Desktop */}
      <aside className="max-lg:hidden w-96 h-screen sticky top-0 border-l border-black/10 pt-10 px-10 flex flex-col">
        <h3 className="text-xl font-semibold flex items-center space-x-4 mb-10 h-[36px]">
          <FaCog  size={24} /> 
          <span>Personnalisation</span>
        </h3>
        
        <div className="bg-white rounded-xl lg:p-4 mt-5 lg:border border-gray-400 lg:shadow-lg space-y-8 ld:space-y-4 flex flex-col">
          {/* Prompt */}
          <div>
            
            <textarea
            className="w-full border border-dashed border-gray-500 rounded-lg p-3 min-h-40 focus:ring-2 focus:ring-gray-500 focus:outline-none resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Exemple: Projet intégrant l'assistance d'un IA"
              
            />
          </div>

          {/* Level Slider */}
          <div>
            <div className="flex justify-between mb-3">
              {levelLabels.map((label, index) => (
                <span 
                  key={label} 
                  className={`text-sm font-medium transition-all ${
                    index === levelIndex ? 'text-purple-600 font-semibold' : 'text-black-400'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="1" 
              value={levelIndex} 
              onChange={(e) => setLevelIndex(Number(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Nombre d'idées */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-black">Idée à générer</span>
              <span className="text-sm font-bold text-purple-600">{nbIdeas}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="1" 
              value={nbIdeas} 
              onChange={(e) => setNbIdeas(Number(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-xl appearance-none cursor-pointer accent-red "
            />
          </div>

          {/* Bouton Générer */}
          <button
            onClick={handleGenerate}
            disabled={isLoading }
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            <FaRobot size={16} className={isLoading ? 'animate-spin' : ''} />
            <span>Générer des idées</span>
          </button>
        </div>
      </aside>

      {/* Floating Button - Mobile */}
      <div className={`lg:hidden fixed z-50 bottom-4 right-4 shadow-lg p-[2px] rounded-xl bg-gradient-to-br from-pink-500 via-pink-500 to-purple-500`}>
        <button
          type="button"
          onClick={() => setShowCustomization(!showCustomization)}
          className="w-10 h-10 rounded-xl bg-white backdrop-blur-lg flex items-center justify-center"
        >
          <FaCog className="w-5 text-gray-600 rotate-[-45deg]" />
        </button>
      </div>

      {/* Mobile Customization Modal */}
      {showCustomization && (
        <div className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowCustomization(false)}
            >
              <FaTimes size={20} />
            </button>

            <h3 className="text-xl font-semibold flex items-center space-x-4 mb-10 h-[36px]">
              <FaCog size={24} className="fill-none stroke-black stroke-[1.5]" /> 
              <span>Personnalisation</span>
            </h3>

            <div className="space-y-6">
              {/* Prompt */}
              <div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Décrivez votre projet ici..."
                  className="w-full h-32 px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none text-sm text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Level Slider */}
              <div>
                <div className="flex justify-between mb-3">
                  {levelLabels.map((label, index) => (
                    <span 
                      key={label} 
                      className={`text-xs font-medium transition-all ${
                        index === levelIndex ? 'text-purple-600 font-semibold' : 'text-gray-400'
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="3" 
                  step="1" 
                  value={levelIndex} 
                  onChange={(e) => setLevelIndex(Number(e.target.value))} 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Nombre d'idées */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-600">Idée à générer</span>
                  <span className="text-sm font-bold text-purple-600">{nbIdeas}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="1" 
                  value={nbIdeas} 
                  onChange={(e) => setNbIdeas(Number(e.target.value))} 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Bouton Générer */}
              <button
                onClick={() => {
                  setShowCustomization(false);
                  handleGenerate();
                }}
                disabled={isLoading || !prompt.trim()}
                className="w-full py-3 px-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                <FaRobot size={16} className={isLoading ? 'animate-spin' : ''} />
                <span>Générer des idées</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedIdea && <IdeaModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />}
    </div>
  );
}