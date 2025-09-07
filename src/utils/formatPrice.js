function formatPrice(
  num,
  { locale = 'en-US', decimals = 2, group = false } = {}
) {
  const n = Number(num ?? 0);
  return new Intl.NumberFormat(locale, {
    useGrouping: group,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export default formatPrice;
