import{s as p,R as j,j as r}from"./index-J749e2QC.js";import{r as c}from"./vendor-react-Be-nUyB0.js";import"./vendor-supabase-J7ITh-P0.js";const g="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",x="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";let u=null;function E(){return window.L?Promise.resolve(window.L):u||(u=new Promise((e,n)=>{if(!document.querySelector(`link[href="${g}"]`)){const t=document.createElement("link");t.rel="stylesheet",t.href=g,document.head.appendChild(t)}if(document.querySelector(`script[src="${x}"]`)){const t=setInterval(()=>{window.L&&(clearInterval(t),e(window.L))},50)}else{const t=document.createElement("script");t.src=x,t.async=!0,t.onload=()=>e(window.L),t.onerror=n,document.body.appendChild(t)}}),u)}function L(){const[e,n]=c.useState(window.L||null);return c.useEffect(()=>{e||E().then(n).catch(console.error)},[e]),e}const R=[19.3326,-99.1869],k=14,b={resource:"#10243E",tree:"#4FA88E"};function $(){const e=L(),n=c.useRef(null),t=c.useRef(null),[l,m]=c.useState({resources:!0,trees:!0,events:!0}),[i,v]=c.useState({resources:[],trees:[],events:[]}),[N,f]=c.useState(!0);return c.useEffect(()=>{(async()=>{f(!0);const[a,s,o]=await Promise.all([p.from("resources").select("*").eq("active",!0).not("lat","is",null).not("lng","is",null),p.from("tree_plantings").select("*").not("location_lat","is",null).not("location_lng","is",null),p.from("view_upcoming_events").select("*")]);v({resources:a.data||[],trees:s.data||[],events:o.data||[]}),f(!1)})()},[]),c.useEffect(()=>{if(!e||!t.current||n.current)return;const a=e.map(t.current,{center:R,zoom:k,scrollWheelZoom:!0});e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:19}).addTo(a),n.current={map:a,layerGroups:{resources:e.layerGroup().addTo(a),trees:e.layerGroup().addTo(a),events:e.layerGroup().addTo(a)}}},[e]),c.useEffect(()=>{if(!e||!n.current)return;const{layerGroups:a}=n.current;a.resources.clearLayers(),l.resources&&i.resources.forEach(s=>{const o=j.find(w=>w.id===s.type),h=e.marker([s.lat,s.lng],{icon:y(e,(o==null?void 0:o.icon)||"📍",b.resource)});h.bindPopup(`<strong>${d(s.name)}</strong><br/><small>${(o==null?void 0:o.label)||s.type}</small><br/>${d(s.description||"")}`),h.addTo(a.resources)}),a.trees.clearLayers(),l.trees&&i.trees.forEach(s=>{const o=e.marker([s.location_lat,s.location_lng],{icon:y(e,"🌳",b.tree)});o.bindPopup(`
          <strong>${d(s.species||"Árbol")}</strong><br/>
          <small>${d(s.location_name||"")}</small><br/>
          ${s.notes?d(s.notes):""}
          <br/><a href="/aura-fesi/arboles">Ver y adoptar →</a>
        `),o.addTo(a.trees)})},[e,i,l]),r.jsxs("section",{className:"section",children:[r.jsxs("div",{className:"container",children:[r.jsxs("header",{className:"text-center",style:{maxWidth:720,margin:"0 auto"},children:[r.jsx("span",{className:"tag sage",children:"Mapa vivo"}),r.jsx("h1",{className:"mt-2",children:"Bienestar universitario en el campus"}),r.jsx("p",{className:"lede",children:"Recursos, árboles cuidados por estudiantes y servicios universitarios. Activa o desactiva capas para enfocar lo que buscas."})]}),r.jsxs("div",{className:"layer-controls mt-3",children:[r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",checked:l.resources,onChange:a=>m(s=>({...s,resources:a.target.checked}))})," 📍 Recursos (",i.resources.length,")"]}),r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",checked:l.trees,onChange:a=>m(s=>({...s,trees:a.target.checked}))})," 🌳 Árboles (",i.trees.length,")"]})]}),r.jsxs("div",{className:"map-shell mt-3",children:[!e&&r.jsxs("div",{className:"map-loading",children:[r.jsx("div",{className:"spinner"}),r.jsx("p",{className:"note",children:"Cargando mapa…"})]}),r.jsx("div",{ref:t,className:"leaflet-container"})]}),r.jsx("p",{className:"note text-center mt-3",children:"¿Conoces un lugar de bienestar que falta en el mapa? Avisa a tu equipo de AURA o agrégalo desde el panel admin si tienes acceso."})]}),r.jsx("style",{children:`
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
      `})]})}function y(e,n,t){return e.divIcon({className:"sin-marker",html:`<div style="background:${t};color:#fff;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:18px;box-shadow:0 4px 10px rgba(0,0,0,0.3);border:2px solid #fff;">${n}</div>`,iconSize:[34,34],iconAnchor:[17,17]})}function d(e){return String(e||"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}export{$ as default};
