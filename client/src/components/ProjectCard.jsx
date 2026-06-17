import { MapPin, ArrowRight, Ruler, Compass, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const projectLink = `/projects/${project._id || project.title.replace(/\s+/g, '-').toLowerCase()}`;

    // Dynamic style for status badge
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

    return (
        <motion.div
            className="group bg-gradient-to-b from-[#181818] to-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/20 shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] transition-all duration-500 flex flex-col h-full"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <Link to={projectLink}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    <img
                        src={project.image || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </Link>
                <div className={`absolute top-4 right-4 z-20 backdrop-blur-md text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md ${getStatusStyle(project.status)}`}>
                    {project.status}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-gray-400 text-xs mb-3 font-medium tracking-wide">
                    <MapPin size={12} className="mr-1.5 text-emerald-500" />
                    {project.location}
                </div>

                <Link to={projectLink}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                        {project.title}
                    </h3>
                </Link>

                <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed flex-grow">
                    {project.description}
                </p>

                {/* Micro Details Grid */}
                <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-400 font-medium mb-5 pb-5 border-b border-white/5">
                    <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 py-1.5 px-2 rounded-lg justify-center">
                        <Ruler size={11} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{project.plotArea ? `${project.plotArea} ${project.plotAreaUnit || 'sq.ft'}` : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 py-1.5 px-2 rounded-lg justify-center">
                        <Compass size={11} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{project.facing || 'East'}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 py-1.5 px-2 rounded-lg justify-center">
                        <Shield size={11} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{project.gatedSociety ? 'Gated' : 'Open'}</span>
                    </div>
                </div>

                {/* Card Action Row */}
                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">Price</div>
                        <span className="text-lg font-extrabold text-emerald-400 tracking-tight">{project.price}</span>
                    </div>
                    <Link 
                        to={projectLink} 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 hover:border-emerald-500/50 py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-emerald-500/20"
                    >
                        View Details 
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
