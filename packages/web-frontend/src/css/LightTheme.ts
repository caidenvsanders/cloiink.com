/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const lightTheme = {
  /**
   * Font
   */
  font: {
    family: "'Roboto', sans-serif",
    weight: {
      normal: '400',
      bold: '900',
    },
    size: {
      tiny: '0.6875rem', // 11px
      xxs: '0.8125rem', // 13px
      xs: '0.875rem', // 14px
      sm: '1rem', // 16px
      md: '1.125rem', // 18px
      lg: '1.25rem', // 20px
      xl: '2.125rem', // 34px
      xxl: '3rem', // 48px
    },
  },

  /**
   * Colors
   */
  colors: {
    black: '#352D39',
    white: '#FFFCF9',
    success: '#DC493A',
    body: '#FFFCF9',

    primary: {
      light: '#5DACFF', // 10% lightened,
      main: '#4392F1',
      dark: '#2A79D8', // 10% darkened
      contrastText: '#000000',
    },

    secondary: {
      light: '',
      main: '',
      dark: '',
      contrastText: '',
    },

    text: {
      primary: '#352D39',
      secondary: '',
      opposite: '#FFFCF9',
      disabled: '',
      hint: '',
    },

    border: {
      light: '',
      main: '',
      dark: '',
    },

    error: {
      light: '',
      main: '',
      dark: '',
      contrastText: '',
    },

    warning: '#FBAF00',

    info: '#4169E1',

    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },

  /**
   * Shadows
   */
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
    lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },

  /**
   * Spacing
   */
  spacing: {
    none: 0,
    xxs: '0.3125rem', // 5px
    xs: '0.625rem', // 10px
    sm: '1.25rem', // 20px
    md: '1.875rem', // 30px
    lg: '2.5rem', // 40px
    xl: '3.75rem', // 60px
  },

  /**
   * Radius
   */
  radius: {
    sm: '3px',
    md: '6px',
    lg: '12px',
  },

  /**
   * zIndex
   */
  zIndex: {
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
  },
};

export default lightTheme;
