export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&addressdetails=1&limit=5`,
      { headers: { "User-Agent": "NextJS-Shuttle-App" } }
    );

    const data = await res.json();

    const places = data.map((place) => ({
      name: place.display_name,
      lat: place.lat,
      lon: place.lon,
    }));

    return Response.json(places);
  } catch (err) {
    console.error("Nominatim error:", err);
    return Response.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}
