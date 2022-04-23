"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureStore = void 0;

var _redux = require("redux");

var _dishes = require("./dishes");

var _comments = require("./comments");

var _promotions = require("./promotions");

var _leaders = require("./leaders");

var ConfigureStore = function ConfigureStore() {
  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    dishes: _dishes.Dishes,
    comments: _comments.Comments,
    promotions: _promotions.Promotions,
    leaders: _leaders.Leaders
  }));
  return store;
};

exports.ConfigureStore = ConfigureStore;