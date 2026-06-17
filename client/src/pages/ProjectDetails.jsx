import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowLeft, CheckCircle, Ruler, Compass, Home, Shield, Maximize } from 'lucide-react';
import API_URL from '../apiConfig';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${API_URL}/projects/${id}`);
                setProject(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project from API, trying fallback:', error);
                try {
                    const fallback = await axios.get('./projects.json');
                    // In static mode, 'id' might be the title or index. Let's try matching.
                    const projectData = fallback.data.find(p => p._id === id || p.title.replace(/\s+/g, '-').toLowerCase() === id);
                    if (projectData) {
                        setProject(projectData);
                    }
                } catch (fallbackErr) {
                    console.error('Fallback failed:', fallbackErr);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProject();
    }, [id]);

    const getStatusStyle = (status) => {
        const s = status ? status.toLowerCase() : '';
        if (s === 'ongoing') {
            return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
        }
        if (s === 'upcoming') {
            return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        }
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/20'; // completed / default
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-white gap-4 bg-dot-pattern">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase animate-pulse">Loading Project Details...</span>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-white gap-4 bg-dot-pattern">
                <p className="text-xl text-gray-400">Project not found</p>
                <Link to="/projects" className="text-emerald-400 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#080808] min-h-screen pt-32 pb-20 text-white relative overflow-hidden bg-dot-pattern">
            {/* Glowing Accent Orbs */}
            <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-emerald-500/5 glow-blur rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 glow-blur rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Back Button */}
                <Link 
                    to="/projects" 
                    className="group inline-flex items-center text-gray-400 hover:text-emerald-400 mb-8 transition-colors font-semibold text-sm"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform" /> 
                    Back to Portfolio
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-white/5 pb-8">
                    <div>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3 backdrop-blur-md ${getStatusStyle(project.status)}`}>
                            {project.status}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
                            {project.title}
                        </h1>
                        <div className="flex items-center text-gray-400 text-sm font-medium">
                            <MapPin size={16} className="text-emerald-500 mr-2 shrink-0" />
                            {project.location}
                        </div>
                    </div>
                    
                    <div className="text-left md:text-right bg-white/[0.02] border border-white/5 p-5 rounded-2xl backdrop-blur-md md:min-w-[220px] shadow-lg">
                        <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Asking Price</div>
                        <div className="text-3xl font-extrabold text-emerald-400 tracking-tight mb-1">{project.price}</div>
                        <div className="text-xs text-gray-400 font-semibold">
                            {project.pricePerSqFt ? `@ ${project.pricePerSqFt} / ${project.plotAreaUnit}` : 'Premium Valuation'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Column: Media & Overview */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Media Display */}
                        <div className="bg-black/40 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative aspect-video group">
                            {project.videoUrl ? (
                                <iframe
                                    src={project.videoUrl.replace('watch?v=', 'embed/')}
                                    title={project.title}
                                    className="w-full h-full animate-fade-in"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img 
                                    src={project.image || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-102" 
                                />
                            )}
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider text-white border border-white/10 shadow-md">
                                {project.videoUrl ? 'Video Tour' : 'Project Showcase'}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm shadow-xl">
                            <h3 className="text-lg font-bold mb-4 text-white font-display border-b border-white/5 pb-3">Project Overview</h3>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Spec Grid & Call to Action */}
                    <div className="space-y-6">
                        {/* Specifications Card */}
                        <div className="bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
                            <h3 className="text-lg font-bold mb-6 text-white font-display border-b border-white/5 pb-3">Property Specifications</h3>

                            <div className="grid grid-cols-1 gap-y-5">
                                {/* Plot Area */}
                                <div className="flex items-start">
                                    <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 mr-4 shrink-0 border border-emerald-500/10">
                                        <Ruler size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Plot Area</div>
                                        <div className="text-base font-semibold text-white">
                                            {project.plotArea || 'Not Specified'} <span className="text-xs text-gray-400 font-normal">{project.plotAreaUnit || 'sq.ft.'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Facing */}
                                <div className="flex items-start">
                                    <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 mr-4 shrink-0 border border-emerald-500/10">
                                        <Compass size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Facing Direction</div>
                                        <div className="text-base font-semibold text-white">{project.facing || 'Not Specified'}</div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-start">
                                    <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 mr-4 shrink-0 border border-emerald-500/10">
                                        <Home size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Development Status</div>
                                        <div className="text-base font-semibold text-white">{project.status || 'Not Specified'}</div>
                                    </div>
                                </div>

                                {/* Corner Property */}
                                {project.cornerProperty && (
                                    <div className="flex items-start">
                                        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 mr-4 shrink-0 border border-emerald-500/10">
                                            <Maximize size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Corner Property</div>
                                            <div className="text-base font-semibold text-white">Yes, Multi-road access</div>
                                        </div>
                                    </div>
                                )}

                                {/* Gated Society */}
                                {project.gatedSociety && (
                                    <div className="flex items-start">
                                        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 mr-4 shrink-0 border border-emerald-500/10">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Gated Community</div>
                                            <div className="text-base font-semibold text-white">Yes, 24/7 Monitored Entry</div>
                                        </div>
                                    </div>
                                )}

                                {/* Remaining Plots */}
                                {project.remainingPlots && (
                                    <div className="flex items-start">
                                        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 mr-4 shrink-0 border border-emerald-500/10">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Available Inventory</div>
                                            <div className="text-base font-semibold text-white">{project.remainingPlots} Plots Left</div>
                                        </div>
                                    </div>
                                )}

                                {/* Budget */}
                                {project.budget && (
                                    <div className="flex items-start">
                                        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 mr-4 shrink-0 border border-emerald-500/10">
                                            <Home size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Estimated Budget</div>
                                            <div className="text-base font-semibold text-white">{project.budget}</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <a 
                                href="#contact" 
                                className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform active:scale-98"
                            >
                                <Phone size={18} /> Schedule Site Visit
                            </a>
                        </div>

                        {/* Overlooking Section */}
                        {project.overlooking && (
                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3.5">Overlooking Views</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.overlooking.split(',').map((item, idx) => (
                                        <span 
                                            key={idx} 
                                            className="bg-white/[0.02] border border-white/10 text-gray-300 px-3.5 py-1.5 rounded-xl text-xs font-medium"
                                        >
                                            {item.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Amenities Section */}
                {project.features && project.features.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl shadow-xl mb-12 backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-6 text-white font-display border-b border-white/5 pb-3">Amenities & Security Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {project.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center text-gray-300 gap-3">
                                    <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400 border border-emerald-500/10">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span className="capitalize text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;
