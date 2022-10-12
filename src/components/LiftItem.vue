<template>
  <div class="lift" ref="lift" @click="animation">
    {{queue}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LiftItem',
  props: {
    liftNumber: Number
  },
  data() {
    return {
      currentFloor: 1,
    }
  },
  computed: {
    queue() {
      return this.$store.getters.queueByLiftNumber(this.liftNumber);
    }
  },
  watch: {
    queue(newData, oldData) {   
      console.log('watch') 
      this.animation(newData[0]);
    }
  },
  methods: {
    animation(desiredFloor) {
      const floorDifference = desiredFloor - this.currentFloor;
      const timeToFloor = 1000;
      const numberFrames = timeToFloor * Math.abs(floorDifference) / 20;
      let currentFrame = 1;

      let timer = setInterval(() => {
        if (currentFrame > numberFrames) {
          this.currentFloor = this.currentFloor + floorDifference;
          this.$store.dispatch('setCurrentFloor', { liftNumber: this.liftNumber, floorNumber: this.currentFloor });
          this.$store.dispatch('dequeueByLiftNumber', this.liftNumber);
          clearInterval(timer);
          return;
        }
        draw(currentFrame);
        currentFrame++;
      }, 20);

      const draw = (currentFrame) => {
        const lift = this.$refs.lift;
        const completionShare = numberFrames / currentFrame;
        const initialHeight = (this.currentFloor - 1) * lift.clientHeight;
        lift.style.bottom = (lift.clientHeight * floorDifference + this.currentFloor * 2) / completionShare +
          initialHeight + 'px';
      }
    }
  }
})

</script>

<style scoped>

.lift {
  margin-bottom: 1px;
  height: calc(var(--lift-height) - 2px);
  width: calc(var(--lift-width) - 6px) ;
  background-color: rgb(208, 255, 255);
  position: relative;
}

</style>