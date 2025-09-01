const fs = require('fs');
const path = require('path');

function findFiles(dir, ext, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      findFiles(full, ext, results);
    } else if (e.isFile() && full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

describe('POML content checks', () => {
  const root = path.resolve(__dirname, '..');
  const pomlFiles = findFiles(root, '.poml');

  test('found at least one .poml file', () => {
    expect(pomlFiles.length).toBeGreaterThan(0);
  });

  test('no file contains BeefRecipeModule', () => {
    const occurrences = [];
    for (const f of pomlFiles) {
      const txt = fs.readFileSync(f, 'utf8');
      if (/BeefRecipeModule/.test(txt)) occurrences.push(f);
    }
    expect(occurrences).toEqual([]);
  });

  test('at least one file contains ProteinRecipeModule', () => {
    const matches = [];
    for (const f of pomlFiles) {
      const txt = fs.readFileSync(f, 'utf8');
      if (/ProteinRecipeModule/.test(txt)) matches.push(f);
    }
    expect(matches.length).toBeGreaterThan(0);
  });
});
