<template>
  <div class="vh-100 d-flex align-items-center" style="background: linear-gradient(135deg, #4b0082 0%, #6a1b9a 50%, #7b1fa2 100%);">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 d-flex align-items-center justify-content-center text-white">
          <div class="text-left">
            <h1 class="display-4">Capturing Moments,</h1>
            <h1 class="display-4">Creating Memories</h1>
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="card p-4 shadow-lg bg-dark text-white rounded-3" style="width: 400px; border: none;">
            <h2 class="text-center mb-4">{{ isRegister ? 'Create an account' : 'Login' }}</h2>
            <p class="text-center mb-4 small">{{ isRegister ? 'Already have an account? Log in' : 'New here? Create an account' }}</p>
            <form @submit.prevent="handleSubmit">
              <input v-model="username" type="text" placeholder="Username" class="form-control mb-3 bg-dark text-white border-0 placeholder-gray-500" />
              <input v-model="password" type="password" placeholder="Password" class="form-control mb-3 bg-dark text-white border-0 placeholder-gray-500" />
              <div v-if="isRegister" class="form-check mb-3">
                <input type="checkbox" class="form-check-input" id="terms" v-model="agreeTerms" />
                <label class="form-check-label small" for="terms">I agree to the Terms & Conditions</label>
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded-pill">{{ isRegister ? 'Create account' : 'Login' }}</button>
            </form>
            <p class="text-center mt-3 small cursor-pointer text-primary" @click="isRegister = !isRegister">
              {{ isRegister ? 'Already have an account? Log in' : 'Create an account' }}
            </p>
            <div class="d-flex justify-content-between mt-4">
              <button class="btn btn-outline-light w-100 me-2 rounded-pill">Google</button>
              <button class="btn btn-outline-light w-100 rounded-pill">Apple</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isRegister = ref(false);
const username = ref('');
const password = ref('');
const agreeTerms = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  if (isRegister.value && !agreeTerms.value) {
    alert('Please agree to the Terms & Conditions');
    return;
  }
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
.card {
  background-color: #1e1e2f;
}

.placeholder-gray-500::placeholder {
  color: #6c757d;
}

.btn-primary {
  background-color: #7b1fa2;
  border-color: #7b1fa2;
}

.text-primary {
  color: #7b1fa2 !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>