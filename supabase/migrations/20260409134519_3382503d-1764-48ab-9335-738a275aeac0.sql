
DROP POLICY "Authenticated can create notifications" ON public.notifications;

CREATE POLICY "Teachers can create notifications"
  ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher')
    OR user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );
