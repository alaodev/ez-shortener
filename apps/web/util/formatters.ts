export function capitalize(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function capitalizeString(
  value: string,
  capitalizeAll: boolean = false,
) {
  if (!value) return value;
  if (capitalizeAll)
    return value
      .split(' ')
      .map((word) => capitalize(word))
      .join(' ');
  return capitalize(value);
}
