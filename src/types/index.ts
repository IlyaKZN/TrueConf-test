export interface IStore {
  liftsData: ILiftsData
}

export interface ILiftsData {
  [key: number]: {
    queue: Array<number>,
    currentFloor: number,
    state: 'ready' | 'action' | 'disable'
  }
}