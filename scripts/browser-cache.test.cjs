const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../script.js'),'utf8').split('document.querySelector(".mode-tabs").addEventListener')[0];

test('browser cache cleanup removes only obsolete, expired or excess app cache entries', () => {
  const entries = new Map();
  const localStorage = {
    get length() {return entries.size;}, key: index => [...entries.keys()][index],
    getItem: key => entries.get(key) ?? null, removeItem: key => entries.delete(key)
  };
  const context = vm.createContext({console,URLSearchParams,Date,Intl,localStorage});
  vm.runInContext(source,context);
  const version = vm.runInContext('CACHE_VERSION',context);
  const record = age => JSON.stringify({savedAt:new Date(Date.now()-age).toISOString(),data:{}});
  entries.set('unrelated-preference','keep');
  entries.set('launch-window-not-a-cache','keep');
  entries.set('launch-window-v1:old',record(0));
  entries.set(`${version}:expired`,record(4*60*60*1000));
  entries.set(`${version}:future`,record(-60000));
  entries.set(`${version}:malformed`,'{');
  entries.set(`${version}:selected`,record(0));
  for(let i=0;i<6;i++) entries.set(`${version}:week${i}`,record(i*1000));
  vm.runInContext(`pruneBrowserCache('${version}:selected')`,context);
  assert.equal(entries.get('unrelated-preference'),'keep');
  assert.equal(entries.get('launch-window-not-a-cache'),'keep');
  assert.ok(entries.has(`${version}:selected`));
  assert.equal([...entries.keys()].filter(key=>key.startsWith(`${version}:`)).length,5);
  for(const suffix of ['expired','future','malformed','week4','week5']) assert.equal(entries.has(`${version}:${suffix}`),false);
  assert.equal(entries.has('launch-window-v1:old'),false);
});

test('storage failure preserves server-cache statistics and distinguishes quota failure', () => {
  const localStorage = {length:0,setItem:()=>{const e=new Error('full');e.name='QuotaExceededError';throw e;}};
  const context = vm.createContext({console,URLSearchParams,Date,Intl,localStorage});
  vm.runInContext(source,context);
  vm.runInContext(`appState.cache.hits=7; appState.cache.requests=9;
    writeCachedData('test',{
      crabbing:{sourceSummary:{selectedWindow:{complete:true},cdfwCrabStatus:{health:{sourceAvailable:true}}}},
      spearfishing:{options:[]},
      clamming:{sourceSummary:{waveSeries:[1],windSeries:[1],clammingStatus:{cdph:{sourceAvailable:true}}}}
    });`,context);
  assert.equal(vm.runInContext('appState.cache.hits',context),7);
  assert.equal(vm.runInContext('appState.cache.requests',context),9);
  assert.match(vm.runInContext('appState.cache.detail',context),/quota exceeded/);
});
