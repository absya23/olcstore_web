export default function handleCalTotal(data) {
  let sum = 0;
  data.length > 0 &&
    data.forEach((item) => {
      sum += Number(item.price) * Number(item.quantity);
    });
  return sum;
}

export function handleCalTotalQuantity(data) {
  let sum = 0;
  data.length > 0 &&
    data.forEach((item) => {
      sum += Number(item.quantity);
    });
  return sum;
}
