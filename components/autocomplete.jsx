"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Debounce helper
const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function LocationAutocomplete({ id, label, value, onChange, setLatLon }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  const [markerPos, setMarkerPos] = useState(null);

  // useRef για την debounced function
  const searchRef = useRef(
    debounce(async (query) => {
      if (query.trim().length < 2) return setSuggestions([]);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
          { headers: { "User-Agent": "transfer-booking-app/1.0" } }
        );
        if (!res.ok) return;
        const data = await res.json();
        setSuggestions(data.slice(0, 6));
        setShowList(true);
      } catch (e) {
        console.error("Location autocomplete error:", e);
      }
    }, 300)
  );

  const handleChange = (e) => {
    const q = e.target.value;
    onChange(q);
    searchRef.current(q); // Καλούμε τη debounced function
  };

  const select = (place) => {
    onChange(place.display_name);
    const pos = [parseFloat(place.lat), parseFloat(place.lon)];
    setLatLon?.(pos);
    setMarkerPos(pos);
    setSuggestions([]);
    setShowList(false);
  };

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={id} className="flex items-center gap-2 text-gray-900">
        <MapPin className="h-4 w-4 text-gray-400" /> {label}
      </Label>

      <Input
        id={id}
        value={value}
        onChange={handleChange}
        placeholder="Start typing..."
        autoComplete="off"
        className="bg-white border border-gray-300 text-gray-900 focus:border-gray-400"
        required
      />

      {showList && suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white border border-gray-300 w-full rounded-md shadow max-h-48 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => select(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}

      {markerPos && (
        <MapContainer
          center={markerPos}
          zoom={13}
          scrollWheelZoom={false}
          className="h-48 w-full rounded-md mt-2"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={markerPos}>
            <Popup>{value}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
