export interface Data {
  id: number | string
  parent: number | string
  type?: string | null
}

export class TreeStore {
  public array: Data []

  constructor(data: Data []) {
    this.array = data
  }

  getAll(): Data[] {
    return this.array
  }

  getItem(id: number | string): Data | undefined {
    return this.array.find(value => value.id === id)
  }

  getChildren(parentId: number | string): Data[] | [] {
    return this.array.filter(value => value.parent === parentId)
  }

  getAllChildren(parentId: number | string): Data[] {
    return this.array.filter((value) => value.parent >= parentId)
  }

  getParent(parentId: number | string): Data | [] {
    const item = this.array.find(value => value.parent === parentId)
    if (typeof item === 'undefined')
      return []
    else
      return item
  }

  getAllParents(id: number | string): Data[] {
    // TODO
    return this.array.reverse().filter((value, index) => value.parent === id)
  }
}

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

const ts = new TreeStore(items)

ts.getAll()
