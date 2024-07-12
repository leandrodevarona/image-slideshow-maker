import { Slide, Slideshow } from '@prisma/client';

export type SlideshowWithSlides = Slideshow & { slides: Slide[] };
