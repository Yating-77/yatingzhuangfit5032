<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <input id="username" type="text" class="form-control" v-model="usernameField.value" />
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <input id="password" type="password" class="form-control" v-model="passwordField.value" />
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="email" class="form-label">Email</label>
                            <input id="email" type="email" class="form-control" v-model="emailField.value" />
                            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                        </div>
                        <div class="col-md-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select id="gender" class="form-select" v-model="genderField.value">
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea id="reason" rows="3" class="form-control" v-model="reasonField.value"></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

// Define validation schema using Yup
const schema = yup.object({
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    email: yup.string().required('Email is required').email('Invalid email'),
    gender: yup.string().required('Gender is required'),
    reason: yup.string().required('Reason is required').min(10, 'Reason must be at least 10 characters long'),
});

// Set up form with vee-validate
const { handleSubmit, resetForm, errors } = useForm({
    validationSchema: schema,
});

// Bind fields to their respective validation logic
const usernameField = useField('username');
const passwordField = useField('password');
const emailField = useField('email');
const genderField = useField('gender');
const reasonField = useField('reason');

const submitForm = handleSubmit((values) => {
    console.log('Form submitted with values:', values);
    clearForm();
});

const clearForm = () => {
    resetForm();
};
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.list-group-item {
    padding: 10px;
}

/* Media Queries */
@media screen and (min-width: 1024px) {

    /* Desktop */
    .container {
        max-width: 80%;
    }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {

    /* Tablet */
    .container {
        max-width: 90%;
    }
}

@media screen and (max-width: 767px) {

    /* Smartphone */
    .container {
        max-width: 100%;
        padding: 0 10px;
    }

    .card {
        width: 100%;
    }
}
</style>
