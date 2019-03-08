"use strict";

var _graphql = require("graphql");

var _error = require("graphql/error");

var _language = require("graphql/language");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isPrimitive(value) {
  return value === null || ~['boolean', 'string', 'number', 'undefined'].indexOf(_typeof(value));
}

module.exports = new _graphql.GraphQLScalarType({
  name: 'Primitive',

  /**
   * Serialize primitive value ~ actually just make sure it's a primitive type
   * @param  {String | Number | Boolean} value primitive value
   * @return {String | Number | Boolean} value primitive value
   */
  serialize: function serialize(value) {
    if (!isPrimitive(value)) {
      throw new TypeError('Value based primitive not passed to GraphQLPrimitive');
    }

    return value;
  },

  /**
   * Parse value into primitive
   * @param  {*} value primitive value
   * @return {String | Number | Boolean} primitive value
   */
  parseValue: function parseValue(value) {
    if (!isPrimitive(value)) {
      throw new TypeError('Value based primitive not passed to GraphQLPrimitive');
    }

    return value;
  },

  /**
   * Parse ast literal to primitive
   * @param  {Object} ast graphql ast
   * @return {String | Number | Boolean} primitive value
   */
  parseLiteral: function parseLiteral(ast) {
    var result = ast.value;

    if (!isPrimitive(result)) {
      throw new _error.GraphQLError('Value based primitive not passed to GraphQLPrimitive');
    }

    switch (ast.kind) {
      case _language.Kind.STRING:
      case _language.Kind.BOOLEAN:
        return ast.value;

      case _language.Kind.INT:
      case _language.Kind.FLOAT:
        return parseFloat(ast.value);

      default:
        return undefined;
    }
  }
});