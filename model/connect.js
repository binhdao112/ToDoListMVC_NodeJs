var mysql = require('mysql'); // nhúng module mysql vào trang
const db = mysql.createConnection ({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'testnodejs'  //tên database muốn kết nối
});
module.exports=db;