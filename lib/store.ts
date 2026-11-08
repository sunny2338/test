import "server-only";
import type { Collections } from "./types";
import { seed } from "./seed";

type Name = keyof Collections;

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const useKV = Boolean(KV_URL && KV_TOKEN);

export const storageMode = useKV ? "kv" : "memory";

// 메모리 저장소 (KV 미설정 시). 서버 재시작/재배포 시 초기화됩니다.
const g = globalThis as unknown as { __adminMem?: { [K in Name]: Collections[K][] } };
function mem() {
  if (!g.__adminMem) g.__adminMem = structuredClone(seed);
  return g.__adminMem;
}

async function kv(command: unknown[]) {
  const res = await fetch(KV_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV error ${res.status}`);
  return (await res.json()).result;
}

const key = (name: Name) => `iyaon-admin:${name}`;

export async function list<N extends Name>(name: N): Promise<Collections[N][]> {
  if (!useKV) return [...(mem()[name] as Collections[N][])];
  const raw = await kv(["GET", key(name)]);
  if (raw == null) {
    const initial = seed[name] as Collections[N][];
    await kv(["SET", key(name), JSON.stringify(initial)]);
    return [...initial];
  }
  return JSON.parse(raw);
}

async function save<N extends Name>(name: N, items: Collections[N][]) {
  if (!useKV) {
    (mem() as Record<Name, unknown[]>)[name] = items;
    return;
  }
  await kv(["SET", key(name), JSON.stringify(items)]);
}

export async function get<N extends Name>(name: N, id: string) {
  return (await list(name)).find((x) => x.id === id) ?? null;
}

export async function insert<N extends Name>(name: N, item: Omit<Collections[N], "id">) {
  const items = await list(name);
  const created = { ...item, id: crypto.randomUUID() } as Collections[N];
  await save(name, [created, ...items]);
  return created;
}

export async function update<N extends Name>(name: N, id: string, patch: Partial<Collections[N]>) {
  const items = await list(name);
  await save(
    name,
    items.map((x) => (x.id === id ? { ...x, ...patch, id } : x)),
  );
}

export async function remove<N extends Name>(name: N, id: string) {
  const items = await list(name);
  await save(
    name,
    items.filter((x) => x.id !== id),
  );
}
