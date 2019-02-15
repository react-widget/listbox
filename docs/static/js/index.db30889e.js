/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Demo.js":
/*!**************************!*\
  !*** ./examples/Demo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./examples/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: _DemoList.default[0]
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./examples/DemoList.js":
/*!******************************!*\
  !*** ./examples/DemoList.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./examples/demos/demo1.js"));

// import Demo2 from './demos/Demo2';
// import Demo3 from './demos/Demo3';
// import Demo4 from './demos/Demo4';
var _default = [{
  label: '基本功能',
  component: _demo.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/demo1.js":
/*!*********************************!*\
  !*** ./examples/demos/demo1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "./src/index.js"));

var ListItem = _src.default.ListItem,
    ListItemGroup = _src.default.ListItemGroup;
var dataset = [];
var uuid = 100;

for (var i = 0; i < 10; i++) {
  var items = [];
  var d = {
    items: items,
    label: '分组' + (i + 1)
  };
  dataset.push(d);

  for (var j = 0; j < 40; j++) {
    var _d = {
      value: uuid++,
      label: '选项' + (j + 1),
      disabled: j % 2
    };
    items.push(_d);
  }
}

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      value: 2
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (value) {
      _this.setState({
        value: value
      });

      console.log('changed ', value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange2", function (value) {
      console.log('changed ', value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "filterMsg", '');
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, _react.default.createElement(_src.default, {
        style: {
          maxWidth: 300,
          maxHeight: 400,
          height: 400
        },
        autoFocus: true,
        renderHeader: function renderHeader() {
          return _react.default.createElement("h3", null, "header");
        },
        renderFooter: function renderFooter() {
          return _react.default.createElement("h3", null, "footer");
        },
        headerStyle: {
          borderBottom: '1px solid #ccc'
        },
        footerStyle: {
          borderTop: '1px solid #ccc'
        },
        value: this.state.value,
        onChange: this.handleChange,
        items: dataset.filter(function (item, i) {
          return item.label.indexOf(_this2.filterMsg) >= 0;
        }),
        emptyLabel: "\u65E0\u5339\u914D\u9879"
      }), _react.default.createElement(_src.default, {
        multiple: true,
        disabled: false,
        labelInValue: true,
        onChange: this.handleChange2,
        defaultValue: "V03",
        style: {
          maxWidth: 300,
          height: 400
        }
      }, _react.default.createElement(ListItemGroup, {
        label: "V"
      }, _react.default.createElement(ListItem, {
        value: "V01"
      }, "V01", _react.default.createElement("span", {
        style: {
          position: 'absolute',
          right: 10,
          top: 0
        }
      }, _react.default.createElement("strong", null, "Hot"))), _react.default.createElement(ListItem, {
        value: "V02"
      }, "V02"), _react.default.createElement(ListItem, {
        value: "V03"
      }, "V03"), _react.default.createElement(ListItem, {
        value: "V04"
      }, "V04")), _react.default.createElement(ListItemGroup, {
        label: "X"
      }, _react.default.createElement(ListItem, {
        value: "X01"
      }, "X01"), _react.default.createElement(ListItem, {
        value: "X02"
      }, "X02"), _react.default.createElement(ListItem, {
        value: "X03"
      }, "X03"), _react.default.createElement(ListItem, {
        value: "X04"
      }, "X04"))));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

__webpack_require__(/*! ./style/index.scss */ "./examples/style/index.scss");

__webpack_require__(/*! ./style/animate.scss */ "./examples/style/animate.scss");

__webpack_require__(/*! react-widget-scrollview/lib/style/index.css */ "./node_modules/react-widget-scrollview/lib/style/index.css");

__webpack_require__(/*! ../src/style/index.scss */ "./src/style/index.scss");

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./examples/Demo.js"));

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./examples/style/animate.scss":
/*!*************************************!*\
  !*** ./examples/style/animate.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./examples/style/index.scss":
/*!***********************************!*\
  !*** ./examples/style/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/ListBox.js":
/*!************************!*\
  !*** ./src/ListBox.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _object = _interopRequireDefault(__webpack_require__(/*! object.omit */ "./node_modules/object.omit/index.js"));

var _ListItem = _interopRequireDefault(__webpack_require__(/*! ./ListItem */ "./src/ListItem.js"));

var _ListItemGroup = _interopRequireDefault(__webpack_require__(/*! ./ListItemGroup */ "./src/ListItemGroup.js"));

