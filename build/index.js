"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useInterval = _interopRequireDefault(require("use-interval"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var App = function (props) {
  var _a, _b, _c, _d, _e, _f, _g, _h;

  if (!((_a = props) === null || _a === void 0 ? void 0 : _a.children)) return null;

  var childrenLength = _react.default.Children.count(props.children);

  var childrenLengthIncludeDummy = _react.default.Children.count(props.children) + 2; // 2 is dummy length

  var _j = (0, _react.useState)((_c = (_b = props) === null || _b === void 0 ? void 0 : _b.transition, _c !== null && _c !== void 0 ? _c : 300)),
      transition = _j[0],
      setTransition = _j[1];
  /* common function */


  var sleep = function (msec) {
    return new Promise(function (r) {
      return setTimeout(r, msec);
    });
  };
  /* base state and ref */


  var carousel = (0, _react.createRef)();

  var _k = (0, _react.useState)(0),
      carouselInlineWidth = _k[0],
      setCarouselInlineWidth = _k[1];

  var _l = (0, _react.useState)(0),
      carouselInlineHeight = _l[0],
      setCarouselInlineHeight = _l[1];
  /*
    specify index to this variable('showItemIndex') when want to show item.
    be careful, 0 and last is dummy.
  */


  var _m = (0, _react.useState)(1),
      showItemIndex = _m[0],
      setShowItemIndex = _m[1];

  var instanceShowItemIndex = (0, _react.useRef)(showItemIndex);

  var _o = (0, _react.useState)(0),
      inlinePos = _o[0],
      setInlinePos = _o[1]; // this variable is decide carousel position for when show item.

  /* want to execute function with temporary ignore animation */


  function noneTransitionCall(callback) {
    var _this = this;

    return new Promise(function (resolve) {
      return __awaiter(_this, void 0, void 0, function () {
        var beforeTransition;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              beforeTransition = transition;
              setTransition(0);
              callback();
              return [4
              /*yield*/
              , sleep(50)];

            case 1:
              _a.sent(); // break time until finished dom rewrite


              setTransition(beforeTransition);
              resolve();
              return [2
              /*return*/
              ];
          }
        });
      });
    });
  }
  /*
    after specify index of item to 'showItemIndex',
    set carousel position with auto.
  */


  (0, _react.useEffect)(function () {
    setInlinePos(carouselInlineWidth * showItemIndex);
    instanceShowItemIndex.current = showItemIndex; // always synchronize instance
  }, [showItemIndex]);
  /* initialize width and height and first position for inline in carousel */

  (0, _react.useEffect)(function () {
    if (carouselInlineWidth > 0) return;
    noneTransitionCall(function () {
      if (!carousel.current) return;
      setCarouselInlineWidth(carousel.current.clientWidth);
      setCarouselInlineHeight(carousel.current.clientHeight);
      setInlinePos(carousel.current.clientWidth * showItemIndex);
    });
  }, [carousel]);
  /* Basically use this function to move the carousel */

  var isMoving = (0, _react.useRef)(false);

  function handle(w) {
    var _this = this;

    return new Promise(function (resolve) {
      return __awaiter(_this, void 0, void 0, function () {
        var index, dummyFirst, dummyLast, isDummyFirst, isDummyLast;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (isMoving.current === true) return [2
              /*return*/
              , resolve()];
              isMoving.current = true;
              index = instanceShowItemIndex.current;
              dummyFirst = 0;
              dummyLast = childrenLengthIncludeDummy - 1;
              isDummyFirst = index - 1 === dummyFirst && w === 'before';
              isDummyLast = index + 1 === dummyLast && w === 'next';
              setShowItemIndex(w === 'next' ? index + 1 : index - 1);
              return [4
              /*yield*/
              , sleep(transition)];

            case 1:
              _a.sent(); // wait finished animation


              if (!(isDummyFirst || isDummyLast)) return [3
              /*break*/
              , 3];
              return [4
              /*yield*/
              , noneTransitionCall(function () {
                w === 'next' ? isDummyLast && setShowItemIndex(1) : isDummyFirst && setShowItemIndex(dummyLast - 1);
              })];

            case 2:
              _a.sent();

              _a.label = 3;

            case 3:
              isMoving.current = false;
              resolve();
              return [2
              /*return*/
              ];
          }
        });
      });
    });
  }
  /*
    if 'props.autoPlay' is true,
    move carousel to only next with auto.
  */


  var playing = (0, _react.useRef)(true);
  (0, _useInterval.default)(function () {
    var _a;

    if (!((_a = props) === null || _a === void 0 ? void 0 : _a.autoPlay) || playing.current === false) return;
    var index = instanceShowItemIndex.current;

    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var _a;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              playing.current = false;
              return [4
              /*yield*/
              , sleep(((_a = props) === null || _a === void 0 ? void 0 : _a.autoPlayMsec) || 3000)];

            case 1:
              _b.sent();

              if (!(index === instanceShowItemIndex.current)) return [3
              /*break*/
              , 3];
              /* skip if click arrow or swipe or click dots, when during sleep */

              return [4
              /*yield*/
              , handle('next')];

            case 2:
              /* skip if click arrow or swipe or click dots, when during sleep */
              _b.sent();

              _b.label = 3;

            case 3:
              playing.current = true;
              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  }, 300);
  /*
    if swipe,
    move carousel right and left
  */

  var coordX = (0, _react.useRef)(0);

  function ontouchstart(e) {
    var touches = e.changedTouches[0];
    coordX.current = touches.pageX;
  }

  function ontouchmove(e) {
    e.preventDefault();
    var touches = e.changedTouches[0];
    var diff = touches.pageX - coordX.current;
    var weighting = 30;
    setInlinePos(inlinePos - diff / weighting);
  }

  function ontouchend(e) {
    var touches = e.changedTouches[0];
    var diff = touches.pageX - coordX.current;
    Math.abs(diff) > 30 ? handle(Math.sign(diff) > -1 ? 'before' : 'next') : setInlinePos(showItemIndex * carouselInlineWidth);
  }
  /* style for arrow icon on both sides */


  var arrowStyle = {
    display: ((_d = props) === null || _d === void 0 ? void 0 : _d.arrow) === false ? 'none' : 'block',
    top: ((_e = props) === null || _e === void 0 ? void 0 : _e.arrowWidth) ? "calc(50% - " + props.arrowWidth + "px)" : 'calc(50% - 20px)',
    width: ((_f = props) === null || _f === void 0 ? void 0 : _f.arrowWidth) ? props.arrowWidth + "px" : '20px',
    height: ((_g = props) === null || _g === void 0 ? void 0 : _g.arrowWidth) ? props.arrowWidth + "px" : '20px',
    borderWidth: ((_h = props) === null || _h === void 0 ? void 0 : _h.arrowBorderWidth) ? props.arrowBorderWidth + "px" : '2px'
  };
  /* return jsx for item in carousel */

  function itemJSX(children) {
    return children.map(function (v, k) {
      return _react.default.createElement("div", {
        className: "reactStandardCarousel__item",
        style: {
          width: carouselInlineWidth + "px",
          height: carouselInlineHeight + "px"
        },
        key: k
      }, v);
    });
  }

  return _react.default.createElement("div", {
    className: "reactStandardCarousel",
    ref: carousel,
    onTouchStart: ontouchstart,
    onTouchMove: ontouchmove,
    onTouchEnd: ontouchend
  }, _react.default.createElement("div", {
    className: "reactStandardCarousel__arrow--left",
    style: arrowStyle,
    onClick: function () {
      return handle('before');
    }
  }), _react.default.createElement("div", {
    className: "reactStandardCarousel__arrow--right",
    style: arrowStyle,
    onClick: function () {
      return handle('next');
    }
  }), _react.default.createElement("div", {
    className: "reactStandardCarousel__dotsBox"
  }, Array(childrenLength).fill(null).map(function (_, k) {
    return k;
  }).map(function (v) {
    var _a, _b, _c, _d, _e;

    return _react.default.createElement("div", {
      className: v + 1 === showItemIndex ? "reactStandardCarousel__dot--selected" : "reactStandardCarousel__dot",
      style: {
        display: ((_a = props) === null || _a === void 0 ? void 0 : _a.dots) === false ? 'none' : 'block',
        width: ((_b = props) === null || _b === void 0 ? void 0 : _b.dotWidth) ? props.dotWidth + "px" : '6px',
        height: ((_c = props) === null || _c === void 0 ? void 0 : _c.dotWidth) ? props.dotWidth + "px" : '6px',
        margin: ((_d = props) === null || _d === void 0 ? void 0 : _d.dotMargin) ? props.dotMargin + "px" : '5px',
        borderWidth: ((_e = props) === null || _e === void 0 ? void 0 : _e.dotBorderWidth) ? props.dotBorderWidth + "px" : '2px'
      },
      onClick: function () {
        return setShowItemIndex(v + 1);
      },
      key: v
    });
  })), _react.default.createElement("div", {
    className: "reactStandardCarousel__inline",
    style: {
      transform: "translateX(-" + inlinePos + "px)",
      width: carouselInlineWidth * childrenLengthIncludeDummy + "px",
      transition: transition + "ms linear"
    }
  }, itemJSX(_react.default.Children.toArray(props.children).slice(-1))
  /* first dummy */
  , itemJSX(_react.default.Children.toArray(props.children)), itemJSX(_react.default.Children.toArray(props.children))[0]
  /* last dummy */
  ));
};

var _default = App;
exports.default = _default;