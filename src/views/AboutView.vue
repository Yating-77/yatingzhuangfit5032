<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">About Our Library</h1>
        <p>
          Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our
          community.
        </p>
        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = localStorage.getItem('currentUser');
console.log('Current User:', currentUser);
const logout = () => {
  localStorage.removeItem('isAuthenticated');
  router.push('/login');
};
</script>

<style scoped></style>