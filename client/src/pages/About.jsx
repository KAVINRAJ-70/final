import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-20">
            {/* Hero Section of About Page */}
            <div className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556912173-3db996ea0622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')" }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        About <span className="text-green-500">RS Groups</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Building dreams and creating sustainable communities since 2010.
                    </motion.p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <motion.div
                            className="md:w-1/2 flex items-center justify-center bg-green-600/15 rounded-2xl border border-green-500/30 p-12 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}logo.png`}
                                alt="RS Groups Logo"
                                className="w-full max-w-sm h-auto object-contain drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-105"
                            />
                        </motion.div>
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h4 className="text-green-500 font-bold uppercase tracking-wider mb-3">Who We Are</h4>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Building Trust Across Tamil Nadu</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                                Established in 2010 by visionary founder <strong>Satheesh Kumar R</strong>, RS Groups has grown into a trusted name in real estate.
                                Today, under the dynamic leadership of <strong>Kavin Raj S</strong>, we continue to expand our footprint, offering premium land and housing solutions.
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                                With over <strong>100+ lands dealt</strong> and happy families settled, we pride ourselves on transparency and excellence.
                                We service clients <strong>all over Tamil Nadu</strong>, ensuring that your dream property is just a call away.
                            </p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center text-gray-300 font-medium">
                                    <CheckCircle className="text-green-500 mr-3" size={24} /> 100+ Successful Land Deals
                                </li>
                                <li className="flex items-center text-gray-300 font-medium">
                                    <CheckCircle className="text-green-500 mr-3" size={24} /> Serving All Over Tamil Nadu
                                </li>
                                <li className="flex items-center text-gray-300 font-medium">
                                    <CheckCircle className="text-green-500 mr-3" size={24} /> Trusted Since 2010
                                </li>
                                <li className="flex items-center text-gray-300 font-medium">
                                    <CheckCircle className="text-green-500 mr-3" size={24} /> Transparent Documentation
                                </li>
                            </ul>

                            {/* Leadership Focus in About Page */}
                            <div className="bg-[#242424] p-6 rounded-xl border border-gray-800 flex items-center gap-6 mb-8">
                                <img
                                    src={`${import.meta.env.BASE_URL}kavin.jpg`}
                                    alt="Kavin Raj S"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-white">Kavin Raj S</h3>
                                    <p className="text-green-500 font-medium mb-2">Owner & Operations Head</p>
                                    <p className="text-gray-400 text-sm italic">
                                        "Dedicated to delivering excellence and building trust with every square foot we develop."
                                    </p>
                                </div>
                            </div>

                            <Link to="/projects" className="inline-flex items-center text-green-500 font-bold hover:text-green-400 transition-colors text-lg group">
                                View Our Projects <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
