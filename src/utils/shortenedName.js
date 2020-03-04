export default function shortenedNameUtil(name) {
  let shortenedName = String(name)
    .trim()
    .split(' ')
    .reduce((accumulator, n) => accumulator + n[0], '')
    .substring(0, 2)
    .toUpperCase();

  shortenedName =
    shortenedName.length > 2
      ? `${shortenedName[0]}${shortenedName[shortenedName.length - 1]}`
      : shortenedName;

  return shortenedName;
}
