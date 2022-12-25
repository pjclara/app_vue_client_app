<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 v-if="title"><i :class="icon" v-if="icon"></i>{{ title }}</h1>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted } from "vue";
import { useIndexStore } from "../stores/index.js";

const indexStore = useIndexStore()

let props = defineProps({
  title: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
});

onMounted(() => {
    let title = indexStore.appName
    title = props.title ? `${props.title} | ${title}`: title;
    $('title').html(title);
})
</script>
