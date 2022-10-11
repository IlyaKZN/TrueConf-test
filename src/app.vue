<template>
  <main>
    <FloorItem
      v-for='n in numberFloors' 
      :key='n'
      :floorNumber="n"
      :numberFloors="numberFloors"
      :numberLifts="numberLifts"
    />
    <div class="liftsContainer">
      <LiftShaft
        v-for='n in numberLifts'
        :key="n"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FloorItem from './components/FloorItem.vue';
import LiftShaft from './components/LiftShaft.vue';


export default defineComponent({
  name: 'App',
  components: {
    FloorItem,
    LiftShaft
  },
  data() {
    return {
      numberFloors: 8,
      numberLifts: 4,
    }
  }
});
</script>
<style>

:root {
  --lift-width: 100px;
}

body {
  margin: 0;
  height: 100vh;
}

#app {
  height: 100%;
}

main {
  padding: 20px;
  height: 100%;
  position: relative;
  box-sizing: border-box;

  --lift-height: calc(100% / v-bind(numberFloors));
}

.liftsContainer {
  display: flex;
  height: calc(100% - 40px);
  position: absolute;
  top: 20px;
  left: 20px;
}

</style>