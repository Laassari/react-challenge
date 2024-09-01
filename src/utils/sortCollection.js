// order can be 'asc' or 'desc'
export default function sortCollection(collection, keyStrOrFn, options) {
  const { order, isDate } = options

  if (isDate)
    return sortCollectionByDate(collection, keyStrOrFn, order === 'asc')
  return sortCollectionByString(collection, keyStrOrFn, order === 'asc')
}

function sortCollectionByDate(collection, keyStrOrFn, asc = true) {
  return collection.toSorted((a, b) => {
    const aKey = typeof keyStrOrFn === 'string' ? a[keyStrOrFn] : keyStrOrFn(a)
    const bKey = typeof keyStrOrFn === 'string' ? b[keyStrOrFn] : keyStrOrFn(b)

    const sort = new Date(aKey).getTime() > new Date(bKey).getTime() ? 1 : -1

    return asc ? sort : sort * -1
  })
}

function sortCollectionByString(collection, keyStrOrFn, asc = true) {
  return collection.toSorted((a, b) => {
    const aKey = typeof keyStrOrFn === 'string' ? a[keyStrOrFn] : keyStrOrFn(a)
    const bKey = typeof keyStrOrFn === 'string' ? b[keyStrOrFn] : keyStrOrFn(b)

    const sort = aKey.localeCompare(bKey)

    return asc ? sort : sort * -1
  })
}
