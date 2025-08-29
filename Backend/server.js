let express=require('express')
let App=express()
let jwt=require('jsonwebtoken')
let cookie=require('cookie-parser')
App.use(cookie( ))
App.get('/',(req,res)=>{
    let token =jwt.sign({email:"afridkhan@gmail.com",},"secrete")
    res.cookie('token',token)
    res.send("done")
})

App.get('/read', (req, res) => {
    let data = jwt.verify(req.cookies.token, "secrete");
    console.log(data);
    res.send("done"); 
});

App.listen(1000,()=>console.log('server started in Port no 1000',))