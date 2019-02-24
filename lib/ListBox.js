
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

var _scrollIntoView = _interopRequireDefault(require("bplokjs-dom-utils/scrollIntoView"));

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
        (0, _scrollIntoView.default)(e.target, _this.getListViewBody());
      }

      if (onItemClick) onItemClick(item);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onItemGroupClick", function (item, e) {
      var onItemGroupClick = _this.props.onItemGroupClick;

      if (e) {
        (0, _scrollIntoView.default)(e.target, _this.getListViewBody());
      }

      if (onItemGroupClick) onItemGroupClick(item);
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
        (0, _scrollIntoView.default)(list[idx], _this.getListViewBody()); //scrollview.scrollIntoView(list[idx]);
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveListViewHeader", function (node) {
      _this._listview_header = node;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveListViewBody", function (node) {
      _this._listview_body = node;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveListViewFooter", function (node) {
      _this._listview_footer = node;
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
    value: function componentDidMount() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          autoFocus = _this$props2.autoFocus;
      var el = (0, _reactDom.findDOMNode)(this);
      var selector = ".".concat(prefixCls, "-item-selected");

      if (autoFocus) {
        this.focus();
      }

      var selectedItem = el.querySelector(selector);

      if (selectedItem) {
        (0, _scrollIntoView.default)(selectedItem, this.getListViewBody()); //scrollview.scrollIntoView(selectedItem);
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
          childrenField = _this$props4.childrenField,
          prefixCls = _this$props4.prefixCls,
          disabled = _this$props4.disabled,
          renderMenuItem = _this$props4.renderMenuItem,
          renderMenuGroupTitle = _this$props4.renderMenuGroupTitle;
      var itemsMap = this.state.itemsMap;
      return items.map(function (item) {
        if (typeof item === 'string' || typeof item === 'number') {
          var _item;

          item = (_item = {}, (0, _defineProperty2.default)(_item, labelField, item), (0, _defineProperty2.default)(_item, valueField, item), _item);
        }

        var isGroup = item[childrenField];
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
          onMouseLeave: onMouseLeave,
          item: item
        }, renderMenuItem ? renderMenuItem(item[labelField], item) : item[labelField]) : _react.default.createElement(_ListItemGroup.default, {
          prefixCls: "".concat(itemPrefixCls, "-group"),
          key: item[labelField],
          value: item[valueField],
          onClick: _this2.onItemGroupClick,
          item: item,
          label: renderMenuGroupTitle ? renderMenuGroupTitle(item[labelField], item) : item[labelField]
        }, _this2.renderListItems(item[childrenField] || [], selectedMap));
      });
    }
  }, {
    key: "renderListChild",
    value: function renderListChild(children, selectedMap) {
      var _this3 = this;

      var _this$props5 = this.props,
          labelField = _this$props5.labelField,
          valueField = _this$props5.valueField,
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

      if (!items.length && !_react.default.Children.count(children)) {
        return emptyLabel;
      }

      var childs = items.length ? this.renderListItems(items, selectedMap) : this.renderListChild(children, selectedMap);
      return _react.default.Children.count(childs) ? childs : emptyLabel;
    }
  }, {
    key: "getListView",
    value: function getListView() {
      return (0, _reactDom.findDOMNode)(this._listview);
    }
  }, {
    key: "getListViewHeader",
    value: function getListViewHeader() {
      return (0, _reactDom.findDOMNode)(this._listview_header);
    }
  }, {
    key: "getListViewBody",
    value: function getListViewBody() {
      return (0, _reactDom.findDOMNode)(this._listview_body);
    }
  }, {
    key: "getListViewFooter",
    value: function getListViewFooter() {
      return (0, _reactDom.findDOMNode)(this._listview_footer);
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this$props7 = this.props,
          BodyWrapperComponent = _this$props7.bodyWrapperComponent,
          prefixCls = _this$props7.prefixCls,
          _this$props7$bodyStyl = _this$props7.bodyStyle,
          bodyStyle = _this$props7$bodyStyl === void 0 ? {} : _this$props7$bodyStyl,
          renderMenu = _this$props7.renderMenu;
      var Menus = this.renderList();
      return _react.default.createElement(BodyWrapperComponent, {
        ref: this.saveListViewBody,
        className: "".concat(prefixCls, "-body"),
        style: bodyStyle
      }, renderMenu ? renderMenu(Menus, this.props) : Menus);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props8 = this.props,
          className = _this$props8.className,
          value = _this$props8.value,
          prefixCls = _this$props8.prefixCls,
          items = _this$props8.items,
          width = _this$props8.width,
          height = _this$props8.height,
          tabIndex = _this$props8.tabIndex,
          disabled = _this$props8.disabled,
          enableDownUpSelect = _this$props8.enableDownUpSelect,
          onKeyDown = _this$props8.onKeyDown,
          onFocus = _this$props8.onFocus,
          onBlur = _this$props8.onBlur,
          _this$props8$style = _this$props8.style,
          style = _this$props8$style === void 0 ? {} : _this$props8$style,
          WrapperComponent = _this$props8.wrapperComponent,
          HeaderWrapperComponent = _this$props8.headerWrapperComponent,
          FooterWrapperComponent = _this$props8.footerWrapperComponent,
          renderHeader = _this$props8.renderHeader,
          renderFooter = _this$props8.renderFooter,
          _this$props8$headerSt = _this$props8.headerStyle,
          headerStyle = _this$props8$headerSt === void 0 ? {} : _this$props8$headerSt,
          _this$props8$footerSt = _this$props8.footerStyle,
          footerStyle = _this$props8$footerSt === void 0 ? {} : _this$props8$footerSt;

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
        ref: this.saveListViewHeader,
        className: "".concat(prefixCls, "-header"),
        style: headerStyle
      }, renderHeader()) : null, this.renderMenu(), renderFooter ? _react.default.createElement(FooterWrapperComponent, {
        ref: this.saveListViewFooter,
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
  childrenField: _propTypes.default.string,
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
  onItemGroupClick: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderMenuGroupTitle: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
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
  childrenField: 'children',
  labelInValue: false,
  tabIndex: 0,
  items: [],
  emptyLabel: 'Not Found',
  enableDownUpSelect: true,
  onFocus: noop,
  onBlur: noop,
  onKeyDown: noop,
  wrapperComponent: "div",
  headerWrapperComponent: 'div',
  bodyWrapperComponent: 'div',
  footerWrapperComponent: 'div'
});