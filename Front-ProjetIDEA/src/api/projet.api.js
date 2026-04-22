import api from './axios'; // 🔥 IMPORTANT

export const projetApi = {
  create: async (idea) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    const response = await api.post("/projets", {
      title: idea.title,
      type: idea.type,
      description: idea.description,
      difficulty: idea.difficulty,
      technologies: idea.technologies || [],
      features: idea.features || [],
      tasks: idea.tasks || [],        
      duration: idea.duration || "",
      userId: user.id || user.userId
    });

    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/projets");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/projets/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/projets/${id}`);
    return response.data;
  },

  // 🗑️ GET TRASH PROJECTS
  getTrash: async () => {
    const response = await api.get("/projets/trash");
    return response.data;
  },

  // ♻️ RESTORE PROJECT FROM TRASH
  restore: async (id) => {
    const response = await api.put(`/projets/restore/${id}`);
    return response.data;
  }
};
