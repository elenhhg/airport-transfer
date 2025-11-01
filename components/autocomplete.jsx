"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Φορτώνουμε το Leaflet Map μόνο στο client
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Διορθώνουμε τα default icons του Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function LocationAutocomplete({ id, label, value, onChange, setLatLon }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  const [markerPos, setMarkerPos] = useState(null);

  // Αναζήτηση τοποθεσίας με Nominatim OpenStreetMap
  const searchLocation = async (query) => {
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
  };

  const handleChange = (e) => {
    const q = e.target.value;
    onChange(q);
    searchLocation(q);
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
