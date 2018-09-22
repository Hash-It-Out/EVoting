var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Evoting');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});




var voter_schema=new mongoose.Schema({
    fname:String,
    lname:String,
    gender:String,
    dob:Date,
    address:String,
    adhar:String
    

    
});
var Voters=mongoose.model('Voters',voter_schema);

module.exports=Voters;
