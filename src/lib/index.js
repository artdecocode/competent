export const makeRe = (keys) => {
  const k = `(${keys.join('|')})`
  const re = new RegExp(`( *)(<${k}(?:\\s+[\\s\\S]+?)?(?:\\s*?/>|>[\\s\\S]*?<\\/\\3>))`, 'gm')
  return re
}