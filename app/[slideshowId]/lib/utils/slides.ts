import { Slide } from "@prisma/client";

export function sortSlides(slides: Slide[]) {
    return slides.sort((a, b) => a.index - b.index);
}