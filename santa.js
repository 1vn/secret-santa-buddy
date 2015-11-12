var scrollTimer;
function nextpage(id){
	var target=gid(id).offsetTop;
	var targetheight=gid(id).offsetHeight;
	var headerbar=gid('header-bar_').offsetHeight;
	var factor=1
	var lastscroll;
	scrollTimer=setInterval(function(){
		if(window.scrollY<=target-headerbar && lastscroll != window.scrollY){
			lastscroll = window.scrollY;
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

function animatesend(){
	var julianne = gid("julianne");
	var msg = gid("julianne-msg");
	var buttonrow = gid("buttonrow");
	clearInterval(window.julianneinterval);
	julianne.style.top=buttonrow.offsetTop+"px";
	julianne.style.left=buttonrow.offsetLeft+"px";
	msg.innerHTML="Sending...";
}

function animatesuccess(){
	var julianne = gid("julianne");
	var msg = gid("julianne-msg");
	msg.innerHTML="Success, the elves are on their way!";
	setTimeout(function(){msg.innerHTML = "Thank you for using Secret Santa Buddy!";julianimate();gid("buttonrow").style.display="none";}, 2000);

}


window.julianneinterval;
function julianimate(){
	var julianne = gid("julianne");
	julianne.style.opacity=1;
	julianneinterval = setInterval(function(){
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		julianne.style.left=Math.random()*w+"px";
		julianne.style.top=Math.random()*h/2+"px";
		}
	,Math.random()*500+2000);
}

function scaleblocks(){
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	blocks = gid('page').getElementsByTagName("div");
	for(var i = 0; i < blocks.length; i++){
		if(blocks[i].className == "full-block_"){
			blocks[i].style.height=h+"px";
		}
	}
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
		animatesend()
		//ajxpgn('santaresult', 'services.php?cmd=santasend&'+santas.join('&'), 0, 0, santas.join('&'));
		var rq=xmlHTTPRequestObject();
		var f=function(c){return function(){
				if(rq.readyState == 4){
					rs=JSON.parse(rq.responseText);
					if(rs["success"]){
						setTimeout(animatesuccess, 3000);
					} else {
						console.log("failed");
					}
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
