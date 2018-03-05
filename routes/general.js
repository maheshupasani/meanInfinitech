var mysql = require('mysql');

var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'mean'
})

var select = function(col,table,cond,callback){
	
	conn.query('SELECT '+ col + ' FROM '+ table+' WHERE '+cond,function(err,res){
		if (err) {
			callback(err,null)
		}else{
			callback(null,res)
		}
	})
}

var insert = function(table,record,callback){
	// console.log(record)
	var key ="";
	var val ="";
	for(ans in record){
		key += ans+","
		val += "'"+record[ans]+"',"
	}
	key = key.slice(0,-1);
	val = val.slice(0,-1);

	// console.log(key)
	// 	console.log(val)
	conn.query('INSERT INTO ' + table + '( ' + key + ' ) values ( '+val+' )' ,function(err,res){
		if (err) {
			callback(err,null)
		}else{
			callback(null,res)
		}
	})
}

module.exports = {
	select:select,insert:insert
}