export function convertToMax3DigitsWithSuffix(number: number): [number, string] {
  if (isNaN(number)) {
    return [0, ''];
  }


  if (number >= 1000000) {
    return [Number(Math.floor(number / 1000000).toFixed(0)), 'M'];
  } else if (number >= 1000) {
    return [Number(Math.floor(number / 1000).toFixed(0)), 'K'];
  } else {
    return [Number(Math.floor(number).toFixed(0)), ''];
  }
}
