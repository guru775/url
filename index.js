const express = require("express");
const mongoose = require("mongoose");
const UrlShortener = require("./schemas/url");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.set("strictQuery", false)

mongoose.connect(process.env.Database_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("db has connected"))


app.get("/", async(req, res) => {
    try{
        res.status(200).send("hello world!")
    }catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
});

app.get("/allDatas", async(req, res) => {
    try{
    const urlData = await UrlShortener.find();
    res.status(200).json(urlData)
    }catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
})

app.get("/:shortUrl", async(req, res) => {
    try{
      const shortUrl = await UrlShortener.findOne({shorted: req.params.shortUrl})
    //   res.status(200).json({
    //     status:"success",
    //     shortUrl
    //   });
      res.redirect(shortUrl.original)
      console.log(req)
    }catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
});



app.post("/shorting", async(req, res) => {
    try{
        const originalUrl = req.body.original;
        const url = await UrlShortener.create({original:originalUrl});
        res.status(200).json({
            status:"success",
            url
        })

    }catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
});

const port = process.env.PORT || 8081;

app.listen(port, () => console.log("port is connected to " + port));