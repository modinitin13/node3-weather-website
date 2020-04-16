const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

const path=require('path');
const express=require('express');
const hbs=require('hbs');

const app=express();

//Define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath));
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Nitin Modi'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Nitin Modi'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Nitin Modi'
    })
})
app.get('/weather',(req,res)=>{
    const location=req.query.address;
    if(!location){
        return res.send({
            error:'The address filed was empty'
        })
    }
    
    geocode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location,
                forecastData
            })
          })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('nohelpdata',{
        title:'Help not found',
        name:'Nitin Modi'
    });
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Not found',
        name:'Nitin Modi'
    });
})
//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log('server is up on port 3000');
})