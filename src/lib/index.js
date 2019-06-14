export const makeRe = (keys) => {
  const k = `(${keys.join('|')})`
  const s = '(?:\\s+(?!\\/>)[^>]*?)?' // before closing >
  const re = new RegExp(`( *)(<${k}${s}(?:\\s*?/>|>[\\s\\S]*?<\\/\\3>))`, 'gm')
  return re
}