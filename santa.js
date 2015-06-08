var scrollTimer;
function nextpage(id){
	var target=gid(id).offsetHeight;
	console.log(target);
	var factor=1
	scrollTimer=setInterval(function(){
		if(window.scrollY<=target){
			console.log(window.scrollY)
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

	html.push('<div class="namefield"><span><input id="nameinp'+santas+'" class="nameinp" placeholder="Name"></span></div>');
	html.push('<div class="emailfield"><span><input id="emailinp'+santas+'" class="emailinp" placeholder="Email"></span></div>');
	html.push('<div class="clear"></div>');
	var newcontent = document.createElement('div');
	newcontent.className="inprow";
	newcontent.innerHTML=html.join('');
	
	ogdiv.appendChild(newcontent);
}


var gid=function(d){return document.getElementById(d);}
