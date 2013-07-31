
var orientation = 'portrait';
if (document.images)
    {
      preload_image_object = new Image();
      // set image url
      image_url = new Array();
      image_url[0] = "http://transmog.net/iphone-simulator/images/google-iphone-local-search2.jpg";
      image_url[1] = "http://transmog.net/iphone-simulator/images/iphone_ver.png";
      image_url[2] = "http://transmog.net/iphone-simulator/images/iphone_ver_landscape.png";
      image_url[3] = "http://transmog.net/iphone-simulator/images/browser_landscape.png";
       var i = 0;
       for(i=0; i<=3; i++) 
         preload_image_object.src = image_url[i];
    }
	

function submitForm() {
	//var useragent = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148a Safari/6533.18.5";
	url = $('#u').val();
	var localtransmog = "";
	var php = "";
	$.ajax({
		   url: "get_session.php",
		   success: function(msg) {
		   		var obj = jQuery.parseJSON(msg);
				localtransmog = obj.localtransmog;
				php = obj.php;

		   }
	});
	if (php=="") {
		url = u.replace('http://', '');
		url = url.replace('https://', '');
		$('#iphone_content').attr('src', localtransmog + url);
	} else {
		//$('#htc_content').attr('src', localtransmog + url);
		$('#iphone_content').attr('src', localtransmog + url);
	}	
	return false;
}	

function bitly() {
	url = 'http://transmog.net/iphone-simulator/mobile-web-browser-emulator.php?directlink=' + $('#u').val();
	$.ajax({
			url: "http://api.bitly.com/v3/shorten",
			type: "GET",
			data: { login: 'devansjo', apiKey: 'R_56b857b3aee66df8ff7f51e93c3f98f3', longUrl: url, format: 'json'},
			success: function(response) {
				alert("Direct link to your simulated site:  " + response['data']['url']);
			}
	});
}

function openInMobile(u) {
	var localtransmog = "";
	var php = "";
	$.ajax({
		   url: "get_session.php",
		   success: function(msg) {
		   		var obj = jQuery.parseJSON(msg);
				localtransmog = obj.localtransmog;
				php = obj.php;

		   }
	});
	if (localtransmog!="") {
		if (php=="") {
			url = u.replace('http://', '');
			url = url.replace('https://', '');
			$('#iphone_content').attr('src', localtransmog + url);
		} else {
			//$('#htc_content').attr('src', localtransmog + url);
			$('#iphone_content').attr('src', localtransmog + u);
		}	
	}
	else {
			$('#update').html('<small>You have not defined a <a href="javascript:window.location.reload()">local rendering script</a>. It is recommended to at least change your <a href="http://blog.arpitnext.com/2010/12/how-to-change-spoof-user-agent-google-chrome.html" target="_blank">browser\'s user agent</a></small>');
			$('#iphone_content').attr('src', u);
	}
		
	return false;
}	

function getTime() {
	var a_p = "";
	var d = new Date();
	var curr_hour = d.getHours();
	if (curr_hour < 12)
	   {
	   a_p = "AM";
	   }
	else
	   {
	   a_p = "PM";
	   }
	if (curr_hour == 0)
	   {
	   curr_hour = 12;
	   }
	if (curr_hour > 12)
	   {
	   curr_hour = curr_hour - 12;
	   }
	
	var curr_min = d.getMinutes();
	
	curr_min = curr_min + "";
	
	if (curr_min.length == 1)
	   {
	   curr_min = "0" + curr_min;
	   }
	
	$('#iphone_time').html(curr_hour + ":" + curr_min + " " + a_p);
}

function showHTC() {
	var form = document.createElement("form");
	form.setAttribute("method", "POST");
	form.setAttribute("action", "mobile-web-browser-emulator.php");
	form.setAttribute("style", "display:none");
	var field = document.createElement("input");
	field.setAttribute("type", "hidden");
	field.setAttribute("name", "php");
	field.setAttribute("value", "set");
	form.appendChild(field);
	var ufield = document.createElement("input");
	ufield.setAttribute("type", "text");
	ufield.setAttribute("name", "u");
	ufield.setAttribute("value", url);
	form.appendChild(ufield);
	document.body.appendChild(form);
	form.submit();
}

