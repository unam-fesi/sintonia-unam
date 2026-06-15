// =============================================================
// AURA — Mapa vivo de bienestar universitario
// Recursos + árboles + eventos próximos sobre OpenStreetMap.
// =============================================================

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeaflet } from '../hooks/useLeaflet.js';
import { supabase } from '../config/supabaseClient.js';
import { RESOURCE_TYPES } from '../data/fallbackResources.js';

const CU_CENTER = [19.3326, -99.1869]; // Ciudad Universitaria
const DEFAULT_ZOOM = 14;

const MARKER_COLOR = {
  resource:  '#10243E',
  tree:      '#4FA88E',
  event:     '#C9A227',
  clue:      '#D26B53',
};

export default function MapPage() {
  const L = useLeaflet();
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [layers, setLayers] = useState({ resources: true, trees: true, events: true });
  const [data, setData] = useState({ resources: [], trees: [], events: [] });
  const [loading, setLoading] = useState(true);

  // Cargar datos
  useEffect(() => {
    (async () => {
      setLoading(true);
      const [resR, treeR, eventR] = await Promise.all([
        supabase.from('resources').select('*').eq('active', true)
          .not('lat','is',null).not('lng','is',null),
        supabase.from('tree_plantings').select('*')
          .not('location_lat','is',null).not('location_lng','is',null),
        supabase.from('view_upcoming_events').select('*'),
      ]);
      setData({
        resources: resR.data || [],
        trees:     treeR.data || [],
        events:    eventR.data || [],
      });
      setLoading(false);
    })();
  }, []);

  // Inicializar mapa
  useEffect(() => {
    if (!L || !containerRef.current) return;
    if (mapRef.current) return; // ya inicializado

    const map = L.map(containerRef.current, {
      center: CU_CENTER,
      zoom: DEFAULT_ZOOM,
      scrollWheelZoom: true,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = { map, layerGroups: {
      resources: L.layerGroup().addTo(map),
      trees:     L.layerGroup().addTo(map),
      events:    L.layerGroup().addTo(map),
    }};
  }, [L]);

  // Pintar marcadores cuando lleguen datos
  useEffect(() => {
    if (!L || !mapRef.current) return;
    const { layerGroups } = mapRef.current;

    // Resources
    layerGroups.resources.clearLayers();
    if (layers.resources) {
      data.resources.forEach(r => {
        const t = RESOURCE_TYPES.find(t => t.id === r.type);
        const m = L.marker([r.lat, r.lng], { icon: emojiIcon(L, t?.icon || '📍', MARKER_COLOR.resource) });
        m.bindPopup(`<strong>${escape(r.name)}</strong><br/><small>${t?.label || r.type}</small><br/>${escape(r.description||'')}`);
        m.addTo(layerGroups.resources);
      });
    }

    // Trees
    layerGroups.trees.clearLayers();
    if (layers.trees) {
      data.trees.forEach(t => {
        const m = L.marker([t.location_lat, t.location_lng], { icon: emojiIcon(L, '🌳', MARKER_COLOR.tree) });
        m.bindPopup(`
          <strong>${escape(t.species || 'Árbol')}</strong><br/>
          <small>${escape(t.location_name||'')}</small><br/>
          ${t.notes ? escape(t.notes) : ''}
          <br/><a href="/aura-fesi/arboles">Ver y adoptar →</a>
        `);
        m.addTo(layerGroups.trees);
      });
    }

    // Events (sin geo, solo si fueran a futuro y tuvieran ubicación)
    // — los eventos aquí son texto. Si quieres geocodearlos en el futuro, agrega lat/lng.
  }, [L, data, layers]);

  return (
    <section className="section">
      <div className="container">
        <header className="text-center" style={{maxWidth:720, margin:'0 auto'}}>
          <span className="tag sage">Mapa vivo</span>
          <h1 className="mt-2">Bienestar universitario en el campus</h1>
          <p className="lede">
            Recursos, árboles cuidados por estudiantes y servicios universitarios. Activa o
            desactiva capas para enfocar lo que buscas.
          </p>
        </header>

        <div className="layer-controls mt-3">
          <label><input type="checkbox" checked={layers.resources} onChange={e => setLayers(s => ({...s, resources: e.target.checked}))} /> 📍 Recursos ({data.resources.length})</label>
          <label><input type="checkbox" checked={layers.trees} onChange={e => setLayers(s => ({...s, trees: e.target.checked}))} /> 🌳 Árboles ({data.trees.length})</label>
        </div>

        <div className="map-shell mt-3">
          {!L && <div className="map-loading"><div className="spinner" /><p className="note">Cargando mapa…</p></div>}
          <div ref={containerRef} className="leaflet-container" />
        </div>

        <p className="note text-center mt-3">
          ¿Conoces un lugar de bienestar que falta en el mapa? Avisa a tu equipo de AURA
          o agrégalo desde el panel admin si tienes acceso.
        </p>
      </div>

      <style>{`
        .layer-controls {
          display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
        }
        .layer-controls label {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; padding: 8px 14px;
          border: 1px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.92rem; cursor: pointer;
        }
        .map-shell {
          position: relative;
          height: 60vh; min-height: 420px; max-height: 700px;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .leaflet-container { height: 100%; width: 100%; }
        .map-loading {
          position: absolute; inset: 0;
          display: grid; place-items: center;
          background: var(--c-marfil);
          z-index: 5;
        }
      `}</style>
    </section>
  );
}

function emojiIcon(L, emoji, color) {
  return L.divIcon({
    className: 'sin-marker',
    html: `<div style="background:${color};color:#fff;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:18px;box-shadow:0 4px 10px rgba(0,0,0,0.3);border:2px solid #fff;">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function escape(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
