-- BLIB: tabela de ranking com validações. Rode no SQL Editor do Supabase.
create table if not exists blib_rankings (
  id bigint generated always as identity primary key,
  jogo_slug text not null,
  nome_jogador text not null,
  pontuacao int,
  tempo_segundos numeric(8,2),
  visivel boolean not null default true,   -- coloque false para esconder um apelido impróprio
  created_at timestamptz default now()
);
alter table blib_rankings add column if not exists visivel boolean not null default true;
alter table blib_rankings add column if not exists created_at timestamptz default now();

-- Validações (valem para novos registros; "not valid" não reprova linhas antigas)
alter table blib_rankings drop constraint if exists blib_slug_ok;
alter table blib_rankings add constraint blib_slug_ok check (jogo_slug in ('moto','penalty','memoria','quebracabeca','foguinho')) not valid;
alter table blib_rankings drop constraint if exists blib_nome_ok;
alter table blib_rankings add constraint blib_nome_ok check (char_length(nome_jogador) between 1 and 15) not valid;
alter table blib_rankings drop constraint if exists blib_tempo_ok;
alter table blib_rankings add constraint blib_tempo_ok check (tempo_segundos is null or tempo_segundos >= 5) not valid;
alter table blib_rankings drop constraint if exists blib_gols_ok;
alter table blib_rankings add constraint blib_gols_ok check (jogo_slug <> 'penalty' or pontuacao between 0 and 5) not valid;

alter table blib_rankings enable row level security;
drop policy if exists "blib le" on blib_rankings;
drop policy if exists "blib insere" on blib_rankings;
create policy "blib le" on blib_rankings for select using (visivel = true);
create policy "blib insere" on blib_rankings for insert with check (visivel = true);
