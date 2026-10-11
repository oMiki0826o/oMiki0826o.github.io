/*
 * File: fix-static-lang.mjs
 * Modification: 2026-10-11 — Static Next export correctly declares each document language.
 */
import {existsSync,readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';

const root=join(process.cwd(),'out');
if (!existsSync(root)) throw new Error('out/ does not exist; run next build first');
const locales=['en','ja','zh-TW'];
let patched=0;
for (const locale of locales) {
  const folder=join(root,locale);
  if(!existsSync(folder))throw new Error(`Missing exported ${locale} locale`);
  const stack=[folder];
  while(stack.length){
    const here=stack.pop();
    for(const entry of readdirSync(here,{withFileTypes:true})){
      const file=join(here,entry.name);
      if(entry.isDirectory())stack.push(file);
      else if(entry.isFile()&&entry.name.endsWith('.html')){
        const previous=readFileSync(file,'utf8');
        if(!/<html\b[^>]*lang=["'][^"']+["']/i.test(previous))throw new Error(`Missing lang attribute: ${file}`);
        const next=previous.replace(/(<html\b[^>]*\blang=["'])[^"']+(["'])/i,`$1${locale}$2`);
        if(next!==previous){writeFileSync(file,next,'utf8');patched++;}
      }
    }
  }
}
console.log(`Corrected HTML language metadata for ${patched} exported files.`);
