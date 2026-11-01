import json
from typing import Literal

import anthropic
from anthropic import beta_tool
from pydantic import BaseModel

client = anthropic.Anthropic()
MODEL = "claude-opus-5-5"
Dimension = Literal["Region", "Category"]
Measure = Literal["SUM(Sales)", "SUM(Profit)"]


class Query(BaseModel):
    dimension: Dimension
    measure: Measure
    descending: bool


def generate_query(question):
    response = client.messages.parse(
        model=MODEL, max_tokens=16000,
        system="Turn the question into one query on the Superstore datasource.",
        messages=[{"role": "user", "content": question}],
        output_format=Query,
    )
    return response.parsed_output


@beta_tool
def query_datasource(dimension: Dimension, measure: Measure) -> str:
    """Run a query on the Superstore datasource. Returns rows as JSON.

    Args:
        dimension: The field to group by.
        measure: The aggregated measure to compute.
    """
    members = {"Region": ["East", "West", "Central", "South"], "Category": ["Technology", "Furniture"]}
    return json.dumps([{dimension: name, measure: 100_000 + 37_000 * i} for i, name in enumerate(members[dimension])])


def run_agent(question):
    runner = client.beta.messages.tool_runner(
        model=MODEL, max_tokens=16000, max_iterations=5, thread=False,
        system="You answer questions about the Superstore datasource. Use the query tool for any number.",
        tools=[query_datasource],
        messages=[{"role": "user", "content": question}],
    )
    final = runner.until_done()
    return next(block.text for block in final.content if block.type == "text")


if __name__ == "__main__":
    print(generate_query("Which category is least profitable?"))
    print(run_agent("Which region sells the most, and by how much over the lowest?"))
