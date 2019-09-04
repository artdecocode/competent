export const makeRe = (keys) => {
  const k = `(${keys.join('|')})`
  const s = '(?:\\s+(?!\\/>)[^>]*?)?' // before closing >
  const re = new RegExp(`(\\n)?( *)(<${k}${s}(?:\\s*?/>|>[\\s\\S]*?<\\/\\4>))`, 'gm')
  return re
}