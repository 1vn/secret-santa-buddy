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

function addsanta(){
	window.santas++;
	var ogdiv=gid('santa-list');
	var html=[];
	window.santacount++;
	html.push('<div class="namefield" id="namefield'+santas+'"><span><input id="nameinp'+santas+'" class="nameinp" placeholder="Name"></span></div>');
	html.push('<div class="emailfield" id="emailfield'+santas+'"><span><input id="emailinp'+santas+'" class="emailinp" placeholder="Email" type="email"></span></div>');
	html.push('<div class="santaoptionsbutton"><i class="fa fa-times" onclick="showsantaoptions('+santas+')"></i></div>');
	html.push('<div class="clear"></div>');
	html.push('<div class="santaoptions" id="santaoptions'+santas+'">');
	html.push('<div class="warningtext" id="warning'+santas+'">Are you sure you want to remove this Santa?&nbsp;&nbsp;<i class="fa fa-check" onclick="removesanta('+santas+')"></i>&nbsp;&nbsp;<i class="fa fa-times" onclick="showsantaoptions('+santas+')"></i></div>');
	var newcontent = document.createElement('div');
	newcontent.className="inprow";
	newcontent.id="row"+santas;
	newcontent.innerHTML=html.join('');
	
	ogdiv.appendChild(newcontent);
}

function removesanta(santa){
	window.santacount--;
	var ogdiv=gid('santa-list');
	var warning=gid('warning'+santa);
	var temp=warning.innerHTML;
	warning.innerHTML=generateSadness();
	setTimeout(function(){
		ogdiv.removeChild(gid('row'+santa));
	}, 800)
}

function showwarning(santa){
	var warning=gid('warning'+santa);
	if(warning.style.display=="block"){
		warning.style.display="none";
	}
	else{
		setTimeout(function(){
		warning.style.display="block";
		}, 300);
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
	showwarning(santa)
}

function santasend(){
	var santas=[];
	var errors=[];
	valid=true;
	j=0;
	for(var i=0; i<=window.santas; i++){
		if(gid('row'+i)){
			var name=encodeHTML(gid('nameinp'+i).value);
			var email=encodeHTML(gid('emailinp'+i).value);
			if(!name){gid('row'+i).className+=" inperror";valid=false;}else{gid('row'+i).className="inprow"}
			if(!email){gid('row'+i).className+=" inperror";valid=false;}else{gid('row'+i).className="inprow"}
			santas.push("name"+j+"="+name);
			santas.push("email"+j+"="+email);
			j++;
		}
	}
	santas.push('santacount='+j);
	if(valid){
		ajxpgn('santaresult', 'services.php?cmd=santasend&'+santas.join('&'), 0, 0, santas.join('&'));
	}
}
 

var gid=function(d){return document.getElementById(d);}