var _util = __webpack_require__(/*! ./util */ "./src/util.js");

var _classes = __webpack_require__(/*! bplokjs-dom-utils/classes */ "./node_modules/bplokjs-dom-utils/classes.js");

var _scrollIntoView = _interopRequireDefault(__webpack_require__(/*! bplokjs-dom-utils/scrollIntoView */ "./node_modules/bplokjs-dom-utils/scrollIntoView.js"));

//import ScrollView from 'react-widget-scrollview';
function noop() {}

function copy(data) {
  return (0, _util.isArray)(data) ? [].concat(data) : data;
}

var ListBox =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ListBox, _React$Component);

  function ListBox(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, ListBox);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListBox).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onItemClick", function (item, e) {
      var onItemClick = _this.props.onItemClick;

      if (e) {
        (0, _scrollIntoView.default)(e.target);
      } //this.getListView().scrollIntoView(e.target);


      if (onItemClick) onItemClick(item);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onItemSelect", function (item, el) {
      var valueField = 'value';

      _this.setValue(item[valueField]);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onItemDeselect", function (item, el) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange,
          labelInValue = _this$props.labelInValue;
      var selectedValue = _this.state.selectedValue;
      var valueField = 'value';
      if (!multiple) return;
      var newSelectedValue = selectedValue.filter(function (d) {
        return !(0, _util.isEqual)(item[valueField], d);
      });

      if (!('value' in _this.props)) {
        _this.setState({
          selectedValue: newSelectedValue
        });
      }

      if (onChange) {
        onChange(_this.transformChangeValue(copy(newSelectedValue)));
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onKeyDown", function (e) {
      var prefixCls = _this.props.prefixCls;
      var selector = ".".concat(prefixCls, "-item:not(.").concat(prefixCls, "-item-disabled)");
      var activeCls = "".concat(prefixCls, "-item-active");
      var selectCls = "".concat(prefixCls, "-item-selected");
      var list = null; //NodeList[]

      function getActiveIndex(keyCode) {
        var idx = -1;
        var UP = keyCode === 38;
        var DOWN = keyCode === 40;
        var sIdx = -1;

        if (list) {
          //ie no support NodeList.prototype.forEach
          (0, _util.each)(list, function (item, i) {
            if ((0, _classes.hasClass)(item, activeCls)) {
              (0, _classes.removeClass)(item, activeCls);

              if (UP) {
                if (idx === -1) idx = i;
              } else {
                idx = i;
              }
            } else if (idx === -1 && (0, _classes.hasClass)(item, selectCls)) {
              sIdx = i;
            }
          });
        }

        return idx === -1 ? sIdx : idx;
      }

      var props = _this.props;
      var state = _this.state;
      var dom = (0, _reactDom.findDOMNode)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      var UP = e.keyCode === 38;
      var DOWN = e.keyCode === 40;
      var ENTER = e.keyCode === 13;
      var indexValueMap = _this._indexValueMap;
      var activeIndex = _this._activeIndex;

      if (props.enableDownUpSelect) {
        props.onKeyDown(e);
      }

      if (!list) {
        list = dom.querySelectorAll(selector);
      }

      if (!list.length) return;
      var minIndex = 0;
      var maxIndex = list.length - 1;

      if (UP || DOWN) {
        e.preventDefault();
        var idx = getActiveIndex(e.keyCode);

        if (UP) {
          idx = idx === -1 ? maxIndex : --idx;
          if (idx < 0) idx = maxIndex;
          (0, _classes.addClass)(list[idx], activeCls);
        } else {
          idx = idx === -1 ? minIndex : ++idx;
          if (idx > maxIndex) idx = 0;
          (0, _classes.addClass)(list[idx], activeCls);
        }

        _this._activeIndex = list[idx].getAttribute('data-index');
        (0, _scrollIntoView.default)(list[idx]); //scrollview.scrollIntoView(list[idx]);
      } else if (ENTER && activeIndex !== null) {
        var value = indexValueMap[activeIndex];
        var item = state.itemsMap[value] || {};

        _this.setValue(value); //触发onItemClick


        _this.onItemClick({
          value: value,
          label: item[props.labelField]
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveListView", function (node) {
      _this._listview = node;
    });
    var _selectedValue = [];

    var _value; // if (!isUndefined(props.value)) {
    //     value = isArray(props.value) ? props.value : [props.value];
    // } else if (!isUndefined(props.defaultValue)) {
    //     value = isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
    // }


    if (!(0, _util.isUndefined)(_props.defaultValue)) {
      _value = (0, _util.isArray)(_props.defaultValue) ? _props.defaultValue : [_props.defaultValue];
    }

    if (_value) {
      _selectedValue.push.apply(_selectedValue, (0, _toConsumableArray2.default)(_value));
    } //item 索引id


    _this._itemIndex = 0; //索引值对应的item.value

    _this._indexValueMap = {};
    _this._activeIndex = null;
    _this.state = {
      selectedValue: _selectedValue,
      //items的value=>item对应表
      itemsMap: {}
    };
    return _this;
  }

  (0, _createClass2.default)(ListBox, [{
    key: "componentDidMount",
    // componentWillReceiveProps({ value }) {
    //     if (!isUndefined(value)) {
    //         this.setState({
    //             selectedValue: isArray(value) ? copy(value) : [value]
    //         });
    //     }
    // }
    value: function componentDidMount() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          autoFocus = _this$props2.autoFocus;
      var el = (0, _reactDom.findDOMNode)(this); //const scrollview = this.getListView();//this.refs.listbox;

      var selector = ".".concat(prefixCls, "-item-selected");

      if (autoFocus) {
        this.focus();
      }

      var selectedItem = el.querySelector(selector);

      if (selectedItem) {
        (0, _scrollIntoView.default)(selectedItem); //scrollview.scrollIntoView(selectedItem);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      (0, _reactDom.findDOMNode)(this).focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      (0, _reactDom.findDOMNode)(this).blur();
    }
  }, {
    key: "transformChangeValue",
    value: function transformChangeValue(value) {
      var labelInValue = this.props.labelInValue;
      var itemsMap = this.state.itemsMap;

      if (labelInValue) {
        return (0, _util.isArray)(value) ? value.map(function (v) {
          return itemsMap[v];
        }) : itemsMap[value];
      }

      return value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this$props3 = this.props,
          multiple = _this$props3.multiple,
          onChange = _this$props3.onChange;
      var _this$state = this.state,
          selectedValue = _this$state.selectedValue,
          itemsMap = _this$state.itemsMap;

      if (!multiple) {
        selectedValue.length = 0;
      }

      selectedValue.push(value);

      if (!('value' in this.props)) {
        this.setState({
          selectedValue: selectedValue
        });
      }

      if (onChange) {
        onChange(this.transformChangeValue(multiple ? copy(selectedValue) : selectedValue[0]));
      }
    }
  }, {
    key: "getVaule",
    value: function getVaule() {
      var multiple = this.props.multiple;
      var selectedValue = this.state.selectedValue;
      return this.transformChangeValue(multiple ? copy(selectedValue) : selectedValue[0]);
    }
  }, {
    key: "renderListItems",
    value: function renderListItems(items, selectedMap) {
      var _this2 = this;

      var _this$props4 = this.props,
          labelField = _this$props4.labelField,
          valueField = _this$props4.valueField,
          itemsField = _this$props4.itemsField,
          prefixCls = _this$props4.prefixCls,
          disabled = _this$props4.disabled;
      var itemsMap = this.state.itemsMap;
      return items.map(function (item) {
        if (typeof item === 'string' || typeof item === 'number') {
          var _item;

          item = (_item = {}, (0, _defineProperty2.default)(_item, labelField, item), (0, _defineProperty2.default)(_item, valueField, item), _item);
        }

        var isGroup = item[itemsField];
        var itemPrefixCls = "".concat(prefixCls, "-item");
        var activeCls = "".concat(prefixCls, "-item-active");
        var onMouseEnter = noop;
        var onMouseLeave = noop;
        var itemIndex = _this2._itemIndex++;

        if (!isGroup) {
          itemsMap[item[valueField]] = item;
          _this2._indexValueMap[itemIndex] = item[valueField];

          if (!disabled && !item.disabled) {
            onMouseEnter = function onMouseEnter(e) {
              (0, _classes.addClass)(e.currentTarget, activeCls);
            };

            onMouseLeave = function onMouseLeave(e) {
              (0, _classes.removeClass)(e.currentTarget, activeCls);
            };
          }
        }

        return !isGroup ? _react.default.createElement(_ListItem.default, {
          key: item[valueField],
          value: item[valueField],
          prefixCls: itemPrefixCls,
          selected: selectedMap[item[valueField]],
          disabled: disabled || !!item.disabled,
          "data-index": itemIndex,
          onClick: _this2.onItemClick,
          onSelect: _this2.onItemSelect,
          onDeselect: _this2.onItemDeselect,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        }, item[labelField]) : _react.default.createElement(_ListItemGroup.default, {
          prefixCls: "".concat(itemPrefixCls, "-group"),
          key: item[labelField],
          label: item[labelField]
        }, _this2.renderListItems(item[itemsField] || [], selectedMap));
      });
    }
  }, {
    key: "renderListChild",
    value: function renderListChild(children, selectedMap) {
      var _this3 = this;

      var _this$props5 = this.props,
          labelField = _this$props5.labelField,
          valueField = _this$props5.valueField,
          itemsField = _this$props5.itemsField,
          prefixCls = _this$props5.prefixCls,
          disabled = _this$props5.disabled;
      var itemsMap = this.state.itemsMap;
      var itemPrefixCls = "".concat(prefixCls, "-item");
      var activeCls = "".concat(prefixCls, "-item-active");
      return _react.default.Children.map(children, function (child) {
        var props = child.props;

        if (child.type.isListItemGroup) {
          return _react.default.cloneElement(child, {
            prefixCls: "".concat(itemPrefixCls, "-group")
          }, _this3.renderListChild(props.children, selectedMap));
        }

        var onMouseEnter = noop;
        var onMouseLeave = noop;
        var itemIndex = _this3._itemIndex++;
        itemsMap[props[valueField]] = (0, _assign.default)({}, (0, _object.default)(props, ['children', 'selected', 'prefixCls']), (0, _defineProperty2.default)({}, labelField, props.children));
        _this3._indexValueMap[itemIndex] = props[valueField];

        if (!props.disabled && !disabled) {
          onMouseEnter = function onMouseEnter(e) {
            (0, _classes.addClass)(e.currentTarget, activeCls);
            if (props.onMouseEnter) props.onMouseEnter(e);
          };

          onMouseLeave = function onMouseLeave(e) {
            (0, _classes.removeClass)(e.currentTarget, activeCls);
            if (props.onMouseLeave) props.onMouseLeave(e);
          };
        }

        var newProps = {
          selected: selectedMap[props[valueField]],
          prefixCls: itemPrefixCls,
          'data-index': itemIndex,
          onClick: _this3.onItemClick,
          onSelect: _this3.onItemSelect,
          onDeselect: _this3.onItemDeselect,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        };

        if (disabled) {
          newProps.disabled = true;
        }

        return _react.default.cloneElement(child, newProps);
      });
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this$props6 = this.props,
          labelField = _this$props6.labelField,
          valueField = _this$props6.valueField,
          prefixCls = _this$props6.prefixCls,
          multiple = _this$props6.multiple,
          items = _this$props6.items,
          emptyLabel = _this$props6.emptyLabel,
          children = _this$props6.children;
      var selectedValue = this.state.selectedValue;
      this.state.itemsMap = {};
      var selectedMap = {};
      selectedValue.forEach(function (v) {
        return selectedMap[v] = true;
      });
      this._itemIndex = 0;
      this._indexValueMap = {};
      this._activeIndex = null;
      var childs = items.length ? this.renderListItems(items, selectedMap) : this.renderListChild(children, selectedMap);
      return _react.default.Children.count(childs) ? childs : emptyLabel;
    }
  }, {
    key: "getListView",
    value: function getListView() {
      return (0, _reactDom.findDOMNode)(this._listview);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props7 = this.props,
          className = _this$props7.className,
          value = _this$props7.value,
          prefixCls = _this$props7.prefixCls,
          items = _this$props7.items,
          width = _this$props7.width,
          height = _this$props7.height,
          tabIndex = _this$props7.tabIndex,
          disabled = _this$props7.disabled,
          enableDownUpSelect = _this$props7.enableDownUpSelect,
          onKeyDown = _this$props7.onKeyDown,
          onFocus = _this$props7.onFocus,
          onBlur = _this$props7.onBlur,
          _this$props7$style = _this$props7.style,
          style = _this$props7$style === void 0 ? {} : _this$props7$style,
          _this$props7$bodyStyl = _this$props7.bodyStyle,
          bodyStyle = _this$props7$bodyStyl === void 0 ? {} : _this$props7$bodyStyl,
          WrapperComponent = _this$props7.wrapperComponent,
          HeaderWrapperComponent = _this$props7.headerWrapperComponent,
          BodyWrapperComponent = _this$props7.bodyWrapperComponent,
          FooterWrapperComponent = _this$props7.footerWrapperComponent,
          renderHeader = _this$props7.renderHeader,
          renderFooter = _this$props7.renderFooter,
          _this$props7$headerSt = _this$props7.headerStyle,
          headerStyle = _this$props7$headerSt === void 0 ? {} : _this$props7$headerSt,
          _this$props7$footerSt = _this$props7.footerStyle,
          footerStyle = _this$props7$footerSt === void 0 ? {} : _this$props7$footerSt;

      if (width) {
        style.width = width;
      }

      if (height) {
        style.height = height;
      }

      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classNames, className, className), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames)); // scrollViewBodyCls={`${prefixCls}-body`}
      // scrollViewBodyStyle={scrollViewBodyStyle}

      return _react.default.createElement(WrapperComponent, {
        ref: this.saveListView,
        tabIndex: tabIndex,
        className: classes,
        style: style,
        onKeyDown: enableDownUpSelect ? this.onKeyDown : onKeyDown,
        onFocus: onFocus,
        onBlur: onBlur
      }, renderHeader ? _react.default.createElement(HeaderWrapperComponent, {
        className: "".concat(prefixCls, "-header"),
        style: headerStyle
      }, renderHeader()) : null, _react.default.createElement(BodyWrapperComponent, {
        className: "".concat(prefixCls, "-body"),
        style: bodyStyle
      }, this.renderList()), renderFooter ? _react.default.createElement(FooterWrapperComponent, {
        className: "".concat(prefixCls, "-footer"),
        style: footerStyle
      }, renderFooter()) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var value = nextProps.value;

      if (!(0, _util.isUndefined)(value)) {
        return {
          selectedValue: (0, _util.isArray)(value) ? copy(value) : [value]
        };
      }

      return {};
    }
  }]);
  return ListBox;
}(_react.default.Component);

