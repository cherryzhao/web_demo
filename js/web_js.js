// JavaScript Document

window.onload = function ()
{
	web.app.toTip();
	web.app.toBanner();
	web.app.toMenu();
	web.app.toScroll();
}

var web = {};

web.tools = {};
web.tools.getClass=function (oParent,sClass)
{
	var aEle=oParent.getElementsByTagName('*')
	var arr=[];
	
	for (var i=0;i<aEle.length;i++)
	{
		if (aEle[i].className==sClass)
		{
			arr.push(aEle[i]);
		}
	}
return arr;
};
web.tools.getStyle=function (obj,attr)
{
	if (obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,false)[attr];
		
	}
}

web.ui = {};
web.ui.textChange=function (obj,str)
{
	obj.onfocus=function ()
	{
		if (this.value == str)
		{
			this.value='';
		}
	}
	obj.onblur=function ()
	{
		if (this.value == '')
		{
			this.value=str;
		}
	}
	
};

web.ui.fadeIn=function (obj)
{
	var iCur=web.tools.getStyle(obj,'opacity');
	if (iCur==1)
	{
		return false;
	}
	
	
	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function ()
	{
	 var ispeed=5;
	 if (value==100)
	 {
		 clearInterval(obj.timer);
	 }
	 else
	 {
		 value+=ispeed;
		 obj.style.filter='alpha(opacity='+value+')';
		 obj.style.opacity=value/100;
	 }
		},30)
	
}

web.ui.fadeOut=function (obj)
{
	var iCur=web.tools.getStyle(obj,'opacity');
	if (iCur==0)
	{
		return false;
	}
	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function ()
	{
	 var ispeed=-5;
	 if (value==0)
	 {
		 clearInterval(obj.timer);
	 }
	 else
	 {
		 value+=ispeed;
		 obj.style.filter='alpha(opacity='+value+')';
		 obj.style.opacity=value/100;
	 }
		},30)
	
}

web.ui.move=function (obj,old,now)
{
	clearInterval(obj.timer)
	obj.timer=setInterval(function (){
	var ispeed=(now-old)/10;
	ispeed=ispeed>0?Math.ceil(ispeed):Math.floor(ispeed)
	if (old==now)
	{
		clearInterval(obj.timer)
		
	}
	else
	{
		old+=ispeed;
		obj.style.left=old+'px';
	}
		},30);
	
}


web.app = {};

web.app.toTip = function ()
{
	var otxt1=document.getElementById('txt1');
	var otxt2=document.getElementById('txt2');
	web.ui.textChange(otxt1,'Search Website');
	web.ui.textChange(otxt2,'Search Website');
	
}

web.app.toBanner = function ()
{
	var oad=document.getElementById('content_ad');
	var oli=oad.getElementsByTagName('li');
	var oPre=web.tools.getClass(oad,'pre')[0];
	var oNext=web.tools.getClass(oad,'next')[0];
	var oPre_bg=web.tools.getClass(oad,'pre_bg')[0];
	var oNext_bg=web.tools.getClass(oad,'next_bg')[0];
	
	var iNow=0;
	var timer=setInterval(auto,3000);
	function auto()
  {
	if (iNow==oli.length-1)
	{
		iNow=0
	}
	else
	{
		iNow++;
	}
	for (var i=0;i<oli.length;i++)
	{
		web.ui.fadeOut(oli[i]);
	}
	web.ui.fadeIn(oli[iNow]);
  }
  
  	function autoPre()
  {
	if (iNow==0)
	{
		iNow=oli.length-1
	}
	else
	{
		iNow--;
	}
	for (var i=0;i<oli.length;i++)
	{
		web.ui.fadeOut(oli[i]);
	}
	web.ui.fadeIn(oli[iNow]);
  }
  
  
  oPre_bg.onmouseover=oPre.onmouseover=function ()
  {
	  oPre.style.display='block';
	  clearInterval(timer);
	  
  }
  oPre_bg.onmouseout=oPre.onmouseout=function ()
  {
	  oPre.style.display='none';
	  timer=setInterval(auto,3000);
	  
  }
  oNext_bg.onmouseover=oNext.onmouseover=function ()
  {
	  oNext.style.display='block';
	  clearInterval(timer);
	  
  }
  oNext_bg.onmouseout=oNext.onmouseout=function ()
  {
	  oNext.style.display='none';
	  timer=setInterval(auto,3000);
	  
  }
  oNext.onclick=function ()
  {
	  auto()
  };
   oPre.onclick=function ()
  {
	  autoPre()
  };

}

web.app.toMenu=function ()
{
	var oWarp=document.getElementById('wrap_sort');
	var oDd=oWarp.getElementsByTagName('dd');
	var oul=oWarp.getElementsByTagName('ul');
	var oli=oWarp.getElementsByTagName('li');
	var oH2=oWarp.getElementsByTagName('h2');
	
	
	for (var i=0;i<oDd.length;i++)
	{
		oDd[i].index=i;
		oDd[i].onclick=function (ev)
		{
			var ev=ev||window.event;
			var This=this
			for (var i=0;i<oul.length;i++)
			{
				oul[i].style.display='none';
			}
			oul[this.index].style.display='block';
			document.onclick=function ()
			{
				oul[This.index].style.display='none';
			}
			ev.cancelBubble='True';
		}
		
	};
	
   for (var i=0;i<oul.length;i++)
   {  
   oul[i].index=i;
   oul[i].onmouseover=function ()
   {
	   for (var i=0;i<oli.length;i++)
	   {
		   oli[i].onmouseover=function ()
		   {
			  this.className='active';
		   }
		   
		   oli[i].onmouseout=function ()
		   {
			   this.className='';
		   }
		    oli[i].onclick=function (ev)
			{
				var ev=ev||window.event;
				oH2[this.parentNode.index].innerHTML=this.innerHTML;
				ev.cancelBubble='True';
			   this.parentNode.style.display='none';
				
			}
	   }
	   
   }
   }
};

web.app.toScroll=function ()
{
	var oScroll=document.getElementById('scroll_r');
	var aUl=oScroll.getElementsByTagName('ul')[0];
	var ali=oScroll.getElementsByTagName('li');
	var oPre=web.tools.getClass(oScroll,'pre')[0];
	var oNext=web.tools.getClass(oScroll,'next')[0];
	var iNow=0;
		aUl.innerHTML+=aUl.innerHTML;
		aUl.style.width=ali[0].offsetWidth*ali.length+'px';
	

	
	oPre.onclick=function ()
	{
		if (iNow==0)
		{
			iNow=ali.length/2;
			aUl.style.left=-aUl.offsetWidth/2+'px';
		}
		web.ui.move(aUl,-iNow*ali[0].offsetWidth,-(iNow-1)*ali[0].offsetWidth)
		iNow--;
	}
	
	oNext.onclick=function ()
	{
		if (iNow==ali.length/2)
		{
			iNow=0;
			aUl.style.left=0;
		}
		web.ui.move(aUl,-iNow*ali[0].offsetWidth,-(iNow+1)*ali[0].offsetWidth)
		iNow++;
	}
	
	
};