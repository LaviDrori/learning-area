# AI Agents Resources

Checked 2026-11-01. Renames to watch: Anthropic docs moved to `platform.claude.com` (old `docs.anthropic.com` links redirect). On 2026-04-22 Google renamed **Vertex AI → Gemini Enterprise Agent Platform** and **Vertex AI Agent Engine → Agent Runtime**. Old Vertex links still redirect. Google ADK docs moved to `adk.dev`.

## Knowledge

### The loop, and agents vs workflows
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
  Workflows ("predefined code paths") vs agents ("LLMs dynamically direct their own processes and tool usage"). "Start by using LLM APIs directly". Use for: framework-or-not, the simplest-solution rule. Primary source for Lesson 1.
- [Docs: How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
  "While `stop_reason == "tool_use"`, run the tools and continue". "The model never runs anything on its own". Use for: the loop, stop reasons.
- [Docs: Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
  Client tools vs server tools, `tool_use` / `tool_result` blocks. Use for: tool mechanics.

### Harnesses and frameworks
- [Docs: Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
  "The same tools, agent loop, and context management that power Claude Code"; comparison table vs Client SDK (own loop or beta Tool Runner) vs Managed Agents. Use for: Lesson 2.
- [Google ADK](https://adk.dev/) · [ADK deploy](https://adk.dev/deploy/)
  Model-agnostic framework in Python/TS/Go/Java/Kotlin; deploys to Agent Runtime, Cloud Run, GKE or "any environment that supports container images". Use for: the HR agent's old harness.
- [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview)
  "Low-level orchestration framework and runtime" for long-running, stateful agents. Use for: the "modular platform" option.
- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
  Multi-agent ≈ "15× more tokens than chats". Use for: when not to go multi-agent.

### Model access: Anthropic API, Bedrock, Google Cloud
- [Docs: Claude Models on Google Cloud, overview](https://platform.claude.com/docs/en/build-with-claude/claude-models-on-google-cloud/overview) · [Google managed](https://platform.claude.com/docs/en/build-with-claude/claude-models-on-google-cloud/google-managed)
  Anthropic-managed vs Google-managed (billing, rate limits, IAM); regional endpoints for "single-region data residency" at +10%; Google-managed lacks Agent Skills, MCP connector, code execution, Batches. Use for: Lesson 7.
- [Docs: Claude on Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy)
  AWS credentials, regional endpoints +10%, same feature gaps. Use for: Lesson 7.
- [AWS: What is Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) · [Data protection](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html) · [Data retention](https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html)
  Model providers have no access to prompts/completions; retention modes `none` / `default` / `aws_review`. Use for: answering security teams.
- [Google: Data governance and zero data retention](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/data-governance)
  No training on your data without permission; cache deleted within 24 h. Use for: answering security teams.
- [Google: Agent Runtime (formerly Agent Engine)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview) · [Release notes (rename)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)
  Managed hosting for ADK/LangGraph/LangChain agents, Sessions, Memory Bank, PSC, VPC-SC, CMEK. Use for: hosting + harness on Google.
- [Google: Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models)
  Google, partner (Claude) and open models; self-deployed or managed. Use for: open models on Google.

### Context, prompts, RAG, skills
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
  "Smallest possible set of high-signal tokens"; context rot; just-in-time retrieval. Use for: Lessons 3-4.
- [Docs: Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
  Roles in the system prompt; long data at the top, query at the end ("up to 30 percent"). Use for: Lesson 3.
- [Docs: Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
  5-minute default TTL, cache reads at 0.1× input price, prefix order tools → system → messages. Use for: org prompt + metadata cost.
- [Anthropic: Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
  "If your knowledge base is smaller than 200,000 tokens (about 500 pages of material), you can just include the entire knowledge base in the prompt". Use for: Lesson 4, in-context vs RAG.
- [Docs: Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) · [Anthropic: Equipping agents with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
  Skills work via the Messages API (`container.skills` + code execution); ~100 tokens of metadata until triggered; no network; not on Bedrock/Google-managed; not ZDR-eligible. Use for: Lesson 4.

### Tools and MCP
- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
  "More tools don't always lead to better outcomes"; namespacing; evaluate tools. Use for: Lesson 6.
- [MCP: Introduction](https://modelcontextprotocol.io/docs/getting-started/intro) · [Architecture](https://modelcontextprotocol.io/docs/learn/architecture)
  Host/client/server; tools, resources, prompts; stdio and Streamable HTTP. Use for: exposing your tools to other agents.

### Analytics agents (Tableau, BigQuery)
- [Tableau: VizQL Data Service](https://help.tableau.com/current/api/vizql-data-service/en-us/index.html) · [Limitations](https://help.tableau.com/current/api/vizql-data-service/en-us/docs/vds_limitations.html)
  `read-metadata` and `query-datasource`; one filter per field, no cubes. Use for: the Tableau agent's tool.
- [Tableau MCP](https://github.com/tableau/tableau-mcp) · [query-datasource tool docs](https://tableau.github.io/tableau-mcp/docs/tools/data-qna/query-datasource)
  Tableau's own agent tools over VDS, incl. filter-value validation. Use for: comparing with your tool design.
- [Google: Conversational Analytics API, authored context for BigQuery](https://docs.cloud.google.com/gemini/data-agents/conversational-analytics-api/data-agent-authored-context-bq)
  Table/column descriptions, synonyms, example question→SQL pairs; "provide context through structured context fields". Use for: the HR agent's DDL context.

### Open-source models
- [vLLM docs](https://docs.vllm.ai/en/latest/) · [Tool calling](https://docs.vllm.ai/en/latest/features/tool_calling.html)
  OpenAI-compatible (and Anthropic Messages) server; tool calling needs `--enable-auto-tool-choice` + `--tool-call-parser`. Use for: Lesson 8.
- [Ollama docs](https://docs.ollama.com/) · [Docker](https://docs.ollama.com/docker) · [OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility)
  One-container local serving. Use for: trying open models on-prem.
- [AWS: Bedrock Custom Model Import](https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html)
  Bring open weights (Llama, Mistral, Qwen, GPT-OSS) into Bedrock. Use for: open models without running GPUs.

### Evals
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
  Code, model and human graders; "20-50 simple tasks drawn from real failures is a great start". Use for: Lesson 10.
- [ADK: Evaluate](https://adk.dev/evaluate/)
  Tool-trajectory and response-match scoring. Use for: Lesson 10.

## Wisdom (Communities)

- [Google ADK GitHub Discussions](https://github.com/google/adk-python/discussions)
  Active, maintainers answer. Use for: ADK / Agent Runtime deployment questions.
- [LangChain Forum](https://forum.langchain.com/)
  Official forum. Use for: LangGraph patterns.
- [MLOps Community](https://mlops.community/)
  Slack, podcast, meetups; strong on production and deployment. Use for: "how do others host agents on-prem?".
- [Latent Space](https://www.latent.space/)
  "The AI Engineer publication" + podcast. Use for: keeping up with practice.
- [Anthropic Discord](https://www.anthropic.com/discord) (link redirects to Discord; not verified beyond that)
  Use for: Claude API questions.
- [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) (couldn't be fetched; widely known)
  Use for: open-source model serving and hardware sizing.

## Gaps
- Does VizQL Data Service enforce Tableau row-level security / user filters for the calling user? Not stated in the VDS docs.
- Google's YAML template for table relationships in Conversational Analytics: seen only in search snippets.
- AWS PrivateLink for Bedrock: page linked but not yet read.
