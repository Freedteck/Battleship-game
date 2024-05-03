/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Gameboard/Gameboard.js":
/*!********************************!*\
  !*** ./Gameboard/Gameboard.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Ship = __webpack_require__(/*! ../ship/Ship */ "./ship/Ship.js");

const Gameboard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  const missedAttack = [];

  const placeShip = (length, row, col, vertical) => {
    let adjustedRow = row;
    let adjustedCol = col;
    let attempts = 0;

    while (attempts <= 100) { // To prevent infinite loop in case the board is completely filled
      if (vertical && adjustedRow + length > board.length) {
        length = board.length - adjustedRow;
      } else if (!vertical && adjustedCol + length > board[adjustedRow].length) {
        length = board[adjustedRow].length - adjustedCol;
      }

      let occupied = false;
      for (let i = 0; i < length; i++) {
        if (vertical) {
          if (board[adjustedRow + i][adjustedCol] !== null) {
            occupied = true;
            break;
          }
        } else {
          if (board[adjustedRow][adjustedCol + i] !== null) {
            occupied = true;
            break;
          }
        }
      }

      if (!occupied) {
        for (let i = 0; i < length; i++) {
          if (vertical) {
            board[adjustedRow + i][adjustedCol] = Ship(1);
          } else {
            board[adjustedRow][adjustedCol + i] = Ship(1);
          }
        }
        return true;
      }

      // Move to the next available space
      if (vertical) {
        adjustedRow++;
      } else {
        adjustedCol++;
      }

      attempts++;
    }

    return false; // Could not place the ship
  };

  const receiveAttack = (row, col) => {
    const target = board[row][col];
    if (!target || target.isSunk()) {
      missedAttack.push({ row, col });
    } else {
      target.hit();
    }
  };

  const allShipSunk = () => {
    for (const grid of board) {
      for (const cell of grid) {
        if (cell !== null && !cell.isSunk()) {
          return false;
        }
      }
    }
    return true;
  };

  return { board, placeShip, receiveAttack, allShipSunk, missedAttack };
};

module.exports = Gameboard;


/***/ }),

/***/ "./Player/Player.js":
/*!**************************!*\
  !*** ./Player/Player.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gameboard = __webpack_require__(/*! ../Gameboard/Gameboard */ "./Gameboard/Gameboard.js");

const Player = () => {
  const player = Gameboard();
  const computer = Gameboard();

  const attackShip = (shipToAttack, row, col) => {
    if (shipToAttack === computer) {
      computer.receiveAttack(row, col);
    } else if (shipToAttack === player) {
      player.receiveAttack(row, col);
    }
  };
  return { player, computer, attackShip };
};

module.exports = Player;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./Game.css":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./Game.css ***!
  \********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
