
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _object = _interopRequireDefault(require("object.omit"));

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
          children = _this$props.children,
          item = _this$props.item;
      if (disabled) return;
      var newItem = item || {
        value: value,
        label: children
      };

      if (onClick) {
        onClick(newItem, e);
      }

      if (!selected) {
        onSelect && onSelect(newItem, _this.refs.item);
      } else {
        onDeselect && onDeselect(newItem, _this.refs.item);
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
  disabled: _propTypes.default.bool,
  item: _propTypes.default.object
});
(0, _defineProperty2.default)(ListItem, "defaultProps", {
  prefixCls: 'rw-listbox-item',
  value: '',
  selected: false,
  disabled: false
});
(0, _defineProperty2.default)(ListItem, "isListItem", true);