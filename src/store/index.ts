import { createStore, Store } from 'vuex';
import { TStore } from '../types';

const store: Store<TStore> = createStore({
  state () {
    return {
      liftsData: {}
    }
  },
  mutations: {
    setInitialState(state: TStore, initialState: TStore) {
      state.liftsData = initialState.liftsData;
    },
    dequeueByLiftNumber(state: TStore, liftNumber: number) {
      state.liftsData[liftNumber].queue = state.liftsData[liftNumber].queue.slice(1,state.liftsData[liftNumber].queue.length + 1);
    },
    setCurrentFloor(state: TStore, { liftNumber, floorNumber }) {
      state.liftsData[liftNumber].currentFloor = floorNumber;
    },
    pushInQueue(state: TStore, { liftNumber, floorNumber }) {
      state.liftsData[liftNumber].queue = [...state.liftsData[liftNumber].queue, floorNumber];
    },
    setLiftState(state: TStore, { liftNumber, liftState }) {
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
    queueByLiftNumber: (state: TStore) => (liftNumber) => {
      if (state.liftsData[liftNumber]) {
        return state.liftsData[liftNumber].queue;
      } else {
        return [];
      }
    },
    getLiftsData: (state: TStore) => () => {
      return state.liftsData;
    }
  }
})

export default store;