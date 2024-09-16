<template>
    <div>
        <h2>Book List (ISBN > 1000)</h2>
        <ul v-if="books.length">
            <li v-for="(book, index) in books" :key="book.id">
                <input type="text" v-model="book.name" class="form-control mb-2" />
                <button @click="updateBook(book)" class="btn btn-warning btn-sm me-2">Update</button>
                <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm">Delete</button>
            </li>
        </ul>
        <p v-else>No books found</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, where, orderBy, limit, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase/init.js';

const books = ref([]);

// Fetch books using multiple queries: where, orderBy, and limit
const fetchBooks = async () => {
    try {
        const q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000),
            orderBy('isbn', 'desc')
        );
        const querySnapshot = await getDocs(q);
        books.value = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(books.value);
    } catch (error) {
        console.error('Error fetching books: ', error);
    }
};

// Update a book in Firestore
const updateBook = async (book) => {
    try {
        const bookRef = doc(db, 'books', book.id);
        await updateDoc(bookRef, {
            name: book.name,
        });
        alert('Book updated successfully!');
        fetchBooks();
    } catch (error) {
        console.error('Error updating book: ', error);
    }
};

// Delete a book from Firestore
const deleteBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await deleteDoc(bookRef);
        alert('Book deleted successfully!');
        fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
        console.error('Error deleting book: ', error);
    }
};

onMounted(() => {
    fetchBooks();
});
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

button {
    margin-right: 10px;
}
</style>