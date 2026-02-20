import Text "mo:core/Text";
import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type TestCase = {
    id : Nat;
    type_ : Text;
    description : Text;
    steps : [Text];
    preconditions : [Text];
    expectedResults : [Text];
  };

  type TestSuite = {
    functional : [TestCase];
    boundary : [TestCase];
    edgeCases : [TestCase];
    exploratory : [TestCase];
    positive : [TestCase];
    negative : [TestCase];
    orderedSequence : [TestCase];
  };

  // Simulated requirement processing (actual file parsing done externally)
  func generateTestCases(requirements : [Text]) : TestSuite {
    let functional = requirements.map(
      func(req) {
        {
          id = 1;
          type_ = "Functional";
          description = "Functional test for " # req;
          steps = ["Step 1", "Step 2"];
          preconditions = ["Precondition 1"];
          expectedResults = ["Expected result 1"];
        };
      }
    );

    let boundary = requirements.map(
      func(req) {
        {
          id = 2;
          type_ = "Boundary";
          description = "Boundary test for " # req;
          steps = ["Boundary step 1"];
          preconditions = [];
          expectedResults = ["Boundary result"];
        };
      }
    );

    let edgeCases = requirements.map(
      func(req) {
        {
          id = 3;
          type_ = "Edge Case";
          description = "Edge case test for " # req;
          steps = ["Edge case step 1"];
          preconditions = [];
          expectedResults = ["Edge case result"];
        };
      }
    );

    let exploratory = requirements.map(
      func(req) {
        {
          id = 4;
          type_ = "Exploratory";
          description = "Exploratory test for " # req;
          steps = ["Explore step 1"];
          preconditions = [];
          expectedResults = ["Explore result"];
        };
      }
    );

    let positive = requirements.map(
      func(req) {
        {
          id = 5;
          type_ = "Positive";
          description = "Positive test for " # req;
          steps = ["Positive step 1"];
          preconditions = [];
          expectedResults = ["Positive result"];
        };
      }
    );

    let negative = requirements.map(
      func(req) {
        {
          id = 6;
          type_ = "Negative";
          description = "Negative test for " # req;
          steps = ["Negative step 1"];
          preconditions = [];
          expectedResults = ["Negative result"];
        };
      }
    );

    // Order functional first, then boundary, edge, exploratory, positive, negative
    let orderedSequence = functional.concat(boundary).concat(edgeCases).concat(exploratory).concat(positive).concat(negative);

    {
      functional;
      boundary;
      edgeCases;
      exploratory;
      positive;
      negative;
      orderedSequence;
    };
  };

  public query ({ caller }) func getTestSuite(requirements : [Text]) : async TestSuite {
    generateTestCases(requirements);
  };
};
