/**
 *  文件处理模块 不关心业务数据
 */

var fs = require('fs');
var dbPath = './db.json';

exports.find = (cb) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return cb(err);
        cb(null, data);
    })
}

exports.findById = (id, cb) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return cb(err);
        var students = JSON.parse(data).students
        var target = students.find(item => item.id === parseInt(id))
        cb(null, target);
    })
}

exports.save = (student, cb) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) return cb(err);
        var students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1
        students.push(student);
        var data = {
            "students": students
        }
        fs.writeFile('./db.json', JSON.stringify(data), err => {
            if(err) return cb(err);
            cb(null)
        });
    })       
}

exports.updateById = (student, cb) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) return cb(err);
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)
        var target = students.find(item => item.id === student.id)

        for(var key in student) {
            target[key] = student[key]
        }

        var data = {
            "students": students
        }
        fs.writeFile('./db.json', JSON.stringify(data), err => {
            if(err) return cb(err);
            cb(null)
        });
    })    
}

exports.deleteById = (id, cb) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) return cb(err);
        var students = JSON.parse(data).students
        var target = students.filter(item => item.id != parseInt(id))
        var data = {
            "students": target
        }
        fs.writeFile('./db.json', JSON.stringify(data), err => {
            if(err) return cb(err);
            cb(null)
        });
    })  
}