import CompetentExample from './'

(async () => {
  const { res, exported } = await CompetentExample()
  console.log(res)
  console.error('Exported packages:')
  console.error(exported)
})()