exports.default = ListBox;
(0, _defineProperty2.default)(ListBox, "propTypes", {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  headerStyle: _propTypes.default.object,
  footerStyle: _propTypes.default.object,
  bodyStyle: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  valueField: _propTypes.default.string,
  labelField: _propTypes.default.string,
  itemsField: _propTypes.default.string,
  items: _propTypes.default.array,
  emptyLabel: _propTypes.default.any,
  multiple: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelInValue: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  enableDownUpSelect: _propTypes.default.bool,
  onItemClick: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  //scrollViewComponent: PropTypes.any,
  renderHeader: _propTypes.default.func,
  renderFooter: _propTypes.default.func,
  wrapperComponent: _propTypes.default.node,
  headerWrapperComponent: _propTypes.default.node,
  bodyWrapperComponent: _propTypes.default.node,
  footerWrapperComponent: _propTypes.default.node
});
(0, _defineProperty2.default)(ListBox, "defaultProps", {
  prefixCls: 'rw-listbox',
  valueField: 'value',
  labelField: 'label',
  itemsField: 'items',
  labelInValue: false,
  tabIndex: 0,
  items: [],
  emptyLabel: null,
  enableDownUpSelect: true,
  onFocus: noop,
  onBlur: noop,
  onKeyDown: noop,
  //scrollViewComponent: ScrollView,
  wrapperComponent: "div",
  headerWrapperComponent: 'div',
  bodyWrapperComponent: 'div',
  footerWrapperComponent: 'div'
});

