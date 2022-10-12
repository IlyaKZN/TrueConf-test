import { createStore, Store } from 'vuex';
import { IStore } from '../types';
import { InjectionKey } from 'vue';


export const key: InjectionKey<Store<IStore>> = Symbol()

const store = createStore<IStore>({
  state () {
    return {
      liftsData: {}
    }
  },
  mutations: {
    setInitialState(state: IStore, initialState: IStore) {
      state.liftsData = initialState.liftsData;
    },
    dequeueByLiftNumber(state: IStore, liftNumber: number) {
      state.liftsData[liftNumber].queue = state.liftsData[liftNumber].queue.slice(1,state.liftsData[liftNumber].queue.length + 1);
    },
    setCurrentFloor(state: IStore, { liftNumber, floorNumber }) {
      state.liftsData[liftNumber].currentFloor = floorNumber;
    },
    pushInQueue(state: IStore, { liftNumber, floorNumber }) {
      state.liftsData[liftNumber].queue = [...state.liftsData[liftNumber].queue, floorNumber];
    },
    setLiftState(state: IStore, { liftNumber, liftState }) {
      state.liftsData[liftNumber].state = liftState;
    }
  },
  actions: {
    setInitialState(ctx, initialState) {
      ctx.commit('setInitialState', initialState)
    },
    dequeueByLiftNumber(ctx, liftNumber) {
      ctx.commit('dequeueByLiftNumber', liftNumber)
    },
    setCurrentFloor(ctx, payload) {
      ctx.commit('setCurrentFloor', payload);
    },
    pushInQueue(ctx, payload) {
      ctx.commit('pushInQueue', payload);
    },
    setLiftState(ctx, payload) {
      ctx.commit('setLiftState', payload)
    }
  },
  getters: {
    queueByLiftNumber: (state: IStore) => (liftNumber: number): number[] => {
      if (state.liftsData[liftNumber]) {
        return state.liftsData[liftNumber].queue;
      } else {
        return [];
      }
    },
    getLiftsData: (state: IStore) => () => {
      return JSON.parse(JSON.stringify(state.liftsData))
    },
    getAllQueues: (state: IStore)=> ():number[][] => {
      const queues = [];
      for (let key in state.liftsData) {
        queues.push([...state.liftsData[key].queue]);
      }
      return queues;
    },
    getCurrentFloor: (state: IStore) => (liftNumber: number) => {
      if (state.liftsData[liftNumber]) {
        return state.liftsData[liftNumber].currentFloor;
      } else {
        return [];
      }
    }
  }
})

export default store;