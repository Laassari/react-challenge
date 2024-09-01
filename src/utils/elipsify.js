export default function elipsify(text, length) {
  const ellipsis = '...'

  if (text.length <= length) return text

  return text.slice(0, length).concat(ellipsis)
}
