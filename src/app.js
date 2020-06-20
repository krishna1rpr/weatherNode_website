const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const app =express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directories
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: "weather app",
        name: "Krishna Dubey"
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'about me',
        name: 'Krishna Dubey'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'help page',
        name: 'krishna dubey'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "you must provide a address"
        })
    }
    // res.send({
    //     location: 'rampur',
    //     forecast: 'rampur mei barish',
    //     address: req.query.address
    // })

    geocode(req.query.address, (error,data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forcast(data.latitude,data.longitude,(error,forcastData)=>{
            if(error){
                return res.send("error")
            }
            res.send({
                address: req.query.address,
                location: data.location,
                forcast: forcastData,
            })
        })    
    })
    // geocode(address, (error,data) =>{
    //     if (error){
    //         console.log("Error: ",error)
    //     }
    //     console.log(data.location)
    //         forcast(data.latitude,data.longitude,(error,forcastData)=>{
    //         if(error){
    //             console.log("error: ",error)
    //         }
    //         console.log("data: ",forcastData)
    //     })
    // })


})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
    })
    }
    res.send({
        products: req.query.search,
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'krishna dubey',
        errorMessage: "help page not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 page',
        name: 'krishna dubey',
        errorMessage: 'page doesnot exist'
    })
})

app.listen(port, () => {
    console.log('the server is running at port: ' + port + ".")
})
