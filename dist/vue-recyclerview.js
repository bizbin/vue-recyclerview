/*!
 * Vue-RecyclerView.js v0.4.0
 * (c) 2017 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.RecyclerView = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/* eslint-disable */
/**
 * Polyfill for Object.keys
 *
 * @see: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
 */
if (!Object.keys) {
  Object.keys = function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

      var result = [];

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    };
  }();
}

var defaultPosition = {
  x: 0,
  y: 0
};

var mouseEvent = /mouse(down|move|up)/;
var touchEvent = /touch(start|move|end)/;

function getEventPosition(e) {
  if (!e) return defaultPosition;
  if (touchEvent.test(e.type)) {
    var touch = e.touches[0];
    return {
      x: touch.clientX,
      y: touch.clientY
    };
  } else if (mouseEvent.test(e.type)) {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
  return defaultPosition;
}

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

function preventDefaultException(el, exceptions) {
  for (var i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }
  return false;
}

function assign(target, varArgs) {
  // .length of function is 2
  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}



function find(arr, handler) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (handler(arr[i], i)) {
      return arr[i];
    }
  }
}

/* eslint-disable*/
/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author surma https://github.com/surma
 * Modified by Awe @hilongjw
 */
var MAX_COUNT = Infinity;

/**
 * Construct an infinite scroller.
 * @param {Element} scroller The scrollable element to use as the infinite
 *     scroll region.
 * @param {InfiniteScrollerSource} source A provider of the content to be
 *     displayed in the infinite scroll region.
 */
function InfiniteScroller(scroller, source, options) {
  // Number of items to instantiate beyond current view in the opposite direction.
  this.RUNWAY_ITEMS = options.prerender;
  // Number of items to instantiate beyond current view in the opposite direction.
  this.RUNWAY_ITEMS_OPPOSITE = options.remain;
  // The number of pixels of additional length to allow scrolling to.
  // this.SCROLL_RUNWAY = options.SCROLL_RUNWAY || SCROLL_RUNWAY

  // The animation interval (in ms) for fading in content from tombstones.
  this.ANIMATION_DURATION_MS = options.animation_duration_ms;
  this.TOMBSTONE_CLASS = options.tombstone_class;
  this.INVISIBLE_CLASS = options.invisible_class;
  this.MAX_COUNT = options.count || MAX_COUNT;
  this.column = options.column || 1;
  this.waterflow = options.waterflow;

  this.anchorItem = {
    index: 0,
    offset: 0
  };
  this.timer = null;
  this.firstAttachedItem_ = 0;
  this.lastAttachedItem_ = 0;
  this.anchorScrollTop = 0;
  this.tombstoneSize_ = 0;
  this.tombstoneWidth_ = 0;
  this.tombstones_ = [];
  this.scroller_ = scroller;
  this.source_ = source;
  this.items_ = options.list || [];
  this.loadedItems_ = 0;
  this.requestInProgress_ = false;
  this.cacheVM = options.cacheVM;
  this.options = options;

  if (!this.source_.fetch) {
    this.setItems(options.list);
  }

  this.curPos = 0;
  this.unusedNodes = [];
  this.baseNode = document.createElement('div');

  this.scroller_.addEventListener('scroll', this.onScroll_.bind(this));
  window.addEventListener('resize', this.onResize_.bind(this));
  window.addEventListener('orientationchange', this.onResize_.bind(this));

  // Create an element to force the scroller to allow scrolling to a certain
  // point.
  // this.scrollRunway_ = document.createElement('div')

  // // Internet explorer seems to require some text in this div in order to
  // // ensure that it can be scrolled to.
  // this.scrollRunway_.textContent = ' '
  // this.scrollRunwayEnd_ = 0
  // this.scrollRunway_.style.position = 'absolute'
  // this.scrollRunway_.style.height = '1px'
  // this.scrollRunway_.style.width = '1px'
  // this.scrollRunway_.style.transition = 'transform 0.2s'
  // this.scroller_.appendChild(this.scrollRunway_)
  this.initPosList();
  this.onResize_();
}

