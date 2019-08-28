var fs = require('fs');
var express = require('express');
var Student = require('./student');

var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/students');
});

router.get('/students', (req, res) => {
    Student.find((err, data) => {
        if(err) return res.status(500).send("Server Error!");
        res.render('index.html', {
            students: JSON.parse(data).students
        });
    })
});
router.get('/students/new', (req, res) => {
    res.render('new.html')
});
router.post('/students/new', (req, res) => {
    Student.save(req.body, err => {
        if(err) return res.status(500).send('Write file fail!')
        console.log('Write file success!')
        res.redirect('/students');
    }); 
});
router.get('/students/edit', (req, res) => {

});
router.post('/students/edit', (req, res) => {

});
router.get('/students/delete', (req, res) => {

});

module.exports = router;