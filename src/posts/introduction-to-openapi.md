---
title: "A Brief Introduction to OpenAPI for Everybody"
date: '2023-11-28T9:30'
cover_image: './header-images/network-cables.jpg'
author: Phil Sturgeon
authorUrl: https://philsturgeon.com/
---

It's hard to work on APIs without hearing about OpenAPI.

OpenAPI is an API description format, which is essentially metadata that describes an HTTP API: where it lives, how it works, what data is available, and how it's authenticated. Additional keywords can be used to provide all sorts of validation information, adding a type system to what would otherwise just be arbitrary JSON flying around the internet.

OpenAPI has been around for donkeys years, previously known as Swagger but renamed to OpenAPI in 2016. It's powered by [JSON Schema](https://json-schema.org/), which is also pretty popular in certain circles, but it's only in the last few years that OpenAPI has solidified its place as _the_ description format for HTTP APIs, pushing aside others like RAML and API Blueprint.

Elder developers will remember working with WSDLs and XML Schema, and gRPC and GraphQL folks might be thinking "hang on this sounds a bit familiar", and absolutely. Type systems for APIs are pretty common, but here's an excellent one you can use for your REST/RESTish API.

Here's an example to give you an idea:

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

This describes an API in a machine-readable format, including overall metadata, endpoint paths, request formats, and the details of possible responses you might receive.

## What can OpenAPI do?

OpenAPI specifications provide a machine-readable base on top of which lots of neat API tools can be used and even generated.

One of the most common uses by many API teams to to generate API reference documentation, which helps end-users learn about the API in the same sort of way you'd look up functions and classes to work with a code package. Tools like [Redoc](https://github.com/Redocly/redoc) make it possible to create beautiful API documentation sites automatically, directly from the OpenAPI spec file:

![Preview of the popular OpenAPI documentation tool Redoc](./introduction-to-openapi-redoc.png)

API developers and API end-users all find this pretty helpful, but increasingly OpenAPI is being used throughout the entire API lifecycle.

OpenAPI can be used for validation, to power contract testing and do server-side & client-side validation, and you can use it to generate SDKs, backend server stubs, or even realistic mock servers so that clients can play around with the API before it's even built!

