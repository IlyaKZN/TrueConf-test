<template>
  <div class="liftShaft">
    <LiftItem
      :lift-number="liftNumber"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LiftItem from './LiftItem.vue';


export default defineComponent({
  name: "LiftShaft",
  components: { LiftItem },
  props: {
    liftNumber: Number
  }
})

</script>

<style scoped>

.liftShaft {
  box-sizing: border-box;
  margin-left: 20px;
  height: 100%;
  width: var(--lift-width);
  border-left: 3px solid rgb(217, 217, 217);
  border-right: 3px solid rgb(217, 217, 217);
  display: flex;
  flex-direction: column-reverse;
}


</style>