const express = require('express');
const router = express.Router()
const Author = require('../models/author');

//All Authors route
router.get('/', (req, res) => {
    res.render('authors/index');
});

router.get('/new', (req, res)=> {
    res.render('authors/new', { author: new Author()});
});

router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    });

    author.save().
    then((newAuthor) => {
        // res.redirect(`authors/${author.id}`);
        res.render('authors');
        console.log('redirected to authors');
    }).
    catch((err) => {
        res.render('authors/new',{
            author: author,
            errMessage:'Error Creating Author'
        });
    });

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