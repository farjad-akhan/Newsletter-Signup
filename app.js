const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https =require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname+"/Signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  const jasonData=JSON.stringify(data);

  const url="https://us5.api.mailchimp.com/3.0/lists/fe8adb953c";

  const options={
    method: "POST",
    auth:"farjad:8457b4ddbb516c2290540932ea90b623-us5"
  }

  const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
       res.sendFile(__dirname+"/success.html")
    }else {
        res.sendFile(__dirname+"/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(jasonData);
  request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is  running on port 3000");
});
// API
// 8457b4ddbb516c2290540932ea90b623-us5
//List id
// fe8adb953c
