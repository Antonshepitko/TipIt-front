<template>
  <div class="container mt-5 mx-auto" style="max-width: 800px;">
    <h1 class="text-center mb-4 text-white">Your Donations</h1>
    <div v-if="donations.length > 0" v-for="don in donations" :key="don._id" class="card mb-3 shadow">
      <div class="card-body d-flex justify-content-between text-white">
        <div>
          <h5 class="card-title">{{ don.donorName }}</h5>
          <p class="card-text">{{ don.message }}</p>
        </div>
        <span class="badge" style="background-color: #6B46C1;">{{ don.amount }} {{ don.currency }}</span>
      </div>
    </div>
    <div v-else class="text-center text-white">No donations yet.</div>
    <div class="text-center mt-4">
      <button @click="logout" class="btn me-2" style="background-color: #6B46C1; border-color: #6B46C1; color: #FFFFFF;">Logout</button>
      <button @click="deleteUser" class="btn" style="background-color: #6B46C1; border-color: #6B46C1; color: #FFFFFF;">Delete User (Temp)</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';

const donations = ref([]); // Явно определён как реактивный массив
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) return router.push('/');
  try {
    const res = await fetch('http://45.144.52.58:5000/api/donations', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      localStorage.removeItem('token');
      router.push('/');
    } else if (!res.ok) {
      console.error('Fetch error:', res.status, await res.text());
    } else {
      donations.value = await res.json();
    }
  } catch (error) {
    console.error('Network error:', error);
  }

  socket.on('newDonation', (newDon) => {
    donations.value = [newDon, ...donations.value];
  });
});

const socket = io('http://45.144.52.58:5000');

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