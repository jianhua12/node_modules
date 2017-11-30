var
// ȡԪ
$ = function(element) {
	return (typeof(element) == 'object' ? element : document.getElementById(element));
},

// ԪصrefNode
appendElement = function(tagName, Attribute, strHtml, refNode) {
	var cEle = document.createElement(tagName);
	// ֵ
	for (var i in Attribute){
		cEle.setAttribute(i, Attribute[i]);
	}
	cEle.innerHTML = strHtml;
	
	refNode.appendChild(cEle);
	return cEle;
},


getCoords = function(node){
	var x = node.offsetLeft;
	var y = node.offsetTop;
	var parent = node.offsetParent;
	while (parent != null){
		x += parent.offsetLeft;
		y += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {x: x, y: y};
},

// ¼(ɱԭ¼)
eventListeners = [],
findEventListener = function(node, event, handler){
	var i;
	for (i in eventListeners){
		if (eventListeners[i].node == node && eventListeners[i].event == event && eventListeners[i].handler == handler){
			return i;
		}
	}
	return null;
},
myAddEventListener = function(node, event, handler){
	if (findEventListener(node, event, handler) != null){
		return;
	}
	if (!node.addEventListener){
		node.attachEvent('on' + event, handler);
	}else{
		node.addEventListener(event, handler, false);
	}
	eventListeners.push({node: node, event: event, handler: handler});
},
removeEventListenerIndex = function(index){
	var eventListener = eventListeners[index];
	delete eventListeners[index];
	if (!eventListener.node.removeEventListener){
		eventListener.node.detachEvent('on' + eventListener.event,
		eventListener.handler);
	}else{
		eventListener.node.removeEventListener(eventListener.event,
		eventListener.handler, false);
	}
},
myRemoveEventListener = function(node, event, handler){
	var index = findEventListener(node, event, handler);
	if (index == null) return;
	removeEventListenerIndex(index);
},
cleanupEventListeners = function(){
	var i;
	for (i = eventListeners.length; i > 0; i--){
		if (eventListeners[i] != undefined){
			removeEventListenerIndex(i);
		}
	}
};


function popHint(obj, msg, initValues) {
	var
	_obj = $(obj),
	
	_objHint = $("popHint"),
	_msg = msg,
	_init = initValues;
	_obj .style.backgroundColor="#FCF3CF";
	// ʼʧ...
	if(_obj==undefined || _msg==undefined || _msg=="") return;
	
	// óʼֵ
	_init = _init==undefined ? {_type : "wrong", _event : "click"} : _init;
	// objɼõΪobjԪ
	if(_obj.style.display=='none' || _obj.style.visibility=='hidden' || _obj.getAttribute('type')=='hidden') _obj = _obj.parentNode;
	
	var
	_type = null,
	_event = null,
	_place = getCoords(_obj),
	_marTop = null,
	_objText = $("popHintText"),
	
	// ʼ
	init = function() {
		var _hint = _obj.getAttribute("hint");
		if(_hint=="false") return;
		
		// еʱinitValuesΪ.ֻһֵ...ⷢ.ٴóʼֵ...
		_type = _init._type==undefined ? "normal" : _init._type;
		_type = _type.toLowerCase();
		_event = _init._event==undefined ? "click" : _init._event;
		_event = _event.toLowerCase();
		
		/*
		******************************************
		popHtml
		******************************************
		<div id="popHint">
			<div id="popHeader">
				<div class="popLeft"></div>
				<div id="popHintText"><span class=\"popIcon wrong></span>û</div>
				<div class="popRight"></div>
			</div>
			<div class="popAngle"><span></span></div>
		</div>
		*/
		
		// ....
		var _Html = "<div id=\"popHeader\">" +
					"	<div class=\"popLeft\"></div>" +
					"	<div id=\"popHintText\"></div>" +
					"	<div class=\"popRight\"></div>" +
					"</div>"+
					"<div class=\"popAngle\"><span></span></div>"
		
		if(_objHint==null) {
			_objHint = appendElement("div", {"id" : "popHint"}, _Html, document.body);
			_objHint.style.display = "none";
			_objText = $("popHintText");
		}
		
		show();
	},

	// ʾ
	show = function() {
		_objHint.style.display = "";
		_marTop = _objHint.offsetHeight;
		
		_msg = "<span class=\"popIcon "+ _type +"\"></span>"+ _msg;
		_objText.innerHTML = _msg;
		
		_objHint.style.left = _place.x +"px";
		_objHint.style.top = (_place.y-_marTop+8) +"px";
		
		// رմ¼
		switch(_event) {
			case "blur" :
				myAddEventListener(_obj, 'blur', hide);
				break;
			//default :
			case "click" :
				myAddEventListener(document, 'mousedown', hide);
				break;
			//Լչܶ¼...
		}
	},
	// ر
	hide = function() {
		_objHint.style.display = "none";
		_objText.innerHTML = "";
		// Ƴرմ¼
		myRemoveEventListener(_obj, 'blur', hide);
		myRemoveEventListener(document, 'mousedown', hide);
		_obj .style.backgroundColor="white";
	};
	
	init();
}

function updateNames()
{
    var checks=document.getElementsByName('useTheName[]');
	var firstNames=document.getElementsByName('roomFirstName[]');
	var lastNames=document.getElementsByName('roomLastName[]');
	for(var i=1; i<checks.length;i++)
	{   
	    if (checks[i].checked)
		{ 
		   firstNames[i].value=firstNames[0].value;
		   firstNames[i].readOnly=true;
		   
		}
		else if (!checks[i].checked)
		{
			//firstNames[i].value=lastNames[i].value='';
			firstNames[i].readOnly=false;
		}
	}
	var useRoomName=document.getElementById('useContactPerson');
	var ContactPersonFirstName=document.getElementById('first_name');
	
    if(useRoomName.checked)
    {
		ContactPersonFirstName.value=firstNames[0].value;
		ContactPersonFirstName.readOnly=true;
	
    }
    else
    {
		ContactPersonFirstName.readOnly=false;
    }
}

function checkfm(){
var checks=document.getElementsByName('useTheName[]');
	var firstNames=document.getElementsByName('roomFirstName[]');
	
	checks[0].checked=false;
	for(var i=0; i<checks.length;i++)
	{   
	    if (!checks[i].checked)
		{ 
		   if(firstNames[i].value=='')
		   {   
		   	var k=i+1;
		   	   //alert("Room #"+k+" che.");
			   firstNames[i].focus();
			   return false;
		   }
		}
	}
	/*return true;*/
	var ContactPersonFirstName=document.getElementById('first_name');
	
	if(ContactPersonFirstName.value==""){
	/*alert("ϵΪ!");*/
	ContactPersonFirstName.focus();
	return false;
	}
	
	if(document.getElementById('femail').value==""){
	/*alert("ϵ˵绰Ϊ!");*/
	document.getElementById('femail').focus();
	return false;
	}
	var re=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;    
       if (!re.test(Trim(document.getElementById('femail').value))){   
	      alert("The formation of your email is incorrect.");
	      document.getElementById('femail').focus();   
          return false;
		  }  
	if(document.getElementById('lemail').value==""){
	/*alert("ϵ˵绰Ϊ!");*/
	document.getElementById('lemail').focus();
	return false;
	}
	if(document.getElementById('lemail').value!=""){
	if(document.getElementById('femail').value!=document.getElementById('lemail').value){
	alert("Your email is inconsistent.");
	document.getElementById('femail').focus();
	return false;
	}
	}
	if(document.getElementById('tel').value==""){
	/*alert("ϵ˵绰Ϊ!");*/
	document.getElementById('tel').focus();
	return false;
	}
}
function LTrim(str) 
{ 
var i; 
for(i=0;i<str.length;i++) 
{ 
if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break; 
} 
str=str.substring(i,str.length); 
return str; 
} 
function RTrim(str) 
{ 
var i; 
for(i=str.length-1;i>=0;i--) 
{ 
if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break; 
} 
str=str.substring(0,i+1); 
return str; 
} 
function Trim(str) 
{ 
return LTrim(RTrim(str)); 
}
function show(id){
if(document.getElementById(id).style.display=='none'){
document.getElementById(id).style.display='block';
document.getElementById('showpr').innerHTML='Hide rooms <img src="../systempic/pup.gif" width="18" height="18" /> ';
}else{
document.getElementById(id).style.display='none';
document.getElementById('showpr').innerHTML='Show all rooms <img src="../systempic/pdown.gif" width="18" height="18" />';
}
}