/***/ }),

/***/ "./src/ListItem.js":
/*!*************************!*\
  !*** ./src/ListItem.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _shallowequal = _interopRequireDefault(__webpack_require__(/*! shallowequal */ "./node_modules/shallowequal/index.js"));

var _object = _interopRequireDefault(__webpack_require__(/*! object.omit */ "./node_modules/object.omit/index.js"));

var ListItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ListItem, _React$Component);

  function ListItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ListItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemClick", function (e) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          onDeselect = _this$props.onDeselect,
          onClick = _this$props.onClick,
          selected = _this$props.selected,
          disabled = _this$props.disabled,
          value = _this$props.value,
          children = _this$props.children;
      if (disabled) return;
      var item = {
        value: value,
        label: children
      };

      if (onClick) {
        onClick(item, e);
      }

      if (!selected) {
        onSelect && onSelect(item, _this.refs.item);
      } else {
        onDeselect && onDeselect(item, _this.refs.item);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveItem", function (item) {
      _this.node = item;
    });
    return _this;
  }

  (0, _createClass2.default)(ListItem, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !(0, _shallowequal.default)(this.props, nextProps) || !(0, _shallowequal.default)(this.state, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          disabled = _this$props2.disabled,
          selected = _this$props2.selected,
          active = _this$props2.active,
          children = _this$props2.children;
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-selected"), selected), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
      var others = (0, _object.default)(this.props, (0, _keys.default)(ListItem.propTypes));
      return _react.default.createElement("div", (0, _extends2.default)({}, others, {
        ref: this.saveItem,
        className: classes,
        onClick: this.handleItemClick
      }), children);
    }
  }]);
  return ListItem;
}(_react.default.Component);

