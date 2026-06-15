// =============================================================
// AURA — Audit log helper
// Llama esto desde cualquier acción admin para dejar trazo.
// =============================================================

import { supabase } from '../config/supabaseClient.js';

export async function logAudit({ ctx, action, entity, entity_id, before_data, after_data }) {
  try {
    await supabase.from('admin_audit_log').insert({
      admin_id: ctx?.admin?.id,
      admin_email: ctx?.admin?.email,
      action,
      entity,
      entity_id: entity_id ? String(entity_id) : null,
      before_data: before_data || null,
      after_data: after_data || null,
    });
  } catch (e) {
    console.warn('[audit]', e?.message);
  }
}
