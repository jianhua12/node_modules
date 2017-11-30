// JavaScript Document
function createAjaxObj()
{
    var xmlHttp=null;
    if(window.XMLHttpRequest)
     {//IEں
         xmlHttp=new XMLHttpRequest();
     }
    else if(window.ActiveXObject)
     {//IEں
        try
         {//IE6.0
             xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
         }
        catch(e1)
         {
            try
             {
                 xmlHttp=new ActiveXObject("MSXML2.XMLHTTP");
             }
            catch(e2)
             {
                try
                 {
                     xmlHttp=new ActiveXObject("MSXML3.XMLHTTP");
                 }
                catch(e3)
                 {
                     alert(e3)
                 }
             }
         }
     }
    else
     {//δ֪
         alert("sorry,this page is not unable to distinguish your browser!");
     }
    return xmlHttp;
}

function loads(dd,url)
{
	
	var xmlhttp=createAjaxObj();
	//󣬲ʹescapeusername룬Ա
	
	//alert(url);
	xmlhttp.open("get",url);
	xmlhttp.onreadystatechange=function()
	{
		if(4==xmlhttp.readyState)
		{
			if(200==xmlhttp.status)
			{
	
					str=xmlhttp.responseText;

					document.getElementById(dd).innerHTML=str;					
								
			}
			else
			{
				msg="error!";
				document.getElementById(dd).innerHTML="sorry,the network is too busy ,please <a href='#' onclick='javascript:window.location.reload();'style='text-decoration:underline;'>try again!</a>";	
				//alert(msg);
			}
			/*var ch=document.getElementById("s_username");
			ch.innerHTML="<font color='#ff0000'>"+msg+"</font>";*/	   
		}
	}
	xmlhttp.send(null);  
	return false;
}

