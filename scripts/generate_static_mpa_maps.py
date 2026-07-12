#!/usr/bin/env python3
import io
import json
import math
import pathlib
import time
import urllib.parse
import urllib.request

from PIL import Image, ImageDraw, ImageFont


ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "maps"
OUT_DIR.mkdir(parents=True, exist_ok=True)

MPA_LAYER = "https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/California_Marine_Protected_Areas/FeatureServer/1/query"
TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

SPOTS = [
    ("carmel_bay_stillwater_legal_zones", "Carmel Bay / Stillwater", 36.5626, -121.9447),
    ("monterey_breakwater_legal_side", "Monterey Breakwater", 36.6075, -121.8919),
    ("stillwater_cove_sonoma", "Stillwater Cove", 38.5488, -123.2972),
    ("fort_ross_cove", "Fort Ross Cove", 38.5137, -123.2441),
    ("ocean_cove_sonoma", "Ocean Cove", 38.5581, -123.3066),
    ("van_damme_mendocino", "Van Damme", 39.2744, -123.7912),
]


def fetch_json(url, params=None):
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "GetWetStaticMap/1.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_tile(z, x, y):
    url = TILE_URL.format(z=z, x=x, y=y)
    req = urllib.request.Request(url, headers={"User-Agent": "GetWetStaticMap/1.0 (local cache generation)"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return Image.open(io.BytesIO(response.read())).convert("RGB")


def lonlat_to_world(lon, lat, z):
    lat = max(min(lat, 85.05112878), -85.05112878)
    scale = 256 * (2 ** z)
    x = (lon + 180.0) / 360.0 * scale
    sin_lat = math.sin(math.radians(lat))
    y = (0.5 - math.log((1 + sin_lat) / (1 - sin_lat)) / (4 * math.pi)) * scale
    return x, y


def get_mpas(lat, lon):
    return fetch_json(MPA_LAYER, {
        "f": "json",
        "geometry": f"{lon},{lat}",
        "geometryType": "esriGeometryPoint",
        "inSR": "4326",
        "spatialRel": "esriSpatialRelIntersects",
        "distance": "3",
        "units": "esriSRUnit_StatuteMile",
        "outFields": "name,fullname,type,regulation_text",
        "returnGeometry": "true",
        "outSR": "4326",
        "geometryPrecision": "5",
    }).get("features", [])


def collect_bounds(features, lat, lon):
    lons = [lon]
    lats = [lat]
    for feature in features:
        for ring in feature.get("geometry", {}).get("rings", []):
            for point in ring:
                if len(point) >= 2:
                    lons.append(float(point[0]))
                    lats.append(float(point[1]))
    if not features:
        return lon - 0.045, lat - 0.035, lon + 0.045, lat + 0.035
    min_lon, max_lon = min(lons), max(lons)
    min_lat, max_lat = min(lats), max(lats)
    lon_pad = max(0.015, (max_lon - min_lon) * 0.16)
    lat_pad = max(0.015, (max_lat - min_lat) * 0.16)
    return min_lon - lon_pad, min_lat - lat_pad, max_lon + lon_pad, max_lat + lat_pad


def choose_zoom(bounds, width, height):
    min_lon, min_lat, max_lon, max_lat = bounds
    for z in range(14, 8, -1):
      x1, y1 = lonlat_to_world(min_lon, max_lat, z)
      x2, y2 = lonlat_to_world(max_lon, min_lat, z)
      if abs(x2 - x1) <= width * 0.92 and abs(y2 - y1) <= height * 0.86:
          return z
    return 9


def load_font(size):
    for path in (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            pass
    return ImageFont.load_default()


def draw_text_with_halo(draw, xy, text, font, fill):
    x, y = xy
    for dx, dy in ((-2, 0), (2, 0), (0, -2), (0, 2), (-1, -1), (1, 1), (-1, 1), (1, -1)):
        draw.text((x + dx, y + dy), text, font=font, fill=(4, 14, 23, 230))
    draw.text((x, y), text, font=font, fill=fill)


def render_map(spot_id, label, lat, lon):
    features = get_mpas(lat, lon)
    width, height = 1200, 760
    bounds = collect_bounds(features, lat, lon)
    zoom = min(15, choose_zoom(bounds, width, height) + 1)
    min_lon, min_lat, max_lon, max_lat = bounds
    wx1, wy1 = lonlat_to_world(min_lon, max_lat, zoom)
    wx2, wy2 = lonlat_to_world(max_lon, min_lat, zoom)
    center_x = (wx1 + wx2) / 2
    center_y = (wy1 + wy2) / 2
    origin_x = center_x - width / 2
    origin_y = center_y - height / 2

    tile_min_x = math.floor(origin_x / 256)
    tile_max_x = math.floor((origin_x + width) / 256)
    tile_min_y = math.floor(origin_y / 256)
    tile_max_y = math.floor((origin_y + height) / 256)

    image = Image.new("RGB", (width, height), (8, 26, 38))
    for tile_x in range(tile_min_x, tile_max_x + 1):
        for tile_y in range(tile_min_y, tile_max_y + 1):
            try:
                tile = fetch_tile(zoom, tile_x, tile_y)
                image.paste(tile, (round(tile_x * 256 - origin_x), round(tile_y * 256 - origin_y)))
                time.sleep(0.05)
            except Exception:
                pass

    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    label_font = load_font(27)
    small_font = load_font(20)

    def project(point_lon, point_lat):
        wx, wy = lonlat_to_world(point_lon, point_lat, zoom)
        return round(wx - origin_x), round(wy - origin_y)

    for feature in features:
        attrs = feature.get("attributes", {})
        mpa_type = str(attrs.get("type") or "")
        is_smr = "SMR" in mpa_type.upper()
        fill = (255, 107, 107, 78) if is_smr else (84, 199, 236, 78)
        outline = (255, 107, 107, 235) if is_smr else (84, 199, 236, 235)
        ring_points = []
        for ring in feature.get("geometry", {}).get("rings", []):
            pts = [project(float(p[0]), float(p[1])) for p in ring]
            if len(pts) >= 3:
                draw.polygon(pts, fill=fill)
                draw.line(pts + [pts[0]], fill=outline, width=6)
                ring_points.extend(pts)
        if ring_points:
            xs = [p[0] for p in ring_points]
            ys = [p[1] for p in ring_points]
            name = attrs.get("name") or attrs.get("fullname") or "CDFW MPA"
            draw_text_with_halo(draw, (min(max(min(xs), 18), width - 430), min(max(sum(ys) / len(ys), 35), height - 70)), name, label_font, (244, 251, 255, 255))

    sx, sy = project(lon, lat)
    draw.ellipse((sx - 15, sy - 15, sx + 15, sy + 15), fill=(255, 244, 176, 255), outline=(4, 14, 23, 255), width=5)
    draw_text_with_halo(draw, (min(sx + 18, width - 180), max(18, sy - 14)), label, small_font, (255, 244, 176, 255))

    draw.rectangle((0, height - 34, width, height), fill=(4, 14, 23, 180))
    draw.text((12, height - 28), "Basemap © OpenStreetMap contributors · MPA polygons from CDFW Ocean Sportfishing Map", font=small_font, fill=(244, 251, 255, 230))

    image = Image.alpha_composite(image.convert("RGBA"), overlay).convert("RGB")
    image.save(OUT_DIR / f"{spot_id}.jpg", quality=88, optimize=True)
    print(f"wrote assets/maps/{spot_id}.jpg with {len(features)} CDFW polygon(s)")


def main():
    for spot in SPOTS:
        render_map(*spot)


if __name__ == "__main__":
    main()
