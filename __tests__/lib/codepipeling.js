const {list, getByName} = require('../../src/lib/codepipeling')

test('pipeline.list()', async ()=>{
  const {pipelines} = await list('/')
  pipelines.forEach((item)=>{
    expect(typeof item.version).toBe('number')
    expect(typeof item.name).toBe('string')
    expect(typeof item.created).toBe('object')
    expect(typeof item.updated).toBe('object')
  })
})

test('pipeline.getByName()', async ()=>{
  const {pipelines} = await list('/')
  const firstItem = pipelines[0]

  const {pipeline} = await getByName(firstItem.name)
  
  expect(typeof pipeline.name).toBe('string')
})