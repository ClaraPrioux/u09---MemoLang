interface Example {
  id: number;
  name: string;
}

const examples: Example[] = []; // In-memory storage for examples
let currentId = 1; // To simulate auto-incrementing IDs

export const getExamples = async (): Promise<Example[]> => {
  return examples;
};

export const createExample = async (name: string): Promise<Example> => {
  const newExample: Example = { id: currentId++, name };
  examples.push(newExample);
  return newExample;
};
