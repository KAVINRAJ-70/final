const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true }, // "Residential Land/Plot for Sale"
    description: { type: String, required: true },
    image: { type: String, required: true }, // Main image
    gallery: [String], // Array of image URLs
    location: { type: String, required: true }, // "kaattukottai, Attur, Salem"
    price: { type: String, required: true }, // "18.3 Lac"
    status: { type: String, enum: ['Ongoing', 'Completed', 'Upcoming'], default: 'Ongoing' },

    // New Detailed Fields
    plotArea: { type: Number, required: true }, // 1200
    plotAreaUnit: { type: String, default: 'sq.ft.' },
    pricePerSqFt: { type: Number }, // 1525
    facing: { type: String, enum: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] },
    cornerProperty: { type: Boolean, default: false },
    gatedSociety: { type: Boolean, default: false },
    openSides: { type: Number, default: 1 },
    overlooking: { type: String }, // "Park/Garden, Main Road, Others"
    videoUrl: { type: String },

    // Extra Info
    remainingPlots: { type: Number },
    budget: { type: String }, // "20L - 30L"

    features: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
