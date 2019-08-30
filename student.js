const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crud', {useNewUrlParser: true});

// 创建文档结构
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    info: String,
});

// 构建model
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student