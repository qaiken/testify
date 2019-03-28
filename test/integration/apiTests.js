describe("API integration", function() {
  var server, setupStub, JSONresponse;
  before(function() {
    JSONresponse = {
      todos: [
        { name: "Test1", done: true },
        { name: "Test2", done: false },
        { name: "Test3", done: true }
      ]
    };
    setupStub = sinon.stub(todo, "setup");
    server = sinon.fakeServer.create();
    server.respondWith("GET", "http://localhost:3000/todos", [
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(JSONresponse)
    ]);
  });

  after(function() {
    server.restore();
    todo.setup.restore();
  });

  it("todo.setup receives an array of todos when todo.init is called", function() {
    todo.init();
    server.respond();
    assert(setupStub.calledOnce);
    assert(setupStub.calledWith(JSONresponse.todos));
  });
});
