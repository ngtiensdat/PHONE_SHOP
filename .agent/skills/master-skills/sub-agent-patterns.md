---
name: sub-agent-patterns
description: |
  Comprehensive guide to sub-agents in Claude Code: built-in agents (Explore, Plan, general-purpose), custom agent creation, configuration, and delegation patterns.
user-invocable: true
---

# Sub-Agents in Claude Code - Production Patterns

Sub-agents are specialized AI assistants that Claude Code can delegate tasks to. Each sub-agent has its own context window, configurable tools, and custom system prompt.

---

## 1. Context Hygiene (Why Use Sub-Agents)

The primary value of sub-agents is keeping your main conversation context clean.

* **Without agent**: Verbose tool outputs (build logs, test suites, git diffs) accumulate in the main context, causing context bloat, high cost, and reduced reasoning quality.
* **With agent**: Sub-agent executes the verbose task, handles the logs, and returns a concise summary (~30 lines) to the main context. The agent's intermediate history is discarded.

---

## 2. Creating Custom Sub-Agents

Custom sub-agents are markdown files with YAML frontmatter located in `.claude/agents/` (for project scope) or `~/.claude/agents/` (for user scope).

*Note: Restart the Claude Code session after creating or deleting custom agents to apply changes.*

### File Format:
```yaml
---
name: code-reviewer
description: Expert code reviewer. Use proactively after code changes.
tools: Read, Grep, Glob
model: sonnet
permissionMode: default
---

You are a senior code reviewer. Analyze the file changes for clean code, SOLID principles, and potential bugs.
```

---

## 3. Avoiding Bash Approval Spam (CRITICAL)

If a sub-agent has `Bash` access, it may default to running terminal commands for file operations, triggering frequent user approvals.

### Solutions:
1. **Remove Bash from tools**: If the sub-agent only reads or writes files, configure it with `tools: Read, Write, Edit, Glob, Grep`.
2. **Put instructions first**: If the agent must have Bash access, instruct it clearly at the very top of the prompt to use `Write` and `Edit` tools instead of bash commands for file modifications.

---

## 4. Model Selection Strategy

* **`sonnet` (Default)**: Best for content generation, reasoning, code editing, and audits.
* **`haiku`**: Use only for lightweight script runners where quality and deep reasoning are not required.
* **`opus`**: Best for complex reasoning or highly creative outputs.

---

## 5. Delegation Best Practices

* **Batch Size**: Group tasks in batches of 5–10 items per sub-agent.
* **Parallel Execution**: Launch multiple sub-agents in parallel for independent tasks.
* **Clear Prompts**: Provide exact paths, input criteria, and expected output formats.
