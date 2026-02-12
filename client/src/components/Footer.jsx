import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-white pt-12 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h3 className="text-2xl font-bold mb-5 text-green-500">RS Groups</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Building dreams into reality with premium sustainable living spaces. Your trusted partner in real estate development.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-5 text-white">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/" className="hover:text-green-500 transition-colors">Home</Link></li>
                            <li><Link to="/projects" className="hover:text-green-500 transition-colors">Projects</Link></li>
                            <li><Link to="/admin" className="hover:text-green-500 transition-colors">Admin</Link></li>
                            <li><a href="#about" className="hover:text-green-500 transition-colors">About Us</a></li>
                            <li><a href="#contact" className="hover:text-green-500 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-5 text-white">Contact Info</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-center gap-3"><MapPin size={18} className="text-green-500" /> Chinnasalem, Tamil Nadu</li>
                            <li className="flex items-center gap-3"><Phone size={18} className="text-green-500" /> +91 93847 93229</li>
                            <li className="flex items-center gap-3"><Mail size={18} className="text-green-500" /> dheerankavin70@gmail.com</li>
                        </ul>
                        <div className="flex gap-5 mt-6">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} RS Groups. All rights reserved. (v1.1)
                </div>
            </div>
        </footer>
    );
};

export default Footer;
