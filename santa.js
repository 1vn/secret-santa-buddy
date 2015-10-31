var scrollTimer;
function nextpage(id){
	var target=gid(id).offsetHeight;
	var factor=1
	scrollTimer=setInterval(function(){
		if(window.scrollY<=target){
			window.scrollTo(0, (window.scrollY+1*factor))
			factor+=0.25;
		}
		else{clearInterval(scrollTimer)}
	}, 5)
}

function addsanta(e){
	if(!e){
		window.santas++;
		var ogdiv=gid('santa-list');
		var html=[];
		window.santacount++;
		html.push('<div class="namefield" id="namefield'+santas+'"><span><input id="nameinp'+santas+'" class="nameinp" placeholder="Name"></span></div>');
		html.push('<div class="emailfield" id="emailfield'+santas+'"><span><input id="emailinp'+santas+'" class="emailinp" placeholder="Email" type="email" onkeypress="addsanta(event)"></span></div>');
		html.push('<div class="santaoptionsbutton"><i class="fa fa-times" onclick="showsantaoptions('+santas+')"></i></div>');
		html.push('<div class="clear"></div>');
		html.push('<div class="santaoptions" id="santaoptions'+santas+'">');
		html.push('<div class="warningtext" id="warning'+santas+'">Are you sure you want to remove this Santa?&nbsp;&nbsp;<i class="fa fa-check" onclick="removesanta('+santas+')"></i>&nbsp;&nbsp;<i class="fa fa-times" onclick="showsantaoptions('+santas+')"></i></div>');
		var newcontent = document.createElement('div');
		newcontent.className="inprow";
		newcontent.id="row"+santas;
		newcontent.innerHTML=html.join('');		
		ogdiv.appendChild(newcontent);
	} else if (e.keyCode == 13){
		addsanta();
		gid("nameinp"+santas).focus();
	}
}

function removesanta(santa){
	window.santacount--;
	var ogdiv=gid('santa-list');
	var warning=gid('warning'+santa);
	var temp=warning.innerHTML;
	warning.innerHTML=generateSadness();
	var santakill = gid("row"+santa);
	santakill.style.opacity=0;
	setTimeout(function(){
		ogdiv.removeChild(santakill);
	}, 400)
}

function showwarning(santa){
	var warning=gid('warning'+santa);
	if(warning.style.display=="block"){
		warning.style.display="none";
	}
	else{
		warning.style.display="block";
	}
}

function generateSadness(){
	sadness=['Okay :c', "Okay :(", "Okay :'(", "Okay =["];
	return sadness[parseInt(Math.random()*sadness.length)];
}

function showsantaoptions(santa, show){
	if(	gid('santaoptions'+santa).style.height=="50px"){
	gid('santaoptions'+santa).style.height="5px";
	}
	else{
	gid('santaoptions'+santa).style.height="50px";
	}
	//showwarning(santa)
}

function santasend(){
	var santas=[];
	var errors=[];
	valid=true;
	j=0;
	namelist="";
	emaillist="";
	for(var i=0; i<=window.santas; i++){
		if(gid('row'+i)){
			var name=encodeHTML(gid('nameinp'+i).value);
			var email=encodeHTML(gid('emailinp'+i).value);
			if(!name){gid('row'+i).className+=" inperror";valid=false;}else{gid('row'+i).className="inprow"}
			if(!email){gid('row'+i).className+=" inperror";valid=false;}else{gid('row'+i).className="inprow"}
			//santas.push("name"+j+"="+name);
			//santas.push("email"+j+"="+email);
			namelist+=name+",";
			emaillist+=email+",";
			j++;
		}
	}
	namelist=namelist.substr(0, namelist.length-1);
	emaillist=emaillist.substr(0, emaillist.length-1);
	santas.push("namelist="+namelist);
	santas.push("emaillist="+emaillist);
	santas.push('santacount='+j);
	if(valid){
		//ajxpgn('santaresult', 'services.php?cmd=santasend&'+santas.join('&'), 0, 0, santas.join('&'));
		var rq=xmlHTTPRequestObject();
		var f=function(c){return function(){
				if(rq.readyState == 4){
					console.log("success");
				}

			}
		}
		rq.onreadystatechange=f();
		rq.open('POST','services.php?cmd=santasend&hb='+hb(),true);
		rq.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
		rq.send(santas.join("&")); 
	}
}
 
function encodeHTML(code){
	code=escape(code);
	code=code.replace(/\//g,"%2F");
	code=code.replace(/\?/g,"%3F");
	code=code.replace(/=/g,"%3D");
	code=code.replace(/&/g,"%26");
	code=code.replace(/@/g,"%40");
	code=code.replace(/\+/g,"%2B");
	return code;
}

function xmlHTTPRequestObject() {
	var obj = false;
	var objs = ["Microsoft.XMLHTTP","Msxml2.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP.4.0"];
	var success = false;
	for (var i=0; !success && i < objs.length; i++) {
		try {
			obj = new ActiveXObject(objs[i]);
			success = true;
		} catch (e) { obj = false; }
	}

	if (!obj) obj = new XMLHttpRequest();
	return obj;
}

function hb(){var now=new Date(); var hb=now.getTime();return hb;}

var gid=function(d){return document.getElementById(d);}
