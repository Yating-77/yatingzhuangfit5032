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
const adminEmail = "admin@gmail.com"
const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Firebase Signin Successful!");
            console.log("User Data:", userCredential.user);

            // Check if the user is an admin
            if (userCredential.user.email === adminEmail) {
                alert("Welcome Admin!");
                router.push("/admin-dashboard");
            } else {
                router.push("/");
            }
        })
        .catch((error) => {
            console.log("Login failed:", error.code);
            alert("Login failed. Please check your credentials.");
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