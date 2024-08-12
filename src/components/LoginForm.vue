<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" @blur="() => validateName(true)"
                                @input="() => validateName(false)" v-model="formData.username" />
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" minlength="4" maxlength="10"
                                @blur="() => validatePassword(true)" @input="() => validatePassword(false)"
                                v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian"
                                    @change="validateAustralianResident" v-model="formData.isAustralian">
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                                <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" @blur="() => validateGender(true)"
                                @change="() => validateGender(false)" v-model="formData.gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" @blur="() => validateReason(true)"
                            @input="() => validateReason(false)" v-model="formData.reason" rows="3"></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- </div>
    <div class="row mt-5" v-if="submittedCards.length">
        <div class="d-flex flex-wrap justify-content-start">
            <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
                <div class="card-header">
                    User Information
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Username: {{ card.username }}</li>
                    <li class="list-group-item">Password: {{ card.password }}</li>
                    <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                    <li class="list-group-item">Gender: {{ card.gender }}</li>
                    <li class="list-group-item">Reason: {{ card.reason }}</li>
                </ul>
            </div>
        </div>
    </div> -->
        <div class="row mt-5" v-if="users.length">
            <DataTable :value="users">
                <Column field="username" header="Username"></Column>
                <Column field="password" header="Password"></Column>
                <Column field="isAustralian" header="Australian Resident"></Column>
                <Column field="gender" header="Gender"></Column>
                <Column field="reason" header="Reason for Joining"></Column>
            </DataTable>
        </div>
    </div>
</template>





<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const users = ref([]);
const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});

// const submittedCards = ref([]);

// const submitForm = () => {
//     validateName(true);
//     validatePassword(true);
//     validateAustralianResident();
//     validateGender(true);
//     validateReason(true);
//     if (!errors.value.username && !errors.value.password &&
//         !errors.value.isAustralian && !errors.value.gender &&
//         !errors.value.reason) {
//         submittedCards.value.push({
//             ...formData.value
//         });
//         clearForm();
//     }
// };




const submitForm = () => {
    validateName(true);
    validatePassword(true);
    validateAustralianResident();
    validateGender(true);
    validateReason(true);

    if (!errors.value.username && !errors.value.password &&
        !errors.value.isAustralian && !errors.value.gender &&
        !errors.value.reason) {
        users.value.push({
            username: formData.value.username,
            password: formData.value.password,
            isAustralian: formData.value.isAustralian,
            gender: formData.value.gender,
            reason: formData.value.reason
        });
        console.log(users.value); // Add this line to check the content of users array
        clearForm();
    }
};
const clearForm = () => {
    formData.value.username = '';
    formData.value.password = '';
    formData.value.isAustralian = false;
    formData.value.reason = '';
    formData.value.gender = '';
};

const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
})

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
}

const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
};

const validateAustralianResident = () => {
    if (formData.value.isAustralian === null || formData.value.isAustralian === undefined) {
        errors.value.isAustralian = "Please confirm if you are an Australian resident.";
    } else {
        errors.value.isAustralian = null;
    }
};

const validateGender = (blur) => {
    if (!formData.value.gender) {
        if (blur) errors.value.gender = "Please select your gender";
    } else {
        errors.value.gender = null;
    }
};

const validateReason = (blur) => {
    if (formData.value.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters long";
    } else {
        errors.value.reason = null;
    }
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
