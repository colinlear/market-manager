export const makeCoords = (row: number, column: number) =>
  row >= 0 && row < 26 ? `${String.fromCharCode(65 + row)}${column}` : "?";
