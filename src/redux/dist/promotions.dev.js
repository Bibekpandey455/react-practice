"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Promotions = void 0;

var _promotions = require("../shared/promotions");

var Promotions = function Promotions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _promotions.PROMOTIONS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    default:
      return state;
  }
};

exports.Promotions = Promotions;