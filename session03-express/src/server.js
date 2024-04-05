const express = require('express');
var bodyParser = require('body-parser');
var router = require("../router/index.js");
const app = express()
//tạo ra 1 đối tượng app
// phân tích các yêu cầu có dạng parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())
// tạo ra một đối tượng app
const port = 8080;
//trong đối tượng cung cấp các phuong thức

//ví dụ lấy tất cả users
// app.get('/api/v1/users', (req, res) => {// /api/v1/user
//   res.send('lấy tất cả user');
// })
// thêm dữ liệu, lấy dữ liệu
console.log(router);
app.use('/api/v1/users', router);
//lấy 1 user thì làm ntn ?
app.use('/api/v1/users', router);

// update put update hết các trường dữ liệu
/*
    nếu đối tượng cần updtae có 5 truong mà mình 
    đi up 1 truong thì 4 trường còn lại bị mất
*/
app.put('api/v1/users/:idUser', (req, res) => {
    res.send('trả về 1 user');
  })

// update patch update trường mà mình cần update
/*
    nếu đối tượng cần updtae có 5 truong mà mình 
    đi up 1 truong thì 4 trường còn lại vẫn giữ nguyên.
*/
app.patch('api/v1/users/:idUser', (req, res) => {
    res.send('trả về 1 user');
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})