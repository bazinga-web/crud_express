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
            students: data
        });
    })
});
router.get('/students/new', (req, res) => {
    res.render('new.html')
});

router.post('/students/new', (req, res) => {
   new Student(req.body).save(err => {
        if (err) return res.status(500).send('save db fail!');
        res.redirect('/students');
    })
});

router.get('/students/edit', (req, res) => {
    // 这里要针对_id进行处理 "5d68b7ad79d199164a5aee20" 由于_id值被双引号包裹 所以需要去除双引号 
    var id = req.query.id.replace(/"/g, '')
    Student.findById(id, (err, data) => {
        if (err) return res.status(500).send('Edit fail!')
        res.render('edit.html', {
            student: data
        });
    })
});

router.post('/students/edit', (req, res) => {
    var id = req.body.id.replace(/"/g, '')
    Student.findByIdAndUpdate(id, req.body, err => {
        if(err) return res.status(500).send('Update fail!')
        console.log('Update success!')
        res.redirect('/students');
    })
});

router.get('/students/delete', (req, res) => {
    var id = req.query.id.replace(/"/g, '')
    Student.findByIdAndRemove(id, err => {
        if(err) return res.status(500).send('Delete fail!')
        console.log('Delete success!')
        res.redirect('/students');
    })
});

module.exports = router;