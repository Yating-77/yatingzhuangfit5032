<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1 class="text-center">Logout</h1>
                <p class="text-center">
                    <button @click="logout" class="btn btn-danger">Logout</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

// Display current user information
console.log("Current User:", auth.currentUser);

const logout = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully.");
            console.log("Current User after sign out:", auth.currentUser); // This should be null
        })
        .catch((error) => {
            console.log("Sign out error:", error);
        });
};
</script>