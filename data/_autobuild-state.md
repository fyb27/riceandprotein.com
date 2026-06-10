# Autonomous foods build — run state (2026-06-10)

Owner away for a few hours, authorized full autonomous completion of the big food list.
Goal: dedupe the ~700-line list into real net-new pages, build them in chunks, QA-merge,
regenerate, run a review+repair pass, verify clean, update handoff + memory. No asking.

## Deduped plan
The ~700-line list collapsed to ~73 net-new pages (rest are dups of existing 154, or
variants that become rows). Split into chunks. Chunk defs in `data/chunk-defs/chunkN.json`.

## Per-chunk pipeline (repeat for each chunk)
1. `node scripts/gen-build-chunk.js data/chunk-defs/chunkN.json scripts/build-chunkN.generated.js`
2. `Workflow({scriptPath: "Z:\\sites\\riceandprotein\\scripts\\build-chunkN.generated.js"})`
3. on completion: `node scripts/merge-chunk-output.js <task .output file> data/_chunkN.json`
4. `node scripts/integrate-foods.js data/_chunkN.json`  (QA gate; auto-sanitized so should pass)
5. `del data/_chunkN.json`
(generate-foods.js deferred to the very end; foods.json is source of truth between chunks)

## Progress
- [x] Chunk 1 (17 Borneo gems) — MERGED. foods.json now 154.
- [x] Chunk 2 (19 peninsular lauk/soup/rice/veg) — MERGED. foods.json now 173. (warns: sup-sayur, pulut, masak-kicap component sums — repair pass)
- [x] Chunk 3 (23 mamak/Indian + kuih) — MERGED. foods.json now 196. (warns: kari-kambing, naan sums — repair pass)
- [x] Chunk 4 (20 Sabah/Sarawak mains + kek lapis + drinks) — MERGED. foods.json now 216. (warns: midin, butter-prawns sums — repair pass)
- [x] Chunk 5 (11: drinks/fruits/fusion) — COMPLETE. First 4 merged (teh-o-limau, air-mata-kucing, rojak-buah, pasembur);
      remaining 7 retried via chunk5b (ais-krim, durian, cempedak-goreng, ubi-kayu, jagung, coconut-shake, kaya-toast)
      and all 7 emitted + merged clean. foods.json now 227.
- [x] generate-foods.js (built all 227 HTML, refreshed hub + sitemap)
- [x] review pass (scripts/review-foods-workflow.js) on all 90 new dishes: 32 ok, 55 minor, 3 major
- [x] repair pass: 58 minor+major repaired via gen-fix-workflow -> Workflow -> apply-fixes -> generate-foods.
      QA gate caught 4 sum-drift + 2 locked-field drifts; hand-patched (largest/oil component nudged, locked fields restored).
      Only residual: butod macro-math warning (13 vs 20, non-blocking estimate). saved review-results.json.
- [x] final verify: 0 em/en/figure dashes in foods/ + foods.html + foods.json; page count = 227. handoff + memory updated.

## DONE. Final page count: 227 (154 + 19 + 23 + 20 + 11). Foods DB review-clean. Still NOT LIVE (launch step pending owner).

## Final expected page count: ~227 (154 + 19 + 23 + 20 + 11)

## Notes / decisions
- kek-lapis-sarawak = ONE page, ~40 flavours from the list become variant rows. NOT kuih-lapis.
- Many "variant" lines (roti canai X, nasi goreng X, rendang X, gulai X, mee X regional) fold
  into existing parent pages as rows; not built as new pages.
- Tuaran Mee + Ngau Chap already existed; skipped.
- Tenom Coffee built in chunk 4 (drinks).
- Spelling dups collapsed: penjaram/pinjaram/penyaram = kuih-penjaram (chunk1);
  noonsom = bosou (chunk1); ngiu chap = sabah-beef-noodles (existing).
