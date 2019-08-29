var fs = require('fs');
var express = require('express');
var Student = require('./student');

var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/students');
});

router.get('/students', (req, res) => {
    Student.find((err, data) => {
        if (err) return res.status(500).send("Server Error!");
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
        if (err) return res.status(500).send('Write file fail!')
        console.log('Write file success!')
        res.redirect('/students');
    });
});
router.get('/students/edit', (req, res) => {
    var id = req.query.id
    Student.findById(id, (err, data) => {
        if (err) return res.status(500).send('Edit fail!')
        res.render('edit.html', {
            student: data
        });
    })
});
router.post('/students/edit', (req, res) => {
    Student.updateById(req.body, err => {
        if(err) return res.status(500).send('Update fail!')
        console.log('Update success!')
        res.redirect('/students');
    })

});
router.get('/students/delete', (req, res) => {
    Student.deleteById(req.query.id, err => {
        if(err) return res.status(500).send('Delete fail!')
        console.log('Delete success!')
        res.redirect('/students');
    })
});

module.exports = router;