<template>
    <div class="container">
        <h1>All Books Data</h1>
        <pre v-if="jsondata">{{ jsondata }}</pre>
        <p v-else-if="error">{{ error }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GetAllBookAPI',
    data() {
        return {
            jsondata: null,
            error: null,
        };
    },
    mounted() {
        this.getAllBooksAPI();
    },
    methods: {
        async getAllBooksAPI() {
            try {
                const response = await axios.get('https://getallbooks-zhzxmw3tyq-uc.a.run.app/getAllBooks');
                this.jsondata = JSON.stringify(response.data, null, 2);
                this.error = null;
            } catch (error) {
                console.error('Error fetching books:', error);
                this.error = 'Failed to fetch books';
                this.jsondata = null;
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>