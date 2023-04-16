
const express=require('express');
const expresslayouts=require('express-ejs-layouts');
const path = require('path');
const ejs=require('ejs');
const port=8000;
const app=express();
app.set('view engine',ejs);
app.set('views',path.join(__dirname,'view'));
app.use(expresslayouts);
app.set('layout','./layouts/layout.ejs');
app.use(express.static('assests'));
app.use('/css',express.static(__dirname+'assests/css'));
app.use('/js',express.static(__dirname+'assests/js'));
app.use(express.urlencoded());
app.listen(port,function(err){
    if(err){console.log("err",err);return;}
    console.log("serevr is running on port " +port);
});
app.use(function(req,res,next){
    req.body.name="madan";
    req.body.roll='234';
    next();
})
const contactlist=[
    {name:"deepak",address:"kursakanta",roll:"2110"},
    {name:"deepak",address:"kursakanta",roll:"2110"},
     {name:"deepak",address:"kursakanta",roll:"2110"}
]
  app.get('/',function(req,res){
    res.render('home.ejs',{title:"my list", datalist:contactlist});
});
app.post('/create-contact',function(req,res){
    console.log(req.body.name);
    console.log(req.body);
    contactlist.push({
        name:req.body.name,
        roll:req.body.roll,
        address:"patna"
    })
    return res.redirect('back');
});
app.get('/deletecontact/:phone',function(req,res){
    console.log(req.params);
    let r=req.params.roll;
    let contactindex=contactlist.indexOf(r);
    contactlist.splice(contactindex,1);
    return res.redirect('back');
})
