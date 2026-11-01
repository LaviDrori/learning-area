import json
from types import SimpleNamespace as Reply

MAX_ROUNDS = 2


def query_datasource(dimension, measure):
    if dimension not in ("Region", "Category"):
        raise ValueError(f"no field named {dimension}")
    return json.dumps([{dimension: "South", measure: 211_000}])


def run_tool(call):
    result = {"type": "tool_result", "tool_use_id": call.id}
    try:
        return result | {"content": query_datasource(**call.input)}
    except Exception as error:
        return result | {"content": str(error), "is_error": True}


def call_model(model, messages, round_number):
    allow_tools = round_number < MAX_ROUNDS
    response = model(messages, {"type": "auto" if allow_tools else "none"})
    if response.stop_reason == "max_tokens":
        raise RuntimeError("answer cut off: raise max_tokens or lower effort")
    return response


def final_text(response):
    if response.stop_reason == "refusal":
        return "Sorry, I can't help with that request."
    return next(block.text for block in response.content if block.type == "text")


def run_agent(model, question):
    messages = [{"role": "user", "content": question}]
    for round_number in range(MAX_ROUNDS + 1):
        response = call_model(model, messages, round_number)
        messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            return final_text(response)
        calls = [block for block in response.content if block.type == "tool_use"]
        messages.append({"role": "user", "content": [run_tool(call) for call in calls]})
    raise RuntimeError("model asked for a tool after tools were turned off")


# ---- a fake model that replays scripted replies, so the checks need no API key ----

def scripted(*replies):
    def model(messages, tool_choice):
        model.choices.append(tool_choice["type"])
        model.messages = messages
        return replies[len(model.choices) - 1]
    model.choices = []
    return model


def asks_tool(dimension):
    call = Reply(type="tool_use", id="toolu_01", name="query_datasource",
                 input={"dimension": dimension, "measure": "SUM(Sales)"})
    return Reply(stop_reason="tool_use", content=[call])


def says(text, stop_reason="end_turn"):
    return Reply(stop_reason=stop_reason, content=[Reply(type="text", text=text)])


def check_answers_after_one_tool_call():
    model = scripted(asks_tool("Region"), says("South leads."))
    assert run_agent(model, "Top region?") == "South leads."


def check_tool_error_goes_back_as_is_error():
    model = scripted(asks_tool("Country"), says("There is no Country field."))
    run_agent(model, "Top country?")
    assert model.messages[2]["content"][0].get("is_error") is True


def check_last_round_turns_tools_off():
    model = scripted(asks_tool("Region"), asks_tool("Category"), says("Done."))
    run_agent(model, "Compare everything")
    assert model.choices == ["auto", "auto", "none"]


def check_refusal_gets_a_safe_answer():
    model = scripted(says("", stop_reason="refusal"))
    assert run_agent(model, "…").startswith("Sorry")


def check_cut_off_answer_raises():
    model = scripted(says("South le", stop_reason="max_tokens"))
    try:
        run_agent(model, "Top region?")
    except RuntimeError:
        return
    raise AssertionError("a cut-off answer was returned as if it were complete")


if __name__ == "__main__":
    checks = [value for name, value in list(globals().items()) if name.startswith("check_")]
    for check in checks:
        try:
            check()
            print(f"PASS  {check.__name__}")
        except Exception as error:
            print(f"FAIL  {check.__name__}: {type(error).__name__} {error}")
