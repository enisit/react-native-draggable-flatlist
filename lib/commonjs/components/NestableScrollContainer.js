var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestableScrollContainer = void 0;
var _extends2 = _interopRequireDefault(
  require("@babel/runtime/helpers/extends")
);
var _react = _interopRequireDefault(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(
  require("react-native-reanimated")
);
var _nestableScrollContainerContext = require("../context/nestableScrollContainerContext");
var _useStableCallback = require("../hooks/useStableCallback");
var _jsxFileName =
    "/Users/enisgegic/Documents/povio/react-native-draggable-flatlist/src/components/NestableScrollContainer.tsx",
  _this = this;
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
var AnimatedScrollView = _reactNativeReanimated.default.createAnimatedComponent(
  _reactNativeGestureHandler.ScrollView
);
var isCloseToBottom = function isCloseToBottom(_ref) {
  var layoutMeasurement = _ref.layoutMeasurement,
    contentOffset = _ref.contentOffset,
    contentSize = _ref.contentSize;
  var paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
function NestableScrollContainerInner(props) {
  var _useSafeNestableScrol = (0,
    _nestableScrollContainerContext.useSafeNestableScrollContainerContext)(),
    outerScrollOffset = _useSafeNestableScrol.outerScrollOffset,
    containerSize = _useSafeNestableScrol.containerSize,
    scrollViewSize = _useSafeNestableScrol.scrollViewSize,
    scrollableRef = _useSafeNestableScrol.scrollableRef,
    outerScrollEnabled = _useSafeNestableScrol.outerScrollEnabled;
  var handleEndReached = (0, _useStableCallback.useStableCallback)(function () {
    props.onEndReached == null ? void 0 : props.onEndReached();
  });
  var scrollHandler = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: (function () {
      var _f = function _f(scrollProps) {
        outerScrollOffset.value = scrollProps.contentOffset.y;
        if (isCloseToBottom(scrollProps)) {
          (0, _reactNativeReanimated.runOnJS)(handleEndReached)();
        }
      };
      _f._closure = {
        outerScrollOffset: outerScrollOffset,
        isCloseToBottom: isCloseToBottom,
        runOnJS: _reactNativeReanimated.runOnJS,
        handleEndReached: handleEndReached,
      };
      _f.asString =
        "function _f(scrollProps){const{outerScrollOffset,isCloseToBottom,runOnJS,handleEndReached}=jsThis._closure;{outerScrollOffset.value=scrollProps.contentOffset.y;if(isCloseToBottom(scrollProps)){runOnJS(handleEndReached)();}}}";
      _f.__workletHash = 17045628094564;
      _f.__location =
        "/Users/enisgegic/Documents/povio/react-native-draggable-flatlist/src/components/NestableScrollContainer.tsx (48:14)";
      return _f;
    })(),
  });
  var onLayout = (0, _useStableCallback.useStableCallback)(function (event) {
    var layout = event.nativeEvent.layout;
    containerSize.value = layout.height;
  });
  var onContentSizeChange = (0, _useStableCallback.useStableCallback)(function (
    w,
    h
  ) {
    scrollViewSize.value = h;
    props.onContentSizeChange == null
      ? void 0
      : props.onContentSizeChange(w, h);
  });
  return _react.default.createElement(
    AnimatedScrollView,
    (0, _extends2.default)({}, props, {
      onLayout: onLayout,
      onContentSizeChange: onContentSizeChange,
      scrollEnabled: outerScrollEnabled,
      ref: scrollableRef,
      scrollEventThrottle: 1,
      onScroll: scrollHandler,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 69, columnNumber: 5 },
    })
  );
}
var NestableScrollContainer = _react.default.forwardRef(function (
  props,
  forwardedRef
) {
  return _react.default.createElement(
    _nestableScrollContainerContext.NestableScrollContainerProvider,
    {
      forwardedRef: forwardedRef || undefined,
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 87, columnNumber: 7 },
    },
    _react.default.createElement(
      NestableScrollContainerInner,
      (0, _extends2.default)({}, props, {
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 92, columnNumber: 9 },
      })
    )
  );
});
exports.NestableScrollContainer = NestableScrollContainer;
//# sourceMappingURL=NestableScrollContainer.js.map
