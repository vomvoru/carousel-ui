// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({23:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],6:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":23}],25:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],30:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],31:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (array, index) {
  var len = array.length;
  return (len + index % len) % len;
};
},{}],26:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./style.css');

var _getFixedIndex = require('../getFixedIndex');

var _getFixedIndex2 = _interopRequireDefault(_getFixedIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(_ref) {
  var width = _ref.width,
      height = _ref.height,
      num = _ref.num,
      srcList = _ref.srcList,
      _ref$startIndex = _ref.startIndex,
      startIndex = _ref$startIndex === undefined ? 0 : _ref$startIndex;

  var resetWidth = function resetWidth() {
    container.style.width = width * num;
  };

  var getImage = function getImage(index) {
    var fixedIndex = (0, _getFixedIndex2.default)(srcList, index);

    var src = srcList[fixedIndex];
    var image = new Image(width, height);
    image.src = src;

    return image;
  };

  var next = function next() {
    current += 1;

    var newImage = getImage(current + (num - 1));
    container.insertAdjacentElement('beforeend', newImage);

    var firstImage = container.querySelector('img:first-child');
    firstImage.remove();
  };

  var pre = function pre() {
    current -= 1;

    var newImage = getImage(current);
    container.insertAdjacentElement('afterbegin', newImage);

    var lastImage = container.querySelector('img:last-child');
    lastImage.remove();
  };

  var container = document.createElement('div');
  container.className = 'images-container';
  resetWidth();

  var current = startIndex;
  for (var i = 0; i < num; i += 1) {
    var image = getImage(current + i);
    container.insertAdjacentElement('beforeend', image);
  }
  // current += num

  return {
    next: next,
    pre: pre,
    addSrc: function addSrc(src) {
      srcList.psuh(src);
      resetWidth();
    },
    removeSrc: function removeSrc(targetSrc) {
      srcList = srcList.filter(function (src) {
        return src === targetSrc;
      });
      resetWidth();
    },
    getContainer: function getContainer() {
      return container;
    }
  };
};

exports.default = {
  create: create
};
},{"./style.css":30,"../getFixedIndex":31}],32:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],27:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./style.css');

var create = function create(_ref) {
  var initX = _ref.initX,
      moveWidth = _ref.moveWidth,
      _ref$duration = _ref.duration,
      duration = _ref$duration === undefined ? 500 : _ref$duration;

  var initTransform = 'translateX(' + initX + 'px)';

  var container = document.createElement('div');
  container.className = 'slide-container';
  container.style.transform = initTransform;

  var callStack = Promise.resolve();

  var moveX = function moveX(targetX) {
    callStack = callStack.then(function () {
      return new Promise(function (resolve) {
        container.animate([{ transform: initTransform }, { transform: 'translateX(' + targetX + 'px)' }], {
          duration: duration
        }).addEventListener('finish', function () {
          return resolve();
        });
      });
    });

    return callStack;
  };

  var moveLeft = function moveLeft() {
    return moveX(initX - moveWidth);
  };
  var moveRight = function moveRight() {
    return moveX(initX + moveWidth);
  };

  return {
    moveLeft: moveLeft,
    moveRight: moveRight,
    getContainer: function getContainer() {
      return container;
    }
  };
};

exports.default = {
  create: create
};
},{"./style.css":32}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./style.css');

var _Images = require('../Images');

var _Images2 = _interopRequireDefault(_Images);

var _Slide = require('../Slide');

