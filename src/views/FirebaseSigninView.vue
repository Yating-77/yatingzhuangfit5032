<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1 class="text-center">Sign in</h1>
                <p>
                    <input type="text" class="form-control mb-3" placeholder="Email" v-model="email" />
                </p>
                <p>
                    <input type="password" class="form-control mb-3" placeholder="Password" v-model="password" />
                </p>
                <p class="text-center">
                    <button @click="signin" class="btn btn-primary">Sign in via Firebase</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Firebase Signin Successful!");
            console.log("User Data:", data.user);
            console.log("Auth Current User:", auth.currentUser);
            router.push("/");
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