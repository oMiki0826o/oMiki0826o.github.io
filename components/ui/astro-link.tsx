import type {ComponentProps} from 'react';

/** Astro renders normal anchors; preserve the same markup and classes as Next Link. */
export default function Link(props: ComponentProps<'a'>) { return <a {...props} />; }
