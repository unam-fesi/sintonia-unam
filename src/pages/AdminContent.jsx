// =============================================================
// AURA — Editor de contenido (preguntas / recursos / recomendaciones)
// =============================================================

import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { logAudit } from '../services/auditService.js';
import { DIMENSIONS } from '../data/fallbackQuestions.js';
import { RESOURCE_TYPES } from '../data/fallbackResources.js';
import PumAISuggester from '../components/PumAISuggester.jsx';
import PumAIRecSuggester from '../components/PumAIRecSuggester.jsx';

const TABS = [
  { id: 'questions',       label: 'Preguntas' },
  { id: 'recommendations', label: 'Recomendaciones' },
  { id: 'resources',       label: 'Recursos' },
];

function SortHead({ k, sortBy, onSort, children }) {
  const active = sortBy.key === k;
  const arrow = active ? (sortBy.dir === 'asc' ? '▲' : '▼') : '↕';
  return (
    <button
      type="button"
      onClick={() => onSort(k)}
      style={{
        background: 'transparent', border: 0, cursor: 'pointer',
        font: 'inherit', color: 'inherit', padding: 0,
        display: 'inline-flex', gap: 4, alignItems: 'center',
        opacity: active ? 1 : 0.7,
      }}
    >
      {children} <span style={{fontSize: '0.7em'}}>{arrow}</span>
    </button>
  );
}

export default function AdminContent({ ctx }) {
  const [tab, setTab] = useState('questions');

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag azul">Contenido</span>
          <h1 className="mt-2">Editor de contenido</h1>
          <p className="lede">
            Gestiona las 20 preguntas, las recomendaciones por dimensión/nivel y el catálogo
            de recursos universitarios. Todos los cambios quedan en bitácora.
          </p>
        </div>
      </header>

      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === 'questions' && <QuestionsEditor ctx={ctx} />}
        {tab === 'recommendations' && <RecommendationsEditor ctx={ctx} />}
        {tab === 'resources' && <ResourcesEditor ctx={ctx} />}
      </div>

      <style>{`
        .tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          background: #fff;
          padding: 6px;
          border-radius: var(--r-pill);
          border: 1px solid var(--c-borde);
          width: fit-content;
        }
        .tab-btn {
          padding: 8px 18px;
          border-radius: var(--r-pill);
          background: transparent;
          border: 0;
          font-weight: 700;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .tab-btn.active { background: var(--c-azul-800); color: #fff; }

        .editor-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
        .editor-table th, .editor-table td {
          text-align: left; padding: 10px 12px;
          border-bottom: 1px solid var(--c-borde-soft);
        }
        .editor-table th {
          background: var(--c-azul-100);
          color: var(--c-azul-800);
          font-weight: 800;
          font-size: 0.78rem;
          text-transform: uppercase;
        }
        .editor-table input, .editor-table select, .editor-table textarea {
          width: 100%; padding: 6px 10px;
          border: 1px solid var(--c-borde);
          border-radius: 8px;
          background: #fff;
          font-size: 0.9rem;
        }
        .editor-table textarea { min-height: 60px; }
        .actions-cell { white-space: nowrap; display: flex; gap: 4px; }
        .icon-btn {
          background: transparent;
          border: 1px solid var(--c-borde);
          border-radius: 8px;
          padding: 6px 10px;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .icon-btn.primary { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
      `}</style>
    </>
  );
}

