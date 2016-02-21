var rwid=110,gwid=30;
var rhigh=116,ghigh=30;
var bxorg=-100,byorg=78;
var gx=0,gy=0;
var rx,ry=0;
var bx,by;
var tmrshoot,pos;
var speed,hit;
var canvas;
var ctx ;
var gOneImage,raOneImage,songImage; 
var bullet;
var round,life=4;
var shooting,hurts,gameOver=false;
function clear(){canvas.width = canvas.width;}
function msg(idx,msgx){document.getElementById(idx).innerHTML=msgx;}
function calc(val,max){return (val*100)/max}
function loveCalc(val,max){ 

var x= ((-4+val)*-1);
		document.getElementById("love" + x).style.display="block";
}
function init()
{	
	speed=10;
	round=5;
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	rx=canvas.width-rwid;ry=0;
	gx=0,gy=0;
	hit=0;
	shooting=false;
	gOneImage = new Image();
	raOneImage= new Image();
	gOneImage.src = "images/gone.png";

	var raOne = new Image();
	raOneImage.src = "images/raone.png";

	bullet = new Image();
	bullet.src = "images/power.png";
	
	songImage= new Image();
	songImage.src = "images/blank.png";
	
     reDraw();
 
	addEventListener("keydown", function (e) {
	
		if(e.keyCode==38) gy=gy-speed;
		if(e.keyCode==40) gy=gy+speed;
		
		if(e.keyCode==39 )
		{//shoot();

			if (!shooting && round>0){
				hurts=false;
				bx=gx+gwid;
				round--;
				msg('power',"Power : " + calc(round,5) +"%");
				//msg("Bullets: "+ round +"<br>Hit: "+hit);
				
				tmrshoot=setInterval(shoot, 1);
				shooting=true;
				pos=gy+byorg;
			}
		}
		
		reDraw();
	}, false);
	
	var move=setInterval(raOneMove, 500);
}
function reDraw()
{	clear();

	if(gameOver==true) {
		ctx.drawImage(songImage, 152, 52);
		return;
	}
     ctx.drawImage(gOneImage, 0, gy);
     ctx.drawImage(raOneImage, rx, ry);
	 
	 
	 if(shooting==true) { by=pos}else {by=gy;} ;
     ctx.drawImage(bullet, bx, by);
	
}
function raOneMove()
{
	ry=Math.floor((Math.random()*(canvas.height-rhigh))+1);
	reDraw();
}
function reloadAll()
{
	hit=0;
	round=5;
}
function reload()
{
	if(gameOver==true) return;
	window.clearInterval(tmrshoot);
	bx=bxorg;
	shooting=false;
	if(hurts==false) {
		document.getElementById("kareena").src ="images/anger.png"
		setTimeout(reloadKareena, 1000);
		}
	
	if(round<=0 ) 
	{
		document.getElementById("kareena").src ="images/anger.png";
		alert("Looser...");
		window.location="index.html";
	}
	loveCalc(life,4);
}
function shoot()
{
   bx=bx+10;

   if((bx+31)>=(rx+50) && ((by+31)>=(ry+10))&& (by+31)<=((ry+rhigh))) 
   {
     life--;
	 msg('life',"RaOne Life : " + calc(life,4) +"%");
	 raOneImage.src = "images/raone-hit.png";
	 reDraw();
	 setTimeout(hitSuccess, 1000);
	 hit++;
	 hurts=true;
	
	 if(life<=0) 
	 {
		clearTimeout(tmrshoot);
		gameOver=true;
		document.getElementById("kareena").src ="images/happy.png";

		songImage.src = "images/song.jpg";
		
		reload();
		
	
		//alert("You won!!! Now dance with Kareena ;)");
		return;
	}
 reload();
	 
   }
  
	if(bx>canvas.width)
	{
		
		reload();
		
	}
	reDraw();
}
function reloadKareena()
{
document.getElementById("kareena").src ="images/excit.png"
}
function hitSuccess()
{
	raOneImage.src = "images/raone.png";
	reDraw();

}
