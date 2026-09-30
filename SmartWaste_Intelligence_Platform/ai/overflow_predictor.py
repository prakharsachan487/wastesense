"""
Smart Waste Intelligence Platform (SWIP)
Time-to-Overflow Predictive Modeling Engine
"""

def predict_time_to_overflow(current_fill_pct, fill_rate_pct_per_hour=3.5, max_capacity_pct=95.0):
    """
    Estimates hours remaining until critical bin overflow based on current volume and rate.
    """
    if current_fill_pct >= max_capacity_pct:
        return {
            "hours_remaining": 0.0,
            "status": "IMMEDIATE_OVERFLOW",
            "message": "Bin is at or exceeding 95% threshold. Overflow active."
        }
    
    needed_pct = max_capacity_pct - current_fill_pct
    hours = round(needed_pct / max(fill_rate_pct_per_hour, 0.5), 1)
    
    if hours <= 1.0:
        status = "CRITICAL"
    elif hours <= 3.0:
        status = "HIGH"
    elif hours <= 8.0:
        status = "MODERATE"
    else:
        status = "LOW"

    return {
        "current_fill_pct": current_fill_pct,
        "hours_remaining": hours,
        "fill_rate_per_hour": fill_rate_pct_per_hour,
        "status": status,
        "message": f"Estimated {hours} hours until 95% overflow threshold."
    }

if __name__ == "__main__":
    print(predict_time_to_overflow(current_fill_pct=94))
    print(predict_time_to_overflow(current_fill_pct=72))
