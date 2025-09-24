<script setup lang = 'ts'>
import { ref, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const username = ref('')
const confirmPassword = ref('')
const isSignup = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const supabase = useSupabaseClient()
const router = useRouter()

import Button from '~/components/ui/button/Button.vue';

const toggleForm = () => {
  isSignup.value = !isSignup.value
  email.value = ''
  password.value = ''
  username.value = ''
  confirmPassword.value = ''
  errorMessage.value = ''
}

const handleAuth = async () => {
  if (isLoading.value) return
  
  errorMessage.value = ''
  isLoading.value = true

  try {
    if (isSignup.value) {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Пароли не совпадают'
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            username: username.value
          }
        }
      })
      console.log(data)

      if (error) {
        errorMessage.value = error.message
      } else {
        await router.push('/main')
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (error) {
        errorMessage.value = error.message
      } else {
        await router.push('/main')
      }
    }
  } catch (error) {
    errorMessage.value = 'Произошла ошибка. Попробуйте еще раз.'
  } finally {
    isLoading.value = false
  }
}

const emailValidation = computed(() => {
  if (!email.value) return { isValid: true, message: '' }
  
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9.]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/
  
  if (!emailRegex.test(email.value)) {
    return { isValid: false, message: 'Некорректный формат email' }
  }
  
  return { isValid: true, message: 'Корректный email' }
})

const passwordValidation = computed(() => {
  if (!password.value) return { isValid: true, message: '', requirements: [] }
  
  const requirements = []
  
  if (password.value.length < 8) {
    requirements.push('Минимум 8 символов')
  }
  
  if (!/[A-Z]/.test(password.value)) {
    requirements.push('Заглавная буква (A-Z)')
  }
  
  if (!/[a-z]/.test(password.value)) {
    requirements.push('Строчная буква (a-z)')
  }
  
  if (!/[0-9]/.test(password.value)) {
    requirements.push('Цифра (0-9)')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password.value)) {
    requirements.push('Специальный символ (!@#$%^&*()_+-=)')
  }
  
  const isValid = requirements.length === 0
  const message = isValid ? 'Пароль соответствует требованиям' : 'Пароль не соответствует требованиям'
  
  return { isValid, message, requirements }
})

const confirmPasswordValidation = computed(() => {
  if (!confirmPassword.value) return { isValid: true, message: '' }
  
  if (confirmPassword.value !== password.value) {
    return { isValid: false, message: 'Пароли не совпадают' }
  }
  
  return { isValid: true, message: 'Пароли совпадают' }
})

definePageMeta({
  layout: "main"
})

</script>

