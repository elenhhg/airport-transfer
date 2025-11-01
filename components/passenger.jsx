"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Users, Plus, Minus } from "lucide-react";

export default function PassengerSelector({ value, onChange, min = 1, max = 50 }) {
  const decrement = () => value > min && onChange(value - 1);
  const increment = () => value < max && onChange(value + 1);

  return (
    <div className="space-y-2">
      <Label htmlFor="passengers" className="flex items-center gap-2 text-gray-900">
        <Users className="h-4 w-4 text-gray-400" /> Number of Passengers
      </Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={decrement}
          className="w-10 h-10 flex items-center justify-center p-0 bg-white border border-gray-300 hover:border-gray-400"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </Button>
        <div className="w-12 text-center text-gray-900 font-medium">{value}</div>
        <Button
          type="button"
          onClick={increment}
          className="w-10 h-10 flex items-center justify-center p-0 bg-white border border-gray-300 hover:border-gray-400"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </Button>
      </div>
    </div>
  );
}
