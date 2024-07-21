'use client';

import { ColorPalette, Theme } from '@prisma/client';

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
        --callout-border-rgb: ${colors.border};

        --prompt-color: ${colors.prompt};
        --prompt-text-color: ${colors.text};
      }

      html {
        color-scheme: only ${colors.theme};
      }

      ${colors.theme == Theme.dark &&
      `.vercelLogo {
        filter: invert(1);
      }`}
    `}</style>
  );
}
