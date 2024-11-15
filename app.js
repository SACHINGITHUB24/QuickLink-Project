const express = require('express');
const app = express();
const path = require('path');
const signupdata = require('./views/signup');
const bcrypt  =require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const Link = require('./views/savedlink');
  


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookie());

app.get('/',function(req,res){
    res.render("signup");
})

app.post('/', async function(req,res){
    let {name, email,password} = req.body;



    bcrypt.genSalt(15,(err,salt) => {
        bcrypt.hash(password,salt, async (err,hash) => {
            let signup = signupdata.create({
                name,
                email,
                password: hash,

            });

            let generatedtoken = jwt.sign({ email }, "secret");

            res.cookie("Token",generatedtoken);


            const data = await Link.find();

            res.render('QuickLink' , { data });

            // res.render('QuickLink', { data });


        })
    })
   
})

app.get('/login',function(req,res){
    res.render('login')
})

app.post('/login', async function(req,res){
    let signuser = await signupdata.findOne({email: req.body.email});
    if(!signuser){
        res.status(404).send("User not Found ");
    }
    bcrypt.compare(req.body.password, signupdata.password, async function(err,result){
        if(result){
            let token = jwt.sign({email: signupdata.email},"pass");
            res.cookie("Token",token);


            const data = await Link.find();

            res.render('QuickLink' , { data });
        }else{
            res.status(500).send("An Error Occured During Login");
        }
    })
})

app.get('/logout',function(req,res){
    res.cookie('Token',"");
    res.redirect('/login')
})


app.get('/formdata',function(req,res){
    res.render('QuickLink');
})

// app.post('/formdata', async function(req,res){
    


//     let {title, url} = req.body;


// async function saveLinkData(title, url) {
//     const newLink = new Link({ title, url });
//     try {
//         const savedLink = await newLink.save();
        
//         res.render('QuickLink',{ savedLink });

//         let data = await Link.find();

// res.render('QuickLink', {data })
//     } catch (error) {
//         console.error("Error saving link:", error);
//     }
// }



app.post('/formdata', async function(req, res) {
    let { title, url } = req.body;


    

    try {
        const newLink = new Link({ title, url });
        await newLink.save();

        const data = await Link.find();
        res.render('QuickLink', { data });
    } catch (error) {
        console.error("Error saving link:", error);
        res.status(500).send("Error saving link.");
    }
});


// const savedata = savedLink(title,url);


    // });
// })
// });

app.get('/formdata', async function(req,res){
    let links = await Link.find();

    res.render('QuickLink',{ data: links })
})




app.get('/deletelink/:id', async function(req, res) {
    const id = req.params.id; 
    await Link.findByIdAndDelete(id);
    const data = await Link.find(); 
    res.render('QuickLink', { data });
});







app.listen(3000,function(){
    console.log("Server has started on port 3000");
    
})
