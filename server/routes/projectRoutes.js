const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new project
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        price: req.body.price,
        status: req.body.status,
        features: req.body.features,
        // New Fields
        plotArea: req.body.plotArea,
        plotAreaUnit: req.body.plotAreaUnit,
        pricePerSqFt: req.body.pricePerSqFt,
        facing: req.body.facing,
        cornerProperty: req.body.cornerProperty,
        gatedSociety: req.body.gatedSociety,
        openSides: req.body.openSides,
        overlooking: req.body.overlooking,
        videoUrl: req.body.videoUrl,
        gallery: req.body.gallery,
        remainingPlots: req.body.remainingPlots,
        budget: req.body.budget
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a project
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
