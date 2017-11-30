function openmypage(url,tl){ //Define arbitrary function to run desired DHTML Window widget codes
ajaxwin=dhtmlwindow.open("ajaxbox", "ajax", url, tl, "width=688px,height=550px,left=300px,top=100px,resize=1,scrolling=1")

ajaxwin.moveTo('middle', 'middle'); return false; //Run custom code when window is about to be closed
}
function chuqihua(){
var ss=document.getElementById("rmid").value;
 var o = document.getElementById("roomtype").options;
		    for(var i = 0; i < o.length; i++) {
            if (o[i].value == ss)
			{
			 o[i].selected=true;
        }
		}
		
	}
	function build(num){
//ifzb=document.getElementById("ifzb").value;
if(num>1){
num=num-1;
var htm="";
for(i=0;i<num;i++){
c=i+2;
htm+='<p>Room #'+c+' <select name="rm'+i+'" id="rm'+i+'" style="width:270px;"> </select>     Number of guests <select id="guestnum'+i+'" name="guestnum'+i+'"> <option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select> Exra bed <select name="bed'+i+'"><option value="0" selected="selected">0</option><option value="1">1</option></select></p>';


}
document.getElementById("mygod").innerHTML=htm;
var n=document.getElementById("roomtype").options; 
for(var i=0; i <n.length; i++){ 
for(k=0;k<num;k++){
var oOption = document.createElement("OPTION");
oOption.text= n[i].text; 
oOption.value=n[i].value;
var t="rm"+k;
var oSelect = document.getElementById(t); 
oSelect.options.add(oOption);
}

}
}else
{
document.getElementById("mygod").innerHTML="";
}

selectindex=document.getElementById("roomtype").selectedIndex;
for(j=0;j<num;j++){
var g="rm"+j;
if(document.getElementById(g)!=null){
document.getElementById(g).selectedIndex=selectindex;
}
}
}

function checkfm(){
rn=document.getElementById("rmnum").value;
if(rn>1){
if(document.getElementById("rm0")==null)
{
build(rn);
return false;
}
}
var bbtime=document.getElementById("btime").value;
var eetime=document.getElementById("etime").value;
var now= new Date(); 

if(bbtime==""){
alert("The check in date is required!");
document.getElementById("btime").focus();
return false;
}
if(eetime==""){
alert("The check out date is required!");
document.getElementById("etime").focus();
return false;
}

if(bbtime!=""&&eetime!=""){
 var arys= new Array();     
     arys=bbtime.split('-');   
       var startdate=new Date(arys[0],parseInt(arys[1]-1),arys[2]); 
	   if(startdate<=now){
	   alert("The check in date should be later than today!");
	   document.getElementById("btime").value="";
	   document.getElementById("btime").focus();
       /*document.getElementById("etime").value="";*/
	   return false;
	   }   
         arys=eetime.split('-');   
var checkEndDate=new Date(arys[0],parseInt(arys[1]-1),arys[2]);    
if(startdate > checkEndDate) {   
     alert("The check out date should be later than check in date!"); 
	/* document.getElementById("btime").value="";*/
     document.getElementById("etime").value="";  
	 document.getElementById("etime").focus();
      return false;
         }
if( parseInt((checkEndDate-startdate)/(1000 * 60 * 60 * 24))<1 ) {   
     alert("You should stay at the hotel at least one days."); 
	/* document.getElementById("btime").value="";*/
     document.getElementById("etime").value="";  
	 document.getElementById("etime").focus();
      return false;
         }   
if( parseInt((checkEndDate-startdate)/(1000 * 60 * 60 * 24))>31 ) {   
     alert("You can't stay at the hotel more than 31 days."); 
	 /*document.getElementById("btime").value="";*/
     document.getElementById("etime").value="";  
	 document.getElementById("etime").focus();
      return false;
         }
		 if( parseInt((startdate-now)/(1000 * 60 * 60 * 24))>360 ) {   
     alert("The system havn't provides reservation to 360 days later than today."); 
	 document.getElementById("btime").value="";
     document.getElementById("etime").value="";  
	 document.getElementById("btime").focus();
      return false;
         }
}
}

window.onload=function(){
var ehtid=document.getElementById("ehtid").value;
var gzhtid=document.getElementById("gzhtid").value;
var ifJYHXS=document.getElementById("ifJYHXS").value;
if(ifJYHXS=="1"){
	loads("ctfair","ctfair1.asp?gzhtid="+gzhtid);	
}
if(gzhtid==""){
loads("rooms","getrooms1.asp?ehtid="+ehtid);
loads("policy","policy1.asp?ehtid="+ehtid);	
	}else{
loads("rooms","getrooms1.asp?gzhtid="+gzhtid);	
}

}
