// 새 프로젝트 초기화 : npm init -y
// express 모듈 설치: npm install --save express 또는 npm i -S express
const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;

// 라우팅 설정 - 요청  Method가 무엇이냐에 따라 실행 함수를 다르게 할 수 있다.
// REST full api 방식으로 구현 할때 필수 
// app.get(), app.post(), app.delete(), app.put(), app.fetch() ...
// 미들웨어 설정 함수
// app.use()

// '/'요청에 대한 처리
app.get('/', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
    res.end('<h2>나의 홈페이지에 오신것을 환영합니다!</h2>');
});


// req.query : 쿼리스트리으로 파아미터 전달 받을 때
// http://localhost:3000/home?user=이순신&home=조선
app.get('/home', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
    console.log(req.params)
    const user = req.query.user;
    const home = req.query.home;
    const htmlStr = `<h1>안녕, ${user}</h1>
        <h3>${home}에 오신것을 환영합니다.</h3>`
    ;
    res.end(htmlStr);
});

// req.params : path-parameter일때 사용
// http://localhost:3000/profile/강감찬/고려
app.get('/profile/:user/:home', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
    console.log(req.params)
    const user = req.params.user;
    const home = req.params.home;
    const htmlStr = `<h1>안녕, ${user}</h1>
        <h3>${home}에 오신것을 환영합니다.</h3>`
    ;
    res.end(htmlStr);
});

// app.post() 요청일때는 body에 전달
// body-parser 미들웨어 설치 후 사용 가능.
// express에 포함된것을 사용 하거나 별도로 설치한다.
// npm install body-parser --save
const bodyParser = require('body-parser');
// req.body.파라미터
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
// post 방식으로 요청 할때는 HTML From 또는 Postman으로 테스트 한다.
// 아니면 요청시 메서드를 직접 지정 할 수 있는 방법을 사용 해서 요청.
app.post('/gallery', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
    const user = req.body.user;
    const home = req.body.home;
    const htmlStr = `<h1>안녕, ${user}</h1>
        <h3>${home}에 오신것을 환영합니다.</h3>`
    ;
    res.end(htmlStr);
});


// nodemon을 사용하면 개발할때 재실하는 불편함이 사라진다.
// npm install nodemon --save
// nodemon 실행을 스크립트로 등록 후 사용 가능.
// npm run dev 명령으로 실행.
// nodemon으로 실행하면 개발시 수정 후 재시행 불필요.
// 소스코드 수정 후 저장하면 바로 재실행 됨.