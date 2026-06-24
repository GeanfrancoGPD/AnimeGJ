import { createTheme, type MantineColorsTuple } from '@mantine/core';

/**
 * Paleta "dark" personalizada con matiz violeta/púrpura.
 * Las imágenes de referencia muestran fondos oscuros con un sutil
 * tinte violeta (#0c0a18 ≈ body, #161326 ≈ cards/surface).
 *
 * Mantine usa dark[7] como fondo del body en modo oscuro,
 * dark[6] como fondo de tarjetas/superficies, y dark[0] para texto.
 */
const darkColors: MantineColorsTuple = [
  '#C1C2C5', // dark[0] – texto principal (claro)
  '#A6A7AB', // dark[1] – texto secundario
  '#909296', // dark[2] – placeholders
  '#5c5f66', // dark[3] – bordes suaves
  '#373A40', // dark[4] – bordes
  '#2C2835', // dark[5] – hover backgrounds
  '#1a1630', // dark[6] – card / surface
  '#0e0c1d', // dark[7] – body background
  '#0a0818', // dark[8] – extra oscuro
  '#070614', // dark[9] – más oscuro
];

/**
 * Paleta "violet" personalizada alineada con los acentos violeta
 * de las imágenes de referencia.
 */
const violetColors: MantineColorsTuple = [
  '#f3e8ff', // violet[0]
  '#e9d5ff', // violet[1]
  '#d8b4fe', // violet[2]
  '#c084fc', // violet[3]
  '#a855f7', // violet[4]
  '#9333ea', // violet[5] – primary shade
  '#7c3aed', // violet[6]
  '#6d28d9', // violet[7]
  '#5b21b6', // violet[8]
  '#4c1d95', // violet[9]
];

export const theme = createTheme({
  primaryColor: 'violet',
  primaryShade: { light: 6, dark: 5 },

  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '700',
  },

  defaultRadius: 'md',

  colors: {
    dark: darkColors,
    violet: violetColors,
  },

  /** Sombra suave para dar profundidad a tarjetas */
  shadows: {
    md: '0 4px 12px rgba(0, 0, 0, 0.35)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.45)',
  },

  components: {
    /** Inputs con bordes sutiles */
    TextInput: {
      defaultProps: {
        variant: 'filled',
      },
    },
    PasswordInput: {
      defaultProps: {
        variant: 'filled',
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'md',
      },
    },
  },
});
