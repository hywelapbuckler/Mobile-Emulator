var bannerHeight = 50;
var panelWidth = 320;
var panelHeight = 416;

function calculatePanelYPosition(defaultPosition, bannerHeight, panelHeight) {
    var screenSize = ormma.getSize();

    if ((panelHeight + defaultPosition.y) <= screenSize.height) {
        return defaultPosition.y;
    }
    else if ((panelHeight + defaultPosition.y) > screenSize.height && ((defaultPosition.y + bannerHeight) - panelHeight) >= 0) {
        return (defaultPosition.y + bannerHeight) - panelHeight;
    }

    return 0;
}

function calculatePanelDimensions(bannerHeight, panelWidth, panelHeight) {
    var defaultPosition = ormma.getDefaultPosition();
    var panelYPosition = calculatePanelYPosition(defaultPosition, bannerHeight, panelHeight);

    return {'x' : defaultPosition.x, 'y' : panelYPosition, 'width' : panelWidth, 'height' : panelHeight};
}

var isOrmmaAvailable = false;

function ORMMANotFound() {
    window.clearTimeout(ormmaWaitId);
    isOrmmaAvailable = false;
}

function ORMMAReady(event) {
    window.clearTimeout(ormmaWaitId);
    isOrmmaAvailable = true;
}

function callORMMAExpandIfNecessary() {
    if (isOrmmaAvailable) {
        ormma.addEventListener('stateChange', function () {
            ormma.removeEventListener('stateChange');
        });

        var dimensions = calculatePanelDimensions(bannerHeight, panelWidth, panelHeight);
        ormma.expand(dimensions, null);
    }
}

function callORMMACloseIfNecessary() {
    if (isOrmmaAvailable) {
        ormma.addEventListener('stateChange', function () {
            ormma.removeEventListener('stateChange');
        });

        ormma.close();
    }
}


var ORMMA_LOAD_TIMEOUT = 2500;
var ormmaWaitId = window.setTimeout(ORMMANotFound, ORMMA_LOAD_TIMEOUT);


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

var registerClickEvent = function (element, functionToExecute) {
    if (window.addEventListener) {
        element.addEventListener('click', functionToExecute, false);
    }
    else if (window.attachEvent) {
        element.attachEvent('onclick', functionToExecute);
    }
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

var adContainer = findAdContainerById('lynx-excite');
var panel = document.getElementById('lynx-excite-container');

var banner = createImageWithId('banner', 'https://dl.dropbox.com/u/47807983/wavetele.com/images/300x50.gif');
banner.style['position'] = 'absolute';
banner.style['width'] = '95%';
banner.style['height'] = '95%';

var closeButton = createDivWithId('closeButton');

adContainer.insertBefore(banner, panel);
panel.appendChild(closeButton);

var pixelTracker = createImageWithId('pixelTracker', 'http://view.atdmt.com/UKM/view/356577708/direct/01/');
pixelTracker.style['position'] = 'absolute';
pixelTracker.style['width'] = '1px';
pixelTracker.height['height'] = '1px';

panel.appendChild(pixelTracker)

registerClickEvent(banner, function() {
    recordEvent(clickUrl);
    prepareToDisplayExpandedAdvert();
    callORMMAExpandIfNecessary();
});
registerClickEvent(closeButton, function() {
    hideExpandedAdvert();
    callORMMACloseIfNecessary();
});


