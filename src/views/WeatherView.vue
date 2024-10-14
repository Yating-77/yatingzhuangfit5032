<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card p-4">
                    <h1 class="text-center mb-4">WEATHER APP</h1>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="city" placeholder="Enter city name" />
                        <button class="btn btn-primary" @click="searchByCity">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <main v-if="weatherData" class="d-flex justify-content-center mt-4">
        <div class="text-center">
            <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
            <div>
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ weatherData.main.temp }} °C</p>
            </div>
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </main>
</template>

<script>
import axios from "axios";

const apikey = "4300747fbdce7480245f3c9e02b943df";

export default {
    name: "WeatherView",
    data() {
        return {
            city: "",
            weatherData: null,
        };
    },
    computed: {
        // Get the weather icon URL
        iconUrl() {
            return this.weatherData
                ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
                : null;
        },
    },
    mounted() {
        this.fetchCurrentLocationWeather();
    },
    methods: {
        async fetchCurrentLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
                    await this.fetchWeatherData(url);
                });
            }
        },
        async fetchWeatherData(url) {
            try {
                const response = await axios.get(url);
                this.weatherData = response.data;
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        },
        async searchByCity() {
            if (this.city.trim() !== "") {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;
                await this.fetchWeatherData(url);
            }
        },
    },
};
</script>