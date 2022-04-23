"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Leaders = void 0;

var _leaders = require("../shared/leaders");

var Leaders = function Leaders() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _leaders.LEADERS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    default:
      return state;
  }
};

exports.Leaders = Leaders;