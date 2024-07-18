import { generateNewSlideshowAndRedirect } from './[slideshowId]/lib/data/slideshow';

export default async function Home() {
  await generateNewSlideshowAndRedirect();
  return null;
}
