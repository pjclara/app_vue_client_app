<script setup>
import NavBar from "./inc/NavBar.vue";
import Sidebar from "./inc/Sidebar.vue";
import ContentHeader from "../components/ContentHeader.vue";
import Footer from "./inc/Footer.vue";
</script>
<template>
  <div class="wrapper">
    <nav-bar />
    <sidebar />
    <div class="content-wrapper">
     <content-header/>
      <RouterView></RouterView>
    </div>

   <Footer/>

    <aside class="control-sidebar control-sidebar-dark"></aside>
  </div>
</template>
