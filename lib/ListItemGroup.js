
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

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