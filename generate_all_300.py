import json

def generate_pack(domain_num, domain_name, module_code, items):
    cards = []
    for idx, item in enumerate(items):
        cid = f"fc-ccna-d{domain_num}-{idx+1:03d}"
        cards.append({
            "id": cid,
            "category": f"CCNA-D{domain_num} : {domain_name}",
            "moduleCode": module_code,
            "moduleName": f"Cisco CCNA 200-301 - {domain_num}.0 {domain_name}",
            "difficulty": item.get("difficulty", "Intermédiaire"),
            "frontTitle": item["frontTitle"],
            "frontPrompt": item["frontPrompt"],
            "backTitle": item["backTitle"],
            "backContent": item["backContent"],
            "rfcRef": item.get("rfcRef"),
            "cliExample": item.get("cliExample"),
            "hint": item["hint"]
        })
    return cards

print("Helper ready")
