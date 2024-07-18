import { notFound, redirect } from 'next/navigation';
import { getNewSlideShow } from './[slideshowId]/lib/data/slideshow';

export default async function Home() {
  const slideshow = await getNewSlideShow();

  if (!slideshow) notFound();

  return redirect(`/${slideshow.id}`);
}
