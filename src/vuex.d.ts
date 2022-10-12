import { ComponentCustomProperties } from "vue";
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    liftsData: {
      queue: Array<number>,
      currentFloor: number,
      state: 'ready' | 'action' | 'disable'
    }
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}