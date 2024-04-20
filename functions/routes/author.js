const express = require('express');
const authorModel = require('../models/author');

const router = express.Router();

//GET all authors
router.get('/', async (req, res) => {
    try{
        const authors = await authorModel.find();
        res.json(authors);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//GET a single author
router.get('/:id', getAuthor, (req, res) => {
    res.json(res.author)
})

//CREATE an author
router.post('/', async (req, res) => {
    try{
        //Validate the request
        if(!req.body.name || !req.body.age){
            return res.status(400).json({message: 'Name and age are required.'});
        }

        //Check if author's name already exist
        const existingAuthor = await authorModel.findOne({name: req.body.name});
        if(existingAuthor){
            return res.status(400).json({message: 'Author already exist'});
        }

        const author = new authorModel(req.body);
        const newAuthor = await author.save();
        res
            .status(201)
            .json({ message: 'Author created successfully', author: newAuthor});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//UPDATE an author
router.patch('/:id', getAuthor, async (req, res) => {
    try{
        if(req.body.name === null) {
            res.author.name = req.body.name;
        }
        
        const updateAuthor = await res.author.save();
        res.json(updateAuthor);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.put('/:id', getAuthor, async (req, res) => {
    try{
        const updatedAuthor = await authorModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//DELETE an author
router.delete('/:id', getAuthor, async (req, res) => {
    try{
        await authorModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Author deleted'})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//MIDDLEWARE function to get a single author by ID
async function getAuthor(req, res, next){
    try {
        const author = await authorModel.findById(req.params.id);
        if(!author) {
            res.status(400).json({message: 'Author not found'});
        }
        res.author = author;
        next();
    } catch (error) {
        res.status(400).json({message: err.message});
    }
}

module.exports = router;