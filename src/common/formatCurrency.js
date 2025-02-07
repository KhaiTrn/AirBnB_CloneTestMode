export function formatCurrency(value) {
  const roundedValue = Math.ceil(value);

  return new Intl.NumberFormat("vi-VN").format(roundedValue);
}
