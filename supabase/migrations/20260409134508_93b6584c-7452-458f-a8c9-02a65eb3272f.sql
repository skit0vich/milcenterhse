
CREATE TYPE public.app_role AS ENUM ('student', 'teacher');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  role app_role NOT NULL DEFAULT 'student',
  course INTEGER,
  squad TEXT,
  subject TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by authenticated users"
  ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  value INTEGER NOT NULL CHECK (value >= 1 AND value <= 5),
  comment TEXT,
  grade_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own grades"
  ON public.grades FOR SELECT TO authenticated
  USING (
    student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher')
  );

CREATE POLICY "Teachers can insert grades"
  ON public.grades FOR INSERT TO authenticated
  WITH CHECK (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can update grades"
  ON public.grades FOR UPDATE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can delete grades"
  ON public.grades FOR DELETE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE TABLE public.homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  course INTEGER,
  squad TEXT,
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Homework viewable by authenticated"
  ON public.homework FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teachers can create homework"
  ON public.homework FOR INSERT TO authenticated
  WITH CHECK (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can update homework"
  ON public.homework FOR UPDATE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can delete homework"
  ON public.homework FOR DELETE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE TABLE public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  course INTEGER,
  squad TEXT,
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Materials viewable by authenticated"
  ON public.materials FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teachers can create materials"
  ON public.materials FOR INSERT TO authenticated
  WITH CHECK (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can update materials"
  ON public.materials FOR UPDATE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can delete materials"
  ON public.materials FOR DELETE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE TABLE public.retakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  retake_date DATE,
  comment TEXT,
  status TEXT NOT NULL DEFAULT 'назначена' CHECK (status IN ('назначена', 'сдана', 'не сдана', 'отменена')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.retakes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Retakes viewable by relevant users"
  ON public.retakes FOR SELECT TO authenticated
  USING (
    student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher')
  );

CREATE POLICY "Teachers can create retakes"
  ON public.retakes FOR INSERT TO authenticated
  WITH CHECK (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can update retakes"
  ON public.retakes FOR UPDATE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can delete retakes"
  ON public.retakes FOR DELETE TO authenticated
  USING (teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own notifications"
  ON public.notifications FOR SELECT TO authenticated
  USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Authenticated can create notifications"
  ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE TO authenticated
  USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent')),
  subject TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attendance viewable by authenticated"
  ON public.attendance FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teachers can manage attendance"
  ON public.attendance FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE POLICY "Teachers can update attendance"
  ON public.attendance FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'teacher'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON public.grades FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_homework_updated_at BEFORE UPDATE ON public.homework FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON public.materials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_retakes_updated_at BEFORE UPDATE ON public.retakes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO storage.buckets (id, name, public) VALUES ('materials', 'materials', true);

CREATE POLICY "Materials files are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'materials');

CREATE POLICY "Authenticated users can upload materials"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'materials');

CREATE POLICY "Users can update their materials"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'materials');

CREATE POLICY "Users can delete their materials"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'materials');
