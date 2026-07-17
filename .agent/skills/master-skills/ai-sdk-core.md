---
name: ai-sdk-core
description: |
  Build backend AI with Vercel AI SDK v6 stable. Covers Output API (replaces generateObject/streamObject), speech synthesis, transcription, embeddings, MCP tools with security guidance.
user-invocable: true
---

# Vercel AI SDK Core - Production Patterns

**Version**: AI SDK v6.x (ai@6.x)

---

## 1. Output API (Replaces generateObject/streamObject)

`generateObject()` and `streamObject()` are **deprecated** in v6. Use `generateText()` or `streamText()` with the new `Output` API instead.

### Generating Objects:
```typescript
import { generateText, Output } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: openai('gpt-5'),
  output: Output.object({
    schema: z.object({
      name: z.string(),
      age: z.number(),
    }),
  }),
  prompt: 'Generate a person profile',
});

console.log(result.object); // Strongly typed object
```

### Streaming Objects:
```typescript
import { streamText, Output } from 'ai';

const result = streamText({
  model: openai('gpt-5'),
  output: Output.object({ schema: personSchema }),
  prompt: 'Generate a person profile',
});

for await (const partialObject of result.objectStream) {
  console.log(partialObject);
}

const finalObject = await result.object;
```

---

## 2. Multi-Modal & Embeddings

### Embeddings:
```typescript
import { embed, embedMany } from 'ai';

// Single embedding
const { embedding } = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: 'Hello world',
});

// Batch embeddings
const { embeddings } = await embedMany({
  model: openai.embedding('text-embedding-3-small'),
  values: ['Hello', 'World'],
  maxParallelCalls: 5,
});
```

---

## 3. Human-in-the-Loop (Tool Execution Approval)

Configure dynamic tool execution approvals to balance security and developer experience:

```typescript
import { tool } from 'ai';
import { z } from 'zod';

const tools = {
  deleteFile: tool({
    needsApproval: true, // Requires user confirmation before execution
    inputSchema: z.object({ path: z.string() }),
    execute: async ({ path }) => fs.unlink(path),
  }),
  readFile: tool({
    needsApproval: false, // Safe read operation does not need approval
    inputSchema: z.object({ path: z.string() }),
    execute: async ({ path }) => fs.readFile(path),
  }),
};
```

---

## 4. MCP Tools Security

Running dynamic MCP (Model Context Protocol) tools directly in production has security risks. Instead, generate static tools to commit to version control:

```typescript
// 1. Generate static tools definition (one-time CLI operation)
// npx mcp-to-ai-sdk generate stdio 'npx -y @modelcontextprotocol/server-filesystem'

// 2. Import static generated tools in your code
import { tools } from './generated-mcp-tools';

const result = await generateText({
  model: openai('gpt-5'),
  tools, // Static and reviewed
  prompt: 'Manage files',
});
```
