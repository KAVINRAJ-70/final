import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            className="bg-[#242424] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-300 flex flex-col h-full border border-gray-800"
            whileHover={{ y: -5 }}
        >
            <div className="relative h-48 overflow-hidden">
                <Link to={`/projects/${project._id}`}>
                    <img
                        src={project.image || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                        alt={project.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                </Link>
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                    {project.status}
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-gray-400 text-sm mb-2">
                    <MapPin size={14} className="mr-1 text-green-500" />
                    {project.location}
                </div>
                <Link to={`/projects/${project._id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 hover:text-green-500 transition-colors">{project.title}</h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>

                <div className="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between">
                    <span className="text-lg font-bold text-green-400">{project.price}</span>
                    <Link to={`/projects/${project._id}`} className="flex items-center text-gray-300 font-medium hover:text-green-400 transition-colors group">
                        View Details <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
