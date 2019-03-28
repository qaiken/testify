var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('the todo.App', function() {
  describe('the todo object', function(){
    it('should be an object', function(){
      expect(todo).to.be.a('object');
    });

    it('should have all the necessary methods', function(){
      expect(todo.util).to.have.property('trimTodoName');
      expect(todo.util).to.have.property('isValidTodoName');
      expect(todo.util).to.have.property('getUniqueId');
    });
  });
});

describe('the todo.util methods', function() {
  describe('the trimTodoName function', function() {
    it('should remove leading whitespace', function() {
      todo.util.trimTodoName(' hello').should.equal('hello');
    });

    it('should remove trailing whitespace', function() {
      todo.util.trimTodoName('hello ').should.have.length(5);
    });

    it('should remove leading and trailing whitespace', function() {
      assert(todo.util.trimTodoName(' hello '), 'hello');
    });
  });

  describe('the isValidTodoName function', function() {
    it('should be invalid for empty string', function() {
      expect(todo.util.isValidTodoName('')).to.equal(false);
    });

    it('should be invalid for string of length 1', function() {
      expect(todo.util.isValidTodoName('a')).to.equal(false);
    });

    it('should be invalid for string consisting of spaces', function() {
      expect(todo.util.isValidTodoName('   ')).to.not.equal(true);
    });

    it('should be valid for string of length 2', function() {
      expect(todo.util.isValidTodoName('ab')).to.equal(true);
    });
  });

  describe('the getUniqueId function', function() {
    it('should return 1 on first invocation', function() {
      expect(todo.util.getUniqueId()).to.equal(1);
    });

    it('should increment after each invocation', function() {
      expect(todo.util.getUniqueId()).to.equal(2);
      expect(todo.util.getUniqueId()).to.equal(3);
    });
  });
});
