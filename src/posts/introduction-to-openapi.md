---
title: "Introduction to OpenAPI"
date: '2023-11-11T10:30'
# cover_image: 
# hackerNewsUrl: 
# twitterUrl: 
---

It's hard to work on an API without hearing about OpenAPI. OpenAPI is an API Description Format, which is essentially metadata that describes an HTTP API: where it lives, how it works, what data is available, how it's authenticated. Different keywords provide all sorts of validation information, adding a type system to what would otherwise just be arbitrary JSON flying around the internet. 

OpenAPI has been around for donkeys years, previously known as Swagger but renamed to OpenAPI in 2016. It's powered by JSON Schema, which is also pretty popular in certain circles, but it's only in the last few years that OpenAPI has solidified it's place as _the_ description format for HTTP APIs, pushing aside others like RAML and API Blueprint.

Elder developers will remember working with WSDLs and XML Schema, and gRPC and GraphQL folks might be thinking "hang on this sounds a bit familiar", and absolutely. Type systems for APIs are pretty common, but here's an excellent one you can use for your REST/RESTish API.

Here's a snippet to give you an idea:

```yaml
openapi: 3.1.3

info:
  title: Your Awesome API
  version: '1.0.3'
  description: More information and introduction.

paths:
  /things:
    post:
      summary: Create a thing
      requestBody:
        content:
          application/json: 
            schema:
              type: object
              properties:
                name:
                  type: string
                  examples:
                    - Tim
              
      responses:
        '201':
          description: "Created"
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    format: uuid
                  name:
                    type: string
                    examples:
                      - Tim
                  created_at:
                    type: string
                    format: date-time
                    example: 2020-01-01T00:00:00Z
```

## What can OpenAPI actually do?

The OpenAPI descriptions are used by many API teams to make API Reference Documentation, which helps end-users learn about the API in the same sort of what you'd look up functions and classes to work with a code package.

redoc-demo.png

API developers and API end-users all find this pretty helpful, but increasingly OpenAPI is being used throughout the entire API lifecycle. 

It can assist API planning, power contract testing, server-side and client-side validation, generate code (SDKs, backends), and even build realistic mock servers to help clients play around with the API before it's even built! 

Before getting too much further, how does OpenAPI actually work?

## OpenAPI Documents

OpenAPI generally exists as YAML or JSON document usually called something like `openapi.yaml`. The simple example above showed how to describe a POST` with a response, but you can do a lot more, describing any HTTP method, and defining path parameters, query string parameters, and headers, providing their validation rules too if you like. 

```yaml
openapi: 3.1.3

info:
  title: Widget API
  description: The worlds best collection of Widgets.
  version: '1.1.0'
  
paths:
  /widgets/{uuid}:
    get:
      operationId: fetch-widget
      description: Fetch a Widget

      parameters:
        - name: uuid
          in: path
          required: true
          description: A unique identifier that each Widget has to help you look it up.
          schema:
            type: string
            format: uuid
 
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:	
                type: object
                properties:
                  other-fields:
                    type: string
```

This is a very simplistic API, but regardless how complicated your API is, OpenAPI can describe it, with all sorts of powerful keywords covering the vast majority of needs. 

The OpenAPI document is split into four key sections: `info`, `paths`, `webhooks`, and `components`.

### info

The info section establishes general information about the API, helping people find support if they need it, learn about the license, and read a whole introduction.

```yaml
openapi: 3.1.3
info:
  title: Your Awesome API
  version: '1.0.3'
  description: > 
    More information, getting started, etc. *with Markdown!*
  contact:
    name: Who Owns the API
    url: https://www.example.org/support
    email: support@example.com
  license: 
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
```

The `description` which can be quite extensive and powered by [CommonMark](https://commonmark.org/) (standardized Markdown), so when it's picked up by API documentation tools it's like a little getting started guide (if you don't have one of those elsewhere).

### paths

This is the most important section, it helps outline all the endpoints (resources) of the API. It covers HTTP headers (a.k.a HTTP fields), parameters, and points to which authentication schemes are involved if any.

Using the Tic Tac Toe example from OpenAPI Initiative, you can define multiple methods per path.

```yaml
paths:
  /board:
    get:
      ...
    put:
      ...
