<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" class="form-control" v-model="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" v-model="password" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <div v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = () => {
  const registeredUsername = 'Yating';  // Hardcoded for now
  const registeredPassword = 'Yt139130.';  // Hardcoded for now

  if (username.value === registeredUsername && password.value === registeredPassword) {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/about');
  } else {
    errorMessage.value = 'Invalid username or password';
  }
};
</script>

<style scoped></style>