main {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 50px;
}
main .toast-container {
  align-self: center;
  background-color: rgb(53, 53, 53);
  color: #FFF;
  max-width: 360px;
  width: 80%;
  padding: 20px 10px;
  text-align: center;
  border-radius: 8px;
  font-weight: 500;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap-reverse;
  gap: 32px;
  margin-top: 20px;
}
.container .player-board, .container .computer-board {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 450px;
  flex: 1;
}
.container .player-board .p-game-board, .container .computer-board .c-game-board {
  display: grid;
  grid-template-rows: repeat(10, auto);
  border: 1px solid rgb(103, 103, 250);
}
.player-board .p-game-board .cell, .computer-board .c-game-board .cell {
  outline: 0.3px solid rgb(103, 103, 250);
  aspect-ratio: 1;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cell.ship {
  background-color: rgb(97, 93, 201);
}
.cell.hit {
    background-color: rgba(255, 0, 0, .1);
    color: red;
}
.row {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}
button {
  align-self: center;
  padding: 10px 20px;
  background-color: rgb(103, 103, 250);
  border: 1px solid rgb(97, 93, 201);
  border-radius: 5px;
  color: #FFF;
  font-weight: 500;
}
button:hover {
  background-color: transparent;
  cursor: pointer;
  color: rgb(53, 53, 53);
}
dialog {
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: #FFF;
  box-shadow: 1px 1px 3px 1px rgb(103, 103, 250);
  border: none;
  border-radius: 10px;
  padding: 30px 30px;
  min-width: 300px;
  margin: auto;
}
.modal {
  max-width: 450px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 3px 1px rgb(103, 103, 250);
  padding: 30px 30px;
}
.modal-content ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
}
.modal-content button {
  align-self: flex-start;
}`, "",{"version":3,"sources":["webpack://./Game.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,yCAAyC;AAC3C;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,aAAa;AACf;AACA;EACE,kBAAkB;EAClB,iCAAiC;EACjC,WAAW;EACX,gBAAgB;EAChB,UAAU;EACV,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,SAAS;EACT,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,gBAAgB;EAChB,OAAO;AACT;AACA;EACE,aAAa;EACb,oCAAoC;EACpC,oCAAoC;AACtC;AACA;EACE,uCAAuC;EACvC,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;AACA;EACE,kCAAkC;AACpC;AACA;IACI,qCAAqC;IACrC,UAAU;AACd;AACA;EACE,aAAa;EACb,sCAAsC;AACxC;AACA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,oCAAoC;EACpC,kCAAkC;EAClC,kBAAkB;EAClB,WAAW;EACX,gBAAgB;AAClB;AACA;EACE,6BAA6B;EAC7B,eAAe;EACf,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,sBAAsB;EACtB,8CAA8C;EAC9C,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;EAChB,YAAY;AACd;AACA;EACE,gBAAgB;EAChB,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,sBAAsB;EACtB,mBAAmB;EACnB,0CAA0C;EAC1C,kBAAkB;AACpB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,gBAAgB;AAClB;AACA;EACE,sBAAsB;AACxB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: Arial, Helvetica, sans-serif;\n}\nmain {\n  display: flex;\n  flex-direction: column;\n  gap: 48px;\n  padding: 50px;\n}\nmain .toast-container {\n  align-self: center;\n  background-color: rgb(53, 53, 53);\n  color: #FFF;\n  max-width: 360px;\n  width: 80%;\n  padding: 20px 10px;\n  text-align: center;\n  border-radius: 8px;\n  font-weight: 500;\n}\n.container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap-reverse;\n  gap: 32px;\n  margin-top: 20px;\n}\n.container .player-board, .container .computer-board {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  max-width: 450px;\n  flex: 1;\n}\n.container .player-board .p-game-board, .container .computer-board .c-game-board {\n  display: grid;\n  grid-template-rows: repeat(10, auto);\n  border: 1px solid rgb(103, 103, 250);\n}\n.player-board .p-game-board .cell, .computer-board .c-game-board .cell {\n  outline: 0.3px solid rgb(103, 103, 250);\n  aspect-ratio: 1;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.cell.ship {\n  background-color: rgb(97, 93, 201);\n}\n.cell.hit {\n    background-color: rgba(255, 0, 0, .1);\n    color: red;\n}\n.row {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\nbutton {\n  align-self: center;\n  padding: 10px 20px;\n  background-color: rgb(103, 103, 250);\n  border: 1px solid rgb(97, 93, 201);\n  border-radius: 5px;\n  color: #FFF;\n  font-weight: 500;\n}\nbutton:hover {\n  background-color: transparent;\n  cursor: pointer;\n  color: rgb(53, 53, 53);\n}\ndialog {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  background-color: #FFF;\n  box-shadow: 1px 1px 3px 1px rgb(103, 103, 250);\n  border: none;\n  border-radius: 10px;\n  padding: 30px 30px;\n  min-width: 300px;\n  margin: auto;\n}\n.modal {\n  max-width: 450px;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin: 0 auto;\n}\n.modal-content {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  background-color: #FFF;\n  border-radius: 10px;\n  box-shadow: 0 0 3px 1px rgb(103, 103, 250);\n  padding: 30px 30px;\n}\n.modal-content ul {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  list-style: none;\n}\n.modal-content button {\n  align-self: flex-start;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./Game.css":
/*!******************!*\
  !*** ./Game.css ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Game_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./Game.css */ "./node_modules/css-loader/dist/cjs.js!./Game.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_Game_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_Game_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_Game_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_Game_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./ship/Ship.js":
/*!**********************!*\
  !*** ./ship/Ship.js ***!
  \**********************/
/***/ ((module) => {

const Ship = (length) => {
  let hits = 0;

  const hit = () => {
    hits++;
  };
  const isSunk = () => {
    return hits === length;
  };
  const getHits = () => hits

  return { length, getHits, hit, isSunk };
};

module.exports = Ship;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./Game.js ***!
  \*****************/
const Player = __webpack_require__(/*! ./Player/Player */ "./Player/Player.js");
__webpack_require__(/*! ./Game.css */ "./Game.css");

const Game = () => {
  const main = document.createElement("main");

  const container = document.createElement("div");
  container.classList.add("container");

  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");

  const toast = document.createElement("p");
  toast.classList.add("toast");

  toast.textContent = "Waiting...";
  toastContainer.appendChild(toast);
  const playerBoardContainer = document.createElement("div");
  playerBoardContainer.classList.add("player-board");

  const playerHead = document.createElement("h2");
  playerHead.textContent = "Player";

  const computerMisses = document.createElement("p");
  playerHead.appendChild(computerMisses);

  const pGameBoard = document.createElement("div");
  pGameBoard.classList.add("p-game-board");

  const computerBoardContainer = document.createElement("div");
  computerBoardContainer.classList.add("computer-board");

  const computerHead = document.createElement("h2");
  computerHead.textContent = "Computer";

  const cGameBoard = document.createElement("div");
  cGameBoard.classList.add("c-game-board");

  const randomize = document.createElement("button");
  randomize.textContent = "Randomize";

  const players = Player();
  const player = players.player;
  const computer = players.computer;

  const existed = [];
  let playerTurn = true;
  randomize.style.display = "none";

  const gameLoop = () => {
    const placePlayerShips = () => {
      const lengthOption = [2, 3, 4];
      const lengthIndex = Math.floor(Math.random() * lengthOption.length);
      const length = lengthOption[lengthIndex];

      const vertical = [true, false];
      const index = Math.floor(Math.random() * vertical.length);
      const choice = vertical[index];

      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (player.board[row][col]);
      player.placeShip(length, row, col, choice);
    };

    const placeComputerShips = () => {
      const lengthOption = [2, 3, 4];
      const lengthIndex = Math.floor(Math.random() * lengthOption.length);
      const length = lengthOption[lengthIndex];

      const vertical = [true, false];
      const index = Math.floor(Math.random() * vertical.length);
      const choice = vertical[index];

      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (computer.board[row][col]);
      computer.placeShip(length, row, col, choice);
    };

    for (let i = 0; i < 4; i++) {
      placeComputerShips();
      placePlayerShips();
    }
  };

  gameLoop();

  const renderPlayerBoard = (playerBoard) => {
    for (let i = 0; i < player.board.length; i++) {
      const rows = document.createElement("div");
      rows.classList.add("row");
      for (let j = 0; j < player.board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = j;
        cell.dataset.id = i;
        rows.appendChild(cell);

        if (player.board[i][j]) {
          cell.classList.add("ship");
        }
      }
      playerBoard.appendChild(rows);
    }
  };

  const renderComputerBoard = (computerBoard) => {
    for (let i = 0; i < computer.board.length; i++) {
      const rows = document.createElement("div");
      rows.classList.add("row");
      for (let j = 0; j < computer.board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = j;
        cell.dataset.index = i;
        rows.appendChild(cell);
        cell.addEventListener("click", () => {
          if (playerTurn && !cell.classList.contains("clicked")) {
            playerAttack(cell, i, j);
          }
        });
      }
      computerBoard.appendChild(rows);
    }
  };

  const resetBoard = () => {
    // Clear both player's and computer's boards
    for (let i = 0; i < player.board.length; i++) {
      for (let j = 0; j < player.board[i].length; j++) {
        player.board[i][j] = null;
        computer.board[i][j] = null;
      }
    }

    // Reinitialize the game
    gameLoop();

    // Clear and render player's board
    pGameBoard.innerHTML = "";
    renderPlayerBoard(pGameBoard);

    // Clear and render computer's board
    cGameBoard.innerHTML = "";
    renderComputerBoard(cGameBoard);
  };

  const gameOverModal = (player) => {
    const dialogContainer = document.createElement("dialog");
    const dialogText = document.createElement("p");
    dialogText.textContent =
      player === "Computer"
        ? "This is not a joke! The computer WIN!!"
        : "WOW!! Congratulations! You WIn the Challenge";
    const okay = document.createElement("button");
    okay.textContent = "Okay";
    dialogContainer.appendChild(dialogText);
    dialogContainer.appendChild(okay);
    main.appendChild(dialogContainer);

    okay.addEventListener("click", () => {
      setTimeout(() => {
        resetBoard();
      }, 1000);
      dialogContainer.close();
      main.removeChild(dialogContainer);
    });
    return dialogContainer;
  };

  const computerAttack = (row, col) => {
    // let row, col;

    if (!row && !col) {
      // Generate random coordinates until finding an unattacked position
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (existed.some((coord) => coord[0] === row && coord[1] === col));
    }

    // if (!gameOver) {
    // Attack player's ships
    players.attackShip(player, row, col);

    // Record the attacked position
    existed.push([row, col]);

    // Update the UI to reflect the attack
    const cells = pGameBoard.querySelectorAll(".cell");
    cells.forEach((cell) => {
      if (cell.dataset.id === row.toString() && cell.id === col.toString()) {
        cell.classList.add("clicked");
        if (
          player.board[row] &&
          player.board[row][col] &&
          player.board[row][col].isSunk()
        ) {
          cell.textContent = "X";
          cell.classList.remove("ship");
          cell.classList.add("hit");
          player.board[row][col] = null;
          playerTurn = false
          if (player.allShipSunk()) {
            playerTurn = true;
            gameOverModal(computerHead.textContent).showModal();
          }
          setTimeout(() => {
            if (row > 0 && row < 9) {
              if (
                player.board[row - 1][col] &&
                !player.board[row - 1][col].isSunk()
              ) {
                computerAttack(row - 1, col);
              } else if (
                player.board[row + 1][col] &&
                !player.board[row + 1][col].isSunk()
              ) {
                computerAttack(row + 1, col);
              } else if (
                player.board[row][col - 1] &&
                !player.board[row][col - 1].isSunk()
              ) {
                computerAttack(row, col - 1);
              } else if (
                player.board[row][col + 1] &&
                !player.board[row][col + 1].isSunk()
              ) {
                computerAttack(row, col + 1);
              } else {
                computerAttack();
              }
            } else {
              computerAttack();
            }
          }, 1000);
        } else {
          cell.style.backgroundColor = "grey";
          playerTurn = true;
          toast.textContent = "Your turn";
        }
      }
    });
  };

  const playerAttack = (cell, row, col) => {
    const cells = pGameBoard.querySelectorAll(".cell");
    // if (!gameOver) {
    players.attackShip(computer, row, col);
    cell.classList.add("clicked");
    if (computer.board[row][col] && computer.board[row][col].isSunk()) {
      cell.textContent = "X";
      cell.classList.remove("ship");
      cell.classList.add("hit");
    } else {
      cell.style.backgroundColor = "grey";
      toast.textContent = "Opponent turn";
      playerTurn = false
      setTimeout(() => {
        computerAttack();
      }, 1000);
    }
    // }
    if (computer.allShipSunk()) {
      playerTurn = true;
      gameOverModal(playerHead.textContent).showModal();
    }
  };

  setTimeout(() => {
    const renderBoards = (() => {
      renderPlayerBoard(pGameBoard);
      renderComputerBoard(cGameBoard);

      playerBoardContainer.appendChild(playerHead);
      playerBoardContainer.appendChild(pGameBoard);
      computerBoardContainer.appendChild(computerHead);
      computerBoardContainer.appendChild(cGameBoard);
      container.appendChild(playerBoardContainer);
      container.appendChild(computerBoardContainer);
      toast.textContent = "Your turn";
    })();
    randomize.style.display = "flex";
  }, 1500);

  randomize.addEventListener("click", (e) => {
    console.log(e.target);
    resetBoard();
  });
  main.appendChild(toastContainer);
  main.appendChild(container);
  main.appendChild(randomize);
  document.body.appendChild(main);
};

const createGameModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const greetings = document.createElement("h1");
  greetings.textContent = "Welcome to Battleship!";
  const rules = document.createElement("p");
  rules.innerHTML = `<ul>
  <li>
  The objective of the game is to sink all of your opponent's ships before
  they sink yours.
