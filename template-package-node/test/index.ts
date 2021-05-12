import assert from "assert"
import { testExport } from "@Src/index"

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.strictEqual([1,2,3].indexOf(4), -1);
    });
  });
})

describe("testExport", function() {
  it("just as a example", function() {
    assert.strictEqual(testExport, "hello scaffold")
    assert.strictEqual(testExport, "wrong string")
  })
})
