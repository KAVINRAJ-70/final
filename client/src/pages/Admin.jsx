import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, LayoutGrid, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import axios from 'axios';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('contacts');
    const [contacts, setContacts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        image: '',
        location: '',
        price: '',
        status: 'Ongoing',
        plotArea: '',
        plotAreaUnit: 'sq.ft.',
        pricePerSqFt: '',
        facing: '',
        cornerProperty: false,
        gatedSociety: false,
        openSides: '',
        overlooking: '',
        videoUrl: '',
        remainingPlots: '',
        budget: ''
    });
    const [status, setStatus] = useState(null); // success, error, loading
    const [editingId, setEditingId] = useState(null);
    const [viewingContact, setViewingContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.get(`${apiUrl}/api/contact`);
            setContacts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setLoading(false);
        }
    };

    const fetchProjects = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.get(`${apiUrl}/api/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
        fetchProjects();
    }, []);

    const handleDeleteContact = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.delete(`${apiUrl}/api/contact/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
            alert('Failed to delete contact');
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.delete(`${apiUrl}/api/projects/${id}`);
            setProjects(projects.filter(project => project._id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    const handleProjectChange = (e) => {
        setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            if (editingId) {
                const response = await axios.put(`${apiUrl}/api/projects/${editingId}`, projectForm);
                setProjects(projects.map(p => p._id === editingId ? response.data : p));
                setStatus('success');
                setEditingId(null);
            } else {
                const response = await axios.post(`${apiUrl}/api/projects`, projectForm);
                setProjects([...projects, response.data]);
                setStatus('success');
            }
            // Reset Form (shared logic)
            setProjectForm({
                title: '',
                description: '',
                image: '',
                location: '',
                price: '',
                status: 'Ongoing',
                plotArea: '',
                plotAreaUnit: 'sq.ft.',
                pricePerSqFt: '',
                facing: '',
                cornerProperty: false,
                gatedSociety: false,
                openSides: '',
                overlooking: '',
                videoUrl: '',
                remainingPlots: '',
                budget: ''
            });
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            console.error('Error saving project:', error);
            setStatus('error');
            setTimeout(() => setStatus(null), 3000);
        }
    };

    const handleEditProject = (project) => {
        setProjectForm({
            title: project.title || '',
            description: project.description || '',
            image: project.image || '',
            location: project.location || '',
            price: project.price || '',
            status: project.status || 'Ongoing',
            plotArea: project.plotArea || '',
            plotAreaUnit: project.plotAreaUnit || 'sq.ft.',
            pricePerSqFt: project.pricePerSqFt || '',
            facing: project.facing || '',
            cornerProperty: project.cornerProperty || false,
            gatedSociety: project.gatedSociety || false,
            openSides: project.openSides || '',
            overlooking: project.overlooking || '',
            videoUrl: project.videoUrl || '',
            remainingPlots: project.remainingPlots || '',
            budget: project.budget || ''
        });
        setEditingId(project._id);
        setActiveTab('add-project');
    };

    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-24 pb-12 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8 text-green-500">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-gray-800 pb-4">
                    <button
                        onClick={() => setActiveTab('contacts')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'contacts' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                    >
                        <Users size={18} /> Contact Messages
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                    >
                        <LayoutGrid size={18} /> Manage Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('add-project')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'add-project' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                    >
                        <Plus size={18} /> Add Project
                    </button>
                </div>

                {/* View Message Modal */}
                {viewingContact && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#242424] w-full max-w-lg rounded-2xl border border-gray-800 p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setViewingContact(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center text-green-500 font-bold">
                                    {viewingContact.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{viewingContact.name}</h3>
                                    <p className="text-gray-400 text-sm">{new Date(viewingContact.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="space-y-4 mb-8 text-sm">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Email</span>
                                    <span className="text-green-400">{viewingContact.email}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Phone</span>
                                    <span className="text-gray-300">{viewingContact.phone}</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Message</h4>
                                <div className="bg-[#1a1a1a] p-4 rounded-xl text-gray-300 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                                    {viewingContact.message}
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingContact(null)}
                                className="w-full mt-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </div>
                )}

                {/* Content */}
                <div className="bg-[#242424] rounded-xl p-6 shadow-xl border border-gray-800">
                    {activeTab === 'contacts' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Users size={20} className="text-green-500" /> Recent Inquiries
                            </h2>
                            {loading ? (
                                <div className="text-center py-10 text-gray-400">Loading messages...</div>
                            ) : contacts.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">No messages yet.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-700 text-gray-400 text-sm">
                                                <th className="py-3 px-4">Date</th>
                                                <th className="py-3 px-4">Name</th>
                                                <th className="py-3 px-4">Email</th>
                                                <th className="py-3 px-4">Phone</th>
                                                <th className="py-3 px-4">Message</th>
                                                <th className="py-3 px-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contacts.map((contact) => (
                                                <tr key={contact._id} className="border-b border-gray-800 hover:bg-[#2a2a2a] transition-colors">
                                                    <td className="py-3 px-4 text-gray-500 text-sm">
                                                        {new Date(contact.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-3 px-4 font-medium text-white">{contact.name}</td>
                                                    <td className="py-3 px-4 text-green-400">{contact.email}</td>
                                                    <td className="py-3 px-4 text-gray-300">{contact.phone}</td>
                                                    <td className="py-3 px-4 text-gray-400 max-w-xs truncate" title={contact.message}>
                                                        {contact.message}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => setViewingContact(contact)}
                                                                className="text-green-500 hover:text-green-400 p-2 rounded-full hover:bg-green-900/20 transition-colors"
                                                                title="View Full Message"
                                                            >
                                                                <LayoutGrid size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteContact(contact._id)}
                                                                className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-900/20 transition-colors"
                                                                title="Delete Message"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <LayoutGrid size={20} className="text-green-500" /> Current Projects
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <div key={project._id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 relative group">
                                        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <button
                                                onClick={() => handleEditProject(project)}
                                                className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                                title="Edit Project"
                                            >
                                                <Plus size={16} className="rotate-45" /> {/* Using Plus rotated as a mock edit icon if Edit not imported, but wait I have Lucide icons */}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project._id)}
                                                className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                                                title="Delete Project"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-3 opacity-80" />
                                        <h3 className="font-bold text-white mb-1">{project.title}</h3>
                                        <p className="text-sm text-green-400 mb-2">{project.price}</p>
                                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{project.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'add-project' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                {editingId ? <Plus className="text-blue-500 rotate-45" size={20} /> : <Plus size={20} className="text-green-500" />}
                                {editingId ? 'Edit Project' : 'Add New Project'}
                            </h2>

                            {status === 'success' && (
                                <div className="bg-green-900/30 text-green-400 p-4 rounded-lg mb-6 flex items-center border border-green-900/50">
                                    <CheckCircle size={20} className="mr-2" />
                                    Project {editingId ? 'updated' : 'added'} successfully!
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6 flex items-center border border-red-900/50">
                                    <AlertCircle size={20} className="mr-2" />
                                    Failed to add project. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Project Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={projectForm.title}
                                        onChange={handleProjectChange}
                                        required
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={projectForm.price}
                                        onChange={handleProjectChange}
                                        required
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={projectForm.location}
                                        onChange={handleProjectChange}
                                        required
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={projectForm.status}
                                        onChange={handleProjectChange}
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                {/* Detailed Fields */}
                                <div className="md:col-span-2 border-t border-gray-800 pt-6 mt-2">
                                    <h3 className="text-lg font-semibold text-green-500 mb-4">Property Details</h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Plot Area</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="plotArea"
                                            value={projectForm.plotArea}
                                            onChange={handleProjectChange}
                                            placeholder="e.g. 1200"
                                            className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                        />
                                        <select
                                            name="plotAreaUnit"
                                            value={projectForm.plotAreaUnit}
                                            onChange={handleProjectChange}
                                            className="w-24 px-2 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none"
                                        >
                                            <option value="sq.ft.">sq.ft.</option>
                                            <option value="sq.m.">sq.m.</option>
                                            <option value="acres">acres</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price per Sq.Ft</label>
                                    <input
                                        type="number"
                                        name="pricePerSqFt"
                                        value={projectForm.pricePerSqFt}
                                        onChange={handleProjectChange}
                                        placeholder="e.g. 1500"
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Facing</label>
                                    <select
                                        name="facing"
                                        value={projectForm.facing}
                                        onChange={handleProjectChange}
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="">Select Facing</option>
                                        {['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map(dir => (
                                            <option key={dir} value={dir}>{dir}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Open Sides</label>
                                    <input
                                        type="number"
                                        name="openSides"
                                        value={projectForm.openSides}
                                        onChange={handleProjectChange}
                                        min="1" max="4"
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Overlooking (comma separated)</label>
                                    <input
                                        type="text"
                                        name="overlooking"
                                        value={projectForm.overlooking}
                                        onChange={handleProjectChange}
                                        placeholder="e.g. Park, Main Road"
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Remaining Plots</label>
                                    <input
                                        type="number"
                                        name="remainingPlots"
                                        value={projectForm.remainingPlots}
                                        onChange={handleProjectChange}
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Budget / Price Range</label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={projectForm.budget}
                                        onChange={handleProjectChange}
                                        placeholder="e.g. 20L - 30L"
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <div className="flex items-center gap-6 md:col-span-2">
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                                        <input
                                            type="checkbox"
                                            name="cornerProperty"
                                            checked={projectForm.cornerProperty}
                                            onChange={(e) => setProjectForm({ ...projectForm, cornerProperty: e.target.checked })}
                                            className="w-5 h-5 accent-green-600 rounded"
                                        />
                                        Corner Property
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                                        <input
                                            type="checkbox"
                                            name="gatedSociety"
                                            checked={projectForm.gatedSociety}
                                            onChange={(e) => setProjectForm({ ...projectForm, gatedSociety: e.target.checked })}
                                            className="w-5 h-5 accent-green-600 rounded"
                                        />
                                        Gated Society
                                    </label>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Video URL (YouTube/Embed)</label>
                                    <input
                                        type="text"
                                        name="videoUrl"
                                        value={projectForm.videoUrl}
                                        onChange={handleProjectChange}
                                        placeholder="https://..."
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={projectForm.image}
                                        onChange={handleProjectChange}
                                        required
                                        placeholder="https://..."
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={projectForm.description}
                                        onChange={handleProjectChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full py-3 px-6 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${status === 'loading' ? 'bg-green-800 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/20'
                                            }`}
                                    >
                                        {status === 'loading' ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Project' : 'Add Project')}
                                        {status !== 'loading' && (editingId ? <CheckCircle size={20} /> : <Plus size={20} />)}
                                    </button>
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingId(null);
                                                setProjectForm({
                                                    title: '', description: '', image: '', location: '', price: '', status: 'Ongoing',
                                                    plotArea: '', plotAreaUnit: 'sq.ft.', pricePerSqFt: '', facing: '',
                                                    cornerProperty: false, gatedSociety: false, openSides: '', overlooking: '',
                                                    videoUrl: '', remainingPlots: '', budget: ''
                                                });
                                            }}
                                            className="w-full mt-3 py-2 px-6 rounded-lg text-gray-400 border border-gray-700 font-medium hover:bg-gray-800 transition-all"
                                        >
                                            Cancel Editing
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
