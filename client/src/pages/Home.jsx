import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
    }, [location]);

    useEffect(() => {
        // Fetch projects for featured section (limit 3)
        const fetchProjects = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await axios.get(`${apiUrl}/api/projects`);
                setFeaturedProjects(res.data.slice(0, 3));
            } catch (err) {
                console.error('Error fetching projects:', err);
                // Fallback or empty state handled by UI
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="bg-[#1a1a1a] min-h-screen">
            <Hero />



            {/* Advertisement / Quote Section */}
            <section className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            "The best investment on Earth is <span className="text-green-500">Earth itself</span>."
                        </h2>
                        <p className="text-xl text-gray-300 font-light italic mb-10">
                            - Louis Glickman
                        </p>
                        <Link to="/projects" className="inline-block px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg hover:shadow-green-500/30">
                            Start Investing Today
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-24 bg-[#111111] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Discover our handpicked selection of premium properties.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>

                    <div className="text-center mt-14">
                        <Link to="/projects" className="inline-block px-10 py-4 bg-transparent border border-gray-600 text-white font-semibold rounded-full hover:bg-green-600 hover:border-green-600 transition-all duration-300">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-gradient-to-br from-green-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2 text-white">
                            <h4 className="text-green-400 font-bold uppercase tracking-wide mb-2">Contact Us</h4>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Find Your Dream Home?</h2>
                            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                                Contact us today to schedule a site visit or get more information about our ongoing projects.
                                Our team is here to assist you every step of the way.
                            </p>

                            {/* Leadership Profiles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {/* Founder */}
                                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-900/50 flex items-center justify-center text-green-500 font-bold text-xl border-2 border-green-500/50 mb-3">
                                        SK
                                    </div>
                                    <h4 className="font-bold text-lg text-white">Satheesh Kumar R</h4>
                                    <p className="text-green-400 text-xs font-medium uppercase tracking-wider">Founder</p>
                                    <p className="text-gray-400 text-xs mt-2">Est. 2010</p>
                                </div>

                                {/* Handler */}
                                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center text-center">
                                    <img
                                        src="/kavin.jpg"
                                        alt="Kavin Raj S"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-green-500 mb-3"
                                    />
                                    <h4 className="font-bold text-lg text-white">Kavin Raj S</h4>
                                    <p className="text-green-400 text-xs font-bold uppercase tracking-wider bg-green-900/30 px-2 py-1 rounded mt-1">Owner</p>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-8 text-sm italic border-l-4 border-green-500 pl-4 py-1">
                                "Serving trusted clients all over Tamil Nadu with 100+ successful land deals."
                            </p>

                            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                                <h4 className="font-bold text-xl mb-3 text-green-400">Office Hours</h4>
                                <p className="text-gray-300 mb-1">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-300">Sunday: Closed</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
