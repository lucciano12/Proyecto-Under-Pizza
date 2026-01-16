import { RotulosApiClient } from '@rotulos/shared';

// Use host IP if testing on real device, or localhost for emulator
export const api = new RotulosApiClient('http://localhost:3000');