</li>
<li>Each player places their ships on their board,</li>
<li>
  And then takes turns attacking the opponent's board by guessing the
  coordinates of their ships.
</li>
</ul>`;

  const startButton = document.createElement("button");
  startButton.textContent = "Start";

  startButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
    Game(); // Start the game
  });

  modalContent.appendChild(greetings);
  modalContent.appendChild(rules);
  modalContent.appendChild(startButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  return modal;
};
createGameModal();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsb0NBQWM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBOzs7Ozs7Ozs7OztBQ2xGQSxrQkFBa0IsbUJBQU8sQ0FBQyx3REFBd0I7O0FBRWxEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUN5RztBQUNqQjtBQUN4Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLDJFQUEyRSxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLEtBQUssS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVB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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQyxZQUFZO0FBQ1osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvLi9HYW1lYm9hcmQvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS8uL1BsYXllci9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLy4vR2FtZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvLi9HYW1lLmNzcz8zYTNlIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLy4vc2hpcC9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS8uL0dhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU2hpcCA9IHJlcXVpcmUoXCIuLi9zaGlwL1NoaXBcIik7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBBcnJheSgxMClcbiAgICAuZmlsbChudWxsKVxuICAgIC5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICBjb25zdCBtaXNzZWRBdHRhY2sgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCByb3csIGNvbCwgdmVydGljYWwpID0+IHtcbiAgICBsZXQgYWRqdXN0ZWRSb3cgPSByb3c7XG4gICAgbGV0IGFkanVzdGVkQ29sID0gY29sO1xuICAgIGxldCBhdHRlbXB0cyA9IDA7XG5cbiAgICB3aGlsZSAoYXR0ZW1wdHMgPD0gMTAwKSB7IC8vIFRvIHByZXZlbnQgaW5maW5pdGUgbG9vcCBpbiBjYXNlIHRoZSBib2FyZCBpcyBjb21wbGV0ZWx5IGZpbGxlZFxuICAgICAgaWYgKHZlcnRpY2FsICYmIGFkanVzdGVkUm93ICsgbGVuZ3RoID4gYm9hcmQubGVuZ3RoKSB7XG4gICAgICAgIGxlbmd0aCA9IGJvYXJkLmxlbmd0aCAtIGFkanVzdGVkUm93O1xuICAgICAgfSBlbHNlIGlmICghdmVydGljYWwgJiYgYWRqdXN0ZWRDb2wgKyBsZW5ndGggPiBib2FyZFthZGp1c3RlZFJvd10ubGVuZ3RoKSB7XG4gICAgICAgIGxlbmd0aCA9IGJvYXJkW2FkanVzdGVkUm93XS5sZW5ndGggLSBhZGp1c3RlZENvbDtcbiAgICAgIH1cblxuICAgICAgbGV0IG9jY3VwaWVkID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICAgIGlmIChib2FyZFthZGp1c3RlZFJvdyArIGldW2FkanVzdGVkQ29sXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChib2FyZFthZGp1c3RlZFJvd11bYWRqdXN0ZWRDb2wgKyBpXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghb2NjdXBpZWQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICAgICAgYm9hcmRbYWRqdXN0ZWRSb3cgKyBpXVthZGp1c3RlZENvbF0gPSBTaGlwKDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZFthZGp1c3RlZFJvd11bYWRqdXN0ZWRDb2wgKyBpXSA9IFNoaXAoMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGF2YWlsYWJsZSBzcGFjZVxuICAgICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICAgIGFkanVzdGVkUm93Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGp1c3RlZENvbCsrO1xuICAgICAgfVxuXG4gICAgICBhdHRlbXB0cysrO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTsgLy8gQ291bGQgbm90IHBsYWNlIHRoZSBzaGlwXG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGJvYXJkW3Jvd11bY29sXTtcbiAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQuaXNTdW5rKCkpIHtcbiAgICAgIG1pc3NlZEF0dGFjay5wdXNoKHsgcm93LCBjb2wgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5oaXQoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcFN1bmsgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCBncmlkIG9mIGJvYXJkKSB7XG4gICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgZ3JpZCkge1xuICAgICAgICBpZiAoY2VsbCAhPT0gbnVsbCAmJiAhY2VsbC5pc1N1bmsoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwU3VuaywgbWlzc2VkQXR0YWNrIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcbiIsImNvbnN0IEdhbWVib2FyZCA9IHJlcXVpcmUoXCIuLi9HYW1lYm9hcmQvR2FtZWJvYXJkXCIpO1xuXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBjb21wdXRlciA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFja1NoaXAgPSAoc2hpcFRvQXR0YWNrLCByb3csIGNvbCkgPT4ge1xuICAgIGlmIChzaGlwVG9BdHRhY2sgPT09IGNvbXB1dGVyKSB7XG4gICAgICBjb21wdXRlci5yZWNlaXZlQXR0YWNrKHJvdywgY29sKTtcbiAgICB9IGVsc2UgaWYgKHNoaXBUb0F0dGFjayA9PT0gcGxheWVyKSB7XG4gICAgICBwbGF5ZXIucmVjZWl2ZUF0dGFjayhyb3csIGNvbCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4geyBwbGF5ZXIsIGNvbXB1dGVyLCBhdHRhY2tTaGlwIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG59XG5tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA0OHB4O1xuICBwYWRkaW5nOiA1MHB4O1xufVxubWFpbiAudG9hc3QtY29udGFpbmVyIHtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTMsIDUzLCA1Myk7XG4gIGNvbG9yOiAjRkZGO1xuICBtYXgtd2lkdGg6IDM2MHB4O1xuICB3aWR0aDogODAlO1xuICBwYWRkaW5nOiAyMHB4IDEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXAtcmV2ZXJzZTtcbiAgZ2FwOiAzMnB4O1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuLmNvbnRhaW5lciAucGxheWVyLWJvYXJkLCAuY29udGFpbmVyIC5jb21wdXRlci1ib2FyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTZweDtcbiAgbWF4LXdpZHRoOiA0NTBweDtcbiAgZmxleDogMTtcbn1cbi5jb250YWluZXIgLnBsYXllci1ib2FyZCAucC1nYW1lLWJvYXJkLCAuY29udGFpbmVyIC5jb21wdXRlci1ib2FyZCAuYy1nYW1lLWJvYXJkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIGF1dG8pO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTAzLCAxMDMsIDI1MCk7XG59XG4ucGxheWVyLWJvYXJkIC5wLWdhbWUtYm9hcmQgLmNlbGwsIC5jb21wdXRlci1ib2FyZCAuYy1nYW1lLWJvYXJkIC5jZWxsIHtcbiAgb3V0bGluZTogMC4zcHggc29saWQgcmdiKDEwMywgMTAzLCAyNTApO1xuICBhc3BlY3QtcmF0aW86IDE7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuLmNlbGwuc2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig5NywgOTMsIDIwMSk7XG59XG4uY2VsbC5oaXQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAuMSk7XG4gICAgY29sb3I6IHJlZDtcbn1cbi5yb3cge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbn1cbmJ1dHRvbiB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgcGFkZGluZzogMTBweCAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTAzLCAxMDMsIDI1MCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYig5NywgOTMsIDIwMSk7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgY29sb3I6ICNGRkY7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogcmdiKDUzLCA1MywgNTMpO1xufVxuZGlhbG9nIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAzMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICBib3gtc2hhZG93OiAxcHggMXB4IDNweCAxcHggcmdiKDEwMywgMTAzLCAyNTApO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBhZGRpbmc6IDMwcHggMzBweDtcbiAgbWluLXdpZHRoOiAzMDBweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLm1vZGFsIHtcbiAgbWF4LXdpZHRoOiA0NTBweDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLm1vZGFsLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJveC1zaGFkb3c6IDAgMCAzcHggMXB4IHJnYigxMDMsIDEwMywgMjUwKTtcbiAgcGFkZGluZzogMzBweCAzMHB4O1xufVxuLm1vZGFsLWNvbnRlbnQgdWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEwcHg7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG4ubW9kYWwtY29udGVudCBidXR0b24ge1xuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vR2FtZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix5Q0FBeUM7QUFDM0M7QUFDQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztFQUNULGFBQWE7QUFDZjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlDQUFpQztFQUNqQyxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixTQUFTO0VBQ1QsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxnQkFBZ0I7RUFDaEIsT0FBTztBQUNUO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isb0NBQW9DO0VBQ3BDLG9DQUFvQztBQUN0QztBQUNBO0VBQ0UsdUNBQXVDO0VBQ3ZDLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7QUFDQTtFQUNFLGtDQUFrQztBQUNwQztBQUNBO0lBQ0kscUNBQXFDO0lBQ3JDLFVBQVU7QUFDZDtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNDQUFzQztBQUN4QztBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixvQ0FBb0M7RUFDcEMsa0NBQWtDO0VBQ2xDLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSw2QkFBNkI7RUFDN0IsZUFBZTtFQUNmLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLDhDQUE4QztFQUM5QyxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLDBDQUEwQztFQUMxQyxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztFQUNULGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usc0JBQXNCO0FBQ3hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG59XFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNDhweDtcXG4gIHBhZGRpbmc6IDUwcHg7XFxufVxcbm1haW4gLnRvYXN0LWNvbnRhaW5lciB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTMsIDUzLCA1Myk7XFxuICBjb2xvcjogI0ZGRjtcXG4gIG1heC13aWR0aDogMzYwcHg7XFxuICB3aWR0aDogODAlO1xcbiAgcGFkZGluZzogMjBweCAxMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC13cmFwOiB3cmFwLXJldmVyc2U7XFxuICBnYXA6IDMycHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG4uY29udGFpbmVyIC5wbGF5ZXItYm9hcmQsIC5jb250YWluZXIgLmNvbXB1dGVyLWJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxNnB4O1xcbiAgbWF4LXdpZHRoOiA0NTBweDtcXG4gIGZsZXg6IDE7XFxufVxcbi5jb250YWluZXIgLnBsYXllci1ib2FyZCAucC1nYW1lLWJvYXJkLCAuY29udGFpbmVyIC5jb21wdXRlci1ib2FyZCAuYy1nYW1lLWJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgYXV0byk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTAzLCAxMDMsIDI1MCk7XFxufVxcbi5wbGF5ZXItYm9hcmQgLnAtZ2FtZS1ib2FyZCAuY2VsbCwgLmNvbXB1dGVyLWJvYXJkIC5jLWdhbWUtYm9hcmQgLmNlbGwge1xcbiAgb3V0bGluZTogMC4zcHggc29saWQgcmdiKDEwMywgMTAzLCAyNTApO1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDk3LCA5MywgMjAxKTtcXG59XFxuLmNlbGwuaGl0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIC4xKTtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuLnJvdyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcbmJ1dHRvbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTAzLCAxMDMsIDI1MCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoOTcsIDkzLCAyMDEpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgY29sb3I6ICNGRkY7XFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBjb2xvcjogcmdiKDUzLCA1MywgNTMpO1xcbn1cXG5kaWFsb2cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDMycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzcHggMXB4IHJnYigxMDMsIDEwMywgMjUwKTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBwYWRkaW5nOiAzMHB4IDMwcHg7XFxuICBtaW4td2lkdGg6IDMwMHB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG4ubW9kYWwge1xcbiAgbWF4LXdpZHRoOiA0NTBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbn1cXG4ubW9kYWwtY29udGVudCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYm94LXNoYWRvdzogMCAwIDNweCAxcHggcmdiKDEwMywgMTAzLCAyNTApO1xcbiAgcGFkZGluZzogMzBweCAzMHB4O1xcbn1cXG4ubW9kYWwtY29udGVudCB1bCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMTBweDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbi5tb2RhbC1jb250ZW50IGJ1dHRvbiB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL0dhbWUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9HYW1lLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGhpdHMgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBoaXRzKys7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gaGl0cyA9PT0gbGVuZ3RoO1xuICB9O1xuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0c1xuXG4gIHJldHVybiB7IGxlbmd0aCwgZ2V0SGl0cywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImNvbnN0IFBsYXllciA9IHJlcXVpcmUoXCIuL1BsYXllci9QbGF5ZXJcIik7XG5yZXF1aXJlKFwiLi9HYW1lLmNzc1wiKTtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IHRvYXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdG9hc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRvYXN0LWNvbnRhaW5lclwiKTtcblxuICBjb25zdCB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICB0b2FzdC5jbGFzc0xpc3QuYWRkKFwidG9hc3RcIik7XG5cbiAgdG9hc3QudGV4dENvbnRlbnQgPSBcIldhaXRpbmcuLi5cIjtcbiAgdG9hc3RDb250YWluZXIuYXBwZW5kQ2hpbGQodG9hc3QpO1xuICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItYm9hcmRcIik7XG5cbiAgY29uc3QgcGxheWVySGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgcGxheWVySGVhZC50ZXh0Q29udGVudCA9IFwiUGxheWVyXCI7XG5cbiAgY29uc3QgY29tcHV0ZXJNaXNzZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcGxheWVySGVhZC5hcHBlbmRDaGlsZChjb21wdXRlck1pc3Nlcyk7XG5cbiAgY29uc3QgcEdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBHYW1lQm9hcmQuY2xhc3NMaXN0LmFkZChcInAtZ2FtZS1ib2FyZFwiKTtcblxuICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYm9hcmRcIik7XG5cbiAgY29uc3QgY29tcHV0ZXJIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb21wdXRlckhlYWQudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyXCI7XG5cbiAgY29uc3QgY0dhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNHYW1lQm9hcmQuY2xhc3NMaXN0LmFkZChcImMtZ2FtZS1ib2FyZFwiKTtcblxuICBjb25zdCByYW5kb21pemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByYW5kb21pemUudGV4dENvbnRlbnQgPSBcIlJhbmRvbWl6ZVwiO1xuXG4gIGNvbnN0IHBsYXllcnMgPSBQbGF5ZXIoKTtcbiAgY29uc3QgcGxheWVyID0gcGxheWVycy5wbGF5ZXI7XG4gIGNvbnN0IGNvbXB1dGVyID0gcGxheWVycy5jb21wdXRlcjtcblxuICBjb25zdCBleGlzdGVkID0gW107XG4gIGxldCBwbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgcmFuZG9taXplLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcbiAgICBjb25zdCBwbGFjZVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgICAgY29uc3QgbGVuZ3RoT3B0aW9uID0gWzIsIDMsIDRdO1xuICAgICAgY29uc3QgbGVuZ3RoSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW5ndGhPcHRpb24ubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGxlbmd0aE9wdGlvbltsZW5ndGhJbmRleF07XG5cbiAgICAgIGNvbnN0IHZlcnRpY2FsID0gW3RydWUsIGZhbHNlXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmVydGljYWwubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGNob2ljZSA9IHZlcnRpY2FsW2luZGV4XTtcblxuICAgICAgbGV0IHJvdywgY29sO1xuICAgICAgZG8ge1xuICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIH0gd2hpbGUgKHBsYXllci5ib2FyZFtyb3ddW2NvbF0pO1xuICAgICAgcGxheWVyLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sLCBjaG9pY2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBwbGFjZUNvbXB1dGVyU2hpcHMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBsZW5ndGhPcHRpb24gPSBbMiwgMywgNF07XG4gICAgICBjb25zdCBsZW5ndGhJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbmd0aE9wdGlvbi5sZW5ndGgpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gbGVuZ3RoT3B0aW9uW2xlbmd0aEluZGV4XTtcblxuICAgICAgY29uc3QgdmVydGljYWwgPSBbdHJ1ZSwgZmFsc2VdO1xuICAgICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2ZXJ0aWNhbC5sZW5ndGgpO1xuICAgICAgY29uc3QgY2hvaWNlID0gdmVydGljYWxbaW5kZXhdO1xuXG4gICAgICBsZXQgcm93LCBjb2w7XG4gICAgICBkbyB7XG4gICAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgfSB3aGlsZSAoY29tcHV0ZXIuYm9hcmRbcm93XVtjb2xdKTtcbiAgICAgIGNvbXB1dGVyLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sLCBjaG9pY2UpO1xuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgcGxhY2VDb21wdXRlclNoaXBzKCk7XG4gICAgICBwbGFjZVBsYXllclNoaXBzKCk7XG4gICAgfVxuICB9O1xuXG4gIGdhbWVMb29wKCk7XG5cbiAgY29uc3QgcmVuZGVyUGxheWVyQm9hcmQgPSAocGxheWVyQm9hcmQpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5ib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICByb3dzLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllci5ib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgY2VsbC5pZCA9IGo7XG4gICAgICAgIGNlbGwuZGF0YXNldC5pZCA9IGk7XG4gICAgICAgIHJvd3MuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cbiAgICAgICAgaWYgKHBsYXllci5ib2FyZFtpXVtqXSkge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHJvd3MpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW5kZXJDb21wdXRlckJvYXJkID0gKGNvbXB1dGVyQm9hcmQpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXB1dGVyLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHJvd3MuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29tcHV0ZXIuYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgIGNlbGwuaWQgPSBqO1xuICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgICByb3dzLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKHBsYXllclR1cm4gJiYgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xpY2tlZFwiKSkge1xuICAgICAgICAgICAgcGxheWVyQXR0YWNrKGNlbGwsIGksIGopO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKHJvd3MpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNldEJvYXJkID0gKCkgPT4ge1xuICAgIC8vIENsZWFyIGJvdGggcGxheWVyJ3MgYW5kIGNvbXB1dGVyJ3MgYm9hcmRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXIuYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGxheWVyLmJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBsYXllci5ib2FyZFtpXVtqXSA9IG51bGw7XG4gICAgICAgIGNvbXB1dGVyLmJvYXJkW2ldW2pdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWluaXRpYWxpemUgdGhlIGdhbWVcbiAgICBnYW1lTG9vcCgpO1xuXG4gICAgLy8gQ2xlYXIgYW5kIHJlbmRlciBwbGF5ZXIncyBib2FyZFxuICAgIHBHYW1lQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByZW5kZXJQbGF5ZXJCb2FyZChwR2FtZUJvYXJkKTtcblxuICAgIC8vIENsZWFyIGFuZCByZW5kZXIgY29tcHV0ZXIncyBib2FyZFxuICAgIGNHYW1lQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByZW5kZXJDb21wdXRlckJvYXJkKGNHYW1lQm9hcmQpO1xuICB9O1xuXG4gIGNvbnN0IGdhbWVPdmVyTW9kYWwgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgZGlhbG9nQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpYWxvZ1wiKTtcbiAgICBjb25zdCBkaWFsb2dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgZGlhbG9nVGV4dC50ZXh0Q29udGVudCA9XG4gICAgICBwbGF5ZXIgPT09IFwiQ29tcHV0ZXJcIlxuICAgICAgICA/IFwiVGhpcyBpcyBub3QgYSBqb2tlISBUaGUgY29tcHV0ZXIgV0lOISFcIlxuICAgICAgICA6IFwiV09XISEgQ29uZ3JhdHVsYXRpb25zISBZb3UgV0luIHRoZSBDaGFsbGVuZ2VcIjtcbiAgICBjb25zdCBva2F5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBva2F5LnRleHRDb250ZW50ID0gXCJPa2F5XCI7XG4gICAgZGlhbG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpYWxvZ1RleHQpO1xuICAgIGRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChva2F5KTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpYWxvZ0NvbnRhaW5lcik7XG5cbiAgICBva2F5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzZXRCb2FyZCgpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgICBkaWFsb2dDb250YWluZXIuY2xvc2UoKTtcbiAgICAgIG1haW4ucmVtb3ZlQ2hpbGQoZGlhbG9nQ29udGFpbmVyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGlhbG9nQ29udGFpbmVyO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKHJvdywgY29sKSA9PiB7XG4gICAgLy8gbGV0IHJvdywgY29sO1xuXG4gICAgaWYgKCFyb3cgJiYgIWNvbCkge1xuICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIGNvb3JkaW5hdGVzIHVudGlsIGZpbmRpbmcgYW4gdW5hdHRhY2tlZCBwb3NpdGlvblxuICAgICAgZG8ge1xuICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIH0gd2hpbGUgKGV4aXN0ZWQuc29tZSgoY29vcmQpID0+IGNvb3JkWzBdID09PSByb3cgJiYgY29vcmRbMV0gPT09IGNvbCkpO1xuICAgIH1cblxuICAgIC8vIGlmICghZ2FtZU92ZXIpIHtcbiAgICAvLyBBdHRhY2sgcGxheWVyJ3Mgc2hpcHNcbiAgICBwbGF5ZXJzLmF0dGFja1NoaXAocGxheWVyLCByb3csIGNvbCk7XG5cbiAgICAvLyBSZWNvcmQgdGhlIGF0dGFja2VkIHBvc2l0aW9uXG4gICAgZXhpc3RlZC5wdXNoKFtyb3csIGNvbF0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBVSSB0byByZWZsZWN0IHRoZSBhdHRhY2tcbiAgICBjb25zdCBjZWxscyA9IHBHYW1lQm9hcmQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChjZWxsLmRhdGFzZXQuaWQgPT09IHJvdy50b1N0cmluZygpICYmIGNlbGwuaWQgPT09IGNvbC50b1N0cmluZygpKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNsaWNrZWRcIik7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwbGF5ZXIuYm9hcmRbcm93XSAmJlxuICAgICAgICAgIHBsYXllci5ib2FyZFtyb3ddW2NvbF0gJiZcbiAgICAgICAgICBwbGF5ZXIuYm9hcmRbcm93XVtjb2xdLmlzU3VuaygpXG4gICAgICAgICkge1xuICAgICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwXCIpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICBwbGF5ZXIuYm9hcmRbcm93XVtjb2xdID0gbnVsbDtcbiAgICAgICAgICBwbGF5ZXJUdXJuID0gZmFsc2VcbiAgICAgICAgICBpZiAocGxheWVyLmFsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgICAgIHBsYXllclR1cm4gPSB0cnVlO1xuICAgICAgICAgICAgZ2FtZU92ZXJNb2RhbChjb21wdXRlckhlYWQudGV4dENvbnRlbnQpLnNob3dNb2RhbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChyb3cgPiAwICYmIHJvdyA8IDkpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHBsYXllci5ib2FyZFtyb3cgLSAxXVtjb2xdICYmXG4gICAgICAgICAgICAgICAgIXBsYXllci5ib2FyZFtyb3cgLSAxXVtjb2xdLmlzU3VuaygpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQXR0YWNrKHJvdyAtIDEsIGNvbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvYXJkW3JvdyArIDFdW2NvbF0gJiZcbiAgICAgICAgICAgICAgICAhcGxheWVyLmJvYXJkW3JvdyArIDFdW2NvbF0uaXNTdW5rKClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJBdHRhY2socm93ICsgMSwgY29sKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYm9hcmRbcm93XVtjb2wgLSAxXSAmJlxuICAgICAgICAgICAgICAgICFwbGF5ZXIuYm9hcmRbcm93XVtjb2wgLSAxXS5pc1N1bmsoKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlckF0dGFjayhyb3csIGNvbCAtIDEpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHBsYXllci5ib2FyZFtyb3ddW2NvbCArIDFdICYmXG4gICAgICAgICAgICAgICAgIXBsYXllci5ib2FyZFtyb3ddW2NvbCArIDFdLmlzU3VuaygpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQXR0YWNrKHJvdywgY29sICsgMSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJBdHRhY2soKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29tcHV0ZXJBdHRhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuICAgICAgICAgIHBsYXllclR1cm4gPSB0cnVlO1xuICAgICAgICAgIHRvYXN0LnRleHRDb250ZW50ID0gXCJZb3VyIHR1cm5cIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllckF0dGFjayA9IChjZWxsLCByb3csIGNvbCkgPT4ge1xuICAgIGNvbnN0IGNlbGxzID0gcEdhbWVCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIik7XG4gICAgLy8gaWYgKCFnYW1lT3Zlcikge1xuICAgIHBsYXllcnMuYXR0YWNrU2hpcChjb21wdXRlciwgcm93LCBjb2wpO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNsaWNrZWRcIik7XG4gICAgaWYgKGNvbXB1dGVyLmJvYXJkW3Jvd11bY29sXSAmJiBjb21wdXRlci5ib2FyZFtyb3ddW2NvbF0uaXNTdW5rKCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInNoaXBcIik7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICB0b2FzdC50ZXh0Q29udGVudCA9IFwiT3Bwb25lbnQgdHVyblwiO1xuICAgICAgcGxheWVyVHVybiA9IGZhbHNlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29tcHV0ZXJBdHRhY2soKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICAvLyB9XG4gICAgaWYgKGNvbXB1dGVyLmFsbFNoaXBTdW5rKCkpIHtcbiAgICAgIHBsYXllclR1cm4gPSB0cnVlO1xuICAgICAgZ2FtZU92ZXJNb2RhbChwbGF5ZXJIZWFkLnRleHRDb250ZW50KS5zaG93TW9kYWwoKTtcbiAgICB9XG4gIH07XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29uc3QgcmVuZGVyQm9hcmRzID0gKCgpID0+IHtcbiAgICAgIHJlbmRlclBsYXllckJvYXJkKHBHYW1lQm9hcmQpO1xuICAgICAgcmVuZGVyQ29tcHV0ZXJCb2FyZChjR2FtZUJvYXJkKTtcblxuICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVySGVhZCk7XG4gICAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChwR2FtZUJvYXJkKTtcbiAgICAgIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJIZWFkKTtcbiAgICAgIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY0dhbWVCb2FyZCk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyQm9hcmRDb250YWluZXIpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuICAgICAgdG9hc3QudGV4dENvbnRlbnQgPSBcIllvdXIgdHVyblwiO1xuICAgIH0pKCk7XG4gICAgcmFuZG9taXplLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgfSwgMTUwMCk7XG5cbiAgcmFuZG9taXplLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICByZXNldEJvYXJkKCk7XG4gIH0pO1xuICBtYWluLmFwcGVuZENoaWxkKHRvYXN0Q29udGFpbmVyKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBtYWluLmFwcGVuZENoaWxkKHJhbmRvbWl6ZSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWFpbik7XG59O1xuXG5jb25zdCBjcmVhdGVHYW1lTW9kYWwgPSAoKSA9PiB7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xuXG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWwtY29udGVudFwiKTtcblxuICBjb25zdCBncmVldGluZ3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGdyZWV0aW5ncy50ZXh0Q29udGVudCA9IFwiV2VsY29tZSB0byBCYXR0bGVzaGlwIVwiO1xuICBjb25zdCBydWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBydWxlcy5pbm5lckhUTUwgPSBgPHVsPlxuICA8bGk+XG4gIFRoZSBvYmplY3RpdmUgb2YgdGhlIGdhbWUgaXMgdG8gc2luayBhbGwgb2YgeW91ciBvcHBvbmVudCdzIHNoaXBzIGJlZm9yZVxuICB0aGV5IHNpbmsgeW91cnMuXG48L2xpPlxuPGxpPkVhY2ggcGxheWVyIHBsYWNlcyB0aGVpciBzaGlwcyBvbiB0aGVpciBib2FyZCw8L2xpPlxuPGxpPlxuICBBbmQgdGhlbiB0YWtlcyB0dXJucyBhdHRhY2tpbmcgdGhlIG9wcG9uZW50J3MgYm9hcmQgYnkgZ3Vlc3NpbmcgdGhlXG4gIGNvb3JkaW5hdGVzIG9mIHRoZWlyIHNoaXBzLlxuPC9saT5cbjwvdWw+YDtcblxuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydFwiO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyAvLyBIaWRlIG1vZGFsXG4gICAgR2FtZSgpOyAvLyBTdGFydCB0aGUgZ2FtZVxuICB9KTtcblxuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoZ3JlZXRpbmdzKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHJ1bGVzKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcbiAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcblxuICByZXR1cm4gbW9kYWw7XG59O1xuY3JlYXRlR2FtZU1vZGFsKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=