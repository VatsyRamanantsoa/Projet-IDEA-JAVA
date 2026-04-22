import React, { useState, useEffect } from 'react';
import { 
  FaTrash, FaTimes, FaExternalLinkAlt, FaClock, FaFire, FaFolder, FaSave
} from 'react-icons/fa';
import { projetApi } from '../../api/projet.api';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projetApi.getAll();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

 const handleSearch = (query) => {
  setSearchQuery(query);
};

const filteredProjects = projects.filter((project) => {
  const query = searchQuery.toLowerCase();

  return (
    project.title?.toLowerCase().includes(query) ||
    project.description?.toLowerCase().includes(query) ||
    project.technologies?.some(tech => 
      tech.toLowerCase().includes(query)
    )
  );
});


  const handleDelete = async (id) => {
          try {
        await projetApi.delete(id);
        setProjects(projects.filter(p => p.id !== id));
        
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Erreur lors de la suppression');
      }
    
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    });
  };

  const getLevelLabel = (val) => {
    if (!val) return 'Non spécifié';
    const map = { 
      beginner: 'Débutant', 
      intermediate: 'Intermédiaire', 
      advanced: 'Avancé' 
    };
    return map[val] || val;
  };

  const getLevelColor = (val) => {
    if (!val) return { bg: 'bg-gray-400', text: 'text-gray-900', shadow: 'shadow-gray-500/30' };
    if (val === 'advanced') return { bg: 'bg-purple-400', text: 'text-purple-900', shadow: 'shadow-purple-500/30' };
    if (val === 'intermediate') return { bg: 'bg-pink-400', text: 'text-pink-900', shadow: 'shadow-pink-500/30' };
    return { bg: 'bg-cyan-400', text: 'text-cyan-900', shadow: 'shadow-cyan-500/30' };
  };

  const getDifficultyPercent = (difficulty) => {
    if (difficulty === 'advanced') return 80;
    if (difficulty === 'intermediate') return 60;
    return 20;
  };

  // 🔹 Modal style DetailModal
  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    const difficulty = project.difficulty;
    const colors = getLevelColor(difficulty);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[100vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaFolder className="text-yellow-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title || 'Projet sans titre'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{project.description || 'Aucune description disponible.'}"</p>
              </div>
            </div>
            <button 
              onClick={() => { handleDelete(project.id); onClose(); }} 
              className="p-2 hover:text-gray-800 rounded-lg transition-colors ml-4 text-gray-400"
            >
              <FaTrash size={14} />
              
            </button>
            <button onClick={onClose} className="p-2  rounded-lg transition-colors ml-4">
              <FaTimes size={16} className='text-gray-400 hover:text-gray-800' />
            </button>
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
                <div className='flex flex-wrap items-center gap-4 mb-6'>
                  Difficulté :
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full">
                    <FaFire className="text-orange-500" size={14} />
                    <span className="text-sm font-medium text-gray-700">{project.difficultyPercent || getDifficultyPercent(difficulty)}%</span>
                  </div>
                </div>
                
                <div className='flex flex-wrap items-center gap-4 mb-6'>
                    Durée :
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full">
                      <FaClock size={14} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{project.duration }</span>
                    </div>
                </div>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Technologies :</h4>
                <div className="flex flex-wrap  gap-3">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 text-black-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              {/* Fonctionnalités */}
            {project.features?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Fonctionnalités :</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.tasks?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Tâches à faire :</h4>
                  <ul className="space-y-2">
                    {project.tasks.map((task, i) => (
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

         
        </div>
      </div>
    );
  };

  return (
    <>
      {loading && (
        <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
      )}
      
      <section className="max-w-full w-full h-full pt-10 relative">
        {/* Header avec titre et recherche */}
        <div className="mb-10 px-10 flex justify-between items-center max-lg:flex-col max-lg:gap-4">
          <h1 className="font-bold text-3xl">Projets Enregistrés</h1>
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
        </div>

        {/* Grille de projets */}
        <div className="flex  flex-wrap  gap-5 px-5 sm:px-10">
          {!loading && projects.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center w-full flex flex-col items-center justify-center h-96">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <FaFolder className="text-purple-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun projet</h3>
              <p className="text-gray-500 text-sm max-w-xs">Commencez par générer des idées avec l'IA et sauvegardez vos favorites !</p>
            </div>
          )}

          {filteredProjects.map((project, index) => {
            const difficulty = project.difficulty;
            const colors = getLevelColor(difficulty);

            return (
              <div 
                key={project.id || index} 
                className={`group transition-all duration-300 ease-out hover:-translate-y-1 bg-white border border-gray-400 shadow-lg hover:${colors.shadow} rounded-xl p-3 max-lg:w-full `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-xs font-semibold flex rounded-e-full -translate-x-4 px-5 py-1 ${colors.bg} ${colors.text} ${colors.shadow}`}>
                    <p className="-translate-x-1">{getLevelLabel(difficulty)}</p>
                  </div>

                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 max-lg:opacity-100 transition-opacity">
                    <button 
                      className="flex items-center border rounded-full px-2 py-1 text-gray-500 hover:text-gray-800" 
                      onClick={() => handleDelete(project.id)}
                    >
                      
                      <FaTrash size={14} />
                    </button>

                    <button 
                      className="flex items-center border rounded-full px-2 py-1 text-gray-500 hover:text-gray-800" 
                      onClick={() => setSelectedProject(project)}
                    >
                      <FaExternalLinkAlt size={14} />
                    </button>
                  </div>
                </div>

                <h2 className="font-semibold text-md mb-2">
                  {project.title || `Projet #${project.id}`}
                </h2>

                <p className="text-xs mb-5">
                  {truncateText(project.description, 100)}
                </p>

                <div className="flex items-center space-x-3">
                  
                    <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center space-x-2">
                      <FaClock size={14} />
                      <span className="text-sm font-medium text-gray-700">{project.duration }</span>
                    </div>
                 

                  <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center space-x-2">
                    <FaFire size={14} className="text-orange-500" />
                    <p className="text-xs">{getDifficultyPercent(difficulty)}%</p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Modal */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </section>
    </>
  );
//   return (
//   <>
//     {loading && (
//       <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
//     )}
    
//     {/* ✅ Section principale avec conteneur centré et padding cohérent */}
//     <section className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-10 relative">
      
//       {/* ✅ Conteneur qui limite la largeur et centre tout le contenu */}
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header avec titre et recherche */}
//         <div className="mb-10 flex justify-between items-center max-lg:flex-col max-lg:gap-4">
//           <h1 className="font-bold text-3xl text-gray-800">Projets Enregistrés</h1>
//           <input 
//             type="text" 
//             placeholder="Rechercher..." 
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full max-w-xs"
//           />
//         </div>

//         {/* ✅ Grille de projets : passage à 'grid' pour un alignement parfait */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-5">
          
//           {!loading && projects.length === 0 && (
//             <div className="col-span-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
//               <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
//                 <FaFolder className="text-purple-600" size={28} />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun projet</h3>
//               <p className="text-gray-500 text-sm max-w-xs">Commencez par générer des idées avec l'IA et sauvegardez vos favorites !</p>
//             </div>
//           )}

//           {filteredProjects.map((project, index) => {
//             const difficulty = project.difficulty;
//             const colors = getLevelColor(difficulty);

//             return (
//               <div 
//                 key={project.id || index} 
//                 className={`group transition-all duration-300 ease-out hover:-translate-y-1 bg-white border border-gray-200 shadow-md hover:${colors.shadow} rounded-xl p-4 flex flex-col`}
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <div className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.shadow}`}>
//                     {getLevelLabel(difficulty)}
//                   </div>

//                   <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button 
//                       className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" 
//                       onClick={() => handleDelete(project.id)}
//                       title="Supprimer"
//                     >
//                       <FaTrash size={16} />
//                     </button>
//                     <button 
//                       className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors" 
//                       onClick={() => setSelectedProject(project)}
//                       title="Voir détails"
//                     >
//                       <FaExternalLinkAlt size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
//                   {project.title || `Projet #${project.id}`}
//                 </h2>

//                 <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
//                   {truncateText(project.description, 100)}
//                 </p>

//                 <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                   <div className="flex items-center gap-2 text-gray-500 text-xs">
//                     <FaClock size={14} />
//                     <span>{project.duration}</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-orange-500 text-xs font-medium">
//                     <FaFire size={14} />
//                     <span>{getDifficultyPercent(difficulty)}%</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedProject && (
//         <ProjectModal 
//           project={selectedProject} 
//           onClose={() => setSelectedProject(null)} 
//         />
//       )}
//     </section>
//   </>
// );
}