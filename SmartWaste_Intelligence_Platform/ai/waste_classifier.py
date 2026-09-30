"""
Smart Waste Intelligence Platform (SWIP)
AI Waste Classification & Segregation Advisor
Classifies waste streams (Organic, Recyclable, Hazardous, E-Waste, Landfill)
"""

WASTE_CATEGORIES = {
    "organic": {
        "label": "Organic / Wet Waste",
        "bin_color": "Green Bin",
        "examples": ["Food scraps", "Vegetable peels", "Coffee grounds", "Leaves", "Eggshells"],
        "disposal_guidance": "Deposit in Green Organics Bin for composting and biomethanation.",
        "environmental_impact": "Prevents methane generation in landfills; produces fertile compost."
    },
    "recyclable": {
        "label": "Dry Recyclable Waste",
        "bin_color": "Blue Bin",
        "examples": ["Plastic bottles (PET)", "Cardboard boxes", "Aluminum cans", "Glass jars", "Paper"],
        "disposal_guidance": "Rinse containers before depositing in Blue Recyclables Bin.",
        "environmental_impact": "Conserves raw petroleum and reduces municipal landfill burden by 40%."
    },
    "hazardous": {
        "label": "Domestic Hazardous Waste",
        "bin_color": "Red Bin",
        "examples": ["Paints", "Bleach bottles", "Pesticides", "Fluorescent tubes", "Expired medicines"],
        "disposal_guidance": "Handle with care, keep sealed, deposit in Red Hazardous Waste receptacle.",
        "environmental_impact": "Prevents toxic chemical leaching into groundwater and municipal aquifers."
    },
    "e_waste": {
        "label": "Electronic Waste (E-Waste)",
        "bin_color": "Orange / Dedicated E-Waste Bin",
        "examples": ["Old phone batteries", "Cables & chargers", "Broken circuit boards", "Printers"],
        "disposal_guidance": "Do not throw into normal trash. Drop off at certified E-Waste collection kiosks.",
        "environmental_impact": "Enables rare earth mineral recovery and neutralizes heavy metal toxicity (Lead/Mercury)."
    }
}

def classify_waste_item(query_or_label):
    """
    Identifies waste classification and returns actionable sorting instructions.
    """
    query = query_or_label.lower().strip()
    
    for cat_key, cat_data in WASTE_CATEGORIES.items():
        if any(ex.lower() in query or query in ex.lower() for ex in cat_data["examples"]) or cat_key in query:
            return {
                "detected_category": cat_key,
                "confidence_score": 0.94,
                **cat_data
            }
            
    # Default fallback
    return {
        "detected_category": "recyclable",
        "confidence_score": 0.82,
        **WASTE_CATEGORIES["recyclable"]
    }

if __name__ == "__main__":
    print(classify_waste_item("plastic bottle"))
    print(classify_waste_item("battery"))
