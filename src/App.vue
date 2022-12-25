<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();


onMounted(()=>{
userStore.restoreToken()
})
</script>

<template>
   <RouterView />
</template>