InfiniteScroller.prototype = {

  /**
   * Called when the browser window resizes to adapt to new scroller bounds and
   * layout sizes of items within the scroller.
   */
  onResize_: function onResize_() {
    // TODO: If we already have tombstones attached to the document, it would
    // probably be more efficient to use one of them rather than create a new
    // one to measure.
    var tombstone = this.source_.createTombstone(this.baseNode.cloneNode(true));
    tombstone.style.position = 'absolute';
    this.scroller_.appendChild(tombstone);
    tombstone.classList.remove(this.INVISIBLE_CLASS);
    this.tombstoneSize_ = tombstone.offsetHeight / this.column;
    this.tombstoneWidth_ = tombstone.offsetWidth;
    this.scroller_.removeChild(tombstone);

    // Reset the cached size of items in the scroller as they may no longer be
    // correct after the item content undergoes layout.
    for (var i = 0; i < this.items_.length; i++) {
      this.items_[i].top = -1;
      this.items_[i].height = this.items_[i].width = this.items_[i].cacheHeightCount = 0;
    }
    this.onScroll_();
  },


  /**
   * Called when the scroller scrolls. This determines the newly anchored item
   * and offset and then updates the visible elements, requesting more items
   * from the source if we've scrolled past the end of the currently available
   * content.
   */
  onScroll_: function onScroll_() {
    var delta = this.scroller_.scrollTop - this.anchorScrollTop;

    if (this.scroller_.scrollTop == 0) {
      this.anchorItem = {
        index: 0,
        offset: 0
      };
    } else {
      this.anchorItem = this.calculateAnchoredItem(this.anchorItem, delta);
    }

    this.anchorScrollTop = this.scroller_.scrollTop;

    var lastScreenItem = this.calculateAnchoredItem(this.anchorItem, this.scroller_.offsetHeight);

    if (delta < 0) {
      this.fill(this.anchorItem.index - this.RUNWAY_ITEMS, lastScreenItem.index + this.RUNWAY_ITEMS_OPPOSITE);
    } else {
      this.fill(this.anchorItem.index - this.RUNWAY_ITEMS_OPPOSITE, lastScreenItem.index + this.RUNWAY_ITEMS);
    }
  },


  /**
   * Calculates the item that should be anchored after scrolling by delta from
   * the initial anchored item.
   * @param {{index: number, offset: number}} initialAnchor The initial position
   *     to scroll from before calculating the new anchor position.
   * @param {number} delta The offset from the initial item to scroll by.
   * @return {{index: number, offset: number}} Returns the new item and offset
   *     scroll should be anchored to.
   */
  calculateAnchoredItem: function calculateAnchoredItem(initialAnchor, delta) {
    if (delta === 0) return initialAnchor;
    delta += initialAnchor.offset;
    var i = initialAnchor.index;
    var tombstones = 0;
    if (delta < 0) {
      while (delta < 0 && i > 0 && this.items_[i - 1].height) {
        delta += this.items_[i - 1].height;
        i--;
      }
      tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneSize_));
    } else {
      while (delta > 0 && i < this.items_.length && this.items_[i].height && this.items_[i].height < delta) {
        delta -= this.items_[i].height;
        i++;
      }
      if (i >= this.items_.length || !this.items_[i].height) tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneSize_);
    }
    i += tombstones;
    delta -= tombstones * this.tombstoneSize_;
    i = Math.min(i, this.MAX_COUNT - 1);

    return {
      index: Math.floor(i / this.column) * this.column,
      offset: delta
    };
  },


  /**
   * Sets the range of items which should be attached and attaches those items.
   * @param {number} start The first item which should be attached.
   * @param {number} end One past the last item which should be attached.
   */
  fill: function fill(start, end) {
    this.firstAttachedItem_ = Math.max(0, start);
    this.lastAttachedItem_ = end;
    this.attachContent();
  },


  /**
   * Creates or returns an existing tombstone ready to be reused.
   * @return {Element} A tombstone element ready to be used.
   */
  getTombstone: function getTombstone() {
    var tombstone = this.tombstones_.pop();
    if (tombstone) {
      tombstone.classList.remove(this.INVISIBLE_CLASS);
      tombstone.style.opacity = 1;
      tombstone.style.transform = '';
      tombstone.style.transition = '';
      return tombstone;
    }
    return this.source_.createTombstone(this.baseNode.cloneNode(true));
  },
  layoutInView: function layoutInView(i) {
    var top = this.posList.get(Math.floor(i / this.column), i % this.column);
    if (!top) return true;
    var index = top - this.anchorScrollTop;
    return index > -window.innerHeight * .5 && index < window.innerHeight;
  },
  getUnUsedNodes: function getUnUsedNodes(clearAll) {
    if (this.waterflow) {
      for (var i = 0, len = this.items_.length; i < len; i++) {
        if (this.items_[i].node && (clearAll || !this.layoutInView(i))) {
          if (this.items_[i].vm) {
            this.clearItem(this.items_[i]);
          } else {
            this.clearTombstone(this.items_[i]);
          }
          this.items_[i].vm = null;
          this.items_[i].node = null;
        }
      }
    } else {
      for (var _i = 0, _len = this.items_.length; _i < _len; _i++) {
        if (_i === this.firstAttachedItem_) {
          _i = this.lastAttachedItem_ - 1;
          continue;
        }
        if (this.items_[_i].vm) {
          this.clearItem(this.items_[_i]);
        } else {
          this.clearTombstone(this.items_[_i]);
        }

        this.items_[_i].vm = null;
        this.items_[_i].node = null;
      }
    }
  },
  clearItem: function clearItem(item) {
    if (this.options.reuseVM) {
      this.scroller_.removeChild(item.node);
      this.source_.free(item.data);
    } else {
      if (this.cacheVM && item.node) {
        return this.scroller_.removeChild(item.node);
      }
      item.vm.$destroy();
      if (item.node) {
        this.unusedNodes.push(item.node);
      }
    }
  },
  clearTombstone: function clearTombstone(item) {
    if (item.node) {
      if (item.node.classList.contains(this.TOMBSTONE_CLASS)) {
        this.tombstones_.push(item.node);
        this.tombstones_[this.tombstones_.length - 1].classList.add(this.INVISIBLE_CLASS);
      } else {
        this.unusedNodes.push(item.node);
      }
    }
  },
  clearUnUsedNodes: function clearUnUsedNodes() {
    while (this.unusedNodes.length) {
      this.scroller_.removeChild(this.unusedNodes.pop());
    }
  },
  getNodePosition: function getNodePosition() {
    // Fix scroll position in case we have realized the heights of elements
    // that we didn't used to know.
    // TODO: We should only need to do this when a height of an item becomes
    // known above.
    this.anchorScrollTop = 0;
    for (var _i2 = 0; _i2 < this.anchorItem.index; _i2++) {
      this.anchorScrollTop += this.items_[_i2].height || this.tombstoneSize_;
    }
    this.anchorScrollTop += this.anchorItem.offset;

    this.curPos = this.anchorScrollTop - this.anchorItem.offset;
    var i = this.anchorItem.index;
    while (i > this.firstAttachedItem_) {
      this.curPos -= this.items_[i - 1].height || this.tombstoneSize_;
      i--;
    }
    while (i < this.firstAttachedItem_) {
      this.curPos += this.items_[i].height || this.tombstoneSize_;
      i++;
    }
  },
  initPosList: function initPosList() {
    var data = {};
    for (var i = 0, len = this.column; i < len; i++) {
      data[i] = this.curPos;
    }

    this.posList = {
      data: {
        0: data
      },
      get: function get(row, col) {
        if (!this.data[row]) {
          var _data = {};
          for (var _i3 = 0, _len2 = this.column; _i3 < _len2; _i3++) {
            _data[_i3] = this.curPos;
          }
          this.data[row] = _data; // Array.from({ length: this.column }).map(i => this.curPos)
        }
        if (col === undefined) return this.data[row];
        return this.data[row][col];
      },
      set: function set(row, col, val) {
        this.get(row)[col] = val;
      }
    };
  },
  tombstoneLayout: function tombstoneLayout(tombstoneAnimations) {
    var i = void 0;
    var anim = void 0;
    var x = void 0;
    for (i in tombstoneAnimations) {
      anim = tombstoneAnimations[i];
      x = i % this.column * this.items_[i].width;
      this.items_[i].node.style.transform = 'translate3d(' + x + 'px,' + (this.anchorScrollTop + anim[1]) * this.column + 'px, 0) scale(' + this.tombstoneWidth_ / this.items_[i].width + ', ' + this.tombstoneSize_ / this.items_[i].height + ')';
      // Call offsetTop on the nodes to be animated to force them to apply current transforms.
      this.items_[i].node.offsetTop;
      anim[0].offsetTop;
      this.items_[i].node.style.transition = 'transform ' + this.ANIMATION_DURATION_MS + 'ms';
    }
  },
  itemLayout: function itemLayout(tombstoneAnimations) {
    var i = void 0;
    var anim = void 0;
    var x = 0;
    var y = 0;
    var row = 0;
    var curPosList = void 0;

    var size = 0;

    for (i = this.firstAttachedItem_; i < this.lastAttachedItem_; i++) {
      anim = tombstoneAnimations[i];
      if (this.waterflow) {
        row = Math.floor(i / this.column);
      }
      x = i % this.column * (this.items_[i].width || this.tombstoneWidth_);
      y = this.waterflow ? this.posList.get(row, i % this.column) : this.curPos;
      if (anim) {
        anim[0].style.transition = 'transform ' + this.ANIMATION_DURATION_MS + 'ms, opacity ' + this.ANIMATION_DURATION_MS + 'ms';
        anim[0].style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0) scale(' + this.items_[i].width / this.tombstoneWidth_ + ', ' + this.items_[i].height / this.tombstoneSize_ + ')';
        anim[0].style.opacity = 0;
      }
      if (this.items_[i].node && this.curPos !== this.items_[i].top) {
        if (!anim) this.items_[i].node.style.transition = '';
        this.items_[i].node.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
      }
      this.items_[i].top = y;

      if ((i + 1) % this.column === 0) {
        this.curPos += (this.items_[i].height || this.tombstoneSize_) * this.column;
      }
      if (this.waterflow) {
        this.posList.set(row + 1, i % this.column, y + (this.items_[i].height || this.tombstoneSize_) * this.column);
      }
    }
  },
  setAnimatePosition: function setAnimatePosition(tombstoneAnimations) {
    this.tombstoneLayout(tombstoneAnimations);
    this.itemLayout(tombstoneAnimations);
  },
  renderItems: function renderItems() {
    var tombstoneAnimations = {};
    var node = void 0;
    var newNodes = [];
    var i = void 0;

    var last = Math.floor((this.lastAttachedItem_ + this.RUNWAY_ITEMS) / this.column) * this.column;

    if (last > this.MAX_COUNT) {
      this.lastAttachedItem_ = this.MAX_COUNT;
    }
    // Create DOM nodes.
    for (i = this.firstAttachedItem_; i < this.lastAttachedItem_; i++) {
      while (this.items_.length <= i) {
        this.addItem_();
      }
      if (this.items_[i].node) {
        // if it's a tombstone but we have data, replace it.
        if (this.items_[i].node.classList.contains(this.TOMBSTONE_CLASS) && this.items_[i].data) {
          // TODO: Probably best to move items on top of tombstones and fade them in instead.
          if (this.ANIMATION_DURATION_MS) {
            this.items_[i].node.style.zIndex = 1;
            tombstoneAnimations[i] = [this.items_[i].node, this.items_[i].top - this.anchorScrollTop];
          } else {
            this.items_[i].node.classList.add(this.INVISIBLE_CLASS);
            this.tombstones_.push(this.items_[i].node);
          }
          this.items_[i].node = null;
        } else {
          continue;
        }
      }
      if (this.waterflow) {
        if (this.layoutInView(i)) {
          if (this.items_[i].data) {
            node = this.source_.render(this.items_[i].data, this.unusedNodes.pop() || this.baseNode.cloneNode(true), this.items_[i]);
          } else {
            node = this.getTombstone();
          }
          // Maybe don't do this if it's already attached?
          node.style.position = 'absolute';
          this.items_[i].top = -1;
          // this.scroller_.appendChild(node)
          this.items_[i].node = node;
          newNodes.push(node);
        }
      } else {
        if (this.items_[i].data) {
          node = this.source_.render(this.items_[i].data, this.unusedNodes.pop() || this.baseNode.cloneNode(true), this.items_[i]);
        } else {
          node = this.getTombstone();
        }
        // Maybe don't do this if it's already attached?
        node.style.position = 'absolute';
        this.items_[i].top = -1;
        // this.scroller_.appendChild(node)
        this.items_[i].node = node;
        newNodes.push(node);
      }
    }

    var len = newNodes.length;
    for (i = 0; i < len; i++) {
      this.scroller_.appendChild(newNodes[i]);
    }
    return tombstoneAnimations;
  },
  cacheItemHeight: function cacheItemHeight(force) {
    var rect = {};
    for (var i = this.firstAttachedItem_; i < this.lastAttachedItem_; i++) {
      // cacheItemsHeight
      if (this.items_[i].data && this.items_[i].node && (force || !this.items_[i].height)) {
        this.items_[i].height = this.items_[i].node.offsetHeight / this.column;
        this.items_[i].width = this.items_[i].node.offsetWidth;
        this.items_[i].cacheHeightCount = 0;
      } else if (this.items_[i].cacheHeightCount < 10) {
        // if height's cache is not match
        this.items_[i].cacheHeightCount++;
        if (this.items_[i].height && this.items_[i].node && this.items_[i].height !== this.items_[i].node.offsetHeight / this.column) {
          this.items_[i].height = this.items_[i].node.offsetHeight / this.column;
        }
      }
    }
  },


  /**
   * Attaches content to the scroller and updates the scroll position if
   * necessary.
   */
  attachContent: function attachContent() {
    var _this = this;

    this.getUnUsedNodes();

    var tombstoneAnimations = this.renderItems();

    this.clearUnUsedNodes();

    this.cacheItemHeight();

    this.getNodePosition();

    this.setAnimatePosition(tombstoneAnimations);

    // this.setScrollRunway()

    if (this.ANIMATION_DURATION_MS) {
      // TODO: Should probably use transition end, but there are a lot of animations we could be listening to.
      setTimeout(function () {
        _this.tombstoneAnimation(tombstoneAnimations);
      }, this.ANIMATION_DURATION_MS);
    }

    this.maybeRequestContent();
  },
  setItems: function setItems(list) {
    list = list || [];
    this.items_ = list;
    this.MAX_COUNT = list.length;
  },
  scrollToIndex: function scrollToIndex(index) {
    var commonItemCount = this.lastAttachedItem_ - this.firstAttachedItem_;
    this.fill(index - commonItemCount, index + 1);
  },
  setScrollRunway: function setScrollRunway() {
    this.scrollRunwayEnd_ = Math.max(this.scrollRunwayEnd_, this.curPos + this.SCROLL_RUNWAY);
    this.scrollRunway_.style.transform = 'translate(0, ' + this.scrollRunwayEnd_ + 'px)';
    this.scroller_.scrollTop = this.anchorScrollTop;
  },
  tombstoneAnimation: function tombstoneAnimation(tombstoneAnimations) {
    var anim = void 0;
    for (var i in tombstoneAnimations) {
      anim = tombstoneAnimations[i];
      anim[0].classList.add(this.INVISIBLE_CLASS);
      this.tombstones_.push(anim[0]);
    }
    tombstoneAnimations = null;
  },


  /**
   * Requests additional content if we don't have enough currently.
   */
  maybeRequestContent: function maybeRequestContent() {
    var _this2 = this;

    // Don't issue another request if one is already in progress as we don't
    // know where to start the next request yet.
    if (this.requestInProgress_) return;
    var itemsNeeded = this.lastAttachedItem_ - this.loadedItems_;
    if (itemsNeeded <= 0) return;
    this.requestInProgress_ = true;
    if (!this.source_.fetch) return;
    this.source_.fetch(itemsNeeded, this.loadedItems_).then(function (data) {
      _this2.MAX_COUNT = data.count;
      _this2.addContent(data.list);
    });
  },


  /**
   * Adds an item to the items list.
   */
  addItem_: function addItem_() {
    this.items_.push({
      vm: null,
      data: null,
      node: null,
      height: 0,
      width: 0,
      top: 0
    });
  },


  /**
   * Adds the given array of items to the items list and then calls
   * attachContent to update the displayed content.
   * @param {Array<Object>} items The array of items to be added to the infinite
   *     scroller list.
   */
  addContent: function addContent(items) {
    if (!items.length) return;
    this.requestInProgress_ = false;

    var index = void 0;
    for (var i = 0; i < items.length; i++) {
      if (this.items_.length <= this.loadedItems_) {
        this.addItem_();
      }
      if (this.loadedItems_ <= this.MAX_COUNT) {
        index = this.loadedItems_++;
        this.items_[index].data = items[i];
      }
    }

    this.attachContent();
  },
  clear: function clear() {
    this.loadedItems_ = 0;
    this.requestInProgress_ = false;

    this.firstAttachedItem_ = -1;
    this.lastAttachedItem_ = -1;

    this.getUnUsedNodes(true);
    this.clearUnUsedNodes();

    this.items_ = [];

    this.onResize_();
  },
  destroy: function destroy() {
    this.scroller_.removeEventListener('scroll', this.onScroll_);
    window.removeEventListener('resize', this.onResize_);
    window.removeEventListener('orientationchange', this.onResize_);
    this.clear();
  }
};

