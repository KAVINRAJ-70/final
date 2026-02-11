import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Phone, Briefcase, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToContact = () => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            // Small timeout to allow navigation to complete before scrolling
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } else {
            const element = document.getElementById('contact');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="bg-[#1a1a1a] border-b border-gray-800 fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="RS Promoters"
                                className="h-12 w-auto object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span className="text-xl md:text-2xl font-bold text-green-500 tracking-tight">RS Promoters</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/' ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}`}>Home</Link>
                            <Link to="/about" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/about' ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}`}>About Us</Link>
                            <Link to="/projects" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname.startsWith('/projects') ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}`}>Projects</Link>
                            <Link to="/admin" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/admin' ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}`}>Admin</Link>
                            <button onClick={scrollToContact} className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-green-700 transition-all duration-200 shadow-lg shadow-green-900/20">Contact Us</button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    className="md:hidden bg-[#1a1a1a] border-b border-gray-800"
                    id="mobile-menu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3" onClick={() => setIsOpen(false)}>
                            <Home size={18} /> Home
                        </Link>
                        <Link to="/about" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3" onClick={() => setIsOpen(false)}>
                            <Briefcase size={18} /> About Us
                        </Link>
                        <Link to="/projects" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3" onClick={() => setIsOpen(false)}>
                            <Briefcase size={18} /> Projects
                        </Link>
                        <Link to="/admin" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3" onClick={() => setIsOpen(false)}>
                            <LayoutDashboard size={18} /> Admin
                        </Link>
                        <button onClick={scrollToContact} className="text-gray-300 hover:text-green-400 block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-3">
                            <Phone size={18} /> Contact Us
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
