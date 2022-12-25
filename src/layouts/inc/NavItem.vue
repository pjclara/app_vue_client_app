<template>
  <li class="nav-item">
    <router-link class="nav-link" :to="link" :class="{ active: isActive() }">
      <i class="nav-icon" :class="icon" v-if="icon"></i>
      <p><slot></slot></p>
    </router-link>
  </li>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

let props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  link: {
    type: [String, Object],
    default: null,
  },
});
let isActive = () => {
  if (typeof props.link === "object") return (route.name === props.link.name);
  else return (route.path === props.link);
};
</script>
