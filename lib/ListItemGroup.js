
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var ItemGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ItemGroup, _React$Component);

  function ItemGroup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ItemGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ItemGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          item = _this$props.item;

      if (onClick) {
        onClick(item, e);
      }
    });
    return _this;
  }

  (0, _createClass2.default)(ItemGroup, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          label = _this$props2.label,
          children = _this$props2.children;
      return _react.default.createElement("div", {
        className: prefixCls
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-title"),
        onClick: this.handleClick
      }, label), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-list")
      }, children));
    }
  }]);
  return ItemGroup;
}(_react.default.Component);

exports.default = ItemGroup;
(0, _defineProperty2.default)(ItemGroup, "propTypes", {
  label: _propTypes.default.node,
  children: _propTypes.default.node,
  prefixCls: _propTypes.default.string,
  onClick: _propTypes.default.func,
  item: _propTypes.default.object
});
(0, _defineProperty2.default)(ItemGroup, "defaultProps", {
  prefixCls: 'rw-listbox-item-group',
  label: ''
});
(0, _defineProperty2.default)(ItemGroup, "isListItemGroup", true);