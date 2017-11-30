

window.onload=function(){
var ehtid=document.getElementById("ehtid").value;
var gzhtid=document.getElementById("gzhtid").value;
if(gzhtid==""){
loads("policy","policy1.asp?ehtid="+ehtid);	
}
}