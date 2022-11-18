export interface Data {
  id: Id
  parent: Id
  type?: string | null
}

type Id = number | string
export class TreeStore {
  public map: Map<Id, Data>
  public childrens: Map<Id, Id[]>

  constructor(public items: Data[]) {
    this.map = new Map()
    
    for (const item of items) {
      this.map.set(item.id, item)

      if (!this.childrens.has(item.parent))
        this.childrens.set(item.parent, [])
      
      this.childrens.get(item.parent)?.push(item.id)
    }
  }

  getAll(): Data[] {
    return this.items
  }

  getItem(id: Id): Data | undefined {
    return this.map.get(id)
  }

  getChildren(id: Id): Data[] | undefined {
    return this.map.get()
  }

  getAllChildren(id: Id): Data[] {
    return this.map.
  }

  getParent(id :Id): Data | [] {
    const item = this.array.find(value => value.parent === parentId)
    if (typeof item === 'undefined')
      return []
    else
      return item
  }

  getAllParents(id: Id): Data[] {
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
