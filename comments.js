// create web server
// 1. load module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template = require('./lib/template.js');

// 2. create server
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    // console.log(url.parse(_url,true));
    // console.log(pathname);
    // console.log(queryData);
    // console.log(queryData.id);
    // console.log(_url);

    if(pathname === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data',function(error,filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(filelist);
                var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            });
        }else{
            fs.readdir('./data',function(error,filelist){
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`,'utf8',function(err,description){
                    var title = queryData.id;
                    var list = template.list(filelist);
                    var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>
                    <a href="/update?id=${title}">update</a>
                    <form action="delete_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <input type="submit" value="delete">
                    </form>`);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }else if(pathname === '/create'){
        fs.readdir('./data',function(error,filelist){
            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.HTML(title,list,`
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p><textarea name="description" placeholder="description"></textarea></p>
