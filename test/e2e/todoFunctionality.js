/* globals casper, document */

var todoFormSelector = ".todo-form";

casper.test.begin("App is setup correctly", 2, function suite(test) {
  casper.start("http://localhost:3000/", function() {
    test.assertExists(".todo-list", "List should exist");
    test.assertExists(todoFormSelector, "Form should exist");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Adds and removes todo items", 3, function suite(test) {
  casper.start("http://localhost:3000/");

  casper.waitForSelector(todoFormSelector, function() {
    this.fill(
      todoFormSelector,
      {
        todo: "Item1"
      },
      true
    );

    test.assertExists(
      ".todo-list .todo-item",
      "List item should exist after being added"
    );

    test.assertField(
      { type: "css", path: ".todo-list .todo-item .todo-input" },
      "Item1",
      "List item should contain added item name"
    );

    this.click(".todo-remove");

    test.assertDoesntExist(
      ".todo-list .todo-item",
      "List item should not exist after item removed"
    );
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Adds and removes multiple todo items", 3, function suite(
  test
) {
  casper.start("http://localhost:3000/");

  casper.waitForSelector(todoFormSelector, function() {
    this.fill(
      todoFormSelector,
      {
        todo: "Item1"
      },
      true
    );

    this.fill(
      todoFormSelector,
      {
        todo: "Item2"
      },
      true
    );

    this.fill(
      todoFormSelector,
      {
        todo: "Item3"
      },
      true
    );

    test.assertElementCount(
      ".todo-list .todo-item",
      3,
      "3 items should be added"
    );

    test.assert(
      casper.evaluate(function() {
        var inputs = document.querySelectorAll(
          ".todo-list .todo-item .todo-input"
        );
        return (
          inputs[0].value === "Item1" &&
          inputs[1].value === "Item2" &&
          inputs[2].value === "Item3"
        );
      }),
      "Items should contain added item names in correct order"
    );

    this.click(".todo-remove");
    this.click(".todo-remove");
    this.click(".todo-remove");

    test.assertElementCount(
      ".todo-list .todo-item",
      0,
      "0 items should remain after removal"
    );
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Marks todo items as done", 1, function suite(test) {
  casper.start("http://localhost:3000/");

  casper.waitForSelector(todoFormSelector, function() {
    this.fill(
      todoFormSelector,
      {
        todo: "Item1"
      },
      true
    );

    this.click(".todo-done");

    test.assertExists(".todo-item--done", "List item should be marked as done");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Does not add empty todo items", 1, function suite(test) {
  casper.start("http://localhost:3000/");

  casper.waitForSelector(todoFormSelector, function() {
    this.fill(todoFormSelector, {}, true);
    test.assertDoesntExist(
      ".todo-list .todo-item",
      "List item should not be added for empty todos"
    );
  });

  casper.run(function() {
    test.done();
  });
});
