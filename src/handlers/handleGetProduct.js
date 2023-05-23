export default function handleGetProductById(arr, id) {
  let result = {};
  result = arr.find((item) => item?.id === id);
  return result;
}
