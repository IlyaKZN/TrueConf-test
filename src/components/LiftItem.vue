<template>
  <div class="lift">

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'LiftItem',
})

</script>

<style scoped>

.lift {
  margin-top: 1px;
  height: calc(var(--lift-height) - 2px);
  width: calc(var(--lift-width) - 6px) ;
  background-color: rgb(208, 255, 255);
}

</style>