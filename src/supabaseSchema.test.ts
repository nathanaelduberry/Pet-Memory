import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const schemaSql = () => readFileSync('supabase/migrations/20260706112500_petmemory_portal_schema.sql', 'utf8');

describe('PetMemory Supabase portal schema', () => {
  it('defines account-owned tables for profiles, pets, moments, respects, and basket items', () => {
    const sql = schemaSql();

    for (const table of ['profiles', 'pets', 'moments', 'respects', 'basket_items']) {
      expect(sql).toMatch(new RegExp(`create table if not exists public\\.${table}`));
      expect(sql).toMatch(new RegExp(`alter table public\\.${table} enable row level security`));
    }
  });

  it('protects private rows with owner-based RLS policies and exposes public memorials intentionally', () => {
    const sql = schemaSql();

    expect(sql).toMatch(/auth\.uid\(\) = id/);
    expect(sql).toMatch(/auth\.uid\(\) = owner_id/);
    expect(sql).toMatch(/public_memorials_are_readable/);
    expect(sql).toMatch(/pets_are_insertable_by_owner/);
    expect(sql).toMatch(/moments_are_manageable_by_pet_owner/);
    expect(sql).toMatch(/respects_are_insertable_for_public_or_owned_pets/);
    expect(sql).toMatch(/basket_items_are_manageable_by_owner/);
  });
});
