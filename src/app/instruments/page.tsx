import { createClient } from '@/utils/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase.from("instruments").select();

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Supabase 연결 테스트</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">연결 오류</h2>
          <p className="text-red-600 mt-2">{error.message}</p>
          <p className="text-sm text-gray-600 mt-4">
            .env.local 파일에 Supabase URL과 Anon Key가 올바르게 설정되어 있는지 확인하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase 연결 테스트</h1>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h2 className="text-green-800 font-semibold">✅ Supabase 연결 성공!</h2>
        <p className="text-green-600 mt-2">instruments 테이블에서 데이터를 성공적으로 가져왔습니다.</p>
      </div>
      
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Instruments 데이터</h2>
        {instruments && instruments.length > 0 ? (
          <div className="space-y-2">
            {instruments.map((instrument) => (
              <div key={instrument.id} className="p-3 bg-gray-50 rounded border">
                <span className="font-medium">ID: {instrument.id}</span>
                <span className="ml-4">이름: {instrument.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            <p>데이터가 없습니다. Supabase에서 다음 SQL을 실행하여 샘플 데이터를 추가하세요:</p>
            <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-x-auto">
{`-- Create the table
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

-- Insert some sample data into the table
insert into instruments (name)
values
  ('violin'),
  ('viola'),
  ('cello');

-- Enable Row Level Security
alter table instruments enable row level security;

-- Create a policy to allow public read access
create policy "public can read instruments"
on public.instruments
for select to anon
using (true);`}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">원시 JSON 데이터</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(instruments, null, 2)}
        </pre>
      </div>
    </div>
  );
}
