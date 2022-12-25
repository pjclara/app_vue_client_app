<script setup>
import { onBeforeMount, onUnmounted, ref, inject } from "vue";
import { useIndexStore } from "@/stores";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from 'vue-router'

const router = useRouter()  
const indexStore = useIndexStore();
const userStore = useUserStore();
const toast = inject("toast");

const credentials = ref({
  username: "",
  password: "",
});

let loginSubmit = async () => {
  if (await userStore.login(credentials.value)) {
    toast.success(
      "User " + userStore.user.name + " has entered the application."
    );
    router.push({name: 'home'})
  } else {
    credentials.value.password = "";
    toast.error("User credentials are invalid!");
  }
};

onBeforeMount(() => {
  $("body")
    .removeClass("sidebar-mini")
    .addClass("login-page");
  $("title").html(`Login | ${indexStore.appName}`);
});

onUnmounted(() => {
  $("body")
    .removeClass("login-page")
    .addClass("sidebar-mini");
});
</script>
<template>
  <div>
    <div class="login-box">
      <div class="login-logo">
        <router-link :to="{ name: 'home' }"
          ><b>{{ indexStore.appName }}</b></router-link
        >
      </div>

      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Autenticar para iniciar a sessão</p>
          <form action="/login" method="post" @submit.prevent="loginSubmit()">
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Email" v-model="credentials.username" />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Senha"
                v-model="credentials.password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" class="mr-2"/>
                  <label for="remember"> Lembrar-me </label>
                </div>
              </div>

              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">
                  Entrar
                </button>
              </div>
            </div>
          </form>
          <p class="mb-1">
            <a href="forgot-password.html">Esqueci da senha</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
