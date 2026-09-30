"""
Smart Waste Intelligence Platform (SWIP)
AI Priority & Dispatch Scoring Engine
Formula (from Hackathon Brief & System Flow):
Priority Score = Fill Urgency + Predicted Overflow + Repeated Complaints + Time Since Collection + Location Risk
Normalized between 0 and 100.
"""

def calculate_priority_score(bin_data, nearby_complaints_count=0):
    """
    Computes transparent multi-factor priority score for collection dispatch.
    
    Weights:
    - Fill Urgency (0-35 points)
    - Predicted Overflow (0-25 points)
    - Repeated Complaints (0-15 points)
    - Time Since Last Collection (0-15 points)
    - Location Risk Factor (0-10 points)
    """
    fill = bin_data.get("fill_level", 0)
    temp = bin_data.get("temperature_c", 25.0)
    hours_since_collection = bin_data.get("hours_since_collection", 6.0)
    zone = bin_data.get("zone", "Residential")

    # 1. Fill Urgency (Max 35)
    # Critical threshold starts at 80%
    if fill >= 90:
        fill_score = 35.0
    elif fill >= 75:
        fill_score = 25.0 + (fill - 75) * (10.0 / 15.0)
    elif fill >= 50:
        fill_score = 15.0 + (fill - 50) * (10.0 / 25.0)
    else:
        fill_score = (fill / 50.0) * 15.0

    # 2. Predicted Overflow (Max 25)
    if fill >= 90:
        predicted_score = 25.0  # Immediate overflow risk
    elif fill >= 75:
        predicted_score = 18.0
    elif fill >= 60:
        predicted_score = 10.0
    else:
        predicted_score = 4.0

    # 3. Repeated Complaints (Max 15)
    complaints_score = min(15.0, nearby_complaints_count * 5.0)

    # 4. Time Since Collection (Max 15)
    # Higher hours increase urgency
    time_score = min(15.0, (hours_since_collection / 12.0) * 15.0)

    # 5. Location Risk Factor (Max 10)
    if "Commercial" in zone or "Market" in zone or "Transit" in zone or "Hospital" in zone:
        location_score = 10.0
    elif "Corporate" in zone or "University" in zone:
        location_score = 6.0
    else:
        location_score = 3.0

    # Safety override: if temperature > 50°C, instant max score
    if temp >= 50.0:
        total_score = 100.0
        urgency_level = "EMERGENCY (Fire/Combustion Risk)"
    else:
        total_score = round(fill_score + predicted_score + complaints_score + time_score + location_score, 1)
        if total_score >= 85:
            urgency_level = "CRITICAL"
        elif total_score >= 65:
            urgency_level = "HIGH"
        elif total_score >= 45:
            urgency_level = "MEDIUM"
        else:
            urgency_level = "LOW"

    return {
        "bin_id": bin_data.get("id", "Unknown"),
        "priority_score": min(100.0, total_score),
        "urgency_level": urgency_level,
        "auto_dispatch_recommended": total_score >= 80,
        "breakdown": {
            "fill_urgency": round(fill_score, 1),
            "predicted_overflow": round(predicted_score, 1),
            "repeated_complaints": round(complaints_score, 1),
            "time_since_collection": round(time_score, 1),
            "location_risk": round(location_score, 1)
        }
    }

if __name__ == "__main__":
    sample_bin = {
        "id": "B-102",
        "fill_level": 94,
        "temperature_c": 29.0,
        "hours_since_collection": 7.4,
        "zone": "Zone A - Commercial"
    }
    result = calculate_priority_score(sample_bin, nearby_complaints_count=2)
    print("Priority Evaluation for Bin B-102:")
    import json
    print(json.dumps(result, indent=2))
