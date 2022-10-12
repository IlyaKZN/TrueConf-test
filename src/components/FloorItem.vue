<template>
  <div class="floor">
    <button class="floorButton" @click="liftCall" :disabled="buttonState == 'disabled'">
      <p class="floorNumber">{{ floorNumber }}</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ILiftsData } from '../types';

export default defineComponent({
  name: 'FloorItem',
  props: {
    numberFloors: Number,
    numberLifts: Number,
    floorNumber: Number
  },
  data() {
    return {
      liftsData: {} as ILiftsData,
      buttonState: 'active'
    }
  },
  computed: {
    getLiftsData() {
      return this.$store.getters.getLiftsData();
    },
    getAllQueues() {
      return this.$store.getters.getAllQueues();
    }
  },
  watch: {
    getLiftsData(newData, oldData) {
      this.liftsData = newData;
    },
    getAllQueues(newData, oldData) {
      this.checkButtonState(newData);
    }
  },
  methods: {
    liftCall() {
      for (let key in this.liftsData) {
        if (this.liftsData[key].currentFloor === this.floorNumber) {
          return;
        }
      }
      //Ищем ближний свободный лифт
      const nearestLift = {
        numberLift: 0,
        defferentFloors: 0,
        queueSize: 0
      };
      for (let key in this.liftsData) {
        const differentFloors = Math.abs(this.liftsData[key].currentFloor - this.floorNumber!)
        if ((differentFloors < nearestLift.defferentFloors || nearestLift.defferentFloors === 0)
          && this.liftsData[key].state === 'ready' ) {
          nearestLift.numberLift = +key,
          nearestLift.defferentFloors = differentFloors;
        }
      }

      //Если все лифты заняты, вызываем наименее нагруженный лифт
      if (nearestLift.numberLift === 0) {
        for (let key in this.liftsData) {
          if (this.liftsData[key].queue.length < nearestLift.queueSize || nearestLift.queueSize === 0) {
            nearestLift.numberLift = +key;
            nearestLift.queueSize = this.liftsData[key].queue.length;
          }
        }
      }
      this.$store.dispatch('pushInQueue', { liftNumber: nearestLift.numberLift, floorNumber: this.floorNumber});
    },
    checkButtonState(queus: number[][]) {
      let state = 'active';
      queus.forEach((el) => {
        if (el.indexOf(this.floorNumber!) > -1) {
          state = 'disabled';
        }
      })
      this.buttonState = state;
    }
  }
})
</script>

<style scoped>

.floor {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(154, 154, 255);
  position: relative;
  height: var(--lift-height);
}

.floor:last-of-type {
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

.floorButton:disabled {
  opacity: 0.5;
  cursor: auto;
}

.floorNumber {
  font-size: 16px;
  position: absolute;
  top: -150%;
  left: 0;
}

</style>