<template>
  <h1 class="h1">Привет мир<span class="span">!</span></h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<style lang="less" scoped>
.h1{
    color:blue;
    .span{
        color: red;
    }
}
</style>