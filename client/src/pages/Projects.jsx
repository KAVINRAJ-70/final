import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import API_URL from '../apiConfig';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_URL}/projects`);
                setProjects(res.data);
            } catch (err) {
                console.error('Error fetching from API, trying fallback:', err);
                try {
                    const fallback = await axios.get('./projects.json');
                    setProjects(fallback.data);
                } catch (fallbackErr) {
                    console.error('Fallback also failed:', fallbackErr);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Filter projects based on search query and status tab
    const filteredProjects = projects.filter(project => {
        const matchesSearch = 
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = 
            selectedStatus === 'All' || 
            (project.status && project.status.toLowerCase() === selectedStatus.toLowerCase());

        return matchesSearch && matchesStatus;
    });

    const statusOptions = ['All', 'Ongoing', 'Upcoming', 'Completed'];

    return (
        <div className="bg-[#080808] min-h-screen pt-32 pb-24 relative overflow-hidden bg-dot-pattern">
            {/* Header Glowing Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-80 bg-emerald-500/10 glow-blur rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Title */}
                <div className="text-center mb-16">
                    <motion.span 
                        className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Portfolio
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-5 tracking-tight font-display"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Explore Our <span className="text-gradient-emerald">Projects</span>
                    </motion.h1>
                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Discover our curated list of prime residential and commercial developments, built for sustainability, comfort, and appreciation.
                    </motion.p>
                </div>

                {/* Filter & Search Bar Section */}
                <motion.div 
                    className="bg-white/[0.02] border border-white/5 p-4 md:p-6 rounded-2xl backdrop-blur-xl mb-12 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {/* Search Field */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by project name or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-300"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider hidden lg:inline-flex items-center gap-1.5 mr-2">
                            <SlidersHorizontal size={14} className="text-emerald-500" /> Filter:
                        </span>
                        {statusOptions.map((status) => {
                            const isActive = selectedStatus === status;
                            return (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                                        isActive
                                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                                            : 'bg-white/5 text-gray-400 hover:text-white border-white/5 hover:bg-white/10'
                                    }`}
                                >
                                    {status}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Grid Section */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-80 gap-4">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase animate-pulse">Loading Properties...</span>
                    </div>
                ) : (
                    <>
                        <motion.div 
                            layout 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project) => (
                                    <motion.div
                                        key={project._id || project.title}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {!loading && filteredProjects.length === 0 && (
                            <motion.div 
                                className="text-center py-24 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <p className="text-gray-400 text-lg mb-2">No projects matched your criteria.</p>
                                <p className="text-gray-600 text-sm">Try resetting the filters or typing a different query.</p>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Projects;
