const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { url } = require("inspector");
const { request } = require("http");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, rec){
    rec.sendFile(__dirname+"/app.html");
})

app.post("/", function(req, rec){
    var firstname= req.body.firstname;
    var secondname= req.body.secondname;
    var email = req.body.email;
    var status = req.statusCode;
    var data = {
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:secondname
            }
        
        } ]
    }
   
    var jasondata= JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/131c581c15";
    const options={
        method:"post",
        auth:"amaan1:a86aa178802c5a734218736bfe304544-us21",
    }


   const request = https.request(url, options, function(responce){
    responce.on("data", function(data){
        console.log(JSON.parse(data));
        console.log(responce.statusCode);
           if(responce.statusCode === 200){
           rec.sendFile(__dirname+"/pass.html");
           }
           else{
               rec.sendFile(__dirname+"/fail.html");
           }
    });
    });
    request.write(jasondata);
    request.end();
});







app.listen(process.env.PORT || 300, function(){
    console.log("port is running");
})