var ContentSource = function () {
  function ContentSource(Vue, options) {
    var _this = this;

    classCallCheck(this, ContentSource);

    this.itemRender = options.item;
    this.TombstoneRender = options.tombstone;
    this.fetch = options.fetch;
    this.Vue = Vue;
    this.options = options;
    this.itemCache = {
      data: {},
      length: 0,
      get: function get(key) {
        return this.data[key];
      },
      set: function set(key, vm) {
        this.length++;
        this.data[key] = vm;
        if (this.length > options.cacheVM && options.cacheVM > 50) {
          this.recycle(10, key);
        }
      },
      recycle: function recycle(count, except) {
        var key = void 0;
        var keys = Object.keys(this.data);
        var len = keys.length;
        while (count) {
          count--;
          key = keys[Math.floor(Math.random() * len)];
          this.data[key] && this.length-- && this.data[key].$destroy();
          this.data[key] = null;
        }
      }
    };

    this.reuseVM = {
      queue: [
        // {
        //   inuse: false,
        //   vm: vm
        // }
      ],
      generate: function generate(data, el) {
        var item = find(_this.reuseVM.queue, function (item) {
          return !item.inuse;
        });

        // this.reuseVM.queue.find(i => !i.inuse)

        if (!item) {
          var vmOptions = {
            props: {
              data: data
            }
          };
          _this.options.props.data = data;
          if (_this.options.props) {
            Object.keys(_this.options.props).map(function (key) {
              vmOptions.props[key] = _this.options.props[key];
            });
          }
          var vmConfig = {
            el: el,
            data: vmOptions.props,
            render: function render(h) {
              return h(_this.itemRender, vmOptions);
            }
          };
          item = {
            id: data.id,
            inuse: true,
            vm: new _this.Vue(vmConfig)
          };
          _this.reuseVM.queue.push(item);
        } else {
          item.vm.data = data;
          // item.vm.$forceUpdate()
          item.inuse = true;
          item.id = data.id;
        }

        return item.vm;
      },
      free: function free(id) {
        var item = find(this.queue, function (i) {
          return i.id === id;
        });
        item.inuse = false;
      },
      destroy: function destroy(id, all) {
        for (var i = 0, len = this.queue.length; i < len; i++) {
          if (this.queue[i].id === id || all) {
            this.queue.vm && this.queue.vm.$destroy();
            this.queue.splice(i, 1);
          }
        }
      }
    };
  }

  createClass(ContentSource, [{
    key: 'createTombstone',
    value: function createTombstone(el) {
      var _this2 = this;

      var vm = new this.Vue({
        el: el,
        render: function render(h) {
          return h(_this2.TombstoneRender);
        }
      });
      return vm.$el;
    }
  }, {
    key: 'free',
    value: function free(data) {
      this.reuseVM.free(data.id);
    }
  }, {
    key: 'render',
    value: function render(data, el, item) {
      var _this3 = this;

      if (this.options.reuseVM) {
        var _vm = this.reuseVM.generate(data, el);
        item.vm = _vm;
        return _vm.$el;
      }

      var vm = void 0;
      var vmOptions = {
        props: {
          data: data
        }
      };
      this.options.props.data = data;
      if (this.options.props) {
        Object.keys(this.options.props).map(function (key) {
          vmOptions.props[key] = _this3.options.props[key];
        });
      }
      var vmConfig = {
        el: el,
        render: function render(h) {
          return h(_this3.itemRender, vmOptions);
        }
      };
      if (this.options.cacheVM) {
        vm = this.itemCache.get(data.id);
        if (vm) {
          item.vm = vm;
          return vm.$el;
        }
        vm = new this.Vue(vmConfig);
        this.itemCache.set(data.id, vm);
        item.vm = vm;
        return vm.$el;
      }
      vm = new this.Vue(vmConfig);
      item.vm = vm;
      return vm.$el;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.reuseVM.destroy(null, true);
      return this.reuseVM.queue;
    }
  }]);
  return ContentSource;
}();

