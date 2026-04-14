import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Navbar from '../../components/Navbar';
import { Trash2, Plus, MessageSquare, LayoutGrid, UserCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'messages', or 'profile'
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // Form State
  const [profile, setProfile] = useState({
    name: '', title: '', avatar_url: '', location: '', email: '', phone: '', about_text_1: '', about_text_2: '', skills: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [newProject, setNewProject] = useState({
    title: '', description: '', image_url: '', tech_stack: '', github_link: '', live_demo: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'projects') {
        const { data } = await api.get('/projects');
        setProjects(data);
      } else if (activeTab === 'messages') {
        const { data } = await api.get('/messages');
        setMessages(data);
      } else if (activeTab === 'profile') {
        const { data } = await api.get('/profile');
        if (data) {
          setProfile({ ...data });
        }
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      // transform tech_stack from comma string to array
      const projectData = {
        ...newProject,
        tech_stack: newProject.tech_stack.split(',').map(item => item.trim())
      };
      await api.post('/projects', projectData);
      setNewProject({ title: '', description: '', image_url: '', tech_stack: '', github_link: '', live_demo: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to add project', error);
    }
  };

  const handleDeleteProject = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete', error);
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    if(window.confirm('Delete this message?')) {
      try {
        await api.delete(`/messages/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete message', error);
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const profileData = { ...profile };
      await api.put('/profile', profileData);
      alert('Profile updated successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen pt-24 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl font-extrabold font-display text-neo-fg">Admin Dashboard</h1>
          <div className="flex bg-neo-bg rounded-2xl shadow-extruded p-2 overflow-x-auto gap-2">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'projects' ? 'shadow-inset text-neo-accent' : 'text-neo-muted hover:text-neo-fg hover:shadow-extruded-small'}`}
            >
              <LayoutGrid size={18} /> Projects
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'profile' ? 'shadow-inset text-neo-accent' : 'text-neo-muted hover:text-neo-fg hover:shadow-extruded-small'}`}
            >
              <UserCircle size={18} /> Profile
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'messages' ? 'shadow-inset text-neo-accent' : 'text-neo-muted hover:text-neo-fg hover:shadow-extruded-small'}`}
            >
              <MessageSquare size={18} /> Messages
            </button>
          </div>
        </div>

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-1 bg-neo-bg p-8 rounded-[32px] shadow-extruded h-fit">
              <h2 className="text-2xl font-bold font-display mb-8 text-neo-fg flex items-center gap-3"><Plus size={24} className="text-neo-accent"/> Add New Project</h2>
              <form onSubmit={handleAddProject} className="space-y-6">
                <input required type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                <textarea required placeholder="Description" rows="3" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all resize-none"></textarea>
                <input placeholder="Image URL (optional)" type="text" value={newProject.image_url} onChange={e => setNewProject({...newProject, image_url: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                <input required placeholder="Tech Stack (comma separated)" type="text" value={newProject.tech_stack} onChange={e => setNewProject({...newProject, tech_stack: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                <input placeholder="GitHub Link" type="text" value={newProject.github_link} onChange={e => setNewProject({...newProject, github_link: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                <input placeholder="Live Demo Link" type="text" value={newProject.live_demo} onChange={e => setNewProject({...newProject, live_demo: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                <button type="submit" className="w-full py-4 bg-neo-accent text-white font-bold rounded-2xl shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset transition-all">Create Project</button>
              </form>
            </div>
            
            {/* Project List */}
            <div className="lg:col-span-2 space-y-6">
              {projects.length === 0 ? <p className="text-neo-muted font-medium">No projects found.</p> : projects.map(p => (
                <div key={p._id} className="bg-neo-bg p-8 rounded-[32px] shadow-extruded flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
                  <div>
                    <h3 className="font-bold font-display text-xl text-neo-fg">{p.title}</h3>
                    <p className="text-sm text-neo-muted font-medium mt-2 line-clamp-2 md:max-w-md">{p.description}</p>
                    <div className="mt-4 text-xs font-bold text-neo-accent px-4 py-2 bg-neo-bg shadow-inset rounded-full inline-block">{p.tech_stack.join(', ')}</div>
                  </div>
                  <button onClick={() => handleDeleteProject(p._id)} className="p-4 text-red-500 rounded-2xl shadow-extruded hover:shadow-inset hover:text-red-600 transition-all active:translate-y-[1px]"><Trash2 size={24}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 gap-8">
            {messages.length === 0 ? <p className="text-neo-muted font-medium">No messages yet.</p> : messages.map(m => (
              <div key={m._id} className="bg-neo-bg p-8 rounded-[32px] shadow-extruded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold font-display text-neo-fg text-xl">{m.name}</h4>
                    <a href={`mailto:${m.email}`} className="text-sm font-medium text-neo-accent hover:underline">{m.email}</a>
                  </div>
                  <button onClick={() => handleDeleteMessage(m._id)} className="p-4 text-red-500 rounded-2xl shadow-extruded hover:shadow-inset hover:text-red-600 transition-all active:translate-y-[1px]"><Trash2 size={24}/></button>
                </div>
                <div className="mt-6 p-6 bg-neo-bg shadow-inset-deep rounded-2xl text-neo-fg font-medium leading-relaxed">
                  {m.message}
                </div>
                <div className="mt-6 text-xs font-bold text-neo-muted">
                  Received at: {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-neo-bg p-10 rounded-[32px] shadow-extruded max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-display mb-10 text-neo-fg flex items-center gap-3"><UserCircle size={28} className="text-neo-accent"/> Edit Profile Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-neo-fg mb-3">Full Name</label>
                  <input required type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neo-fg mb-3">Job Title</label>
                  <input required type="text" value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neo-fg mb-3">Avatar URL</label>
                  <input required type="text" value={profile.avatar_url} onChange={e => setProfile({...profile, avatar_url: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neo-fg mb-3">Location</label>
                  <input required type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neo-fg mb-3">Contact Email</label>
                  <input required type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neo-fg mb-3">Phone Number</label>
                  <input required type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-neo-fg mb-3">About Text (Paragraph 1)</label>
                <textarea required rows="4" value={profile.about_text_1} onChange={e => setProfile({...profile, about_text_1: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-neo-fg mb-3">About Text (Paragraph 2 - Optional)</label>
                <textarea rows="4" value={profile.about_text_2} onChange={e => setProfile({...profile, about_text_2: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-neo-fg mb-4">Skills</label>
                <div className="flex flex-wrap gap-4 mb-6">
                  {profile.skills && profile.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-5 py-2 shadow-extruded-small rounded-full text-sm font-bold text-neo-fg bg-neo-bg">
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => setProfile({...profile, skills: profile.skills.filter((_, i) => i !== index)})} 
                        className="ml-3 text-red-500 hover:text-red-600 focus:outline-none text-lg leading-none"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={skillInput} 
                    onChange={e => setSkillInput(e.target.value)} 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
                          setProfile({...profile, skills: [...(profile.skills || []), skillInput.trim()]});
                          setSkillInput('');
                        }
                      }
                    }}
                    placeholder="Type a skill and press Enter..."
                    className="flex-1 px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg text-sm font-medium transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
                        setProfile({...profile, skills: [...(profile.skills || []), skillInput.trim()]});
                        setSkillInput('');
                      }
                    }}
                    className="px-8 py-4 bg-neo-bg text-neo-fg shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset rounded-2xl font-bold transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <button type="submit" className="w-full py-5 bg-neo-accent text-white font-bold rounded-2xl shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset transition-all">Save Profile</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
