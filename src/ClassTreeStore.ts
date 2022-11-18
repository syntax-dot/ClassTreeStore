export interface Data {
  id: Id
  parent: Id
  type?: string | null
}

export type Id = number | string
export class TreeStore {
  public map: Map<Id, Data>
  public childrens: Map<Id, Id[]>

  constructor(public items: Data[]) {
    this.map = new Map()
    this.childrens = new Map()

    for (const item of items) {
      this.map.set(item.id, item)

      if (!this.childrens.has(item.parent))
        this.childrens.set(item.parent, [])
      
      this.childrens.get(item.parent)?.push(item.id)
    }
  }

  getAll(): Data[] {
    return this.items // Если часто то лучше так
    // return [...this.map.values()] /// Если нужно создание нового массива
  }

  getItem(id: Id): Data | undefined {
    return this.map.get(id)
  }

  getChildren(id: Id): Data[] {
    return this.getByIds(this.childrens.get(id) ?? [])
  }

  getByIds(ids: Id[]): Data[] {
    return ids.map(id => this.map.get(id)!).filter(Boolean)
  }

  getAllChildrenIds(id: Id): Id[] {
    const ids: Id[] = this.childrens.get(id) ?? []
    
    return ids.concat(ids.flatMap((v) => this.getAllChildrenIds(v)))
  }

  getAllChildren(id: Id): Data[] {
    return this.getByIds(this.getAllChildrenIds(id))
  }

  getAllParentIds(id: Id): Id[] {
    let parentId: Id | undefined = id
    let result = []

    const next = () =>
      (parentId = this.map.get(parentId!)?.parent) !== 'root'
      && typeof parentId !== 'undefined'
    

    while (next()) 
        result.push(parentId)
    
    
    return result
  }

  getAllParents(id: Id): Data[] {
    return this.getByIds(this.getAllParentIds(id))
  }
}

