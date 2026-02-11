import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80')" }}
            ></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/50 to-[#1a1a1a]"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <img
                        src="/logo.png"
                        alt="RS Groups Logo"
                        className="h-24 md:h-32 w-auto animate-pulse"
                    />
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Find Your Dream Property with <span className="text-green-500">RS Groups</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Premium real estate projects designed for modern living. Invest in your future today with trusted expertise.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link
                        to="/projects"
                        className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
                    >
                        Explore Projects
                    </Link>
                    <a
                        href="#contact"
                        className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                    >
                        Contact Us
                    </a>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center opacity-70">
                    <div className="w-1 h-2 bg-green-500 rounded-full mt-2"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