<template>
  <div class="registration-page">
    <div class="left-column">
        <div class="image-placeholder">
          <div class="overlay-text title">
            <template v-if="!isSignup">
              МЕЧТАЕТЕ ЛИ ВЫ О ЗАЛОЖЕННЫХ СОЛНЦЕМ ПЛЯЖАХ, ШУМНЫХ ГОРОДСКИХ ПЕЙЗАЖАХ ИЛИ БЕЗМОЛВНОМ ОТДЫХЕ В ГОРАХ, ВАШЕ ПРИКЛЮЧЕНИЕ НАЧИНАЕТСЯ ЗДЕСЬ.
            </template>
            <template v-else>
              <div class="benefits-list">
                <div class="benefit-item">
                  <strong>ЭКСКЛЮЗИВНЫЕ ПРЕДЛОЖЕНИЯ:</strong><p>Будьте первыми, кто узнает о наших последних скидках и акциях.</p>
                </div>
                <div class="benefit-item">
                  <strong>ПЕРСОНАЛИЗИРОВАННЫЕ РЕКОМЕНДАЦИИ:</strong> <p>Получайте предложения о путешествиях, подобранные под ваши предпочтения.</p>
                </div>
                <div class="benefit-item">
                  <strong>БЕСПРЕПЯТСТВЕННЫЙ ОПЫТ:</strong> <p>Сохраняйте свои данные для более быстрого и удобного бронирования.</p>
                </div>
                <div class="benefit-item">
                  <strong>ПОДДЕРЖКА КЛИЕНТОВ 24/7:</strong> <p>Наслаждайтесь спокойствием с нашей командой поддержки.</p>
                </div>
              </div>
            </template>
          </div>
        </div>
    </div>


    <div class="right-column">
        <form class="form-container" @submit.prevent="handleAuth">
        <NuxtLink to="./">                            
          <Button variant="ghost" class="cta">
              Назад
          </Button>
        </NuxtLink>
        
        <template v-if="!isSignup">
          <h1 class="main-title title">ВАШ ПУТЬ К НЕЗАБЫВАЕМЫМ ПУТЕШЕСТВИЯМ</h1>
          <p class="description">
            Готовы отправиться в новое приключение? Зарегистрируйтесь прямо сейчас, и Traveling поможет вам достичь цели. Всего один клик отделяет вас от места вашей мечты!
          </p>
        </template>
        
        <template v-else>
          <h1 class="main-title title">ПРИСОЕДИНЯЙТЕСЬ К TRAVELER И ВАШЕ ПРИКЛЮЧЕНИЕ ЖДЕТ</h1>
          <p class="description">
            Готовы воплотить свои мечты о путешествиях в реальность? Присоединяйтесь к сообществу Traveler сегодня и откройте мир незабываемых впечатлений.
          </p>
        </template>

        <div class="login-form">
          <div v-if="isSignup" class="form-group">
            <label for="username">Имя</label>
            <input 
              id="username"
              v-model="username"
              type="text" 
              placeholder="Иван"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="email">Почта</label>
            <input 
              id="email"
              v-model="email"
              type="email" 
              placeholder="example@mail.ru"
              :class="['form-input', { 'error': email && !emailValidation.isValid, 'success': email && emailValidation.isValid }]"
            />
            <div v-if="email && emailValidation.message" :class="['validation-message', emailValidation.isValid ? 'success' : 'error']">
              {{ emailValidation.message }}
            </div>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
              <input 
                id="password"
                placeholder="Qwerty_123"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :class="['form-input', { 'error': password && !passwordValidation.isValid, 'success': password && passwordValidation.isValid }]"
              />
            <div v-if="password && passwordValidation.message" :class="['validation-message', passwordValidation.isValid ? 'success' : 'error']">
              {{ passwordValidation.message }}
            </div>
            <div v-if="password && passwordValidation.requirements.length > 0" class="requirements-list">
              <div class="requirements-title">Требования к паролю:</div>
              <ul>
                <li v-for="requirement in passwordValidation.requirements" :key="requirement" class="requirement-item">
                  {{ requirement }}
                </li>
              </ul>
            </div>
          </div>

          <div v-if="isSignup" class="form-group">
            <label for="confirmPassword">Подтвердите пароль</label>
              <input 
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :class="['form-input', { 'error': confirmPassword && !confirmPasswordValidation.isValid, 'success': confirmPassword && confirmPasswordValidation.isValid }]"
              />
            <div v-if="confirmPassword && confirmPasswordValidation.message" :class="['validation-message', confirmPasswordValidation.isValid ? 'success' : 'error']">
              {{ confirmPasswordValidation.message }}
            </div>
          </div>

          <div class="form-options">
            <div class="left-options">
              <button type="button" @click="toggleForm" class="create-account-link">
                <template v-if="!isSignup">
                  Впервые путешествуете? <span class="underline">Создайте аккаунт</span>
                </template>
                <template v-else>
                  Уже есть аккаунт? <span class="underline">Войти</span>
                </template>
              </button>
            </div>
          </div>

          <div v-if="isSignup" class="terms-text">
            Создавая аккаунт, вы соглашаетесь с нашими <a href="#" class="terms-link">Условиями обслуживания</a> и <a href="#" class="terms-link">Политикой конфиденциальности</a>.
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="login-button" :disabled="isLoading">
            <template v-if="!isSignup">
              {{ isLoading ? 'Вход...' : 'Войти — продолжить изучение и планирование' }}
            </template>
            <template v-else>
              {{ isLoading ? 'Регистрация...' : 'Регистрация — начать путешествие' }}
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.registration-page {
  display: flex;
  min-height: 100vh;
  color: #000;
}

.left-column {
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  background: url('~/assets/img/reg-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
}

.overlay-text {
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
  letter-spacing: 0.5px;
}

.right-column {
  flex: 1;
  background: white;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.form-container {
  width: 100%;
}

.main-title {
  font-size: 64px;
  font-weight: 800;
  margin: 0 0 16px 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 32px 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #000;
}

.form-input.error {
  border-color: #ef4444;
}

.form-input.success {
  border-color: #10b981;
}

.validation-message {
  font-size: 12px;
  margin-top: 4px;
}

.validation-message.error {
  color: #ef4444;
}

.validation-message.success {
  color: #10b981;
}

.requirements-list {
  margin-top: 8px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
}

.requirements-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.requirements-list ul {
  margin: 0;
}

.requirement-item {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 5px;
}

.password-input-wrapper {
  position: relative;
}


.form-options {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 8px 0;
}

.left-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.create-account-link {
  font-size: 14px;
  text-decoration: none;
}

.underline {
  text-decoration: underline;
  font-weight: 600;
}

.forgot-password {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
}

.login-button {
  background: #000;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background: #333;
}

.cta {
  margin-bottom: 20px;
  background: #000;
  color: white;
  font-weight: 500;
  text-decoration: none;
}

.benefits-list {
  display: flex;
  text-align: left;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  gap: 16px;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 14px;
  line-height: 1.4;
  color: #cbcbcb;
}

.benefit-item strong {
  margin-bottom: 4px;
  font-size: 18px;
  font-family: Oswald, sans-serif;
  color: #fff;
  font-weight: 600;
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.create-account-link {
  background: none;
  border: none;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.terms-text {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin: 16px 0;
}

.terms-link {
  text-decoration: underline;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  margin: 16px 0;
}

.login-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.login-button:disabled:hover {
  background: #9ca3af;
}
@media(max-width: 1000px) {
  .left-column {
    display: none;
  }
  .main-title {
    font-size: 32px;
  }
  .right-column {
    padding: 14px;
  }
}
@media(max-width: 480px) {
  .main-title {
    font-size: 24px;
  }
}
</style>