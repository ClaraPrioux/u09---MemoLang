import { getExamples, createExample } from "../services/exampleService";

test("should return examples", async () => {
  const examples = await getExamples();
  expect(examples).toBeDefined();
});

test("should create a new example", async () => {
  const example = await createExample("Test Name");
  expect(example.name).toBe("Test Name");
});
