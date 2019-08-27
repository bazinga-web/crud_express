var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');

var app = express();
app.use('/public/', express.static('./public/'));

// 配置模版引擎以及body-parder一定要在挂载路由之前进行
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);


app.listen(3000, () => {
    console.log('Server is starting on port 3000!');
})