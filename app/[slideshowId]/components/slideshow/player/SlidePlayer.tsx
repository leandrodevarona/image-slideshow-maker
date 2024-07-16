'use client';

type Props = {
  slideshowId: string;
  sliderId: string;
  sliderDuration: number;
};

export default function SlidePlayer({
  slideshowId,
  sliderId,
  sliderDuration,
}: Props) {
  const sliderColor = '';
  const rangeColor = '';

  function fillSlides(slider: HTMLLIElement, value: number) {
    const rangeDistance = sliderDuration - 0;
    const fromPosition = 0;
    const toPosition = value;
    slider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
  }

  return null;
}
