import json

def make_card(id_str, cat, code, mod_name, diff, f_title, f_prompt, b_title, b_content, rfc=None, cli=None, hint=""):
    d = {
        "id": id_str,
        "category": cat,
        "moduleCode": code,
        "moduleName": mod_name,
        "difficulty": diff,
        "frontTitle": f_title,
        "frontPrompt": f_prompt,
        "backTitle": b_title,
        "backContent": b_content,
        "hint": hint
    }
    if rfc:
        d["rfcRef"] = rfc
    if cli:
        d["cliExample"] = cli
    return d

print("Helper ready")
