import json
import anthropic

client = anthropic.Anthropic()

SYSTEM = "You answer questions about the Superstore datasource. Use the query tool for any number."

TOOLS = [{
    "name": "query_datasource",
    "description": "Run a query on the Superstore datasource. Returns rows as JSON.",
    "input_schema": {
        "type": "object",
        "properties": {
            "dimension": {"type": "string", "enum": ["Region", "Category"]},
            "measure": {"type": "string", "enum": ["SUM(Sales)", "SUM(Profit)"]},
        },
        "required": ["dimension", "measure"],
    },
}]

FAKE_ROWS = {"Region": ["East", "West", "Central", "South"], "Category": ["Technology", "Furniture", "Office Supplies"]}


def query_datasource(dimension, measure):
    rows = [{dimension: name, measure: 100_000 + 37_000 * i} for i, name in enumerate(FAKE_ROWS[dimension])]
    return json.dumps(rows)


def run_tools(content):
    results = []
    for call in (b for b in content if b.type == "tool_use"):
        print(f"[tool]  {call.name}({call.input})")
        results.append({"type": "tool_result", "tool_use_id": call.id, "content": query_datasource(**call.input)})
    return results


def run_agent(question):
    messages = [{"role": "user", "content": question}]
    while True:
        response = client.messages.create(
            model="claude-opus-5-5", max_tokens=16000,
            system=SYSTEM, tools=TOOLS, messages=messages,
        )
        print(f"[model] stop_reason={response.stop_reason}")
        messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            return next(b.text for b in response.content if b.type == "text")
        messages.append({"role": "user", "content": run_tools(response.content)})


if __name__ == "__main__":
    print(run_agent("Which region sells the most, and by how much over the lowest?"))
