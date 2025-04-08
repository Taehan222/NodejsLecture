const http = require("http");
const express = require("express");
const app = express();

app.set('port', 3000);
// 뷰엔진 set - app.render() 사용 가능.
app.set('view engine', "ejs"); //파일 확장자(suffix)
app.set('views', "views"); // 파일 경로(prefix)

app.use('/', express.static("public"));

// 샘플 목록
var carList = [
    {_id:"0001", name:"Sonata", price: 3000, year: 2020, company:"HYUNDAY"},
    {_id:"0002", name:"Gradeur", price: 3050, year: 2019, company:"HYUNDAY"},
    {_id:"0003", name:"Volvo", price: 4000, year: 2021, company:"볼보"},
    {_id:"0004", name:"Benz", price: 4500, year: 2022, company:"메르세데스"}
];
const manager = "홍길동";

app.get('/home', (req, res) => {
    res.writeHead(200, {'Content-Type': "text/html; charset=UTF-8"});
    req.app.render('home', {manager, carList}, (err, html)=>{
        if (err) throw err;
        res.end(html);
    });
});

app.get('/home/:id', (req, res) => {
    res.writeHead(200, {'Content-Type': "text/html; charset=UTF-8"});
    let _id = req.params.id;
    let cars = carList.filter((item) => {
        return item._id == _id;
    });
    req.app.render('detail', {manager, car:cars[0]}, (err, html)=>{
        if (err) throw err;
        res.end(html);
    });
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`run on server -> http://192.168.0.100:${app.get('port')}/`)
});