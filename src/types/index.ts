export type TStore = {
  liftsData: TLiftsData
}

export type TLiftsData = {
  [key: number]: {
    queue: Array<number>,
    currentFloor: number,
    state: 'ready' | 'action' | 'disable'
  }
}