const mongoose = require("mongoose");
const shortId = require("shortid");

const schema = mongoose.Schema;

const urlSchema = new schema({
    original:{
        type:String,
    },
    shorted:{
        type:String,
        default:shortId.generate
    }
})

const UrlShortener = mongoose.model("urls", urlSchema);

module.exports = UrlShortener;