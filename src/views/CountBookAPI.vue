<template>
    <div class="container">
        <pre v-if="jsondata">{{ jsondata }}</pre>
        <p v-else-if="error">{{ error }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CountBookAPI',
    data() {
        return {
            jsondata: null,
            error: null,
        };
    },
    mounted() {
        this.getBookCountAPI();
    },
    methods: {
        async getBookCountAPI() {
            try {
                const response = await axios.get('https://countbooks-zhzxmw3tyq-uc.a.run.app/countbooks');
                this.jsondata = JSON.stringify(response.data, null, 2);
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = 'Failed to fetch book count';
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