<template>
    <div id="app" class="container">
        <div class="text-center mt-5">
            <h1 class="display-4">Book Counter</h1>
            <button @click="getBookCount" class="btn btn-primary mt-3">Get Book Count</button>
            <p v-if="count !== null" class="mt-4">Total number of books: {{ count }}</p>
            <p v-if="error" class="text-danger mt-4">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null,
        };
    },
    methods: {
        async getBookCount() {
            try {
                const response = await axios.get('https://countbooks-zhzxmw3tyq-uc.a.run.app');
                this.count = response.data.count;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = 'Failed to fetch book count';
                this.count = null;
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>