// ============================================================
// PREGUNTAS
// ============================================================
function QuestionsEditor({ ctx }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState({ key: 'sort_order', dir: 'asc' });

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('questions').select('*');
    setItems(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function toggleSort(key) {
    setSortBy(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  }

  const sorted = [...items].sort((a, b) => {
    const A = a[sortBy.key]; const B = b[sortBy.key];
    if (A === B) return 0;
    if (A == null) return 1;
    if (B == null) return -1;
    const cmp = typeof A === 'number' ? A - B : String(A).localeCompare(String(B));
    return sortBy.dir === 'asc' ? cmp : -cmp;
  });

  function startNew() {
    const order = items.length ? Math.max(...items.map(q => q.sort_order)) + 1 : 1;
    setEditing('new');
    setDraft({
      sort_order: order,
      dimension: DIMENSIONS[0].id,
      question_text: '',
      is_reverse_scored: false,
      active: true,
    });
  }

  function applySuggestion(s) {
    const order = items.length ? Math.max(...items.map(q => q.sort_order)) + 1 : 1;
    setEditing('new');
    setDraft({
      sort_order: order,
      dimension: s.dimension || DIMENSIONS[0].id,
      question_text: s.question_text,
      is_reverse_scored: !!s.is_reverse_scored,
      active: true,
    });
  }

  function startEdit(q) {
    setEditing(q.id);
    setDraft({ ...q });
  }

  async function save() {
    if (!draft.question_text?.trim()) return;
    if (editing === 'new') {
      const { data, error } = await supabase
        .from('questions').insert(draft).select().single();
      if (!error) {
        await logAudit({ ctx, action: 'create', entity: 'questions', entity_id: data.id, after_data: data });
      }
    } else {
      const before = items.find(q => q.id === editing);
      const { error } = await supabase.from('questions').update(draft).eq('id', editing);
      if (!error) {
        await logAudit({ ctx, action: 'update', entity: 'questions', entity_id: editing, before_data: before, after_data: draft });
      }
    }
    setEditing(null);
    setDraft({});
    load();
  }

  async function toggleActive(q) {
    const { error } = await supabase.from('questions').update({ active: !q.active }).eq('id', q.id);
    if (!error) await logAudit({ ctx, action: 'toggle', entity: 'questions', entity_id: q.id, before_data: { active: q.active }, after_data: { active: !q.active } });
    load();
  }

  async function remove(q) {
    if (!confirm(`¿Eliminar pregunta #${q.sort_order}?\n\n"${q.question_text}"`)) return;
    const { error } = await supabase.from('questions').delete().eq('id', q.id);
    if (!error) await logAudit({ ctx, action: 'delete', entity: 'questions', entity_id: q.id, before_data: q });
    load();
  }

  if (loading) return <div className="spinner" style={{margin: '40px auto'}} />;

  return (
    <div className="panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap'}}>
        <h2>Banco de preguntas ({items.length})</h2>
        <div style={{display:'flex',gap:8}}>
          <PumAISuggester onUse={applySuggestion} />
          {editing !== 'new' && (
            <button className="btn btn-primary btn-sm" onClick={startNew}>＋ Nueva</button>
          )}
        </div>
      </div>

      {editing === 'new' && (
        <DraftRow draft={draft} setDraft={setDraft} onSave={save} onCancel={() => { setEditing(null); setDraft({}); }} />
      )}

      <div className="table-wrap mt-3" style={{overflowX:'auto'}}>
        <table className="editor-table">
          <thead>
            <tr>
              <th style={{width:48}}><SortHead k="sort_order" sortBy={sortBy} onSort={toggleSort}>#</SortHead></th>
              <th><SortHead k="question_text" sortBy={sortBy} onSort={toggleSort}>Texto</SortHead></th>
              <th style={{width:160}}><SortHead k="dimension" sortBy={sortBy} onSort={toggleSort}>Dimensión</SortHead></th>
              <th style={{width:80}}><SortHead k="is_reverse_scored" sortBy={sortBy} onSort={toggleSort}>Inversa</SortHead></th>
              <th style={{width:80}}><SortHead k="active" sortBy={sortBy} onSort={toggleSort}>Activa</SortHead></th>
              <th style={{width:140}}></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(q => (
              editing === q.id ? (
                <DraftRow key={q.id} draft={draft} setDraft={setDraft} onSave={save} onCancel={() => { setEditing(null); setDraft({}); }} />
              ) : (
                <tr key={q.id}>
                  <td>{q.sort_order}</td>
                  <td>{q.question_text}</td>
                  <td>{DIMENSIONS.find(d => d.id === q.dimension)?.label || q.dimension}</td>
                  <td>{q.is_reverse_scored ? '✔' : '—'}</td>
                  <td>{q.active ? '✅' : '⏸'}</td>
                  <td className="actions-cell">
                    <button className="icon-btn" onClick={() => startEdit(q)}>✎</button>
                    <button className="icon-btn" onClick={() => toggleActive(q)}>{q.active ? '⏸' : '▶'}</button>
                    <button className="icon-btn danger" onClick={() => remove(q)}>🗑</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DraftRow({ draft, setDraft, onSave, onCancel }) {
  return (
    <tr style={{background: 'var(--c-azul-100)'}}>
      <td>
        <input type="number" min="1" value={draft.sort_order || 1}
          onChange={e => setDraft({...draft, sort_order: Number(e.target.value)})} />
      </td>
      <td>
        <textarea value={draft.question_text || ''}
          onChange={e => setDraft({...draft, question_text: e.target.value})}
          placeholder="¿Pregunta?" />
      </td>
      <td>
        <select value={draft.dimension}
          onChange={e => setDraft({...draft, dimension: e.target.value})}>
          {DIMENSIONS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
        </select>
      </td>
      <td>
        <input type="checkbox" checked={!!draft.is_reverse_scored}
          onChange={e => setDraft({...draft, is_reverse_scored: e.target.checked})} />
      </td>
      <td>
        <input type="checkbox" checked={!!draft.active}
          onChange={e => setDraft({...draft, active: e.target.checked})} />
      </td>
      <td className="actions-cell">
        <button className="icon-btn primary" onClick={onSave}>✓</button>
        <button className="icon-btn" onClick={onCancel}>✕</button>
      </td>
    </tr>
  );
}

// ============================================================
// RECOMENDACIONES
// ============================================================
function RecommendationsEditor({ ctx }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('recommendations').select('*').order('dimension').order('level');
    setItems(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function startNew() {
    setEditing('new');
    setDraft({ dimension: DIMENSIONS[0].id, level: 'bajo', title: '', description: '', active: true });
  }
  function startEdit(r) { setEditing(r.id); setDraft({...r}); }
  function applyRecSuggestion(s) {
    setEditing('new');
    setDraft({
      dimension: s.dimension || DIMENSIONS[0].id,
      level:     s.level || 'moderado',
      title:     s.title,
      description: s.description,
      active: true,
    });
  }

  async function save() {
    if (!draft.title?.trim()) return;
    if (editing === 'new') {
      const { data } = await supabase.from('recommendations').insert(draft).select().single();
      if (data) await logAudit({ ctx, action:'create', entity:'recommendations', entity_id:data.id, after_data:data });
    } else {
      const before = items.find(r => r.id === editing);
      const { error } = await supabase.from('recommendations').update(draft).eq('id', editing);
      if (!error) await logAudit({ ctx, action:'update', entity:'recommendations', entity_id:editing, before_data:before, after_data:draft });
    }
    setEditing(null); setDraft({}); load();
  }

  async function remove(r) {
    if (!confirm(`¿Eliminar recomendación "${r.title}"?`)) return;
    const { error } = await supabase.from('recommendations').delete().eq('id', r.id);
    if (!error) await logAudit({ ctx, action:'delete', entity:'recommendations', entity_id:r.id, before_data:r });
    load();
  }

  if (loading) return <div className="spinner" style={{margin: '40px auto'}} />;

  return (
    <div className="panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap'}}>
        <h2>Catálogo de recomendaciones ({items.length})</h2>
        <div style={{display:'flex',gap:8}}>
          <PumAIRecSuggester onUse={applyRecSuggestion} />
          {editing !== 'new' && <button className="btn btn-primary btn-sm" onClick={startNew}>＋ Nueva</button>}
        </div>
      </div>

      {editing === 'new' && <RecDraft draft={draft} setDraft={setDraft} onSave={save} onCancel={() => { setEditing(null); setDraft({}); }} />}

      <div className="table-wrap mt-3" style={{overflowX:'auto'}}>
        <table className="editor-table">
          <thead>
            <tr>
              <th style={{width:160}}>Dimensión</th>
              <th style={{width:120}}>Nivel</th>
              <th>Título</th>
              <th>Descripción</th>
              <th style={{width:80}}>Activa</th>
              <th style={{width:120}}></th>
            </tr>
          </thead>
          <tbody>
            {items.map(r => (
              editing === r.id ? (
                <RecDraft key={r.id} draft={draft} setDraft={setDraft} onSave={save} onCancel={() => { setEditing(null); setDraft({}); }} />
              ) : (
                <tr key={r.id}>
                  <td>{DIMENSIONS.find(d => d.id === r.dimension)?.label || r.dimension}</td>
                  <td><span className={`lvl-bg-${r.level}`} style={{padding:'3px 8px',borderRadius:6,fontSize:'0.78rem',fontWeight:700}}>{r.level}</span></td>
                  <td>{r.title}</td>
                  <td><small className="note">{r.description}</small></td>
                  <td>{r.active ? '✅' : '⏸'}</td>
                  <td className="actions-cell">
                    <button className="icon-btn" onClick={() => startEdit(r)}>✎</button>
                    <button className="icon-btn danger" onClick={() => remove(r)}>🗑</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecDraft({ draft, setDraft, onSave, onCancel }) {
  return (
    <tr style={{background: 'var(--c-azul-100)'}}>
      <td>
        <select value={draft.dimension} onChange={e => setDraft({...draft, dimension: e.target.value})}>
          {DIMENSIONS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
        </select>
      </td>
      <td>
        <select value={draft.level} onChange={e => setDraft({...draft, level: e.target.value})}>
          <option value="bajo">Bajo</option>
          <option value="moderado">Moderado</option>
          <option value="prioritario">Prioritario</option>
        </select>
      </td>
      <td><input value={draft.title || ''} onChange={e => setDraft({...draft, title: e.target.value})} /></td>
      <td><textarea value={draft.description || ''} onChange={e => setDraft({...draft, description: e.target.value})} /></td>
      <td><input type="checkbox" checked={!!draft.active} onChange={e => setDraft({...draft, active: e.target.checked})} /></td>
      <td className="actions-cell">
        <button className="icon-btn primary" onClick={onSave}>✓</button>
        <button className="icon-btn" onClick={onCancel}>✕</button>
      </td>
    </tr>
  );
}

// ============================================================
// RECURSOS
// ============================================================
function ResourcesEditor({ ctx }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('resources').select('*').order('name');
    setItems(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function startNew() {
    setEditing('new');
    setDraft({ name: '', type: RESOURCE_TYPES[0].id, description: '', audience: '', modality: '', location: '', schedule: '', contact: '', active: true });
  }
  function startEdit(r) { setEditing(r.id); setDraft({...r}); }

  async function save() {
    if (!draft.name?.trim()) return;
    if (editing === 'new') {
      const { data } = await supabase.from('resources').insert(draft).select().single();
      if (data) await logAudit({ ctx, action:'create', entity:'resources', entity_id:data.id, after_data:data });
    } else {
      const before = items.find(r => r.id === editing);
      const { error } = await supabase.from('resources').update(draft).eq('id', editing);
      if (!error) await logAudit({ ctx, action:'update', entity:'resources', entity_id:editing, before_data:before, after_data:draft });
    }
    setEditing(null); setDraft({}); load();
  }

  async function remove(r) {
    if (!confirm(`¿Eliminar recurso "${r.name}"?`)) return;
    const { error } = await supabase.from('resources').delete().eq('id', r.id);
    if (!error) await logAudit({ ctx, action:'delete', entity:'resources', entity_id:r.id, before_data:r });
    load();
  }

  if (loading) return <div className="spinner" style={{margin: '40px auto'}} />;

  return (
    <div className="panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Recursos universitarios ({items.length})</h2>
        {editing !== 'new' && <button className="btn btn-primary btn-sm" onClick={startNew}>＋ Nuevo</button>}
      </div>

      {editing === 'new' && <ResDraft draft={draft} setDraft={setDraft} onSave={save} onCancel={() => { setEditing(null); setDraft({}); }} />}

      <div className="cards-grid mt-3">
        {items.map(r => (
          editing === r.id ? (
            <div key={r.id} className="rcard editing">
              <ResDraft draft={draft} setDraft={setDraft} onSave={save} onCancel={() => { setEditing(null); setDraft({}); }} inline />
            </div>
          ) : (
            <div key={r.id} className="rcard">
              <span className="tag">{RESOURCE_TYPES.find(t => t.id === r.type)?.label || r.type}</span>
              <h3 className="mt-2">{r.name}</h3>
              <p className="note">{r.description}</p>
              {r.location && <small>📍 {r.location}</small>}
              {r.schedule && <small>🕐 {r.schedule}</small>}
              {r.contact && <small>📞 {r.contact}</small>}
              <div className="actions-cell mt-2">
                <button className="icon-btn" onClick={() => startEdit(r)}>✎ Editar</button>
                <button className="icon-btn danger" onClick={() => remove(r)}>🗑</button>
                <span style={{marginLeft:'auto',padding:'4px 8px',background: r.active ? 'var(--c-salvia-100)' : 'var(--c-coral-100)',borderRadius:8,fontSize:'0.78rem',fontWeight:700}}>{r.active ? 'Activo' : 'Inactivo'}</span>
              </div>
            </div>
          )
        ))}
      </div>

      <style>{`
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
        .rcard {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 16px;
        }
        .rcard.editing { background: var(--c-azul-100); }
        .rcard h3 { margin: 6px 0; font-size: 1rem; color: var(--c-azul-800); }
        .rcard small { display:block; color: var(--c-gris); font-size: 0.84rem; margin-top: 4px; }
      `}</style>
    </div>
  );
}

function ResDraft({ draft, setDraft, onSave, onCancel, inline }) {
  const wrap = inline ? 'div' : 'div';
  return (
    <div style={inline ? {} : {background:'var(--c-azul-100)',padding:14,borderRadius:12,marginTop:10}}>
      <div className="field"><label>Nombre</label><input value={draft.name || ''} onChange={e => setDraft({...draft, name: e.target.value})} /></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div className="field">
          <label>Tipo</label>
          <select value={draft.type} onChange={e => setDraft({...draft, type: e.target.value})}>
            {RESOURCE_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Activo</label>
          <select value={draft.active ? '1' : '0'} onChange={e => setDraft({...draft, active: e.target.value === '1'})}>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="field"><label>Descripción</label><textarea value={draft.description || ''} onChange={e => setDraft({...draft, description: e.target.value})} /></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div className="field"><label>Público</label><input value={draft.audience || ''} onChange={e => setDraft({...draft, audience: e.target.value})} /></div>
        <div className="field"><label>Modalidad</label><input value={draft.modality || ''} onChange={e => setDraft({...draft, modality: e.target.value})} /></div>
        <div className="field"><label>Ubicación</label><input value={draft.location || ''} onChange={e => setDraft({...draft, location: e.target.value})} /></div>
        <div className="field"><label>Horario</label><input value={draft.schedule || ''} onChange={e => setDraft({...draft, schedule: e.target.value})} /></div>
      </div>
      <div className="field"><label>Contacto</label><input value={draft.contact || ''} onChange={e => setDraft({...draft, contact: e.target.value})} /></div>
      <div className="actions-cell">
        <button className="icon-btn primary" onClick={onSave}>✓ Guardar</button>
        <button className="icon-btn" onClick={onCancel}>✕ Cancelar</button>
      </div>
    </div>
  );
}
