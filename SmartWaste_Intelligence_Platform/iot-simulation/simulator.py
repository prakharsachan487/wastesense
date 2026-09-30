"""
Smart Waste Intelligence Platform (SWIP)
Virtual Smart-Bin IoT Telemetry Simulator
"""

import time
import json
import random
from datetime import datetime

class SmartBinSimulator:
    def __init__(self, bin_id="B-102", zone="Zone A - Commercial"):
        self.bin_id = bin_id
        self.zone = zone
        self.fill_level = 94.0
        self.weight_kg = 8.4
        self.temperature_c = 29.0
        self.battery_pct = 88
        self.status = "CRITICAL"

    def read_telemetry(self):
        """Generates a realistic sensor reading dictionary."""
        return {
            "timestamp": datetime.now().isoformat(),
            "bin_id": self.bin_id,
            "zone": self.zone,
            "fill_level": round(self.fill_level, 1),
            "weight_kg": round(self.weight_kg, 2),
            "temperature_c": round(self.temperature_c, 1),
            "battery_pct": self.battery_pct,
            "status": self.get_status(),
            "prediction": self.get_prediction()
        }

    def get_status(self):
        if self.fill_level >= 90.0 or self.temperature_c >= 50.0:
            return "CRITICAL"
        elif self.fill_level >= 70.0:
            return "WARNING"
        return "NORMAL"

    def get_prediction(self):
        if self.fill_level >= 90.0:
            return "High overflow risk (< 30 mins)"
        elif self.fill_level >= 70.0:
            return "Moderate overflow risk (< 3 hrs)"
        return "Normal capacity"

    def simulate_event(self, target_fill=95.0, target_weight=8.5, target_temp=29.5):
        """Simulate an immediate IoT event (e.g. surge or post-collection flush)."""
        self.fill_level = target_fill
        self.weight_kg = target_weight
        self.temperature_c = target_temp
        reading = self.read_telemetry()
        print(f"[IoT-EVENT] Triggered for {self.bin_id}: {json.dumps(reading, indent=2)}")
        return reading

    def empty_bin(self):
        """Simulate physical emptying by sanitation worker."""
        print(f"[IoT-RESOLVED] Worker emptied {self.bin_id} - Flushing sensor telemetry.")
        return self.simulate_event(target_fill=18.0, target_weight=1.4, target_temp=26.0)

if __name__ == "__main__":
    print("=" * 60)
    print("  SWIP: Virtual Smart Bin IoT Telemetry Simulator")
    print("=" * 60)
    sim = SmartBinSimulator(bin_id="B-102")
    
    print("\n1. Initial Digital Twin Telemetry:")
    initial_reading = sim.read_telemetry()
    print(json.dumps(initial_reading, indent=2))
    
    print("\n2. Simulating Surge Event (95% fill):")
    sim.simulate_event(target_fill=95.0)

    print("\n3. Simulating Worker Resolution & Emptying (18% fill):")
    sim.empty_bin()
