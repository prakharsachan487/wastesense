import unittest
import sys
import os

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from ai.priority_engine import calculate_priority_score
from ai.overflow_predictor import predict_time_to_overflow
from ai.waste_classifier import classify_waste_item

class TestAIEngine(unittest.TestCase):

    def test_critical_bin_priority(self):
        bin_data = {
            "id": "B-102",
            "fill_level": 95,
            "temperature_c": 29.0,
            "hours_since_collection": 8.0,
            "zone": "Zone A - Commercial"
        }
        res = calculate_priority_score(bin_data, nearby_complaints_count=2)
        self.assertGreaterEqual(res["priority_score"], 85.0)
        self.assertEqual(res["urgency_level"], "CRITICAL")
        self.assertTrue(res["auto_dispatch_recommended"])

    def test_normal_bin_priority(self):
        bin_data = {
            "id": "B-103",
            "fill_level": 30,
            "temperature_c": 24.0,
            "hours_since_collection": 2.0,
            "zone": "Zone B - Residential"
        }
        res = calculate_priority_score(bin_data, nearby_complaints_count=0)
        self.assertLess(res["priority_score"], 50.0)
        self.assertEqual(res["urgency_level"], "LOW")
        self.assertFalse(res["auto_dispatch_recommended"])

    def test_fire_safety_override(self):
        bin_data = {
            "id": "B-104",
            "fill_level": 50,
            "temperature_c": 58.0, # High fire hazard
            "hours_since_collection": 1.0,
            "zone": "Zone C"
        }
        res = calculate_priority_score(bin_data)
        self.assertEqual(res["priority_score"], 100.0)
        self.assertIn("EMERGENCY", res["urgency_level"])

    def test_overflow_predictor(self):
        pred = predict_time_to_overflow(current_fill_pct=95)
        self.assertEqual(pred["hours_remaining"], 0.0)
        self.assertEqual(pred["status"], "IMMEDIATE_OVERFLOW")

    def test_waste_classifier(self):
        res = classify_waste_item("Eggshells and banana peels")
        self.assertEqual(res["detected_category"], "organic")
        self.assertIn("Green Bin", res["bin_color"])

if __name__ == '__main__':
    unittest.main()
