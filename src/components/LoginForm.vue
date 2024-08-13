<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="usernameValidator.value"
                                v-bind="usernameValidator.attrs" />
                            <div v-if="usernameValidator.error" class="text-danger">{{ usernameValidator.error }}</div>
                        </div>
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="passwordValidator.value"
                                v-bind="passwordValidator.attrs" />
                            <div v-if="passwordValidator.error" class="text-danger">{{ passwordValidator.error }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" v-model="emailValidator.value"
                                v-bind="emailValidator.attrs" />
                            <div v-if="emailValidator.error" class="text-danger">{{ emailValidator.error }}</div>
                        </div>
                        <div class="col-md-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" v-model="genderValidator.value"
                                v-bind="genderValidator.attrs">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="genderValidator.error" class="text-danger">{{ genderValidator.error }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" v-model="reasonValidator.value"
                            v-bind="reasonValidator.attrs" rows="3"></textarea>
                        <div v-if="reasonValidator.error" class="text-danger">{{ reasonValidator.error }}</div>
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
import { ref } from 'vue';

function createValidator(initialValue, validate, validateOnBlur = false) {
    const value = ref(initialValue);
    const error = ref(undefined);

    const attrs = {
        onInput: (event) => {
            value.value = event.target.value;
            if (!validateOnBlur) {
                const validationResult = validate(value.value);
                error.value = validationResult === true ? undefined : validationResult;
            }
        },
        onBlur: () => {
            const validationResult = validate(value.value);
            error.value = validationResult === true ? undefined : validationResult;
        }
    };

    return { value, error, attrs };
}

const usernameValidator = createValidator('', (value) => value.length >= 3 ? true : 'Name must be at least 3 characters');
const passwordValidator = createValidator('', (value) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/\d/.test(value)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one special character';
    return true;
});
const emailValidator = createValidator('', (value) => value.includes('@') ? true : 'Invalid email');
const genderValidator = createValidator('', (value) => value ? true : 'Please select your gender');
const reasonValidator = createValidator('', (value) => value.length >= 10 ? true : 'Reason must be at least 10 characters long');

const submitForm = () => {
    if (!usernameValidator.error.value && !passwordValidator.error.value &&
        !emailValidator.error.value && !genderValidator.error.value && !reasonValidator.error.value) {
        // Form submission logic here
        console.log('Form submitted with values:', {
            username: usernameValidator.value.value,
            password: passwordValidator.value.value,
            email: emailValidator.value.value,
            gender: genderValidator.value.value,
            reason: reasonValidator.value.value
        });
        clearForm();
    }
};

const clearForm = () => {
    usernameValidator.value = '';
    passwordValidator.value = '';
    emailValidator.value = '';
    genderValidator.value = '';
    reasonValidator.value.value = '';
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
