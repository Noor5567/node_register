const express = require('express')
const app = express()
const port = 3000
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))
const path = require("path");
const mysql = require("mysql")
const { resourceLimits } = require('worker_threads')
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"demo"
})
/*
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); */
db.connect((error) => {
  if(error) {
      console.log(error)
  } else {
      console.log("MySQL connected!")
  }
})
app.get('/', (req, res) => {
  res.render('index')
  //res.send('<h1>hello</h1>')
})
app.get("/register", (req, res) => {
  res.render("register")
})
app.get('/login',(reg,res)=>
{
  res.render('login')
})
app.post('views/auth/register',(reg,res)=>
{
  const {name,password,password_confirm}=res.body
  db.query(`select name from node where name = ?`,[name],(error, res) => {
    if(error){
      console.log(error)
  }
  if(result.length >0)
  {
    return res.render('register',{
      message:"this name is already in use "
    })
    
  }elseif (password !=password_confirm)
    {
      return res.render('register',{
        message :"the password this not match"
      })
    }
  })
  db.query(`insert into node set=?`,[name,password],(error,res)=>
  {
    if(error){
      console.log(error)
  } else 
  {
    return res.render('register',{
      message:"user register"
    })
  }
  })
})
/*
app.get('/noor', (req, res) => {
    res.send("hi")
})
app.get('/html',(req,res)=>
{
    res.render('index')
})
app.get('/add-artical',(req,res) => {
    res.render('add-artical')
    
})
app.use((req,res) => {
    res.status(404).send('sorry page not found')
})
*/
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})