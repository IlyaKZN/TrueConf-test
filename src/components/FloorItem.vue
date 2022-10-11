<template>
  <div class="floor">
    <button class="floorButton">
      <p class="floorNumber">{{ floorNumber }}</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FloorItem',
  props: {
    numberFloors: Number,
    numberLifts: Number,
    floorNumber: Number
  },
})
</script>

<style scoped>

.floor {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(154, 154, 255);
  position: relative;
  height: var(--lift-height);
}

.floor:first-of-type {
  border-top: 1px solid rgb(154, 154, 255);
}

.floorButton {
  background: none;
  border: 2px solid rgb(112, 172, 246);
  height: 30px;
  width: 30px;
  cursor: pointer;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(v-bind(numberLifts) * (var(--lift-width) + 20px) + 30px);
}

.floorButton::before {
  height: 10px;
  width: 10px;
  content: '';
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  background-color: rgb(112, 172, 246);
  border-radius: 50%;
}

.floorNumber {
  font-size: 16px;
  position: absolute;
  top: -150%;
  left: 0;
}

</style>