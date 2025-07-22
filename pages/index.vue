<template>
  <div class="vh-100 d-flex align-items-center" style="background: linear-gradient(135deg, #1A1A2E 0%, #3A2E5C 100%);">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 d-flex align-items-center justify-content-center text-white">
          <div class="text-left">
            <h1 class="display-4">Capturing Moments,</h1>
            <h1 class="display-4">Creating Memories</h1>
            <img src="/money-image.jpg" alt="Donation Money" class="img-fluid mt-4" style="max-width: 300px; border-radius: 10px;">
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="card p-4 shadow-lg" style="width: 400px; background-color: #2F2F4A; border: none; border-radius: 15px;">
            <h2 class="text-center mb-4 text-white">WELCOME!</h2>
            <form @submit.prevent="handleSubmit">
              <input v-model="username" type="text" placeholder="Username" class="form-control mb-3" style="background-color: #2F2F4A; color: #FFFFFF; border: 1px solid #FFFFFF; border-radius: 10px;" />
              <input v-model="password" type="password" placeholder="Password" class="form-control mb-3" style="background-color: #2F2F4A; color: #FFFFFF; border: 1px solid #FFFFFF; border-radius: 10px;" />
              <div v-if="isRegister" class="form-check mb-3">
                <input type="checkbox" class="form-check-input" id="terms" v-model="agreeTerms" />
                <label class="form-check-label small text-white" for="terms">I agree to the Terms & Conditions</label>
              </div>
              <button type="submit" class="btn w-100 rounded-pill mb-3" style="background-color: #6B46C1; border-color: #6B46C1;">
                {{ isRegister ? 'Create account' : 'Login' }}
              </button>
            </form>
            <p class="text-center mt-3 small text-white">
              {{ isRegister ? 'Already have an account? ' : 'Don’t have an account? ' }}
              <span class="cursor-pointer fw-bold" style="color: #6B46C1;" @click="isRegister = !isRegister">
                {{ isRegister ? 'Log in' : 'Create one' }}
              </span>
            </p>
            <button class="btn w-100 rounded-pill" style="background-color: #9146FF; border-color: #9146FF; color: #FFFFFF;">
              Login with Twitch
            </button>
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
.cursor-pointer {
  cursor: pointer;
}

.fw-bold {
  font-weight: bold;
}

.btn:hover {
  background-color: #5A38A0 !important;
  border-color: #5A38A0 !important;
}

.form-control::placeholder {
  color: #A0AEC0;
}
</style>