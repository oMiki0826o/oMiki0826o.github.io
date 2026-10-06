import {resolveLocale} from '@/i18n/config';
import {getProfile} from '@/lib/content';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const profile = getProfile(resolveLocale(rawLocale));
  return <main className="content-page"><p className="eyebrow">about</p><h1>{profile.name}</h1><p className="lead">{profile.about}</p><p>{profile.signature}</p></main>;
}
