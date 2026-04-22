import React, { useState, useEffect } from 'react';
import GenerateIdeas from './GenerateIdeas';
import ProjectList from './ProjetList';
import { projetApi } from '../../api/projet.api';
import Navbar from '../../components/Sidebar';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('generate');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    fetchProjectsCount(); 
  }, []);

  const fetchProjectsCount = async () => {
    try {
      const response = await projetApi.getAll();
      setProjectsCount(response.data?.length || 0);
    } catch (error) {
      console.error('Error fetching projects count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdeaGenerated = () => { 
    fetchProjectsCount(); 
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-white">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        
      />
      
      {/* Contenu principal */}
      <main className="flex-1 h-full min-h-0 overflow-hidden relative">

        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Chargement...</div>
          </div>
        ) : activeTab === 'generate' ? (
          <div className="h-full w-full min-h-0">

            <GenerateIdeas onIdeaGenerated={handleIdeaGenerated} />
          </div>
        ) : (
          <div className="h-full w-full min-h-0">

            <ProjectList />
          </div>
        )
        }
      </main>
    </div>
  );
}