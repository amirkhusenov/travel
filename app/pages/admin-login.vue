<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

const login = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!login.value || !password.value) {
    error.value = 'Пожалуйста, заполните все поля'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    if (login.value === 'admin' && password.value === 'password') {
      if (process.client) {
        localStorage.setItem('adminSession', 'true')
        localStorage.setItem('adminLoginTime', Date.now().toString())
      }
      
      await navigateTo('/admin')
    } else {
      error.value = 'Неверный логин или пароль'
    }
  } catch (err) {
    error.value = 'Произошла ошибка при входе'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (process.client) {
    const adminSession = localStorage.getItem('adminSession')
    if (adminSession === 'true') {
      navigateTo('/admin')
    }
  }
})
</script>

<template>
  <div class="admin-login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="title">Вход в админ панель</h1>
        <p class="subtitle">Введите данные для доступа к панели управления</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="login" class="form-label">Логин</label>
          <input
            id="login"
            v-model="login"
            type="text"
            class="form-input"
            placeholder="Введите логин"
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            placeholder="Введите пароль"
            :disabled="isLoading"
          />
        </div>

        <div v-if="error" class="error-message">
          <Icon name="lucide:alert-circle" class="error-icon" />
          {{ error }}
        </div>

        <Button
          type="submit"
          :disabled="isLoading"
          class="login-btn"
        >
          <Icon v-if="isLoading" name="lucide:loader-2" class="btn-icon loading" />
          <Icon v-else name="lucide:log-in" class="btn-icon" />
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </Button>
      </form>

      <div class="back-link">
        <NuxtLink to="/" class="back-btn">
          <Icon name="lucide:arrow-left" class="back-icon" />
          Вернуться на главную
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
 .admin-login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;

  .title {
    font-size: 28px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 10px 0;
  }

  .subtitle {
    color: #6b7280;
    font-size: 16px;
    margin: 0;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #000;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;

  .error-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #5a67d8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .btn-icon {
    width: 18px;
    height: 18px;

    &.loading {
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.back-link {
  margin-top: 10px;
  text-align: center;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 0;
  width: 100%;
  background: #f3f4f6;
  color: #6b7280;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #374151;
  }

  .back-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .admin-login-page {
    padding: 15px;
  }

  .login-container {
    padding: 30px 20px;
  }

  .login-header .title {
    font-size: 24px;
  }
}
</style>
