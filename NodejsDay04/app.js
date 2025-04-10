const http = require("http");
const express = require("express");
const app = express();

app.set('port', 3000);
// 뷰엔진 set - app.render() 사용 가능.
app.set('view engine', "ejs"); //파일 확장자(suffix)
app.set('views', "views"); // 파일 경로(prefix)

app.use('/', express.static("public"));

// body-parser 미들웨어 - POST, PUT, FETCH 요청의 파라미터 사용 필수.
app.use(express.json()) // 비동기 요청 시 JOSN 사용
app.use(express.urlencoded()) // HTML 폼 데이터

// 샘플 목록
var carList = [
    {_id:"0001", name:"Sonata", price: 3000, year: 2020, company:"HYUNDAY"},
    {_id:"0002", name:"Gradeur", price: 3050, year: 2019, company:"HYUNDAY"},
    {_id:"0003", name:"Volvo", price: 4000, year: 2021, company:"볼보"},
    {_id:"0004", name:"Benz", price: 4500, year: 2022, company:"메르세데스"}
];
let sequence = "0005";
const manager = "홍길동";

app.get('/home', (req, res) => {
    // res.writeHead(200, {'Content-Type': "text/html; charset=UTF-8"});
    req.app.render('home', {manager, carList}, (err, html)=>{
        if (err) throw err;
        res.end(html);
    });
});

app.get('/home/:id', (req, res) => {
    // res.writeHead(200, {'Content-Type': "text/html; charset=UTF-8"});
    let _id = req.params.id;
    let cars = carList.filter((item) => {
        return item._id == _id;
    });
    req.app.render('detail', {manager, car:cars[0]}, (err, html)=>{
        if (err) throw err;
        res.end(html);
    });
});

// 수정 페이지로 Forward 
app.get('/modify/:id', (req, res) => {
    // res.writeHead(200, {'Content-Type': "text/html; charset=UTF-8"});
    let _id = req.params.id;
    let cars = carList.filter((item) => {
        return item._id == _id;
    });
    req.app.render('modify', {manager, car:cars[0]}, (err, html)=>{
        if (err) throw err;
        res.end(html);
    });
});

app.post('/modify', (req, res) => {
    // res.writeHead(200, {'Content-Type': "text/html; charset=UTF-8"});
    console.dir(req.body);
    const editData = {
        _id: req.body._id, 
        name: req.body.name, 
        price:  Number(req.body.price), 
        year:  Number(req.body.year), 
        company: req.body.company
    };

    // req.body._id와 동일한 위치 찾기
    let idx = carList.findIndex((item) => {
        return item._id == req.body._id
    });
    if(idx != -1) {
        carList[idx] = editData;
        console.log(">>>> 데이터 변경 완료!");
        // 처리 완료 후 list 페이지로 리다이렉션
        console.log(">>> 목록으로 이동")
        res.redirect("/home");
        // res.end(), res.send(), res.redirect()
        // 메서드 함수 내부에 한번만 호출되어야 한다.
        return;
    }
    // 정상 처리 되면 이곳까지 도달하지 않는다. 
    res.end('<a href="/home">go to the list</a>');
});

// 삭제 함수 구현
app.get('/delete/:id', (req, res) => {
    // _id와 같은 값이 있는 요소의 index 찾기
    // 찾은 요소를 삭제(splice 사용)
    // JS배열에는 remove(), delete() 함수 (X)
    // 목록으로 새로 고침.
    const _id = req.params.id;
    console.log("_id:", _id);
    const idx = carList.findIndex((item) => {
        return item._id == _id;
    });
    if(idx != -1) {
        carList.splice(idx, 1)
        console.log(">>> 삭제 완료")
    }
    // 목록으로 Redirect하기
    res.redirect("/home");
});

// 저장 기능 구현
// JS 배열에 아이템 추가 함수를 사용
app.post('/input', (req, res) => {
    const newCar = req.body;
    newCar._id = sequence;
    console.dir(newCar);
    carList.push(newCar);
    sequence = "000" + (Number(sequence) + 1);
    // 저장 완료 후 목록으로 갱신
    res.redirect("/home");
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`run on server -> http://192.168.0.100:${app.get('port')}/`)
});

