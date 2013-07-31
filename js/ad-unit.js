var videoImage = document.getElementById('videoImage');
var facebookImage = document.getElementById('facebookImage');
var siteImage = document.getElementById('siteImage');
var logo = document.getElementById('logo');
var shadow = document.getElementById('shadow');
var bottomShadow = document.getElementById('bottomShadow');
var lightShaft = document.getElementById('lightShaft');
var girl = document.getElementById('girl');
var swipe = document.getElementById('swipe');
var lynxExciteContainer = document.getElementById('lynx-excite-container');
var can = document.getElementById('can');

var findAdContainerById = function (id) {
	var divs = document.getElementsByTagName('div');
	var adContainerId;
	for (var i = 0; i < divs.length; i++) {
		adContainerId = divs[i].getAttribute('ad-container-id');
		if (adContainerId != null && adContainerId == id) {
			return divs[i];
		}
	}
};

var adContainer = findAdContainerById('lynx-excite');
adContainer.style['position'] = 'relative';
adContainer.style['width'] = '320px';
adContainer.style['height'] = '50px';
adContainer.style['textAlign'] = 'left';
adContainer.style['margin'] = '0px';
adContainer.style['padding'] = '0px';

var recordEvent = function (url) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', url, true);
    xmlHttpRequest.send(null);
}

function show(element) {
    element.className = 'show';
}

function hide(element) {
    element.className = 'hide';
}

var registerSwipeFunctions = function (element, leftSwipeFunction, rightSwipeFunction, clickFunction) {
    var startXPosition = 0;
    var adjustedXPosition = 0;

    function touchStart(event) {
        disableDefaultBehaviour(event);

        if (isSingleFingerSwipe(event)) {
            recordStartCoordinates(event);
        } else {
            touchCancel(event);
        }
    }

    function touchMove(event) {
        disableDefaultBehaviour(event);

        if (isSingleFingerSwipe(event)) {
            recordCurrentCoordinates(event);
        } else {
            touchCancel(event);
        }
    }

    function touchEnd(event) {
        disableDefaultBehaviour(event);

        if (hasExceededMinimumSwipeLength()) {
            if (adjustedXPosition > 0) {
                rightSwipeFunction();
            }
            else if (adjustedXPosition < 0) {
                leftSwipeFunction();
            }
        } else {
            clickFunction();
        }

        touchCancel(event);
    }

    function touchCancel(event) {
        startXPosition = 0;
        adjustedXPosition = 0;
    }

    function disableDefaultBehaviour(event) {
        event.preventDefault();
    }

    function isSingleFingerSwipe(event) {
        return event.touches.length == 1;
    }

    function recordStartCoordinates(event) {
        startXPosition = event.targetTouches[0].pageX;
    }

    function recordCurrentCoordinates(event) {
        adjustedXPosition = event.targetTouches[0].pageX - startXPosition;
    }

    function hasExceededMinimumSwipeLength() {
        if (adjustedXPosition == 0) {
            return false;
        }

        return (Math.abs(adjustedXPosition) >= 100);
    }


    var registerSwipeEvents = function (element) {
        if (window.addEventListener) {
            element.addEventListener('touchstart', touchStart, false);
            element.addEventListener('touchmove', touchMove, false);
            element.addEventListener('touchend', touchEnd, false);
            element.addEventListener('touchcancel', touchCancel, false);
        }
        else if (window.attachEvent) {
            element.attachEvent('ontouchstart', touchStart);
            element.attachEvent('ontouchmove', touchMove);
            element.attachEvent('ontouchend', touchEnd);
            element.attachEvent('ontouchcancel', touchCancel);
        }
    }

    registerSwipeEvents(element);
}

var galleryPosition = 'video';
var swipeFunctionsRegistered = false;

function showCarousel() {
    swipe.style['opacity'] = '0';
    videoImage.style['opacity'] = '1';
    facebookImage.style['opacity'] = '1';
    siteImage.style['opacity'] = '1';

    if(!swipeFunctionsRegistered) {
        registerSwipeFunctions(gallerySwipeZone, leftSwipe, rightSwipe, carouselItemClickHandler);
        swipeFunctionsRegistered = true;
    }
}

var showCarouselTimeout = null;
var showLogoTimeout = null;
var swipeAnimationTimeout = null;
var shineLightTimeout = null;
var fadeToBlackTimeout = null;

function showSwipe() {
    swipe.style['opacity'] = '1';
    showCarouselTimeout = setTimeout(showCarousel, 2000);
}

