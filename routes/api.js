var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var PhoneBook = mongoose.model('PhoneBook');
var config = require('../config');
var twilio = require('twilio');
var axios = require('axios');

// Get all contacts
router.get('/posts', function (req, res){
    PhoneBook.find(function (err, doc){
        if(err){
            return res.send(500, err);
	}
        res.json(doc);
    });
});

//add a contact
router.post('/posts', function (req, res){
    var phoneBook = new PhoneBook();
    phoneBook.name = req.body.name;
    phoneBook.email = req.body.email;
    phoneBook.number = req.body.number;
    phoneBook.save(function (err, doc) {
        if(err){
            return res.send(500, err);
        }
        res.json(doc);
    });
});

//get particular contact by id
router.get('/posts/:id', function (req, res){
    PhoneBook.findById(req.params.id, function(err, doc){
        if(err){
            return res.send(500, err);
        }
        res.json(doc);
    });
});

//update a contact by id
router.put('/posts/:id', function (req, res) {
    PhoneBook.findById(req.params.id, function(err, doc){
	if(err){
            res.send(err);
        }

	doc.name = req.body.name;
	doc.email = req.body.email;
	doc.number = req.body.number;

	doc.save(function(err, doc){
            if(err){
		res.send(err);
            }
            res.json(doc);
        });
    });
});

//delete a contact by id
router.delete('/posts/:id', function (req, res) {
    PhoneBook.remove({_id : req.params.id}, function (err, doc) {
        res.json(doc);
    });
});

//send message
router.post('/sendmessage', function(req, res){
        
    var client = new twilio(config.twilio.sid, config.twilio.authToken);
    
    client.messages.create({
        body: req.body.body,
        to: '+91' + req.body.dest,  // Text this number
        from: config.twilio.number // From a valid Twilio number
    })
    .then(function(message){
        res.status(200).send(message.body);

        axios.post(config.siteURI + '/phonebook/addmessage', { id: req.body.id, dest: req.body.dest, body: message.body })
        .then(function(response){
            // do something            
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send(error);
        });        
    })
    .catch(function(error){
        console.log(error);
    });        
});

// add message to the db
router.post('/addmessage', function(req, res){
        
    PhoneBook.findById(req.body.id, function(err, doc){
	if(err){
            res.send(err);
        }
        
        //req.body.body contains the msg text
        doc.messages.unshift({ body: req.body.body, date: Date() });
        
        doc.save(function(err, doc){
            if(err){
		res.send(err);
            }
            res.json(doc);
        });
    });    
});

module.exports = router;
