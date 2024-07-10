import { createAction } from './[slideshowId]/lib/actions/slideshow';
import { notFound, redirect } from 'next/navigation';

export default async function Home() {
  const slideshow = await createAction();

  if (!slideshow) notFound();

  return redirect(`/${slideshow.id}`);
}