function showiPhone() {
	var form = document.createElement("form");
	form.setAttribute("method", "POST");
	form.setAttribute("action", "mobile-web-browser-emulator.php");
	form.setAttribute("style", "display:none");
	var ufield = document.createElement("input");
	ufield.setAttribute("type", "text");
	ufield.setAttribute("name", "u");
	ufield.setAttribute("value",  url);
	form.appendChild(ufield);
	document.body.appendChild(form);
	form.submit();
}
function showLandscape() {
	$('#iphone_transmog').fadeOut('slow', function() {
		$('#switch').html('<a href="#" class="button orange" onClick="javascript:showPortrait()">rotate me back!</a><a href="#" class="button orange" onClick="javascript:refreshIframe()">refresh me!</a>');
		$('#switch').css('top', '600px');
		$('#switch').css('left', '225px');
		$('#zoom_in').css('top', '7.5em');
		$('#zoom_in').css('left', '7em');
		$('#zoom_out').css('top', '7.5em');
		$('#zoom_out').css('left', '9em');
		$('#centre_column').css('width', '678px');
		$('#iphone_transmog').css('width', '600px');
		$('#iphone_transmog').css('background-image', 'url(https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/iphone_ver_landscape.png)');
		$('#iphone_transmog').css('padding', '100px 100px 50px 100px');
		$('#iphone_transmog').css('margin-left', '-40px');
		$('#iphone_browser').css('background-image', 'url(https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/browser_landscape.png)');
		$('#iphone_browser').css('top', '10.3em');
		$('#iphone_browser').css('left', '1.6em');
		$('#iphone_browser').css('width', '48em');
		$('#iphone_browser').css('height', '26.2em');
		$('#iphone_content').css('width', '30em');
		$('#iphone_content').css('height', '17em');
		$('#iphone_content').css('left', '10.6em');
		$('#iphone_content').css('top', '14.6em');
		$('#iphone_time').css('top', '16.6em');
		$('#iphone_time').css('left', '28.5em');
		$('#iphone_backbutton').css('top', '32em');
		$('#iphone_backbutton').css('left', '12em');
		$('#advert_right').css('left', '800px');
		$('#advert_right_bottom').css('left', '800px');
		
		
		//call window.orientation firing event in iframe
		document.getElementById('iphone_content').contentWindow.changeOrientation('landscape');
		window.orientation = 'landscape';

		$('#iphone_transmog').fadeIn('slow');
		scrollit();
		$('.scrollme').css('left', '790px');
		$('.scrollme').css('top', '200px');
	  });
	return false;
}
function showPortrait() {
	$('#iphone_transmog').fadeOut('slow', function() {
		$('#switch').html('<a href="#" class="button orange" onClick="javascript:showLandscape()">rotate me!</a><a href="#" class="button orange" onClick="javascript:refreshIframe()">refresh me!</a>');
		$('#switch').css('top', '760px');
		$('#switch').css('left', '80px');
		$('#centre_column').css('width', '428px');
		$('#iphone_transmog').css('width', '350px');
		$('#iphone_transmog').css('background-image', 'url(https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/iphone_ver.png)');
		$('#iphone_transmog').css('padding', '100px 50px 50px 50px');
		$('#iphone_transmog').css('margin-left', 'auto');
		$('#iphone_browser').css('background-image', 'url(https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/google-iphone-local-search2.jpg)');
		$('#iphone_browser').css('top', '0');
		$('#iphone_browser').css('left', '1.1em');
		$('#iphone_browser').css('height', '48em');
		$('#iphone_browser').css('width', '26.2em');
		$('#iphone_content').css('width', '20em');
		$('#iphone_content').css('height', '26.1em');
		$('#iphone_content').css('left', '4.2em');
		$('#iphone_content').css('top', '10.2em');
		$('#iphone_time').css('top', '11.3em');
		$('#iphone_time').css('left', '15em');
		$('#iphone_backbutton').css('left', '6em');
		$('#iphone_backbutton').css('top', '37em');
		$('#advert_right').css('left', '500px');
		$('#advert_right_bottom').css('left', '500px');
		
		//call window.orientation firing event in iframe
		document.getElementById('iphone_content').contentWindow.changeOrientation('portrait');
		window.orientation = 'portrait';

		$('#iphone_transmog').fadeIn('slow');
		scrollit();
		$('.scrollme').css('left', '430px');
		$('.scrollme').css('top', '140px');
	  });
	return false;
}


