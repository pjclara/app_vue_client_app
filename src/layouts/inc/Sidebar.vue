<script setup>
import { useIndexStore } from "../../stores";
import {useUserStore} from '@/stores/user.js'
import NavItem from "./NavItem.vue";

const indexStore = useIndexStore();
const userStore = useUserStore()

</script>

<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link :to="{name:'home'}" class="brand-link">
      <img
        src="/adminlte/dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">{{ indexStore.appName }}</span>
    </router-link>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="/adminlte/dist/img/user2-160x160.jpg"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <router-link :to="{name:'home'}" class="d-block">{{ userStore.user?.name ?? 'Anónimo'}}</router-link>
        </div>
      </div>

      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
        <nav-item icon="fas fa-home" link="/">Home</nav-item>
        <nav-item icon="fas fa-info-circle" link="/about">About</nav-item>

        </ul>
      </nav>
    </div>
  </aside>
</template>
