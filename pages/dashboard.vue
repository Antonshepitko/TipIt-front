<template>
  <div class="container mt-5 mx-auto" style="max-width: 800px;">
    <h1 class="text-center mb-4">Your Donations</h1>
    <div v-for="don in donations" :key="don._id" class="card mb-3 shadow">
      <div class="card-body d-flex justify-content-between">
        <div>
          <h5 class="card-title">{{ don.donorName }}</h5>
          <p class="card-text">{{ don.message }}</p>
        </div>
        <span class="badge bg-success">{{ don.amount }} {{ don.currency }}</span>
      </div>
    </div>
    <div class="text-center">
      <button @click="logout" class="btn btn-danger me-2">Logout</button>
      <button @click="deleteUser" class="btn btn-warning">Delete User (Temp)</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';

const socket = io('http://45.144.52.58:5000');
const donations = ref([]);
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) return router.push('/');
  const res = await fetch('http://45.144.52.58:5000/api/donations', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    localStorage.removeItem('token');
    router.push('/');
  } else {
    donations.value = await res.json();
  }

  socket.on('newDonation', (newDon) => {
    donations.value = [newDon, ...donations.value];
  });
});

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};

const deleteUser = async () => {
  const username = prompt('Enter username to delete:');
  if (!username) return;
  const res = await fetch(`http://45.144.52.58:5000/api/user/${username}`, { method: 'DELETE' });
  const data = await res.json();
  alert(data.message || data.error);
  localStorage.removeItem('token');
  router.push('/');
};
</script>