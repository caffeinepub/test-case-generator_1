import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

actor {
  include MixinStorage();

  type TestCase = {
    id : Nat;
    type_ : Text;
    title : Text;
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

  func createTestCases(
    requirements : [Text],
    id : Nat,
    type_ : Text,
    stepPrefix : Text,
    preconditionPrefix : ?Text,
    expectedResultPrefix : Text,
  ) : [TestCase] {
    requirements.map(
      func(req) {
        {
          id;
          type_;
          title = type_ # " Test: " # req;
          description = type_ # " test for: " # req;
          steps = [stepPrefix # " Step 1"];
          preconditions = switch (preconditionPrefix) {
            case (null) { [] };
            case (?prefix) { [prefix # " Precondition 1"] };
          };
          expectedResults = [expectedResultPrefix # " Result 1"];
        };
      }
    );
  };

  func concatArrays(arrays : [[TestCase]]) : [TestCase] {
    arrays.flatMap(func(array) { array.values() });
  };

  func generateTestCases(requirements : [Text]) : TestSuite {
    let functional = createTestCases(
      requirements,
      1,
      "Functional",
      "Functional",
      ?"Functional",
      "Functional",
    );

    let boundary = createTestCases(
      requirements,
      2,
      "Boundary",
      "Boundary",
      ?"Boundary",
      "Boundary",
    );

    let edgeCases = createTestCases(
      requirements,
      3,
      "Edge Case",
      "Edge",
      ?"Edge",
      "Edge",
    );

    let exploratory = createTestCases(
      requirements,
      4,
      "Exploratory",
      "Exploratory",
      ?"Exploratory",
      "Exploratory",
    );

    let positive = createTestCases(
      requirements,
      5,
      "Positive",
      "Positive",
      ?"Positive",
      "Positive",
    );

    let negative = createTestCases(
      requirements,
      6,
      "Negative",
      "Negative",
      ?"Negative",
      "Negative",
    );

    let orderedSequence = concatArrays([functional, boundary, edgeCases, exploratory, positive, negative]);

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
