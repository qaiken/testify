# Testify

## Introduction

## Tools You'll Use

### [Grunt]

Grunt is used to perform build tasks, kick of testing operations, and
watch files for changes to rebuild and test as necessary.

Alternatives:  Gulp

### [Karma]

Karma is used to run unit tests client-side in real browsers.  It provides the backbone that many other testing frameworks build off of.

### [Mocha]

Mocha provides many of the core testing functions needed for testing.  Tools like
describe blocks, it statements, and basic assertions come from Mocha.

Alternatives:  Jasmine, Jasmine-node for server-side, Vows, QUnit

### [Chai]

An extension library designed to be used in conjunction with another testing
framework like Mocha or Jasmine.  It gives you additional assertion capabilities
and lets you write your tests in a way that makes sense semantically.

Alternatives:  Must, ShouldJS

### [Sinon]

Another extension library that's really useful for creating spies (let you see if functions have been called), fake Ajax requests (so you don't accidentally send test data whenever you run a test), and timers (if you need to ensure something happens after x milliseconds but don't want to actually wait).

Alternatives: FrisbyJS

### [Istanbul]

Istanbul generates code coverage reports for client-side unit tests.  It will tell
you where the holes are in your tests.

Alternatives:  Coveralls

### [CasperJS]

CasperJS is used to run client-side end-to-end tests in a headless browser.  Mocha, Chai,
and Sinon are great for testing code, but Casper will test what will actually happen
when a user interacts with your code in a browser.

Alternatives:  PhantomJS, Protractor, Zombie.js, Ghost

### [PhantomCSS]

PhantomCSS is used to automate visual testing by comparing rendered front-end pages before and after new changes. It renders image diffs highlighting changes that indicate possible CSS conflicts or other breaking UI changes.

Alternatives:  Hardy.io

### [Circle-CI]

Circle-CI is used to simplify adding new commits, running tests, and deploying code.  It is extremely useful when many different engineers are all working with the same code base.  Implementing a continuous integration ("CI") workflow that emphasizes best practices reduces the complexity of resolving conflicts that inevitably arise when many people are working simultaneously on the same code base. An example workflow may include:
- Write and pass all tests before checking in code
- Stop all check-ins if build is broken until it is working
- Once code is checked in, don't pack up and go home until the build succeeds

Alternatives:  Travis-CI, Wercker, Jenkins

### Other Tools

Supertest is a small but very convenient library for making HTTP requests and
assertions on them for testing server APIs. It works on both the client and
server, and is built to work with Mocha and other testing frameworks.

## Basic Requirements

### Grunt

First, you'll need to make sure you have Grunt

```bash
npm install -g grunt-cli
```

Next, get all of your application's dependencies

```bash
npm install
```

Next, compile your `dist` directory

```bash
grunt build
```

This will automatically:
* Lint all the client and server files for errors
* Delete any existing compiled code
* Build a concatenated and uglified copy of the code and put that in the `dist` folder. This is
the version of your code that you would actually deploy

There is also default Grunt task that has been set up to do a few things automatically (once running) on every save:
- Run `grunt build`
- Start an express server to serve up assets
- Watch all of the appropriate files and rebuild when appropriate
- Start Karma and rerun all the tests when any of the watched files change


- [ ] Run `grunt` (which will run the 'default' task) in the terminal and review all of the outputs.  In particular, notice what tasks it performs.
- [ ] Navigate your browser to `localhost:3000` to see what the todo app looks like

### Testing Setup

Review the `karma.conf.js` file.  Normally, you would have to set this up
yourself by running `karma init karma.conf.js` ([karma init info]), but it's
already taken care of here.

The `karma.conf.js` file provides all of the configuration options that Karma
will use to run tests. It is already set up to use Mocha and Chai, but we
want to use Sinon in our tests as well.

- [ ] Install [Sinon] as a dev dependency and update the `karma.conf.js`
file appropriately (**HINT:** you will need to mimic the setup that is already
in place for Mocha and Chai)

### Unit Tests

Unit tests should focus on a single method or class, each test tackling one isolated component of your app; for this reason, these are also called component tests. If the function interacts with other parts of your app or other functions (like everything in `todo.App.js` does) it should be part of an [integration](#integration-tests) or [end-to-end](#end-to-end-e2e-tests) test.

Unit tests can only be used to test isolated - code that is written in small units that can be considered separately from other code. If your code is written so that even small pieces rely on the complex global state of an application, then you will have a very hard time writing helpful unit tests, as you will have to simulate the state of the entire application to test even small pieces of it.

It's important to keep this in mind as you write your code. Always consider whether the code you are writing is easily testable, as the same qualities which lead code to be easily testable overlap with those of good code in general:

- Isolated code: code that relies only on its arguments
- Pure functions: code that produces output rather than side effects
- Modularity: code that only does one thing
 - If code needs to do multiple things, it is good practice to compose it of smaller, more focused units.

We've created useful helper functions in the `client/scripts/todo/todo.util.js` file. These functions take inputs and return a result, without mutating anything other than what's passed in - perfect for unit tests!

- [ ] Write at least one test for each util method
- [ ] Write a test that uses the `should` assertion method
- [ ] Write a test that uses the `expect` assertion method
- [ ] Write a test that uses the `assert` assertion method
- [ ] Write a test that uses the `.to` method
- [ ] Write a test that uses the `.not` method
- [ ] Write a test that uses the `.equal` method
- [ ] Write a test that uses the `.have` method
- [ ] Write a test that uses the `.length` method
- [ ] Write a test that uses the `.property` method
- [ ] Write a test that uses the `.typeOf` method
- [ ] Run `grunt testClient` in the terminal, which runs the testClient task that's defined in `Gruntfile.js`.  Make sure all your tests pass.

### Integration Tests

With Unit tests, you ensured that single components of your app worked in isolation.
Integration tests are where you start bringing those separate modules of your app together.

Integration tests are used to test the interfaces of your components, and the simple integrations between them.
This ensures that output from any component is handled correctly by those downstream.
You should _not_ use integration testing to test the entire workflow of your application;
rather, integration tests should be used to test single interfaces:
- whether a component gives the right output when given specific inputs (exposes the expected interface),
- whether component a works with component b (whether they integrate correctly),
- and whether b works with c.

Holistic testing (testing of the entire application) should be done as an
[end-to-end](#end-to-end-e2e-tests) test.

Good integration tests will test specific interfaces of your components to ensure that they work as
expected, and expose the necessary data and functionality between your components.

Our app pings the server for a list of todos, which it will then render on the page.  We want
to write tests that ensure we're requesting this data correctly.

- [ ] Research what [Sinon](http://sinonjs.org/docs/) `before` and `after` blocks do and figure out how we'll use them in this section
- [ ] Use Sinon to create a fake server to ensure we don't send real API requests
- [ ] Use Sinon to create a [stub](http://sinonjs.org/docs/#stubs) that will ensure `todo.setup` doesn't create a `new todo.App`
- [ ] In the `after` block, make sure you restore anything you've modified
- [ ] Create a sample JSON response that matches the way our server will respond and confirm your stub is called with that response
- [ ] Run `grunt testClient` in the terminal, which runs the testClient task that's defined in `Gruntfile.js`.  Make sure all your tests pass.

### Code Coverage

You've now written quite a few tests and are probably wondering "how much of my code have I actually tested?"  Lucky for you, there are tools like [Istanbul] that will answer this question for you!

Open `results/coverage/Chrome/todo/index.html` and review the report.

- [ ] Research what the statement, branch, functions, and lines metrics relate to
- [ ] Get 100% code coverage on `todo.util.js` (this should already be done if you wrote good unit tests!)

### End-To-End (E2E) Tests

E2E tests check that your application functions as a whole. The entire workflow of the application
should be mocked, to make sure that every integration flows smoothly. _Individual integrations
should be tested with integration tests_, e2e testing is to check that the entire system works and
fulfills the requirements that is set for it.

Up until now, your tests have been focused on the code itself, not the user's experience interacting
with your code.  That's where headless browsers come into play.  These tools open a browser and simulate
user interaction by actually navigating to urls, filling out forms, and clicking on buttons. This
is where you test real user workflows from beginning to end.

- [ ] Start by reading through the [Casper testing tutorial] to learn Casper syntax and testing template (**Don't skip this step**)
- [ ] Look at `test/e2e/todoFunctionality.js`.  There is one test already written for you.
- [ ] Run `grunt teste2e` in terminal.  You're already passing your first Casper test!
- [ ] Write a test that adds and removes todo items
- [ ] Write a test that adds and removes multiple todo items
- [ ] Write a test that marks todo items as done
- [ ] Write a test that ensures the user cannot add empty todo items

### Wrapping It All Up

Finally, let's take advantage of Grunt by running `grunt build test` in the terminal.  This will clean, copy,
concat, uglify, run unit tests, run integration tests, and run end to end tests, all with three words in the
terminal.  Whenever you create a new feature, all you have to do is write tests for the new code, run this command and boom! - you test not only
your new feature, but also all existing features to make sure you didn't break anything unintentionally.  This
is the beauty of build tests and robust tests.

## Extra Credit

### Robust Testing

Check out [TodoMVC], which served as inspiration for our application.  You can find the [TodoMVC source] here,
but what's most interesting are the [TodoMVC tests], which has over 400 lines of tests.

- [ ] Review the [TodoMVC tests] and figure out how to implement some of their tests into your project

### Visual Tests

[PhantomCSS]

Ever create a new CSS class only to realize that one already existed and you just whacked out the styling of some other part of your app?  That's where Visual Testing comes into play.

PhantomCSS will go through your app and take screenshots, creating images that show diffs where the visuals "break".  You then review those screenshots to make decisions about how to resolve those diffs.

- [ ] Implement a few visual tests to ensure todos are styled correctly

## License
Copyright 2015, MakerSquare. All rights reserved. Unauthorized distribution of
any code contained herein is prohibited.


<!-- Links -->

[node-inspector]:https://github.com/node-inspector/node-inspector
[semantic versioning]:http://semver.org/spec/v2.0.0.html
[CONTRIBUTING.md]:CONTRIBUTING.md
[CHANGELOG.md]:CHANGELOG.md

[Grunt]:http://gruntjs.com/
[Karma]:http://karma-runner.github.io/
[karma-coverage]:https://github.com/karma-runner/karma-coverage
[karma-jasmine]:https://github.com/karma-runner/karma-jasmine
[karma-chrome-launcher]:https://github.com/karma-runner/karma-chrome-launcher
[karma init info]:http://karma-runner.github.io/0.12/intro/configuration.html
[CasperJS]:http://casperjs.org/
[Casper testing tutorial]:http://casperjs.readthedocs.org/en/latest/testing.html
[Istanbul]:http://gotwarlost.github.io/istanbul/
[grunt-karma]:https://github.com/karma-runner/grunt-karma
[grunt-casperjs]:https://github.com/ronaldlokers/grunt-casperjs
[grunt-express-server]:https://github.com/ericclemmons/grunt-express-server
[grunt-contrib-jshint]:https://github.com/gruntjs/grunt-contrib-jshint
[grunt-contrib-watch]:https://github.com/gruntjs/grunt-contrib-watch

[Mocha]:http://visionmedia.github.io/mocha/
[Chai]:http://chaijs.com/
[Sinon]:http://sinonjs.org/
[Circle-CI]:https://circleci.com/
[Travis-CI]:https://travis-ci.org/
[Wercker]:http://wercker.com/
[PhantomCSS]:https://github.com/Huddle/PhantomCSS

[TodoMVC]:http://todomvc.com/vanilla-examples/vanillajs/
[TodoMVC source]:https://github.com/tastejs/todomvc/tree/gh-pages/vanilla-examples/vanillajs
[TodoMVC tests]:https://github.com/tastejs/todomvc/blob/gh-pages/vanilla-examples/vanillajs/test/ControllerSpec.js

<!-- End links -->
