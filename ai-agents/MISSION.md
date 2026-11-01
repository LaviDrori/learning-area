# Mission: AI Agents in Production

## Why
Lavi builds AI agents for customers (a Tableau agent, an HR agent, more to come) and ships each one both as a hosted service and on-prem in the customer's network. Goal: settle on one well-reasoned blueprint for the Tableau agent, and for every agent be able to justify each architecture choice to the customer and make the agent answer more accurately, cheaply and quickly.

## Success looks like
- Split any agent into its separate decisions (model, model access, harness, context & tools, hosting) and say which one a customer question is really about
- Write down a blueprint for the Tableau agent: harness, tools, how field/datasource metadata and the org prompt reach the model, conversation/turn data model, hosting for both Render and the customer's Kubernetes
- Choose between the raw API loop, an SDK harness (Claude Agent SDK, Tool Runner), Google ADK or another framework, and explain why
- Decide when docs and data go straight into the context, when to use RAG, and when to use a skill, with numbers (tokens, cost, latency)
- Explain to a customer's security team where their data goes, and what changes with Anthropic API vs Bedrock vs Vertex AI vs a self-hosted open-source model
- Measure an agent's answer quality with a small eval set and improve it

## Constraints
- Practitioner already: has built and shipped four deployments (two agents × cloud and on-prem). Don't teach "what is an LLM"
- Tableau agent uses the Anthropic API (Claude); HR agent uses Gemini via the Vertex AI SDK (moved off Google ADK). On-prem deployments still call the cloud LLM API
- ~20-30 minutes per lesson; scenario multiple-choice plus small runnable Python exercises
- Windows machine

## Out of scope (for now)
- Training or fine-tuning models
- Building a UI framework or Tableau extension basics (Lavi knows them)
