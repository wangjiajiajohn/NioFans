# Implementation Plan — [Task Title]

> **Phase:** 1 — Planning | **Status:** Draft / Locked  
> **Date:** [YYYY-MM-DD] | **Based on Research:** [research_summary.md]

---

## 📋 Contracts (Locked before implementation)

> These types/interfaces MUST NOT change once locked. Any change requires returning to `/r`.

```typescript
// [Filename: src/types/example.ts]

export interface MyEntity {
  id: string;
  // ...
}

export interface MyServiceResult {
  success: boolean;
  data?: MyEntity;
  error?: string;
}
```

---

## 🗺️ Architecture Decision

**Chosen approach:** [Option B from research — brief description]

**Layer mapping:**

```
src/
├── types/          ← [files being created/modified] (Data Layer)
├── lib/ or hooks/  ← [files being created/modified] (Logic Layer)
└── components/     ← [files being created/modified] (UI Layer)
```

---

## ⚛️ Atomic Task List

### Module 1: [Module Name]

- [ ] **1.1** `[Data Layer]` `src/types/example.ts` — Define `MyEntity` interface (≤12 lines)
- [ ] **1.2** `[Logic Layer]` `src/lib/example.ts` — Implement core logic (≤18 lines)
- [ ] **1.3** `[UI Layer]` `src/components/Example.tsx` — Connect logic to UI (≤15 lines change)

### Module 2: [Module Name]

- [ ] **2.1** `[Logic Layer]` `src/lib/...` — [What changes] (≤20 lines)
- [ ] **2.2** `[UI Layer]` `src/components/...` — [What changes] (≤80 lines UI)

---

## 📁 Affected Files

| File | Change Type | Estimated Lines |
|------|------------|----------------|
| `src/types/example.ts` | CREATE | ~12 lines |
| `src/lib/example.ts` | CREATE | ~18 lines |
| `src/components/Example.tsx` | MODIFY | ~15 lines |

---

## 🚩 Risk Flags

- [ ] Risk of breaking existing [feature] — mitigated by [approach]
- [ ] Requires new environment variable: `EXAMPLE_VAR`

---

*⏸️ STOP — Awaiting human plan review. Reply `1` to begin execution phase.*  
*Upon receiving `1`, AI must first re-read this file via `view_file` before starting Step 1.1.*