```

Each of these HTTP methods has an "Operation", which looks a bit like this:

```yaml
paths:
  /board:
    get:
      summary: Get the whole board
      description: Retrieves the current state of the board and the winner.
      operationId: get-board
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/status"
```

The `$ref` is a Reference to another component, which helps us reduce repetition in the OpenAPI document, and we'll explain that a bit in a moment.

*Find out more about Paths on [Learn OpenAPI: API Endpoints](https://learn.openapis.org/specification/paths.html)*.

### webhooks

Describing webhooks is almost identical to describing paths, but instead of describing a request that comes from the API client, and a response made by the API provider, you flip that around.

The API Provider will send the API client a request, and the API client should respond with a response as described in the webhook.

If a Tic Tac Toe game had a webhook, maybe it is letting another backend system know who won a game.

```yaml
openapi: 3.1.3

webhooks:
  # Arbitrary name for the webhook
  newThing:
    post:
      requestBody:
        description: "A game was completed"
        content:
          application/json: 
            schema: 
              type: object
              properties:
                winner: https://example.org/api/users/Tim
                loser: https://example.org/api/users/Phil
                duration: 30
      responses:
        '200':
          description: "OK"
```
  
That lets the API client know they should return a 200 in order to mark it as a success, and might suggest other statuses for other scenarios. 

### components

Components allow you to define schemas, headers, parameters, requestBodies, responses, and other reusable bits of OpenAPI to be used in multiple places. 

```yaml
components:

  schemas:
    coordinate:
      type: integer
      minimum: 1
      maximum: 3
      
  parameters:
    rowParam:
      name: row
      in: path
      required: true
      schema:
        $ref: "#/components/schemas/coordinate"
    columnParam:
      name: column
      in: path
      required: true
      schema:
        $ref: "#/components/schemas/coordinate"
paths:
  /board/{row}/{column}:
    parameters:
      - $ref: "#/components/parameters/rowParam"
      - $ref: "#/components/parameters/columnParam"
```

This keeps things nice and tidy, and you can even spread them across multiple documents to share components between multiple APIs, or at least just keep your file sizes down.

*Find out more about Components on [Learn OpenAPI: Reusing Descriptions](https://learn.openapis.org/specification/components.html).*

### Schema Objects

The `schema` keyword helps to describe types, very similar to XML Schema, protobuff, or gRPC, but with a whole lot more options. This is powered by JSON Schema Draft 2020-12, and a bigger example looks a bit like this:

```yaml
description: A representation of a movie
type: object
required: 
- title
- director
- releaseDate
properties:
  title:
    type: string
  director:
    type: string
  releaseDate:
    type: string
    format: date
  genre:
    type: string,
    enum: 
    - Action
    - Comedy
    - Drama
    - Science Fiction
  duration: 
    type: string
  cast: 
    type: array
    items:
      type: string
```

*Head over to the [JSON Schema](https://json-schema.org/understanding-json-schema) website to learn more.*

## How to use this as an API developer

The most common workflow is to create it manually with [text editors](https://openapi.tools/#text-editors) or [graphical editors](https://openapi.tools/#gui-editors). Whilst this is a fair bit of up front work, it can then be used to reduce repetitive tasks throughout the rest of the API Lifecycle, like [contract testing](https://openapi.tools/#testing) and [server-side validation](https://openapi.tools/#data-validators). This is known as the [API Design-first workflow](https://apisyouwonthate.com/blog/api-design-first-vs-code-first).

Whilst most OpenAPI is built up front, there are plenty of options for other workflows. OpenAPI can generated from code via annotations or educated guesses. This is known as code-first (or contract-first).

Other workflows can be [guesstimated from HTTP traffic](https://apisyouwonthate.com/blog/turn-http-traffic-into-openapi-with-optic/), which is not a great ongoing solution, but it can be handy for "catching up" when you've built a whole API and need to get OpenAPI generated for it to match up with the rest of the company having nice OpenAPI-based documentation and testing.

It can also be converted from other formats like Postman Collections or HAR, using something like [API Transformer](https://www.apimatic.io/transformer/) or via [OpenAPI conversion tools](https://openapi.tools/#converters). 

Having this machine-readable API description sitting around in the source code means your API code and API description are always being updated with each pull request, and by powering your contract testing you know it's accurate.

I hope that's been an interesting introduction! If you'd like some real examples take a look at these large companies' downloadable versions, and get in touch if you have any questions.

- [Digital Ocean](https://github.com/digitalocean/openapi)
- [GitHub](https://github.com/github/rest-api-description)
- [Microsoft Azure](https://github.com/Azure/azure-rest-api-specs/)
- [PayPal](https://github.com/paypal/paypal-rest-api-specifications#openapi-303)
- [Stripe](https://github.com/stripe/openapi)
