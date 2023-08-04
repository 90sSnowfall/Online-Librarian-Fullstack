const express = require('express');
const router = express.Router()
const Author = require('../models/author');


//All Authors route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name != '') {
        searchOptions.name = RegExp(req.query.name, 'i');
    }
    try{
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
    res.render('authors/index');
});

router.get('/new', (req, res)=> {
    res.render('authors/new', { author: new Author()});
});

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });

    try{
        const newAuthor = await author.save();
        // res.redirect(`authors/${author.id}`);
        res.render('authors');
        console.log('redirected to authors');

    }catch(error){
        res.render('authors/new', {
            author: author,
            errMessage: 'Error creating Author.'
        });
    }

    //It works but kinda old, and clunky
    // author.save().
    // then((newAuthor) => {
    //     // res.redirect(`authors/${author.id}`);
    //     res.render('authors');
    //     console.log('redirected to authors');
    // }).
    // catch((err) => {
    //     res.render('authors/new',{
    //         author: author,
    //         errMessage:'Error Creating Author'
    //     });
    // });

        //DEPRECATED \/
    // author.save((err, newAuthor) => {
    //     if(err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error creating author.'
    //         });
    //     } else {
    //         // res.redirect('authors/${newAuthor.id}');
    //         res.redirect('authors');
    //     }
    // });
    //res.send(req.body.name);
})

module.exports = router;