# graphql-primitive [![Npm version](https://img.shields.io/npm/v/graphql-primitive.svg)](https://www.npmjs.com/package/graphql-primitive) [![Build Status](https://travis-ci.org/srtucker22/graphql-primitive.svg?branch=master)](https://travis-ci.org/srtucker22/graphql-primitive) [![Coverage Status](https://coveralls.io/repos/github/srtucker22/graphql-primitive/badge.svg?branch=master)](https://coveralls.io/github/srtucker22/graphql-primitive?branch=master)

[![Greenkeeper badge](https://badges.greenkeeper.io/srtucker22/graphql-primitive.svg)](https://greenkeeper.io/)

## A GraphQL Primitive Scalar Type

* [Overview](#overview)
* [Installing](#installing)
* [Usage](#usage)
* [Contributing](#contributing)
* [Licence](#licence)

## Overview

GraphQL Primitive Scalar is a scalar that accepts the following Javascript primitives:

* String
* Number
* Boolean
* undefined
* null

Ever wanted to accept or send multiple primitives in GraphQL? :)

## Installation

```bash
yarn add graphql-primitive
```

## Usage

```js
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLPrimitive from 'graphql-primitive';

const schemaString = `
scalar Primitive
type Foo {
  aField: [Primitive] # an array of String | Int | Boolean | undefined | null
}
type Query {
  foo: Foo
}
`;

const resolveFunctions = {
  JSON: GraphQLPrimitive
};

const jsSchema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });
```

## Contributing

This project welcomes code contributions, bug reports and feature requests. Please see the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md) if you are interested in contributing.

## License

MIT License

Copyright (c) 2017 Simon Tucker

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
