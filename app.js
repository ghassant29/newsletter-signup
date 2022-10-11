const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName=req.body.firstn;
  const lastName=req.body.lastn;
  const email=req.body.email;
  console.log(firstName,lastName,email);
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  const options={
    method:"POST",
    auth:"ghassant67:e8a33ec65f4935444dd92d09c79a19ed-us9"
  }
  const jsonData=JSON.stringify(data);
  const url="https://us9.api.mailchimp.com/3.0/lists/ca05d0caf9";
  const request=https.request(url,options,function(response){
    response.on("data",function(data){console.log(JSON.parse(data));
      if(response.statusCode===200){res.sendFile(__dirname+"/sucess.html");}
      else{res.sendFile(__dirname+"/failure.html");}
      })

  })
  request.write(jsonData);
  request.end();


});
// APIKey
// e8a33ec65f4935444dd92d09c79a19ed-us9
// Audience id
// ca05d0caf9


app.post("/failure",function(req,res){
  res.redirect("/")
});




app.listen(process.env.PORT||3000,function(){console.log("your server is working on 3000");})
