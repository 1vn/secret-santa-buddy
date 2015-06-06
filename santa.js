var scrollTimer;
function nextpage(id){
	var target=gid(id).offsetHeight-75;
	console.log(target);
	var factor=1
	scrollTimer=setInterval(function(){
		if(window.scrollY<=target){
			console.log(window.scrollY)
			window.scrollTo(0, (window.scrollY+1*factor))
			factor++;
		}
		else{clearInterval(scrollTimer)}
	}, 5)
}

var gid=function(d){return document.getElementById(d);}
