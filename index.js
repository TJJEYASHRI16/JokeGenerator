import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
let jokeObj;

const API_URL = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
   res.render("index.ejs",{jokeObj:jokeObj} );
//    , {"jokeObj":jokeObj}

});



// get joke , calls api

app.get("/generateJoke", async (req, res) => {
    try{
    //call axios
    
    var chosen_type=req.query.choice;
    console.log(chosen_type)
    
    console.log(API_URL+chosen_type);
    const result = await axios.get(API_URL+chosen_type);
    //Step 4: Add code to views/index.ejs to use the recieved recipe object.
    if(result.data.type==="single"){
        jokeObj=result.data.joke;
        console.log(jokeObj);
    }else{
        jokeObj=result.data.setup+"\n"+result.data.delivery;
        console.log(jokeObj);
    }
    res.redirect("/");
  }catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// To start the app
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  
  