<template>
  <div class="vh-100" style="background: linear-gradient(135deg, #1A1A2E 0%, #3A2E5C 100%);">
    <div class="container mt-5 mx-auto" style="max-width: 800px;">
      <h1 class="text-center mb-4 text-white">Your Donations</h1>
      <div v-for="don in donations" :key="don._id" class="card mb-3" style="background-color: #2F2F4A; border: none; border-radius: 15px;">
        <div class="card-body d-flex justify-content-between text-white">
          <div>
            <h5 class="card-title">{{ don.donorName }}</h5>
            <p class="card-text">{{ don.message }}</p>
          </div>
          <span class="badge" style="background-color: #6B46C1;">{{ don.amount }} {{ don.currency }}</span>
        </div>
      </div>
      <div class="text-center">
        <button @click="logout" class="btn me-2" style="background-color: #6B46C1; border-color: #6B46C1; color: #FFFFFF;">Logout</button>
        <button @click="deleteUser" class="btn" style="background-color: #6B46C1; border-color: #6B46C1; color: #FFFFFF;">Delete User (Temp)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// ... (остальной скрипт без изменений)
</script>