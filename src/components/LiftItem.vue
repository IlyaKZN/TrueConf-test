<template>
  <div class="lift" ref="lift" :class="{ animation: state === 'disable' }">
    <div v-if="travelDirection" class="floorIndicator">
      <div v-bind:class="{ directionUp: travelDirection === 'up', directionDown: travelDirection === 'down' }"/>
      <p>{{queue[0]}}</p>
    </div>
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
      queue: [],
      state: 'ready',
      travelDirection: ''
    }
  },
  computed: {
    getQueue() {
      return this.$store.getters.queueByLiftNumber(this.liftNumber);
    },
    getCurrentFloor() {
      return this.$store.getters.getCurrentFloor(this.liftNumber);
      
    }
  },
  watch: {
    getQueue(newData, oldData) {
      this.queue = newData;
    },
    queue() {
      if (this.queue.length > 0 && this.state === 'ready') {
        this.animation(this.queue[0]);
      }
    },
    getCurrentFloor(newData, oldData) {
      this.currentFloor = newData;
    },
    currentFloor() {
      this.setInitialPosition();
    }
  },
  methods: {
    //Устанавливаем начальные позиции лифтов
    setInitialPosition() {
      const lift = this.$refs.lift as HTMLElement;
      lift.style.bottom = (this.currentFloor - 1) * (lift.clientHeight + 2) + 'px';
    },

    //Анимация перемещения лифта
    animation(desiredFloor: number) {
      this.state = 'action';
      this.$store.dispatch('setLiftState', { liftNumber: this.liftNumber, liftState: 'action' });
      const floorDifference = desiredFloor - this.currentFloor;
      floorDifference > 0 ? this.travelDirection = 'up' : this.travelDirection = 'down';
      const timeToFloor = 1000;
      const numberFrames = timeToFloor * Math.abs(floorDifference) / 20;
      let currentFrame = 1;

      let timer = setInterval(() => {
        if (currentFrame > numberFrames) {
          this.currentFloor = this.currentFloor + floorDifference;
          this.state = 'disable';
          this.$store.dispatch('setLiftState', { liftNumber: this.liftNumber, liftState: 'disable' });
          this.$store.dispatch('setCurrentFloor', { liftNumber: this.liftNumber, floorNumber: this.currentFloor });
          const flashingAnimOff = setTimeout(() => {
            this.queue = this.queue.slice(1, this.queue.length + 1);
            this.state = 'ready';
            this.$store.dispatch('setLiftState', { liftNumber: this.liftNumber, liftState: 'ready' });
            this.$store.dispatch('dequeueByLiftNumber', this.liftNumber);
            this.checkQueue();
          }, 3000);
          this.travelDirection = '';
          clearInterval(timer);
          return;
        }
        draw(currentFrame);
        currentFrame++;
      }, 20);

      const draw = (currentFrame: number) => {
        const lift = this.$refs.lift as HTMLElement;
        const completionShare = numberFrames / currentFrame;
        const initialHeight = (this.currentFloor - 1) * (lift.clientHeight + 2);
        lift.style.bottom = (lift.clientHeight * floorDifference + floorDifference * 2) / completionShare +
          initialHeight + 'px';
      };

    },

    //Проверяем есть ли этаж в очереди
    checkQueue() {
      if (this.queue.length > 0) {
        this.animation(this.queue[0]);
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
  background-color: rgb(66, 235, 235);
  position: relative;
}

.floorIndicator {
  margin: 0 auto;
  background-color: rgb(79, 79, 79);
  color: white;
  display: block;
  text-align: center;
  width: min-content;
  padding: 4px 10px;
  box-sizing: border-box;
}

.floorIndicator > p {
  margin: 0;
  font-size: 16px;
}

.directionUp {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid white;
}

.directionDown {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid white;
}

.animation {
  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 0.5s;
  animation-direction:alternate-reverse;
}
 
@keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}
 
@-webkit-keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}

</style>