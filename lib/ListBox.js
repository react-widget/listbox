
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _object = _interopRequireDefault(require("object.omit"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _ListItemGroup = _interopRequireDefault(require("./ListItemGroup"));

var _util = require("./util");

var _classes = require("bplokjs-dom-utils/classes");

// import ScrollView from '../scrollview/ScrollView';
function ScrollView(props) {
  return _react.default.createElement("div", props);
}

function noop() {}

function copy(data) {
  return (0, _util.isArray)(data) ? [].concat(data) : data;
}

var ListBox =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ListBox, _React$Component);

  function ListBox(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ListBox);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListBox).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onItemClick", function (item, e) {
      var onItemClick = _this.props.onItemClick;
      if (e) _this.getListView().scrollIntoView(e.target);
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveListView", function (node) {
      _this._listview = node;
    });
    var _selectedValue = [];
    var value;

    if (!(0, _util.isUndefined)(props.value)) {
      value = (0, _util.isArray)(props.value) ? props.value : [props.value];
    } else if (!(0, _util.isUndefined)(props.defaultValue)) {
      value = (0, _util.isArray)(props.defaultValue) ? props.defaultValue : [props.defaultValue];
    }

    if (value) {
      _selectedValue.push.apply(_selectedValue, (0, _toConsumableArray2.default)(value));
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
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value;

      if (!(0, _util.isUndefined)(value)) {
        this.setState({
          selectedValue: (0, _util.isArray)(value) ? copy(value) : [value]
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          autoFocus = _this$props2.autoFocus;
      var el = (0, _reactDom.findDOMNode)(this);
      var scrollview = this.getListView(); //this.refs.listbox;

      var selector = ".".concat(prefixCls, "-item-selected");

      if (autoFocus) {
        this.focus();
      }

      var selectedItem = el.querySelector(selector);

      if (selectedItem) {
        scrollview.scrollIntoView(selectedItem);
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
    key: "onKeyDown",
    value: function onKeyDown() {
      var _this2 = this;

      var prefixCls = this.props.prefixCls;
      var selector = ".".concat(prefixCls, "-item:not(.").concat(prefixCls, "-item-disabled)");
      var activeCls = "".concat(prefixCls, "-item-active");
      var selectCls = "".concat(prefixCls, "-item-selected");
      var list = null; //NodeList

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

      return function (e) {
        var scrollview = _this2.getListView(); //this.refs.listbox;


        var props = _this2.props;
        var state = _this2.state;
        var dom = (0, _reactDom.findDOMNode)(_this2);
        var UP = e.keyCode === 38;
        var DOWN = e.keyCode === 40;
        var ENTER = e.keyCode === 13;
        var indexValueMap = _this2._indexValueMap;
        var activeIndex = _this2._activeIndex;
        if (props.enableDownUpSelect) props.onKeyDown(e);

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

          _this2._activeIndex = list[idx].getAttribute('data-index');
          scrollview.scrollIntoView(list[idx]);
        } else if (ENTER && activeIndex !== null) {
          var value = indexValueMap[activeIndex];
          var item = state.itemsMap[value] || {};

          _this2.setValue(value); //触发onItemClick


          _this2.onItemClick({
            value: value,
            label: item[props.labelField]
          });
        }
      };
    }
  }, {
    key: "renderListItems",
    value: function renderListItems(items, markMap) {
      var _this3 = this;

      var _this$props4 = this.props,
          labelField = _this$props4.labelField,
          valueField = _this$props4.valueField,
          itemsField = _this$props4.itemsField,
          prefixCls = _this$props4.prefixCls,
          disabled = _this$props4.disabled;
      var itemsMap = this.state.itemsMap;
      return items.map(function (item) {
        if (typeof item === 'string') {
          var _item;

          item = (_item = {}, (0, _defineProperty2.default)(_item, labelField, item), (0, _defineProperty2.default)(_item, valueField, item), _item);
        }

        var isGroup = item[itemsField];
        var itemPrefixCls = "".concat(prefixCls, "-item");
        var activeCls = "".concat(prefixCls, "-item-active");
        var onMouseEnter = noop;
        var onMouseLeave = noop;
        var itemIndex = _this3._itemIndex++;

        if (!isGroup) {
          itemsMap[item[valueField]] = item;
          _this3._indexValueMap[itemIndex] = item[valueField];

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
          selected: markMap[item[valueField]],
          disabled: disabled || item.disabled,
          "data-index": itemIndex,
          onClick: _this3.onItemClick,
          onSelect: _this3.onItemSelect,
          onDeselect: _this3.onItemDeselect,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        }, item[labelField]) : _react.default.createElement(_ListItemGroup.default, {
          prefixCls: "".concat(itemPrefixCls, "-group"),
          key: item[labelField],
          label: item[labelField]
        }, _this3.renderListItems(item[itemsField] || [], markMap));
      });
    }
  }, {
    key: "renderListChild",
    value: function renderListChild(children, markMap) {
      var _this4 = this;

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
          return _react.default.cloneElement(child, {}, _this4.renderListChild(props.children, markMap));
        }

        var onMouseEnter = noop;
        var onMouseLeave = noop;
        var itemIndex = _this4._itemIndex++;
        itemsMap[props[valueField]] = (0, _assign.default)({}, (0, _object.default)(props, ['children', 'selected', 'prefixCls']), (0, _defineProperty2.default)({}, labelField, props.children));
        _this4._indexValueMap[itemIndex] = props[valueField];

        if (!props.disabled) {
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
          selected: markMap[props[valueField]],
          prefixCls: itemPrefixCls,
          'data-index': itemIndex,
          onClick: _this4.onItemClick,
          onSelect: _this4.onItemSelect,
          onDeselect: _this4.onItemDeselect,
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
    key: "getListItems",
    value: function getListItems() {
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
      var markMap = {};
      selectedValue.forEach(function (v) {
        return markMap[v] = true;
      });
      this._itemIndex = 0;
      this._indexValueMap = {};
      this._activeIndex = null;
      var childs = items.length ? this.renderListItems(items, markMap) : this.renderListChild(children, markMap);
      return _react.default.Children.count(childs) ? childs : emptyLabel;
    }
  }, {
    key: "getListView",
    value: function getListView() {
      return this._listview;
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
          _this$props7$scrollVi = _this$props7.scrollViewBodyStyle,
          scrollViewBodyStyle = _this$props7$scrollVi === void 0 ? {} : _this$props7$scrollVi;

      if (width) {
        style.width = width;
      }

      if (height) {
        style.height = height;
      }

      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classNames, className, className), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
      return _react.default.createElement(ScrollView, {
        ref: this.saveListView,
        tabIndex: tabIndex,
        scrollViewBodyCls: "".concat(prefixCls, "-body"),
        scrollViewBodyStyle: scrollViewBodyStyle,
        className: classes,
        style: style,
        onKeyDown: enableDownUpSelect ? this.onKeyDown() : onKeyDown,
        onFocus: onFocus,
        onBlur: onBlur
      }, this.getListItems());
    }
  }]);
  return ListBox;
}(_react.default.Component);

exports.default = ListBox;
(0, _defineProperty2.default)(ListBox, "propTypes", {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  scrollViewBodyStyle: _propTypes.default.object,
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
  onKeyDown: _propTypes.default.func
});
(0, _defineProperty2.default)(ListBox, "defaultProps", {
  prefixCls: 'nex-listbox',
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
  onKeyDown: noop
});