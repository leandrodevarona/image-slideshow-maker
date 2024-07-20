'use client';

import { ColorPalette } from '@prisma/client';

type Props = {
  colorPalette: ColorPalette;
};

export default function ColorPaletteLoader({ colorPalette }: Props) {
  const colors = colorPalette;

  return (
    <style jsx global>{`
      :root {
        --background-start-rgb: ${colors.background};
        --background-end-rgb: ${colors.background};

        --callout-rgb: ${colors.background};
      }
    `}</style>
  );
}
