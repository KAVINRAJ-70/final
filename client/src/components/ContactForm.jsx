import { useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await axios.post(`${API_URL}/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-[#242424] p-8 rounded-2xl shadow-xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>

            {status === 'success' && (
                <div className="bg-green-900/30 text-green-400 p-4 rounded-lg mb-6 flex items-center border border-green-900/50">
                    <CheckCircle size={20} className="mr-2" />
                    Message sent successfully! We'll get back to you soon.
                </div>
            )}

            {status === 'error' && (
                <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6 flex items-center border border-red-900/50">
                    <AlertCircle size={20} className="mr-2" />
                    Something went wrong. Please try again later.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                        placeholder="+91 98765 43210"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                        placeholder="I'm interested in..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-4 px-6 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${status === 'loading' ? 'bg-green-800 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/20'
                        }`}
                >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    {status !== 'loading' && <Send size={18} />}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
