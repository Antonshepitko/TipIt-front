<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-gradient">
    <div class="card p-4 shadow-lg mx-auto" style="width: 400px;">
      <h2 class="text-center mb-4">{{ isRegister ? 'Register' : 'Login' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="username" type="text" placeholder="Username" class="form-control mb-3" />
        <input v-model="password" type="password" placeholder="Password" class="form-control mb-3" />
        <button type="submit" class="btn btn-primary w-100">{{ isRegister ? 'Register' : 'Login' }}</button>
      </form>
      <p class="text-center mt-3">
        {{ isRegister ? 'Already have account?' : 'No account?' }}
        <a href="#" @click.prevent="isRegister = !isRegister">{{ isRegister ? 'Login' : 'Register' }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isRegister = ref(false);
const username = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = async () => {
  const endpoint = isRegister.value ? '/api/register' : '/api/login';
  const res = await fetch(`http://45.144.52.58:5000${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    router.push('/dashboard');
  } else {
    alert(data.error || 'Error');
  }
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(to right, #3b82f6, #9333ea);
}
</style>