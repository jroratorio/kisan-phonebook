var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var phoneBookSchema = new mongoose.Schema({
	name: String,		
	email: String,
	number: String,
        messages: Array           
});

mongoose.model('PhoneBook', phoneBookSchema,'phonebook');