import { TreeStore, Data, Id } from './ClassTreeStore'
import { describe, expect, it } from 'vitest'


describe('ClassTreeStoreTests', () => { 
  const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ]
  
  it('getAll', () => {
    const treeStore = new TreeStore(items)
    
    const result = treeStore.getAll()
    const expectedResult: Data[] = items

    expect(result).toEqual(expectedResult)

   })
  
  it('getItem', () => {
    const treeStore = new TreeStore(items)

    const result = treeStore.getItem(2)
    const expectedResult: Data = { id: 2, parent: 1, type: 'test' }

    expect(result).toEqual(expectedResult)

    const failResult = treeStore.getItem(0)
    const failExpectedResult = undefined

    expect(failResult).toEqual(failExpectedResult)
   })
  
  it('getChildren', () => {
    const treeStore = new TreeStore(items)

    const result = treeStore.getChildren(4)
    const expectedResult: Data[] = [{ id: 7, parent: 4, type: null }, { id: 8, parent: 4, type: null }]

    expect(result).toEqual(expectedResult)

    const failResult = treeStore.getChildren(100)
    const failExpectedResult: Data[] = [] 

    expect(failResult).toEqual(failExpectedResult)
   })
  
  it('getByIds', () => {
    const treeStore = new TreeStore(items)

    const result = treeStore.getByIds([8, 1])
    const expectedResult: Data[] = [{ id: 8, parent: 4, type: null }, { id: 1, parent: 'root' }]

    expect(result).toEqual(expectedResult)

    const failResult = treeStore.getByIds([100, 1000])
    const failExpectedResult: Data[] = [] 

    expect(failResult).toEqual(failExpectedResult)

   })
  
  it('getAllChildrenIds', () => {
    const treeStore = new TreeStore(items)

    const result = treeStore.getAllChildrenIds(2)
    const expectedResult: Id[] = [4, 5, 6, 7, 8]
    

    expect(result).toEqual(expectedResult)

    const failResult = treeStore.getAllChildrenIds(8)
    const failExpectedResult: Id[] = []

    expect(failResult).toEqual(failExpectedResult)

   })
  
  it('getAllChildren', () => {
    const treeStore = new TreeStore(items)

    const result = treeStore.getAllChildren(2)
    const expectedResult: Data[] = [{ "id": 4, "parent": 2, "type": "test" },
      { "id": 5, "parent": 2, "type": "test" },
      { "id": 6, "parent": 2, "type": "test" },
      { "id": 7, "parent": 4, "type": null },
      { "id": 8, "parent": 4, "type": null }]
    

    expect(result).toEqual(expectedResult)

    const failResult = treeStore.getAllChildren(-809)
    const failExpectedResult: Id[] = []

    expect(failResult).toEqual(failExpectedResult)

   })
  
  it('getAllParentIds', () => {
    const treeStore = new TreeStore(items)

    const result = treeStore.getAllParentIds(8)
    const expectedResult: Id[] = [4, 2, 1]
    

    expect(result).toEqual(expectedResult)

    const failResult = treeStore.getAllParentIds('undefined')
    const failExpectedResult: Id[] = []

    expect(failResult).toEqual(failExpectedResult)

   })
  
  it('getAllParents', () => {
    const treeStore = new TreeStore(items)

    const result = treeStore.getAllParents(7)
    const expectedResult: Data[] = [{ "id": 4, "parent": 2, "type": "test" },
      { "id": 2, "parent": 1, "type": "test" },
      { "id": 1, "parent": "root" }]
    

    expect(result).toEqual(expectedResult)

    const failResult = treeStore.getAllParents('1432')
    const failExpectedResult: Data[] = []

    expect(failResult).toEqual(failExpectedResult)

   })

})