function showLogo() {
    logo.style['opacity'] = '1';
    logo.style['top'] = '25px';
    swipeAnimationTimeout = setTimeout(showSwipe, 5000);
}

function clearShowCarouselTimeout() {
    if (showCarouselTimeout != null) {
        clearTimeout(showCarouselTimeout);
        showCarouselTimeout = null;
    }
}

function shineLight() {
    shadow.style['opacity'] = '0';
    bottomShadow.style['opacity'] = '1';
    lightShaft.style['opacity'] = '1';
    showLogoTimeout = setTimeout(showLogo, 2000);
}

function clearShowLogoTimeout() {
    if (showLogoTimeout != null) {
        clearTimeout(showLogoTimeout);
        showLogoTimeout = null;
    }
}

function fadeToBlack() {
    shadow.style['opacity'] = '1';
    shineLightTimeout = setTimeout(shineLight, 3000);
}

function clearShineLightTimeout() {
    if (shineLightTimeout != null) {
        clearTimeout(shineLightTimeout);
        shineLightTimeout = null;
    }
}

function dropGirl() {
    girl.style['top'] = '127px';
    girl.style['opacity'] = '1';
    fadeToBlackTimeout = setTimeout(fadeToBlack, 1000);
}

function clearFadeToBlackTimeout() {
    if (fadeToBlackTimeout != null) {
        clearTimeout(fadeToBlackTimeout);
        fadeToBlackTimeout = null;
    }
}


function front(element) {
    element.style['z-index'] = '4';
}

function behind(element) {
    element.style['z-index'] = '2';
}

function left(element) {
    element.style['top'] = '200px';
    element.style['left'] = '40px';
    element.style['width'] = '69px';
    element.style['height'] = '6px';
}

function right(element) {
    element.style['top'] = '180px';
    element.style['left'] = '245px';
    element.style['width'] = '46px';
    element.style['height'] = '4px';
}

function centre(element) {
    element.style['top'] = '250px';
    element.style['left'] = '100px';
    element.style['width'] = '138px';
    element.style['height'] = '12px';
}

function leftFront(element) {
    front(element);
    left(element);
}

function rightFront(element) {
    front(element);
    right(element);
}


function centreFront(element) {
    front(element);
    centre(element);
}

function leftBehind(element) {
    behind(element);
    left(element);
}

function rightBehind(element) {
    behind(element);
    right(element);
}

function leftSwipe() {
    if (galleryPosition == 'facebook') {
        leftFront(facebookImage);
        centreFront(videoImage);
        rightBehind(siteImage);
        galleryPosition = 'video';
    }
    else if (galleryPosition == 'site') {
        leftFront(siteImage);
        centreFront(facebookImage);
        rightBehind(videoImage);
        galleryPosition = 'facebook';
    }
    else if (galleryPosition == 'video') {
        leftFront(videoImage);
        centreFront(siteImage);
        rightBehind(facebookImage);
        galleryPosition = 'site';
    }
}

function rightSwipe() {
    if (galleryPosition == 'facebook') {
        rightFront(facebookImage);
        leftBehind(videoImage);
        centreFront(siteImage);
        galleryPosition = 'site';
    }
    else if (galleryPosition == 'site') {
        rightFront(siteImage);
        leftBehind(facebookImage);
        centreFront(videoImage);
        galleryPosition = 'video';
    }
    else if (galleryPosition == 'video') {
        rightFront(videoImage);
        leftBehind(siteImage);
        centreFront(facebookImage);
        galleryPosition = 'facebook';
    }
}

function carouselItemClickHandler() {
    if (galleryPosition == 'facebook') {
        document.location.href = 'http://62.216.235.136/ad_server/click/LynxExciteFB';
    }
    else if (galleryPosition == 'site') {
        document.location.href = 'http://62.216.235.136/ad_server/click/LynxExcite';
    }
    else if (galleryPosition == 'video') {
        document.location.href = 'http://62.216.235.136/ad_server/click/LynxexciteVideo';
    }
}


var dropGirlAnimationTimeout = null;
var delayedDisplayTimeout = null;

function displayExpandedAdvert() {
	window.scrollTo(0, 1);
	delayedDisplayTimeout = setTimeout(delayedDisplay, 1000);
}

function delayedDisplay() {
    show(lynxExciteContainer);
    can.style['-webkit-transition-duration'] = '4s';
    can.style['bottom'] = '0px';

    startGirlAnimation();
}

function clearDelayedDisplayTimeout() {
    if (delayedDisplayTimeout != null) {
        clearTimeout(delayedDisplayTimeout);
        delayedDisplayTimeout = null;
    }
}