exports.default = ListItem;
(0, _defineProperty2.default)(ListItem, "propTypes", {
  prefixCls: _propTypes.default.string,
  value: _propTypes.default.any,
  onSelect: _propTypes.default.func,
  onDeselect: _propTypes.default.func,
  onClick: _propTypes.default.func,
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool
});
(0, _defineProperty2.default)(ListItem, "defaultProps", {
  prefixCls: 'rw-listbox-item',
  value: '',
  selected: false,
  disabled: false
});
(0, _defineProperty2.default)(ListItem, "isListItem", true);

/***/ }),

/***/ "./src/ListItemGroup.js":
/*!******************************!*\
  !*** ./src/ListItemGroup.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

//import PropTypes from 'prop-types';
var ItemGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ItemGroup, _React$Component);

  function ItemGroup() {
    (0, _classCallCheck2.default)(this, ItemGroup);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ItemGroup).apply(this, arguments));
  }

  (0, _createClass2.default)(ItemGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          label = _this$props.label,
          children = _this$props.children;
      return _react.default.createElement("div", {
        className: prefixCls
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-title")
      }, label), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-list")
      }, children));
    }
  }]);
  return ItemGroup;
}(_react.default.Component);

exports.default = ItemGroup;
(0, _defineProperty2.default)(ItemGroup, "defaultProps", {
  prefixCls: 'rw-listbox-item-group',
  label: ''
});
(0, _defineProperty2.default)(ItemGroup, "isListItemGroup", true);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ListBox", {
  enumerable: true,
  get: function get() {
    return _ListBox.default;
  }
});
Object.defineProperty(exports, "ListItem", {
  enumerable: true,
  get: function get() {
    return _ListItem.default;
  }
});
Object.defineProperty(exports, "ListItemGroup", {
  enumerable: true,
  get: function get() {
    return _ListItemGroup.default;
  }
});
exports.default = void 0;

var _ListBox = _interopRequireDefault(__webpack_require__(/*! ./ListBox */ "./src/ListBox.js"));

