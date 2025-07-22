<template>
  <div class="vh-100" style="background: linear-gradient(135deg, #1A1A2E 0%, #3A2E5C 100%);">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="card p-4" style="width: 400px; background-color: #2F2F4A; border: none; border-radius: 15px;">
        <h2 class="text-center mb-4 text-white">Donate</h2>
        <form @submit.prevent="handleSubmit">
          <input v-model="streamer" type="text" placeholder="Streamer Username" class="form-control mb-3" style="background-color: #2F2F4A; color: #FFFFFF; border: 1px solid #FFFFFF; border-radius: 10px;" />
          <input v-model="donorName" type="text" placeholder="Your Name" class="form-control mb-3" style="background-color: #2F2F4A; color: #FFFFFF; border: 1px solid #FFFFFF; border-radius: 10px;" />
          <input v-model="amount" type="number" placeholder="Amount" class="form-control mb-3" style="background-color: #2F2F4A; color: #FFFFFF; border: 1px solid #FFFFFF; border-radius: 10px;" />
          <select v-model="currency" class="form-select mb-3" style="background-color: #2F2F4A; color: #FFFFFF; border: 1px solid #FFFFFF; border-radius: 10px;">
            <option>USD</option>
            <option>EUR</option>
            <option>RUB</option>
          </select>
          <textarea v-model="message" placeholder="Message" class="form-control mb-3" style="background-color: #2F2F4A; color: #FFFFFF; border: 1px solid #FFFFFF; border-radius: 10px;"></textarea>
          <button type="submit" class="btn w-100 rounded-pill" style="background-color: #6B46C1; border-color: #6B46C1;">
            Send Donation
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// ... (остальной скрипт без изменений)
</script>