var Loading = {
  render: function render(h) {
    return h('div', {
      attrs: {
        class: 'recyclerview-loading'
      }
    }, 'Loading...');
  }
};

var Tombstone = {
  render: function render(h) {
    return h('div', {
      attrs: {
        class: 'recyclerview-item tombstone'
      },
      style: {
        height: '100px',
        width: '100%'
      }
    }, '');
  }
};

var options = {
  preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/ },
  distance: 50,
  animation_duration_ms: 200,
  tombstone_class: 'tombstone',
  invisible_class: 'invisible',
  prerender: 20,
  remain: 10,
  count: Infinity,
  preventDefault: false,
  column: 1,
  waterflow: false,
  cacheVM: 0,
  reuseVM: false,
  props: {}
};

var RecyclerView = (function (Vue) {
  return {
    name: 'RecyclerView',
    props: {
      fetch: Function,
      list: Array,
      item: Object,
      loading: Object,
      tombstone: {
        type: Object,
        default: function _default() {
          return Tombstone;
        }
      },
      column: Number,
      prerender: Number,
      remain: Number,
      count: Number,
      waterflow: Boolean,
      preventDefault: Boolean,
      options: Object,
      tag: {
        type: String,
        default: 'div'
      }
    },
    render: function render(h) {
      return h(this.tag, {
        attrs: {
          class: 'recyclerview-container'
        }
      }, [h(this.loading || Loading), h(this.tag, {
        attrs: {
          class: 'recyclerview'
        },
        on: {
          touchstart: this._start,
          touchmove: this._move,
          touchend: this._end,
          touchcancel: this._end,
          mousedown: this._start,
          mousemove: this._move,
          mouseup: this._end
        }
      })]);
    },
    data: function data() {
      return {
        startPointer: {
          x: 0,
          y: 0
        },
        _options: {},
        distance: 0,
        pulling: false,
        _contentSource: null,
        scroller: null
      };
    },
    mounted: function mounted() {
      this.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.scroller.destroy();
      this.scroller = null;
    },

    methods: {
      init: function init() {
        this._options = assign({}, options, {
          prerender: this.prerender || options.prerender,
          remain: this.remain || options.remain,
          column: this.column || options.column,
          count: this.count || options.count,
          waterflow: this.waterflow || options.waterflow,
          fetch: this.fetch,
          list: this.list,
          item: this.item,
          loading: this.loading,
          tombstone: this.tombstone
        }, this.options);

        this._contentSource = new ContentSource(Vue, this._options);

        this.$list = this.$el.querySelector('.recyclerview');
        this.scroller = new InfiniteScroller(this.$list, this._contentSource, this._options);
        this.$emit('inited');
      },
      scrollToIndex: function scrollToIndex(index) {
        var _this = this;

        if (this.waterflow) {
          for (var i = 0, len = this.scroller.items_.length; i < len; i++) {
            if (i === index) {
              this._scrollTo(this.scroller.items_[i].top - this.scroller.items_[i].height * this._options.column + this.$list.offsetWidth);
            }
          }
          return;
        }
        index = Number(index);
        this.scroller.scrollToIndex(index);
        this.$nextTick(function () {
          _this._scrollToBottom();
        });
      },
      _scrollTo: function _scrollTo(top) {
        top = top || 0;
        this.$list.scrollTop = Number(top);
      },
      _scrollToBottom: function _scrollToBottom() {
        this._scrollTo(this.$list.scrollHeight);
      },
      _renderListStyle: function _renderListStyle() {
        this.$list.style.transform = 'translate3d(0, ' + this.distance + 'px, 0)';
      },
      _start: function _start(e) {
        if (this.$list.scrollTop > 0) return;
        this.pulling = true;
        this.startPointer = getEventPosition(e);
        this.$list.style.transition = 'transform .2s';
        if (this.preventDefault && !preventDefaultException(e.target, this._options.preventDefaultException)) {
          e.preventDefault();
        }
      },
      _move: function _move(e) {
        if (!this.pulling) return;
        var pointer = getEventPosition(e);
        var distance = pointer.y - this.startPointer.y;

        if (distance < 0) {
          this._scrollTo(-distance);
          return;
        }

        if (this.preventDefault && !preventDefaultException(e.target, this._options.preventDefaultException)) {
          e.preventDefault();
        }

        this.distance = Math.floor(distance * 0.5);
        if (this.distance > this._options.distance) {
          this.distance = this._options.distance;
        }
        requestAnimationFrame(this._renderListStyle.bind(this));
      },
      _end: function _end(e) {
        var _this2 = this;

        if (!this.pulling) return;
        if (this.preventDefault && !preventDefaultException(e.target, this._options.preventDefaultException)) {
          e.preventDefault();
        }
        this.pulling = false;
        this.$list.style.transition = 'transform .3s';
        this.$nextTick(function () {
          _this2.$list.style.transform = '';
        });
        if (this.distance >= this._options.distance) {
          this.distance = 0;
          this.$emit('clear');
          this.scroller.clear();
        }
      }
    }
  };
});

__$styleInject(".recyclerview-container{position:relative}.recyclerview-loading{position:absolute;top:0;left:0;width:100%;text-align:center;padding:10px;font-size:14px;color:#9e9e9e}.recyclerview{background:#fff;margin:0;padding:0;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;width:100%;height:100%;position:absolute;box-sizing:border-box;contain:layout;will-change:transform}", undefined);

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var component = RecyclerView(Vue);
  Vue.component(component.name, component);
  return component;
}

var index = {
  install: install
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}

return index;

})));