var _Slide2 = _interopRequireDefault(_Slide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(_ref) {
  var width = _ref.width,
      height = _ref.height,
      _ref$startCenterIndex = _ref.startCenterIndex,
      startCenterIndex = _ref$startCenterIndex === undefined ? 0 : _ref$startCenterIndex,
      _ref$numVisibleLeftIm = _ref.numVisibleLeftImg,
      numVisibleLeftImg = _ref$numVisibleLeftIm === undefined ? 0 : _ref$numVisibleLeftIm,
      _ref$numVisibleRightI = _ref.numVisibleRightImg,
      numVisibleRightImg = _ref$numVisibleRightI === undefined ? 0 : _ref$numVisibleRightI,
      _ref$numHiddenLeftImg = _ref.numHiddenLeftImg,
      numHiddenLeftImg = _ref$numHiddenLeftImg === undefined ? 1 : _ref$numHiddenLeftImg,
      _ref$numHiddenRightIm = _ref.numHiddenRightImg,
      numHiddenRightImg = _ref$numHiddenRightIm === undefined ? 1 : _ref$numHiddenRightIm,
      _ref$srcList = _ref.srcList,
      srcList = _ref$srcList === undefined ? [] : _ref$srcList,
      _ref$bothVisibleWidth = _ref.bothVisibleWidth,
      bothVisibleWidth = _ref$bothVisibleWidth === undefined ? 0 : _ref$bothVisibleWidth;

  var container = document.createElement('div');
  container.className = 'slide-carousel-container';
  container.style.width = width * (numVisibleLeftImg + numVisibleRightImg + 1) + bothVisibleWidth * 2;

  var numRenderedImage = numVisibleLeftImg + numHiddenLeftImg + // 왼쪽 이미지 개수
  1 + // 가운데 이미지 개수
  numVisibleRightImg + numHiddenRightImg; // 오른쪽 이미지 개수

  var startIndex = -(numVisibleLeftImg + numHiddenLeftImg);
  var images = _Images2.default.create({
    width: width,
    height: height,
    num: numRenderedImage,
    srcList: srcList,
    startIndex: startIndex
  });
  console.log(startIndex);
  var slide = _Slide2.default.create({
    initX: -(width * numHiddenLeftImg) + bothVisibleWidth,
    moveWidth: width
  });

  var slideContainer = slide.getContainer();
  var imagesContainer = images.getContainer();

  container.appendChild(slideContainer);
  slideContainer.appendChild(imagesContainer);

  return {
    next: function next() {
      return slide.moveLeft().then(function () {
        return images.next();
      });
    },
    pre: function pre() {
      return slide.moveRight().then(function () {
        return images.pre();
      });
    },
    addSrc: function addSrc() {
      return images.addSrc.apply(images, arguments);
    },
    removeSrc: function removeSrc() {
      return images.removeSrc.apply(images, arguments);
    },
    getContainer: function getContainer() {
      return container;
    }
  };
};

exports.default = {
  create: create
};
},{"./style.css":25,"../Images":26,"../Slide":27}],9:[function(require,module,exports) {
module.exports="/1.7314aca3.jpeg";
},{}],10:[function(require,module,exports) {
module.exports="/2.ebc04d06.jpg";
},{}],11:[function(require,module,exports) {
module.exports="/3.e8cb19c4.jpg";
},{}],12:[function(require,module,exports) {
module.exports="/4.56f9fd83.png";
},{}],13:[function(require,module,exports) {
module.exports="/5.55c44b72.png";
},{}],14:[function(require,module,exports) {
module.exports="/6.fbaeb2b1.jpg";
},{}],4:[function(require,module,exports) {
'use strict';

var _SlideCarousel = require('./lib/SlideCarousel');

var _SlideCarousel2 = _interopRequireDefault(_SlideCarousel);

var _Slide = require('./lib/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _Images = require('./lib/Images');

var _Images2 = _interopRequireDefault(_Images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var srcList = [require('./img/1.jpeg'), require('./img/2.jpg'), require('./img/3.jpg'), require('./img/4.png'), require('./img/5.png'), require('./img/6.jpg')];

var width = 500;

var slideCarousel = _SlideCarousel2.default.create({
  width: width,
  height: 300,
  srcList: srcList
});

var slideCarousel2 = _SlideCarousel2.default.create({
  width: 100,
  height: 60,
  numVisibleLeftImg: 2,
  numVisibleRightImg: 2,
  srcList: srcList
});

var slideCarousel3 = _SlideCarousel2.default.create({
  width: 100,
  height: 60,
  numVisibleLeftImg: 3,
  numVisibleRightImg: 3,
  numHiddenLeftImg: 0,
  numHiddenRightImg: 0,
  srcList: srcList
});

var slideCarousel4 = _SlideCarousel2.default.create({
  width: 100,
  height: 60,
  numVisibleLeftImg: 2,
  numVisibleRightImg: 2,
  srcList: srcList
});

var slideCarousel5 = _SlideCarousel2.default.create({
  width: width,
  height: 300,
  bothVisibleWidth: 50,
  numHiddenLeftImg: 2,
  numHiddenRightImg: 2,
  srcList: srcList
});

var images = _Images2.default.create({
  width: 100,
  height: 60,
  num: 7,
  srcList: srcList,
  startIndex: -3
});

var slide = _Slide2.default.create({
  initX: -100,
  moveWidth: 100
});
var slideContainer = slide.getContainer();
slideContainer.className = 'box';
var slideContainerWrap = document.createElement('div');
slideContainerWrap.style.width = width;
slideContainerWrap.appendChild(slideContainer);

var app = document.getElementById('app');
var h11 = document.createElement('h1');
h11.textContent = '예시';
app.appendChild(h11);
app.appendChild(slideCarousel.getContainer());
app.appendChild(slideCarousel2.getContainer());
var h12 = document.createElement('h1');
h12.textContent = '원리';
app.appendChild(h12);
app.appendChild(images.getContainer());
app.appendChild(slideContainerWrap);
app.appendChild(slideCarousel3.getContainer());
app.appendChild(slideCarousel4.getContainer());
var h13 = document.createElement('h1');
h13.textContent = '옵션변경';
app.appendChild(h13);
app.appendChild(slideCarousel5.getContainer());

var next = document.getElementById('next');
var pre = document.getElementById('pre');

next.addEventListener('click', function () {
  slideCarousel.next();
  slideCarousel2.next();
  slideCarousel3.next();
  slideCarousel4.next();
  slideCarousel5.next();
  slide.moveLeft().then(function () {
    images.next();
  });
});

pre.addEventListener('click', function () {
  slideCarousel.pre();
  slideCarousel2.pre();
  slideCarousel3.pre();
  slideCarousel4.pre();
  slideCarousel5.pre();
  slide.moveRight().then(function () {
    images.pre();
  });
});
},{"./lib/SlideCarousel":21,"./lib/Slide":27,"./lib/Images":26,"./img/1.jpeg":9,"./img/2.jpg":10,"./img/3.jpg":11,"./img/4.png":12,"./img/5.png":13,"./img/6.jpg":14}],61:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51382' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[61,4])
//# sourceMappingURL=/src.69212905.map