As one example, **[HTTP Toolkit](https://httptoolkit.com/)** uses OpenAPI internally to automatically understand requests to a huge list of public APIs with published OpenAPI specifications. For each request, using the OpenAPI spec HTTP Toolkit can validate the request parameters, and show metadata alongside the raw request & response information, so you can easily understand what an API response actually means and jump straight from a request to the corresponding documentation.

Similarly, you can also load your OpenAPI spec into HTTP Toolkit and other alternative tools, adding your own metadata and validation to help you debug intercepted traffic & requests.

Before getting too much further into use cases though, how does OpenAPI actually work?

## How does OpenAPI work?

### OpenAPI Documents

OpenAPI generally exists as a YAML or JSON document usually called something like `openapi.yaml`. The simple example above showed how to describe a POST with a response, but you can do a lot more, describing any HTTP method, and defining path parameters, query string parameters, and headers, providing their validation rules too if you like.

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

This is a very simplistic API, but regardless how complicated your API is, OpenAPI can describe it, with all sorts of powerful keywords covering the vast majority of needs. We'll just provide a basic introduction here, but you can look through the full [OpenAPI reference](https://learn.openapis.org/specification/) for more details as required.

An OpenAPI document is split into four key sections: `info`, `paths`, `webhooks`, and `components`.

#### info

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

#### paths

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

#### webhooks

A webhook is a way for two systems to communicate in real-time. Instead of an API client repeatedly making requests to the other for updates, the API client provides a URL to the API, and the API will send a HTTP request to that URL when a relevant event occurs.

Describing webhooks is almost identical to describing paths, but instead of describing a request that comes from the API client, and a response made by the API provider, you flip that around: The API provider will send the API client a request, and the API client should respond with a response as described in the webhook.

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

For a webhook, the requestBody is now explaining what HTTP body the API client can expect in the webhook messages, and the responses section now explains that the API client should return a 200 in order to mark it as a success.

#### components

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

#### Schema Objects

Within each of these sections, the `schema` keyword is used to describe types, very similar to XML Schema, protobuff, or gRPC, but with a whole lot more options. The latest version of OpenAPI (v3.1.0) is specifically powered by JSON Schema Draft 2020-12.

It's important to understand these JSON schemas to be able to interpret or write complex OpenAPI types, but fortunately they're mostly quite readable, and often self-explanatory even if you're not already familiar with them.

A full example looks like this:

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

*Head over to the [JSON Schema](https://json-schema.org/understanding-json-schema) website for an in-depth intro.*

## How can you use OpenAPI as an API developer?

Creating this OpenAPI description might seem like extra work, but by being able to generate beautiful interactive documentation, reduce the redundancy in contract tests, automatically build SDKs, and even reduce how much code needs to be written for validation, overall you'll save a lot more time that you ever put in.

The most common workflow is to create it manually with [text editors](https://openapi.tools/#text-editors) or [graphical editors](https://openapi.tools/#gui-editors). Whilst this is a fair bit of up-front work, it can then be used to reduce repetitive tasks throughout the rest of the API Lifecycle, like [contract testing](https://openapi.tools/#testing) and [server-side validation](https://openapi.tools/#data-validators). This is known as the [API Design-first workflow](https://apisyouwonthate.com/blog/api-design-first-vs-code-first).

Whilst most OpenAPI is built up-front, there are plenty of options for other workflows. OpenAPI can generated from code via annotations or educated guesses. This is known as code-first (or contract-first).

Other workflows can be [guesstimated from HTTP traffic](https://apisyouwonthate.com/blog/turn-http-traffic-into-openapi-with-optic/), which is not a great ongoing solution, but it can be handy for "catching up" when you've built a whole API and need to get OpenAPI generated for it to match up with the rest of the company having nice OpenAPI-based documentation and testing.

It can also be converted from other formats like Postman Collections or HAR, using something like [API Transformer](https://www.apimatic.io/transformer/) or via [OpenAPI conversion tools](https://openapi.tools/#converters).

Having this machine-readable API description sitting around in the source code means your API code and API description are always being updated with each pull request, and by powering your contract testing you know it's accurate.

## How can you use OpenAPI as an API consumer?

OpenAPI is often discussed as if it's useful to API developers only, but it has plenty of benefits for API consumers too. You can use OpenAPI to more easily understand an API you'll be using and the responses it'll give you, to validate your requests and provide mocking during testing, to boost the power of your HTTP debugging tools, or generate your own libraries & SDKs to more easily interact with servers.

For example, if you are working with API developers using the API design-first workflow, they'll likely get you involved earlier on to work with mock servers. This might be a hosted mock server they control, or perhaps they'll give you the OpenAPI and let you run your own mock server, which could be as simple as running:

```bash
npm install -g @stoplight/prism-cli
prism mock openapi.yaml
```

Now you'll have a pretend API running locally that you can try integrating with, and whilst it might not have any business logic it'll help you make sure your code is about right, and identify where data is missing for the sort of work you're trying to do, before they waste loads of your time building something that doesn't work for you.

If the team doesn't provide an OpenAPI spec yet, as quick fix you can even record your own just from [sniffing HTTP traffic](https://apisyouwonthate.com/blog/turn-http-traffic-into-openapi-with-optic/).

## Going forwards with OpenAPI

I hope that's been an interesting introduction! If you'd like some real examples, take a look at these large companies' downloadable versions:

- [Digital Ocean](https://github.com/digitalocean/openapi)
- [GitHub](https://github.com/github/rest-api-description)
- [Microsoft Azure](https://github.com/Azure/azure-rest-api-specs/)
- [PayPal](https://github.com/paypal/paypal-rest-api-specifications#openapi-303)
- [Stripe](https://github.com/stripe/openapi)

OpenAPI can be complicated to get started with, but it's useful on both the front & back-end, for testers, developers and others, so it's well worth understanding. Take a look at the above examples for some real-world cases, and feel free to [get in touch](https://httptoolkit.com/contact/) if you have any questions.