import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

// Register PrimeVue and components
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');
