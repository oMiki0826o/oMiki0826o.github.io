import {locales} from '@/i18n/config';
import {localizedUrl, siteUrl} from '@/lib/metadata';
import {notes} from '@/content/notes/index';
import {projects} from '@/content/projects';

const paths=['/','/about','/projects','/notes','/timeline'];
export function GET(){
  const urls = locales.flatMap((locale)=>[
    ...paths.map(p=>localizedUrl(locale,p)),
    ...projects.map(p=>localizedUrl(locale,'/projects/'+p.slug)),
    ...notes.map(n=>localizedUrl(locale,'/notes/'+n.slug))
  ]);
  const escape = (s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const xml='<?xml version="1.0" encoding="UTF-8"?>'+'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+
    urls.map(p=>'<url><loc>'+escape(siteUrl+p)+'</loc></url>').join('')+'</urlset>';
  return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
