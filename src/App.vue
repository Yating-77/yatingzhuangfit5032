<script setup>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './views/HomeView.vue'
import CountBookAPI from './views/CountBookAPI.vue';
import GetAllBookAPI from './views/GetAllBookAPI.vue';
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import JSON from './components/JSON.vue'
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <header v-if="showHeader">
    <BHeader />
  </header>

  <main>
    <router-view></router-view>
    <!-- <JSONLab /> -->
    <!--<TheWelcome />-->
    <!--<JSON />-->
    <LoginForm />
  </main>
</template>

<script>
export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI,
    GetAllBookAPI
  },
  computed: {
    showHeader() {
      return true;
    }
  }
};
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}

.text-success {
  color: green;
}
</style>
