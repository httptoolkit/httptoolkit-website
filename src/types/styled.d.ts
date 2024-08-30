import 'styled-components';
import type { theme } from '../styles';

type Theme = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
