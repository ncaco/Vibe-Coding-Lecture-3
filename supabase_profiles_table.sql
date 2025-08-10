-- 사용자 프로필 테이블 생성 (TB_MBR)
CREATE TABLE IF NOT EXISTS public.TB_MBR (
  ID UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  FIRST_NAME TEXT,
  LAST_NAME TEXT,
  FULL_NAME TEXT,
  EMAIL TEXT,
  AVATAR_URL TEXT,
  BIO TEXT,
  CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.TB_MBR ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 프로필만 읽고 수정할 수 있음
CREATE POLICY "Users can view own profile" ON public.TB_MBR
  FOR SELECT USING (auth.uid() = ID);

CREATE POLICY "Users can update own profile" ON public.TB_MBR
  FOR UPDATE USING (auth.uid() = ID);

CREATE POLICY "Users can insert own profile" ON public.TB_MBR
  FOR INSERT WITH CHECK (auth.uid() = ID);

-- 프로필 업데이트 시 UPDATED_AT 자동 갱신
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.UPDATED_AT = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_TB_MBR_updated_at 
  BEFORE UPDATE ON public.TB_MBR 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS TB_MBR_EMAIL_IDX ON public.TB_MBR(EMAIL);
CREATE INDEX IF NOT EXISTS TB_MBR_FULL_NAME_IDX ON public.TB_MBR(FULL_NAME);
