import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

function isPrimitive(value) {
  return value === null || ~['boolean', 'string', 'number', 'undefined'].indexOf(typeof value);
}

module.exports = new GraphQLScalarType({
  name: 'Primitive',
  /**
   * Serialize primitive value ~ actually just make sure it's a primitive type
   * @param  {String | Number | Boolean} value primitive value
   * @return {String | Number | Boolean} value primitive value
   */
  serialize(value) {
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
  parseValue(value) {
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
  parseLiteral(ast) {
    const result = ast.value;
    if (!isPrimitive(result)) {
      throw new GraphQLError('Value based primitive not passed to GraphQLPrimitive');
    }

    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      default:
        return null;
    }
  },
});