function refresh() {
	var form = document.createElement("form");
	form.setAttribute("method", "POST");
	form.setAttribute("action", "mobile-web-browser-emulator.php");
	form.setAttribute("style", "display:none");
	var ufield = document.createElement("input");
	ufield.setAttribute("type", "text");
	ufield.setAttribute("name", "u");
	ufield.setAttribute("value",  url);
	form.appendChild(ufield);
	document.body.appendChild(form);
	form.submit();
}

function refreshIframe() {
	document.getElementById('iphone_content').contentDocument.location.reload(true);
}


$(document).ready(function() {
	 getTime();
      window.setInterval(getTime, 5000);
	  if (!$.browser.webkit) {
		$('#update').html("<small>You are not using a webkit browser. The Transmog prefers a webkit browser like Safari or Google Chrome</small>");
	  } 	
		
});


function scrollit () {
//change the iframe to overflow-hidden as we can use the slider now
$('#iphone_content').css('overflow','hidden');

//compare the height of the scroll content to the scroll pane to see if we need a scrollbar
var difference = $('#iphone_content').contents().height()-$('#iphone_content').height();//eg it's 200px longer 

if(difference > 0)//if the scrollbar is needed, set it up...
{
   var proportion = difference / $('#iphone_content').contents().height();//eg 200px/500px
   var handleHeight = Math.round((1-proportion)*$('#iphone_content').height());//set the proportional height - round it to make sure everything adds up correctly later on
   handleHeight -= handleHeight%2; 
	
	
	$('#slider-wrap').remove();
	$('.scrollme').remove();
   $("#iphone_browser").after('<\div class="scrollme"><small><center>scroll</center></small><\/div><\div id="slider-wrap"><\div id="slider-vertical"><\/div><\/div>');//append the necessary divs so they're only there if needed
   if (window.orientation == 'landscape') {
		$('#slider-wrap').css('right', '-15px');
		$('#slider-wrap').css('top', '225px');
		$('.scrollme').css('left', '790px');
		$('.scrollme').css('top', '200px');
   }
   else {
	   
		$('#slider-wrap').css('right', '-5px');
		$('#slider-wrap').css('top', '165px');
		$('.scrollme').css('left', '430px');
		$('.scrollme').css('top', '140px');
   }
   $("#slider-wrap").height($("#iphone_content").height());//set the height of the slider bar to that of the scroll pane


   //set up the slider 
   $('#slider-vertical').slider({
      orientation: 'vertical',
      min: 0,
      max: 100,
      value: 100,
      slide: function(event, ui) {//used so the content scrolls when the slider is dragged
         var topValue = ((100-ui.value)*difference/100);
         //$('#scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
		 $('#iphone_content').contents().find("html, body").scrollTop(topValue);
      },
      change: function(event, ui) {//used so the content scrolls when the slider is changed by a click outside the handle or by the mousewheel
         var topValue = ((100-ui.value)*difference/100);
         //$('#scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
		 $('#iphone_content').contents().find("html, body").scrollTop(topValue);
      }
   });

   //set the handle height and bottom margin so the middle of the handle is in line with the slider
   $(".ui-slider-handle").css({height:handleHeight,'margin-bottom':-0.5*handleHeight});
	
   var origSliderHeight = $("#slider-vertical").height();//read the original slider height
   var sliderHeight = origSliderHeight - handleHeight ;//the height through which the handle can move needs to be the original height minus the handle height
   var sliderMargin =  (origSliderHeight - sliderHeight)*0.5;//so the slider needs to have both top and bottom margins equal to half the difference
   $(".ui-slider").css({height:sliderHeight,'margin-top':sliderMargin});//set the slider height and margins
   
}//end if

//code to handle clicks outside the slider handle
$(".ui-slider").click(function(event){//stop any clicks on the slider propagating through to the code below
   	event.stopPropagation();
   });
   
$("#slider-wrap").click(function(event){//clicks on the wrap outside the slider range
	  var offsetTop = $(this).offset().top;//read the offset of the scroll pane
	  var clickValue = (event.pageY-offsetTop)*100/$(this).height();//find the click point, subtract the offset, and calculate percentage of the slider clicked
	  $("#slider-vertical").slider("value", 100-clickValue);//set the new value of the slider
}); 
	 
//additional code for mousewheel
$("#iphone_content,#slider-wrap").mousewheel(function(event, delta){
	var speed = 5;
	var sliderVal = $("#slider-vertical").slider("value");//read current value of the slider
	
	sliderVal += (delta*speed);//increment the current value

	$("#slider-vertical").slider("value", sliderVal);//and set the new value of the slider
	
	event.preventDefault();//stop any default behaviour
});

}

