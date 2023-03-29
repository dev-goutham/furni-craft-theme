/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/ts/web-components/variant.ts ***!
  \******************************************/


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var VariantComponent = /*#__PURE__*/function (_HTMLElement) {
  _inherits(VariantComponent, _HTMLElement);
  var _super = _createSuper(VariantComponent);
  function VariantComponent() {
    var _this$shadowRoot;
    var _this;
    _classCallCheck(this, VariantComponent);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "variants", null);
    _defineProperty(_assertThisInitialized(_this), "currentOptions", null);
    _this.attachShadow({
      mode: 'open'
    });
    (_this$shadowRoot = _this.shadowRoot) === null || _this$shadowRoot === void 0 ? void 0 : _this$shadowRoot.appendChild(variantTemplate.content.cloneNode(true));
    return _this;
  }
  _createClass(VariantComponent, [{
    key: "getVariants",
    value: function getVariants() {
      if (!this.variants) {
        var _this$querySelector;
        this.variants = JSON.parse((_this$querySelector = this.querySelector('[type="application/json"]')) === null || _this$querySelector === void 0 ? void 0 : _this$querySelector.textContent).variants;
      }
      return this.variants;
    }
  }, {
    key: "setCurrentOptions",
    value: function setCurrentOptions(_ref) {
      var name = _ref.name,
        value = _ref.value;
      if (!this.currentOptions) {
        var _this$querySelector2;
        var currentVariant = JSON.parse((_this$querySelector2 = this.querySelector('[type="application/json"]')) === null || _this$querySelector2 === void 0 ? void 0 : _this$querySelector2.textContent).currentVariant;
        this.currentOptions = currentVariant.options;
      }
      this.currentOptions[+name] = value;
    }
  }, {
    key: "updateUrl",
    value: function updateUrl(id) {
      window.history.replaceState({}, '', "".concat(this.dataset.url, "?variant=").concat(id));
    }
  }, {
    key: "updateFormId",
    value: function updateFormId(id) {
      var idInput = document.querySelector('#product-form input[name="id"]');
      idInput.value = id;
    }
  }, {
    key: "updatePrice",
    value: function updatePrice(id) {
      var selector = document.querySelector('currency-component');
      var url = this.dataset.url;
      var section = this.dataset.section;
      var oldPrice = document.getElementById('price');
      oldPrice.classList.add('disabled');
      oldPrice.value = '...';
      fetch("".concat(url, "?variant=").concat(id, "&section=").concat(section)).then(function (res) {
        return res.text();
      }).then(function (res) {
        var html = new DOMParser().parseFromString(res, 'text/html');
        var newPrice = html.getElementById('price');
        var val = parseInt(newPrice.getAttribute('data-amount')) / 100;
        var convertedPrice = String(selector.getAmount(val));
        oldPrice.value = 'Add to Cart ' + convertedPrice;
        oldPrice.classList.remove('disabled');
      })["catch"](function (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    }
  }, {
    key: "getCurrentVariant",
    value: function getCurrentVariant() {
      var _this2 = this;
      var currentVariant = this.getVariants().find(function (variant) {
        return JSON.stringify(variant.options) === JSON.stringify(_this2.currentOptions);
      });
      return currentVariant;
    }
  }, {
    key: "handleChange",
    value: function handleChange(_ref2) {
      var name = _ref2.name,
        value = _ref2.value;
      this.setCurrentOptions({
        name: name,
        value: value
      });
      var currentVariant = this.getCurrentVariant();
      this.updateUrl(currentVariant.id);
      this.updateFormId(currentVariant.id);
      this.updatePrice(currentVariant.id);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$shadowRoot2,
        _this3 = this;
      var variants = (_this$shadowRoot2 = this.shadowRoot) === null || _this$shadowRoot2 === void 0 ? void 0 : _this$shadowRoot2.querySelectorAll('.variant');
      if (!variants) {
        return;
      } else {
        variants === null || variants === void 0 ? void 0 : variants.forEach(function (variant) {
          variant.addEventListener('change', function (e) {
            var _e$target = e.target,
              value = _e$target.value,
              name = _e$target.name;
            _this3.handleChange({
              name: name,
              value: value
            });
          });
        });
      }
    }
  }]);
  return VariantComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
var variantTemplate = document.createElement('template');
variantTemplate.innerHTML = /* html */"\n  <div>\n    <slot class=\"variant\" name=\"variant\" />\n    <slot class=\"submit\" name=\"submit\"/>\n  </div>\n";
customElements.define('variant-component', VariantComponent);
/******/ })()
;