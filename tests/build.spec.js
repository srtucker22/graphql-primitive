import {
  graphql,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import GraphQLPrimitive from '../dist/index';

const FIXTURES = [
  'string',
  3,
  Math.PI,
  true,
  false,
  null,
  undefined,
];

describe('GraphQLPrimitive', () => {
  let schema;

  beforeEach(() => {
    schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: GraphQLPrimitive,
            args: {
              arg: {
                type: GraphQLPrimitive,
              },
            },
            resolve: (obj, { arg }) => arg,
          },
        },
      }),
      types: [GraphQLInt],
    });
  });

  describe('serialize', () => {
    it('should support serialization', () => {
      FIXTURES.forEach((fixture) => {
        expect(GraphQLPrimitive.serialize(fixture)).toEqual(fixture);
      });
    });
  });

  describe('parseValue', () => {
    it('should support parsing values', (done) => {
      Promise.all(FIXTURES.map(fixture => graphql(
        schema,
        'query ($arg: Primitive!) { value(arg: $arg) }',
        null,
        null,
        { arg: fixture },
      ).then(({ data }) => {
        if (fixture) {
          expect(data.value).toEqual(fixture);
        }
      }))).then(() => done());
    });
  });

  describe('parseLiteral', () => {

    it('should support parsing literals', (done) => {
      const newSchema = new GraphQLSchema({
        query: new GraphQLObjectType({
          name: 'Query',
          fields: {
            value: {
              type: new GraphQLList(GraphQLPrimitive),
              args: {
                string: {
                  type: GraphQLPrimitive,
                },
                int: {
                  type: GraphQLPrimitive,
                },
                float: {
                  type: GraphQLPrimitive,
                },
                bool: {
                  type: GraphQLPrimitive,
                },
                nil: {
                  type: GraphQLPrimitive,
                },
              },
              resolve: (obj, { string, int, float, bool, nil }) => ([
                string,
                int,
                float,
                bool,
                nil,
              ]),
            },
          },
        }),
        types: [GraphQLInt],
      });
      graphql(newSchema, `
      query ($intValue: Primitive = 3) {
        value(
          string: "string",
          int: $intValue,
          float: 3.14,
          bool: false,
          nil: null,
        ),
      }
      `).then(({ data }) => {
        expect(data.value).toEqual([
          'string',
          3,
          3.14,
          false,
          null,
        ]);
        done();
      });
    });

    it('should handle null literals', () => graphql(schema, `
    {
      value(arg: null)
    }
    `).then(({ data }) => {
      expect(data).toEqual({
        value: null,
      });
    }));

    it('should reject invalid literals', () => graphql(schema, `
    {
      value(arg: INVALID)
    }
    `).then(({ data }) => {
      expect(data).toBeUndefined();
    }));
  });
});