function scrollitzoomed (zoom) {
//change the iframe to overflow-hidden as we can use the slider now
$('#iphone_content').css('overflow','hidden');

//compare the height of the scroll content to the scroll pane to see if we need a scrollbar
var difference = (zoom*$('#iphone_content').contents().height())-$('#iphone_content').height();//eg it's 200px longer 

if(difference > 0)//if the scrollbar is needed, set it up...
{
   var proportion = difference / (zoom*$('#iphone_content').contents().height());//eg 200px/500px
   var handleHeight = Math.round((1-proportion)*$('#iphone_content').height());//set the proportional height - round it to make sure everything adds up correctly later on
   handleHeight -= handleHeight%2; 
	
	
	$('#slider-wrap').remove();
	$('.scrollme').remove();
   $("#iphone_browser").after('<\div class="scrollme"><small><center>scroll</center></small><\/div><\div id="slider-wrap"><\div id="slider-vertical"><\/div><\/div>');//append the necessary divs so they're only there if needed
   if (window.orientation == 'landscape') {
		$('#slider-wrap').css('right', '-15px');
		$('#slider-wrap').css('top', '225px');
		$('.scrollme').css('left', '790px');
		$('.scrollme').css('top', '200px');
   }
   else {
	   
		$('#slider-wrap').css('right', '-5px');
		$('#slider-wrap').css('top', '165px');
		$('.scrollme').css('left', '430px');
		$('.scrollme').css('top', '140px');
   }
   $("#slider-wrap").height($("#iphone_content").height());//set the height of the slider bar to that of the scroll pane


   //set up the slider 
   $('#slider-vertical').slider({
      orientation: 'vertical',
      min: 0,
      max: 100,
      value: 100,
      slide: function(event, ui) {//used so the content scrolls when the slider is dragged
         var topValue = ((100-ui.value)*difference/100);
         //$('#scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
		 $('#iphone_content').contents().find("html, body").scrollTop(topValue);
      },
      change: function(event, ui) {//used so the content scrolls when the slider is changed by a click outside the handle or by the mousewheel
         var topValue = ((100-ui.value)*difference/100);
         //$('#scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
		 $('#iphone_content').contents().find("html, body").scrollTop(topValue);
      }
   });

   //set the handle height and bottom margin so the middle of the handle is in line with the slider
   $(".ui-slider-handle").css({height:handleHeight,'margin-bottom':-0.5*handleHeight});
	
   var origSliderHeight = $("#slider-vertical").height();//read the original slider height
   var sliderHeight = origSliderHeight - handleHeight ;//the height through which the handle can move needs to be the original height minus the handle height
   var sliderMargin =  (origSliderHeight - sliderHeight)*0.5;//so the slider needs to have both top and bottom margins equal to half the difference
   $(".ui-slider").css({height:sliderHeight,'margin-top':sliderMargin});//set the slider height and margins
   
}//end if

//code to handle clicks outside the slider handle
$(".ui-slider").click(function(event){//stop any clicks on the slider propagating through to the code below
   	event.stopPropagation();
   });
   
$("#slider-wrap").click(function(event){//clicks on the wrap outside the slider range
	  var offsetTop = $(this).offset().top;//read the offset of the scroll pane
	  var clickValue = (event.pageY-offsetTop)*100/$(this).height();//find the click point, subtract the offset, and calculate percentage of the slider clicked
	  $("#slider-vertical").slider("value", 100-clickValue);//set the new value of the slider
}); 
	 
//additional code for mousewheel
$("#iphone_content,#slider-wrap").mousewheel(function(event, delta){
	var speed = 5;
	var sliderVal = $("#slider-vertical").slider("value");//read current value of the slider
	
	sliderVal += (delta*speed);//increment the current value

	$("#slider-vertical").slider("value", sliderVal);//and set the new value of the slider
	
	event.preventDefault();//stop any default behaviour
});

}