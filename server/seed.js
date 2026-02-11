const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const sampleProjects = [
    {
        title: "Green Valley Villas",
        description: "Luxury villas surrounded by nature with modern amenities and sustainable design. Features include solar power, rainwater harvesting, and organic gardens.",
        image: "https://images.unsplash.com/photo-1600596542815-60c37c6525fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Coimbatore, Tamil Nadu",
        price: "₹1.2 Cr",
        status: "Upcoming",
        plotArea: 2400,
        plotAreaUnit: "sq.ft.",
        facing: "North",
        gatedSociety: true
    },
    {
        title: "Urban Heights Apartments",
        description: "Premium apartments in the heart of the city. Close to IT parks, schools, and hospitals. Amenities include a swimming pool, gym, and 24/7 security.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Chennai, Tamil Nadu",
        price: "₹75 Lakhs",
        status: "Ongoing",
        plotArea: 1200,
        plotAreaUnit: "sq.ft.",
        facing: "East",
        gatedSociety: true
    },
    {
        title: "Lakeside Residency",
        description: "Peaceful living near the lake with scenic views. specialized in creating a community-focused environment with parks and walking trails.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Bangalore, Karnataka",
        price: "₹90 Lakhs",
        status: "Upcoming",
        plotArea: 1500,
        plotAreaUnit: "sq.ft.",
        facing: "South",
        gatedSociety: true
    },
    {
        title: "Sunshine City Plots",
        description: "DTCP approved residential plots ready for construction. Well-laid roads, street lights, and groundwater availability.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Madurai, Tamil Nadu",
        price: "₹25 Lakhs",
        status: "Completed",
        plotArea: 1000,
        plotAreaUnit: "sq.ft.",
        facing: "West",
        cornerProperty: true
    },
    {
        title: "Royal Palm Estates",
        description: "Exclusive gated community with high-end infrastructure. Perfect for building your dream home in a secure and upscale neighborhood.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Trichy, Tamil Nadu",
        price: "₹45 Lakhs",
        status: "Ongoing",
        plotArea: 1800,
        plotAreaUnit: "sq.ft.",
        facing: "East",
        gatedSociety: true
    },
    {
        title: "Eco-Smart Homes",
        description: "Budget-friendly eco-homes designed for efficiency and comfort. Located in a rapidly developing area with high appreciation potential.",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Salem, Tamil Nadu",
        price: "₹55 Lakhs",
        status: "Ongoing",
        plotArea: 1100,
        plotAreaUnit: "sq.ft.",
        facing: "North",
        gatedSociety: true
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB for Seeding');

        // Clear existing data
        await Project.deleteMany({});
        console.log('Cleared existing projects');

        // Insert new data
        await Project.insertMany(sampleProjects);
        console.log('Sample projects inserted successfully');

        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error seeding database:', err);
        mongoose.connection.close();
    });
