var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views')
var render = views('./view', {
    map: { html: 'ejs' }
});
var koa_static = require('koa-static-server');
var service = require('./service/hongtuedu.js');
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}));
app.use(controller.get('/', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index');
}));
app.use(controller.get('/undergraduate', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('undergraduate',{nav:'本科生'});
}));
app.use(controller.get('/litre', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('research',{nav:'专升本'});
}));

app.listen(3000);console.log('Koa server is started!');
