const express = require('express');
const router = express.Router();
const request = require('request');
const cors = require('cors');
var CryptoJS = require("crypto-js");
var parser = require('xml2json');;


const axios = require('axios');
const UPCAPI = `https://api.upcitemdb.com/prod/trial/lookup?upc=`;

router.options('/upc/:id', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

router.options('/amazon/:id', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

function getDate() {
    var currentdate = new Date();
    var year = currentdate.getUTCFullYear();
    var monthNumber = currentdate.getUTCMonth() + 1;
    var month;
    if (monthNumber < 10) {
        month = "0" + monthNumber.toString();
    }
    else {
    month = monthNumber.toString();
    }
    var dayNumber = currentdate.getUTCDate();
    var day;
    if (dayNumber < 10) {
        day = "0" + dayNumber.toString();
    }
    else {
    day = dayNumber.toString();
    }
    var hourNumber = currentdate.getUTCHours();
    var hour;
    if (hourNumber < 10) {
        hour = "0" + hourNumber.toString();
    }
    else {
        hour = hourNumber.toString();
    }
    var minuteNumber = currentdate.getUTCMinutes();
    var minute;
    if (minuteNumber < 10) {
        minute = "0" + minuteNumber.toString();
    }
    else {
        minute = minuteNumber.toString();
    }
    var secondNumber = currentdate.getUTCSeconds();
    var second;
    if (secondNumber < 10) {
        second = "0" + secondNumber.toString();
    }
    else {
        second = secondNumber.toString();
    }
    var date = year + "-" + month + "-" + day + "T" + hour + "%3A" + minute + "%3A" + second + "Z";
    return date;    
}


router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/upc/:id', (req, res) => {

    
    axios.get(`${UPCAPI}` + req.params.id)
    .then(posts => {
        res.status(200).json(posts.data);
    })
    .catch(error => {
    res.status(500).send(error)
    });

});

router.get('/amazonUPC/:id', (req, res) => {
    var signature = CryptoJS.HmacSHA256("GET\nwebservices.amazon.com\n/onca/xml\nAWSAccessKeyId=AKIAJJULMZAIRV5GEOLA&AssociateTag=dh4ang-20&Condition=All&IdType=UPC&ItemId=" + req.params.id + "&Operation=ItemLookup&ResponseGroup=OfferFull&SearchIndex=Electronics&Service=AWSECommerceService&Timestamp=" + getDate(), "PFThIve6mJbL0c3GX9qKV+oWfHBXqGpKB6k9apQP");

    var hashInBase64 = CryptoJS.enc.Base64.stringify(signature);
    hashInBase64 = hashInBase64.replace("=", "%3D");
    hashInBase64 = hashInBase64.replace("+", "%2B");

    var url = "https://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAJJULMZAIRV5GEOLA&AssociateTag=dh4ang-20&Condition=All&IdType=UPC&ItemId=" + req.params.id + "&Operation=ItemLookup&ResponseGroup=OfferFull&SearchIndex=Electronics&Service=AWSECommerceService&Timestamp="+ getDate() + "&Signature=" + hashInBase64;   

    var options = {
        object: true,
        reversible: false,
        coerce: false,
        sanitize: true,
        trim: true,
        arrayNotation: true
    };

    axios.get(`${url}`)
    .then(posts => {
        res.status(200).json(parser.toJson(posts.data, options));
    })
    .catch(error => {
    res.status(500).send(error)
    });

})

router.get('/amazon/:id', (req, res) => {
    
    var signature = CryptoJS.HmacSHA256("GET\nwebservices.amazon.com\n/onca/xml\nAWSAccessKeyId=AKIAJJULMZAIRV5GEOLA&AssociateTag=dh4ang-20&Condition=All&ItemId=" + req.params.id + "&Operation=ItemLookup&ResponseGroup=OfferFull&Service=AWSECommerceService&Timestamp=" + getDate(), "PFThIve6mJbL0c3GX9qKV+oWfHBXqGpKB6k9apQP");

    var hashInBase64 = CryptoJS.enc.Base64.stringify(signature);
    hashInBase64 = hashInBase64.replace("=", "%3D");
    hashInBase64 = hashInBase64.replace("+", "%2B");

    var url = "https://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAJJULMZAIRV5GEOLA&AssociateTag=dh4ang-20&Condition=All&ItemId=" + req.params.id + "&Operation=ItemLookup&ResponseGroup=OfferFull&Service=AWSECommerceService&Timestamp="+ getDate() + "&Signature=" + hashInBase64;

    
    var options = {
        object: true,
        reversible: false,
        coerce: false,
        sanitize: true,
        trim: true,
        arrayNotation: true
    };

    axios.get(`${url}`)
    .then(posts => {
        res.status(200).json(parser.toJson(posts.data, options));
    })
    .catch(error => {
    res.status(500).send(error)
    });

});




module.exports = router;