var _ListItem = _interopRequireDefault(__webpack_require__(/*! ./ListItem */ "./src/ListItem.js"));

var _ListItemGroup = _interopRequireDefault(__webpack_require__(/*! ./ListItemGroup */ "./src/ListItemGroup.js"));

_ListBox.default.ListItemGroup = _ListItemGroup.default;
_ListBox.default.ListItem = _ListItem.default;
var _default = _ListBox.default;
exports.default = _default;

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.isUndefined = isUndefined;
exports.isEqual = isEqual;
exports.noop = noop;
exports.each = each;
exports.isArray = void 0;

var _isArray = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js"));

var ObjProto = Object.prototype;
var toString = ObjProto.toString;
var nativeIsArray = _isArray.default;

function isNumber(obj) {
  return typeof obj === 'number';
}

var isArray = nativeIsArray ? nativeIsArray : function (value) {
  return toString.call(value) === '[object Array]';
};
exports.isArray = isArray;

function isUndefined(obj) {
  return obj === undefined;
}

function isEqual(a, b) {
  return String(a) === String(b);
}

function noop() {}

function each(obj, iterator, context) {
  if (obj == null) return obj;
  var i,
      length,
      hasContext = context === void 0 ? false : true;

  for (i = 0, length = obj.length; i < length; i++) {
    if (iterator.call(hasContext ? context : obj[i], obj[i], i, obj) === false) break;
  }

  return obj;
}

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./node_modules/packez/lib/fetchPolyfills.js ./node_modules/packez/lib/polyfills.js ./examples/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\listbox\node_modules\packez\lib\fetchPolyfills.js */"./node_modules/packez/lib/fetchPolyfills.js");
__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\listbox\node_modules\packez\lib\polyfills.js */"./node_modules/packez/lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-projects\react-widget\listbox\examples\index.js */"./examples/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.db30889e.js.map