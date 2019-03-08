import { Kind } from 'graphql/language';
import { GraphQLError } from 'graphql/error';

import GraphQLPrimitive from '../src/index';

describe('GraphQLPrimitive', () => {
  describe('serialize', () => {
    it('should error when serializing a non-primitive value', () => {
      expect(
        GraphQLPrimitive.serialize.bind(GraphQLPrimitive, 'some string'),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.serialize.bind(GraphQLPrimitive, false),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.serialize.bind(GraphQLPrimitive, -7.2),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, undefined),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, null),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.serialize.bind(GraphQLPrimitive, {}),
      ).toThrow(TypeError);
    });
  });

  describe('parseValue', () => {
    it('should error when serializing a non-primitive value', () => {
      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, 'some string'),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, false),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, -7.2),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, undefined),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, null),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseValue.bind(GraphQLPrimitive, {}),
      ).toThrow(TypeError);
    });
  });

  describe('parseLiteral', () => {
    it('should error when parsing a non-primitive value', () => {
      expect(
        GraphQLPrimitive.parseLiteral.bind(GraphQLPrimitive, {
          kind: Kind.INT,
          value: -3,
        }),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseLiteral.bind(GraphQLPrimitive, {
          kind: Kind.String,
          value: 'something',
        }),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseLiteral.bind(GraphQLPrimitive, {
          kind: Kind.BOOLEAN,
          value: true,
        }),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseLiteral.bind(GraphQLPrimitive, {
          kind: Kind.NULL,
        }),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseLiteral.bind(GraphQLPrimitive, {
          kind: Kind.FLOAT,
          value: 7.14,
        }),
      ).not.toThrow();

      expect(
        GraphQLPrimitive.parseLiteral.bind(GraphQLPrimitive, {
          kind: Kind.OBJECT,
          value: {},
        }),
      ).toThrow(GraphQLError);
    });
  });
});
