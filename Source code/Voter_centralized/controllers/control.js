var bparser=require('body-parser');
var sha=require("./sha.js");
var path=require("path");
var fs=require("fs-extra");
var busboy=require("connect-busboy");
var Voters=require("../models/voters");
var formidable=require("formidable");
module.exports=function(app){
	// var arr=[{item:'value1'},{item:'value2'},{item:'value3'}]
	app.use(busboy());

	app.use(bparser.urlencoded({extended:false})); 
	app.get('/signup',function(req,res){
		res.render("register",{message:""});
	});


	app.post('/signup',function(req,res){
		// console.log(req.body);
		var fname=req.body.fname;
		var lname=req.body.lname;
		var dob=req.body.dob;
		var gender=req.body.gender;
		var address=req.body.address;
		var adhar=req.body.adhar;
		if(!fname || !lname){

			res.render('register',{message:"Fill in all the details"});
			
		}else{

			Voters.findOne({adhar:adhar}).then(function(voter){
				if(!voter)
				{	var newVoter={fname:fname,lname:lname,dob:dob,gender:gender,address:address,adhar:adhar};

					var new_voter=new Voters(newVoter);
					new_voter.save(function(err){
						console.log(err);
					});

					var x=sha.SHA256(adhar);
					console.log(x);
					res.render("result",{message:x});
				
					
				}else{
					res.render("register",{message:"you have already registered"});
				}
			}).catch(function(error){
				console.log("error",error);
			});
		}
	
	});

	// app.get("/upload",function(req,res){

	// 	res.render("upform",{message:""});


	// });
	// app.post("/upload",function(req,res){
	// 	console.log(1);
	// 	var fstream;
	// 	req.pipe(req.busboy);
	// 	req.busboy.on("file",function(fieldname,file,filename){
	// 		console.log("Uploading: "+filename);
	// 		fstream=fs.createWriteStream(__dirname+"/img/"+filename);
	// 		file.pipe(fstream);
	// 		fstream.on('close',function(){
	// 			console.log("file uploaded"+filename);	
	// 			res.redirect("/");
	// 		});



	// 	});

	// });
		
	// app.post('/upload', function (req, res){
		
	// 	var form = new formidable.IncomingForm();
	// 	var dict={"hello":"q"};
	// 	form.parse(req);
	
	// 	form.on('fileBegin', function (name, file){
			
	// 		file.path ='./img/' + file.name;
	// 		console.log(file.name);
	// 		dict[name]=file.path;
	// 		console.log(name);
	// 		store(dict);
	// 		// dict={"name":file.name,"second":file.name};
	// 		// console.log(dict);
			
	// 	});
	// 	var store=function(dict){
	// 		if(Object.keys(dict).length===3){
	// 			console.log(dict);
	// 		}
	// 	}
	// 	form.on('file', function (name, file){
	// 		console.log('Uploaded ' + file.name);
			
	// 	});
		
	// 	res.redirect("/");	
	// 	// return res.json(200, {
	// 	// 						result: 'Upload Success'
	// 	// });
	// });
		
};