function clearDropGirlAnimationTimeout() {
    if (dropGirlAnimationTimeout != null) {
        clearTimeout(dropGirlAnimationTimeout);
        dropGirlAnimationTimeout = null;
    }
}

function clearSwipeAnimationTimeout() {
    if (swipeAnimationTimeout != null) {
        clearTimeout(swipeAnimationTimeout);
        swipeAnimationTimeout = null;
    }
}

function startGirlAnimation() {
    clearDropGirlAnimationTimeout();
    girl.style['-webkit-transition-duration'] = '2s, 1s'
    logo.style['-webkit-transition-duration'] = '5s, 5s';
    shadow.style['-webkit-transition-duration'] = '5s';
    bottomShadow.style['-webkit-transition-duration'] = '5s';
    lightShaft.style['-webkit-transition-duration'] = '5s';
    facebookImage.style['-webkit-transition-duration'] = '2s, 0s, 5s';
    videoImage.style['-webkit-transition-duration'] = '2s, 0s, 5s';
    siteImage.style['-webkit-transition-duration'] = '2s, 0s, 5s';
    dropGirlAnimationTimeout = setTimeout(dropGirl, 4000);
}

function hideExpandedAdvert() {
    girl.style['-webkit-transition-duration'] = '0s, 0s';
    logo.style['-webkit-transition-duration'] = '0s, 0s';
    shadow.style['-webkit-transition-duration'] = '0s';
    bottomShadow.style['-webkit-transition-duration'] = '0s';
    lightShaft.style['-webkit-transition-duration'] = '0s';
    facebookImage.style['-webkit-transition-duration'] = '0s, 0s, 0s';
    videoImage.style['-webkit-transition-duration'] = '0s, 0s, 0s';
    siteImage.style['-webkit-transition-duration'] = '0s, 0s, 0s';
    can.style['-webkit-transition-duration'] = '0s';

    girl.style['opacity'] = '0';
    girl.style['top'] = '-314px';
    videoImage.style['opacity'] = '0';
    swipe.style['opacity'] = '0';
    facebookImage.style['opacity'] = '0';
    siteImage.style['opacity'] = '0';
    logo.style['opacity'] = '0';
    logo.style['top'] = '-170px';
    shadow.style['opacity'] = '0';
    bottomShadow.style['opacity'] = '0';
    lightShaft.style['opacity'] = '0';

    can.style['bottom'] = '-105px';

    hide(lynxExciteContainer);
    clearDropGirlAnimationTimeout();
    clearShowCarouselTimeout();
    clearShowLogoTimeout();
    clearShineLightTimeout();
    clearFadeToBlackTimeout();
    clearDelayedDisplayTimeout();
}

var imagesToLoadCount = 0;
var loadedImagesCount = 0;

function preloadImage(imageUrl) {
    imagesToLoadCount++;
    var image1 = new Image();
	image1.addEventListener('load', function() {
        loadedImagesCount++;
        var loadedPercent = (100*loadedImagesCount)/imagesToLoadCount;
	    var progressBar = document.getElementById('progressBar');
	    progressBar.style.width = loadedPercent + '%';
	}, false);
	image1.src = imageUrl;
}

function isImagesPreloadComplete() {
    return (loadedImagesCount == imagesToLoadCount);
}


function preloadImages() {

    var imageAssetsToPreload = new Array('https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/girl.png',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/product.png',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/shadow-overlay.png',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/shadow-bottom.png',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/close_button.png',
			'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/light-shaft.jpg',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/logo.png',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/facebook-cta.png',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/video-cta.png',
            'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/site-cta.png');

    for(var i=0;i<imageAssetsToPreload.length;i++) {
        preloadImage(imageAssetsToPreload[i]);
    }
}


var loadingPageTimer = null;
var preloadImagesComplete = false;

function prepareToDisplayExpandedAdvert() {
	recordEvent('http://62.216.235.136/ad_server/click/LynxExciteCT');
    if(preloadImagesComplete) {
        displayExpandedAdvert();
    } else {
        showLoadingPage();
    }
}

function showLoadingPage() {
    loadingPage.style['visibility'] = 'visible';
    loadingPageTimer = setInterval(checkPreloadIsComplete, 500);
    preloadImages();
}

function checkPreloadIsComplete() {
    if(isImagesPreloadComplete()) {
        preloadImagesComplete = true;
        clearInterval(loadingPageTimer);

        loadingPageTimer = null;
        setTimeout(function() {
            loadingPage.style['visibility'] = 'hidden';
            displayExpandedAdvert();
        }, 1000);
    }
}