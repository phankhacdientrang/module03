var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {// /api/v1/user
    res.send('lấy tất cả user(router)');
})

router.post('/', (req, res) => {
    console.log("req", req.body);
    // let userId = req.params.idUser
    // console.log("2222", userId);

    //có thể dùng destructoring để lấy giá trị
    const{idUser} = req.params;
    console.log(idUser);
    res.send("post router");
})
module.exports=router
// module.exports={router}
/*
    exports default router
*/