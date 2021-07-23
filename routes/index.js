var express = require('express');
var router = express.Router();
var db= require('../model/connect');
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/* GET home page. */
router.get('/', function(req, res, next) {
  let sql = `SELECT * FROM todolist`;
    db.query(sql, function(err, data) { // biến data chứa kết quả truy vấn
        if (err) throw err;
    console.log(data);  
  res.render('todolist',{listbooks:data});
  });
});

router.use('/delete/:id',(req,res)=>{
  var id = req.params.id;
  console.log(id);
  db.query('delete from todolist where note=?', id , function(err, data) {       
    if (err) throw err;        
   res.redirect('/');
}); 
});


router.use('/update/:id/:check',(req,res)=>{
  var id = req.params.id;
  var check=req.params.check;
  (check==0)?check=1:check=0;
  console.log(check);
  db.query('update todolist set checktodo=? where note=?',[check, id] , function(err, data) {       
    if (err) throw err;        
   res.redirect('/');
}); 
});

// create new todo
router.post('/create',(req, res)=>{
  //const d = Date.now;
  let todo=req.body.todo;
  if(todo.length>0){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
      // let date=d.getFullYear+"-"+d.getMonth+"-"+d.getDay;
      // console.log(date);
      let b={todo:todo, checktodo: 0, time: today};
      db.query('insert into todolist SET ?', b , function(err, data) {       
         if (err) throw err;        
        res.redirect('/');
     }); 
  }else{
      res.redirect('/');
      
  }
 

});

module.exports = router;
