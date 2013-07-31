var createDivWithId = function (id) {
    var element = document.createElement('div');
    element.id = id;

    return element;
}

var createImageWithId = function (id, src) {
    var element = document.createElement('img');
    element.id = id;
    element.src = src;

    return element;
}

var createUlWithId = function (id) {
    var element = document.createElement('ul');
    element.id = id;

    return element;
}

var createLiWithIdAndContent = function (id, content) {
    var element = document.createElement('li');
    element.id = id;
    element.appendChild(content);

    return element;
}

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

var recordEvent = function (url) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', url, true);
    xmlHttpRequest.send(null);
}

var adContainer = findAdContainerById('lynx-excite');

var advertStyle = document.createElement('link');
advertStyle.type = 'text/css';
advertStyle.rel = 'stylesheet';
advertStyle.href = 'ad-unit.css';
adContainer.appendChild(advertStyle);

var loadingPage = createDivWithId('loadingPage');
adContainer.appendChild(loadingPage);
loadingPage.style['visibility'] = 'hidden';
var loadingPageContent = createDivWithId('loadingPageContent');
loadingPage.appendChild(loadingPageContent);
var progressBar = createDivWithId('progressBar');
loadingPageContent.appendChild(progressBar);
progressBar.className = 'progress-bar';

var lynxExciteContainer = createDivWithId('lynx-excite-container');
adContainer.appendChild(lynxExciteContainer);
lynxExciteContainer.className = 'hide';

lynxExciteContainer.appendChild(createDivWithId('bottomShadow'));
lynxExciteContainer.appendChild(createDivWithId('can'));
lynxExciteContainer.appendChild(createDivWithId('swipe'));
lynxExciteContainer.appendChild(createDivWithId('gallerySwipeZone'));

var galleryCarouselContainer = createDivWithId('galleryCarouselContainer');
lynxExciteContainer.appendChild(galleryCarouselContainer);
var galleryCarousel = createUlWithId('galleryCarousel');
galleryCarouselContainer.appendChild(galleryCarousel);
galleryCarousel.appendChild(createLiWithIdAndContent('facebookItem', createImageWithId('facebookImage', 'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/facebook-cta.png')));
galleryCarousel.appendChild(createLiWithIdAndContent('videoItem', createImageWithId('videoImage', 'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/video-cta.png')));
galleryCarousel.appendChild(createLiWithIdAndContent('siteItem', createImageWithId('siteImage', 'https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/site-cta.png')));

lynxExciteContainer.appendChild(createDivWithId('girl'));
lynxExciteContainer.appendChild(createDivWithId('shadow'));
lynxExciteContainer.appendChild(createDivWithId('lightShaft'));
lynxExciteContainer.appendChild(createDivWithId('logo'));

recordEvent('http://62.216.235.136/ad_server/click/LynxExciteImTracker');
