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
                console.error('Error fetching project details:', error);
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loading...</div>;
    if (!project) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Project not found</div>;

    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-24 pb-12 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb / Back */}
                <Link to="/projects" className="inline-flex items-center text-gray-400 hover:text-green-500 mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Projects
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
                        <div className="flex items-center text-gray-400">
                            <MapPin size={18} className="text-green-500 mr-2" />
                            {project.location}
                        </div>
                    </div>
                    <div className="text-left md:text-right">
                        <div className="text-3xl font-bold text-green-500">{project.price}</div>
                        <div className="text-sm text-gray-400">
                            {project.pricePerSqFt ? `@ ${project.pricePerSqFt} / ${project.plotAreaUnit}` : 'Best Price'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Column: Media (Video/Image) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative aspect-video group">
                            {project.videoUrl ? (
                                <iframe
                                    src={project.videoUrl.replace('watch?v=', 'embed/')}
                                    title={project.title}
                                    className="w-full h-full"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-white">
                                {project.videoUrl ? 'Video Tour' : 'Project Image'}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-[#242424] p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-bold mb-4 text-white">Project Overview</h3>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Details Grid */}
                    <div className="space-y-6">
                        <div className="bg-[#242424] p-6 rounded-xl border border-gray-800 shadow-xl">
                            <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">Property Details</h3>

                            <div className="grid grid-cols-1 gap-y-6">
                                <div className="flex items-start">
                                    <div className="bg-green-900/20 p-2 rounded-lg mr-4">
                                        <Ruler className="text-green-500" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Plot Area</div>
                                        <div className="text-lg font-semibold text-white">
                                            {project.plotArea} <span className="text-sm text-gray-400">{project.plotAreaUnit}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-900/20 p-2 rounded-lg mr-4">
                                        <Compass className="text-green-500" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Facing</div>
                                        <div className="text-lg font-semibold text-white">{project.facing || 'Not Specified'}</div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-900/20 p-2 rounded-lg mr-4">
                                        <Home className="text-green-500" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Status</div>
                                        <div className="text-lg font-semibold text-white">{project.status}</div>
                                    </div>
                                </div>

                                {project.cornerProperty && (
                                    <div className="flex items-start">
                                        <div className="bg-green-900/20 p-2 rounded-lg mr-4">
                                            <Maximize className="text-green-500" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Corner Property</div>
                                            <div className="text-lg font-semibold text-white">Yes</div>
                                        </div>
                                    </div>
                                )}

                                {project.gatedSociety && (
                                    <div className="flex items-start">
                                        <div className="bg-green-900/20 p-2 rounded-lg mr-4">
                                            <Shield className="text-green-500" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Gated Society</div>
                                            <div className="text-lg font-semibold text-white">Yes</div>
                                        </div>
                                    </div>
                                )}

                                {project.remainingPlots && (
                                    <div className="flex items-start">
                                        <div className="bg-green-900/20 p-2 rounded-lg mr-4">
                                            <CheckCircle className="text-green-500" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Plots Remaining</div>
                                            <div className="text-lg font-semibold text-white">{project.remainingPlots}</div>
                                        </div>
                                    </div>
                                )}

                                {project.budget && (
                                    <div className="flex items-start">
                                        <div className="bg-green-900/20 p-2 rounded-lg mr-4">
                                            <Home className="text-green-500" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Budget / Plot</div>
                                            <div className="text-lg font-semibold text-white">{project.budget}</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <a href="#contact" className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/20">
                                <Phone size={20} /> Contact Owner
                            </a>
                        </div>

                        {/* Quick Summary/Overlooking */}
                        {project.overlooking && (
                            <div className="bg-[#242424] p-6 rounded-xl border border-gray-800">
                                <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">Overlooking</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.overlooking.split(',').map((item, idx) => (
                                        <span key={idx} className="bg-[#1a1a1a] border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                                            {item.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Features Section if needed */}
                {project.features && project.features.length > 0 && (
                    <div className="bg-[#242424] p-8 rounded-xl border border-gray-800 mb-12">
                        <h3 className="text-2xl font-bold mb-6 text-white">Amenities & Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {project.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center text-gray-300">
                                    <CheckCircle size={20} className="text-green-500 mr-3" />
                                    <span className="capitalize">{feature}</span>
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
