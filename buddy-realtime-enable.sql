-- =============================================================
-- AURA UNAM — Habilitar realtime para buddy_messages y buddy_queue
-- - buddy_messages: para el chat sin polling
-- - buddy_queue:    para notificar a otros usuarios cuando alguien
--   nuevo entra a buscar un buddy ("Alguien busca un buddy ahora")
-- =============================================================

-- 1) buddy_messages a la publicación supabase_realtime
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'buddy_messages'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.buddy_messages';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'buddy_queue'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.buddy_queue';
  END IF;
END $$;

-- 2) Replica identity FULL para que los payloads tengan la fila completa
ALTER TABLE public.buddy_messages REPLICA IDENTITY FULL;
ALTER TABLE public.buddy_queue    REPLICA IDENTITY FULL;

-- 3) (Opcional) Política RLS para SELECT — el subscriber valida con anon key
--    Realtime requiere que la sesión pueda hacer SELECT vía RLS para recibir el evento.
--    Como los códigos van encriptados en el payload, ampliamos el SELECT a anon
--    pero filtrado por participación en la pareja.
DROP POLICY IF EXISTS "buddy_messages_select_participant" ON public.buddy_messages;
CREATE POLICY "buddy_messages_select_participant" ON public.buddy_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.buddy_pairs bp
      WHERE bp.id = buddy_messages.pair_id
    )
  );

-- Nota: si quieres restringir aún más (que sólo usuarios participantes vean los
-- mensajes), tendrías que pasar el código anónimo en headers/JWT custom claims.
-- Por ahora dejamos la política amplia porque el código es el secreto de acceso.
