var fs = require('fs');
var express = require('express');

var router = express.Router();

router.get('/students', (req, res) => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if(err) return res.status(500).send("Server Error!");
        res.render('index.html', {
            students: JSON.parse(data).students
        });
    })
})
router.get('/students/new', (req, res) => {
    res.render('new.html')
});
router.post('/students/new', (req, res) => {
    console.log(req.body);
    fs.readFile('./db.json', (err, data) => {
        if(err) return res.status(500).send('Server Error!');
        var students = JSON.parse(data).students
        students.push(req.body);
        var data = {
            "students": students
        }
        fs.writeFile('./db.json', JSON.stringify(data), err => {
            if(err) return res.status(500).send('Write file fail!')
            console.log('Write file success!')
            res.redirect('/students');
        });

    })
});
router.get('/students/edit', (req, res) => {

});
router.post('/students/edit', (req, res) => {

});
router.get('/students/delete', (req, res) => {

});

module.exports = router;