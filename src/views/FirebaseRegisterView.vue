<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1 class="text-center">Create an Account</h1>
                <p>
                    <input type="text" class="form-control mb-3" placeholder="Email" v-model="email" />
                </p>
                <p>
                    <input type="password" class="form-control mb-3" placeholder="Password" v-model="password" />
                </p>
                <p class="text-center">
                    <button @click="register" class="btn btn-primary">Save to Firebase</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Firebase Register Successful!");
            router.push("/FireLogin");
        })
        .catch((error) => {
            console.log(error.code);
        });
};
</script>

<style scoped>
.container {
    margin-top: 50px;
}

h1 {
    margin-bottom: 20px;
}

.btn {
    width: 100%;
}
</style>