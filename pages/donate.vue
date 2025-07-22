<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-gradient-green">
    <div class="card p-4 shadow-lg mx-auto" style="width: 400px;">
      <h2 class="text-center mb-4">Donate</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="streamer" type="text" placeholder="Streamer Username" class="form-control mb-3" />
        <input v-model="donorName" type="text" placeholder="Your Name" class="form-control mb-3" />
        <input v-model="amount" type="number" placeholder="Amount" class="form-control mb-3" />
        <select v-model="currency" class="form-select mb-3">
          <option>USD</option>
          <option>EUR</option>
          <option>RUB</option>
        </select>
        <textarea v-model="message" placeholder="Message" class="form-control mb-3"></textarea>
        <button type="submit" class="btn btn-success w-100">Send Donation</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const streamer = ref('');
const donorName = ref('');
const amount = ref('');
const currency = ref('USD');
const message = ref('');  // Добавили определение для message

const handleSubmit = async () => {
  const res = await fetch('http://45.144.52.58:5000/api/donate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ streamer: streamer.value, donorName: donorName.value, amount: parseFloat(amount.value), currency: currency.value, message: message.value }),
  });
  const data = await res.json();
  if (res.status === 201) {
    alert('Donation sent!');
    streamer.value = '';
    donorName.value = '';
    amount.value = '';
    currency.value = 'USD';
    message.value = '';
  } else {
    alert(data.error || 'Error');
  }
};
</script>

<style scoped>
.bg-gradient-green {
  background: linear-gradient(to right, #34d399, #3b82f6);
}
</style>