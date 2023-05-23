// format number likes this: 5.310.000
export default function handleFormatNumber(number) {
  if (typeof number === "number") {
    return Intl.NumberFormat("de-DE").format(number);
  }
  return 0;
}
