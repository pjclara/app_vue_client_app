<script setup>
import { inject } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()  
const axios = inject("axios")
const toast = inject("toast")

const logout = async () => {
  try {
    await axios.post("logout");
    toast.success("User has logged out of the application.");
    delete axios.defaults.headers.common.Authorization;
    router.push({name: 'login'})
  } catch (error) {
    toast.error("There was a problem logging out of the application!");
  }
};
</script>

<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="/adminlte/index3.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-user"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="#" class="dropdown-item">
            <i class="fas fa-user mr-2"></i>Profile
          </a>
          <div class="dropdown-divider"></div>
          <a @click.prevent="logout" class="dropdown-item" style="cursor: pointer;">
            <i class="fas fa-sign-out-alt mr-2"></i> Log out
          </a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="#"
          role="button"
        >
          <i class="fas fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
