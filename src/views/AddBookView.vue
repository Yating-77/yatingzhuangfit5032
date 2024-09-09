<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1 class="text-center">Add Book</h1>
                <form @submit.prevent="addBook">
                    <div class="form-group mb-3">
                        <label for="isbn" class="form-label">ISBN:</label>
                        <input type="text" v-model="isbn" id="isbn" class="form-control" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" v-model="name" id="name" class="form-control" required />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Add Book</button>
                </form>
            </div>
        </div>

        <!-- Load the BookList component -->
        <div class="row mt-5">
            <div class="col-md-6 offset-md-3">
                <BookList />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from './BookList.vue'; // Import the new BookList component

export default {
    setup() {
        const isbn = ref('');
        const name = ref('');

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }

                await addDoc(collection(db, 'books'), {
                    isbn: isbnNumber,
                    name: name.value,
                });

                // Clear the form fields after adding the book
                isbn.value = '';
                name.value = '';
                alert('Book added successfully!');
            } catch (error) {
                console.error('Error adding book: ', error);
            }
        };

        return {
            isbn,
            name,
            addBook,
        };
    },
    components: {
        BookList, // Register the BookList component
    },
};
</script>

<style scoped>
.container {
    margin-top: 50px;
}
</style>