<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

interface Tour {
  id: number
  city: string
  price: number
  country: string
  image: string
}

const route = useRoute()
const tour = ref<Tour | null>(null)

const goToBooking = () => {
  if (tour.value) {
    navigateTo(`/booking/${tour.value.id}?country=${encodeURIComponent(tour.value.country)}&city=${encodeURIComponent(tour.value.city)}&price=${tour.value.price}&image=${encodeURIComponent(tour.value.image)}&id=${tour.value.id}`)
  }
}

const goBack = () => {
  navigateTo('/main')
}

onMounted(() => {
  const country = route.query.country as string
  const city = route.query.city as string
  const price = route.query.price as string
  const image = route.query.image as string
  const id = route.query.id as string

  if (country && city && price && image && id) {
    tour.value = {
      id: parseInt(id),
      city: decodeURIComponent(city),
      price: parseInt(price),
      country: decodeURIComponent(country),
      image: decodeURIComponent(image)
    }
  }
})
</script>

<template>
  <div class="tour-info-page">
    <div class="container">
      <div class="navigation">
        <Button variant="ghost" @click="goBack" class="back-btn">
          <Icon name="lucide:arrow-left" class="back-icon" />
          Назад
        </Button>
      </div>

      <div v-if="tour" class="tour-details">
        <div class="tour-image-section">
          <img :src="tour.image" :alt="tour.city" class="tour-image" />
        </div>

        <div class="tour-content">
          <div class="tour-header">
            <h1 class="tour-title">{{ tour.city }}</h1>
            <div class="tour-price">${{ tour.price }}</div>
          </div>

          <div class="tour-description">
            <h2>Информация о туре</h2>
            <div class="info-grid">
              <div class="info-item">
                <Icon name="lucide:map-pin" class="info-icon" />
                <div class="info-content">
                  <span class="info-label">Страна</span>
                  <span class="info-value">{{ tour.country }}</span>
                </div>
              </div>
              
              <div class="info-item">
                <Icon name="lucide:clock" class="info-icon" />
                <div class="info-content">
                  <span class="info-label">Продолжительность</span>
                  <span class="info-value">7 дней / 6 ночей</span>
                </div>
              </div>
              
              <div class="info-item">
                <Icon name="lucide:users" class="info-icon" />
                <div class="info-content">
                  <span class="info-label">Тип тура</span>
                  <span class="info-value">Групповой тур</span>
                </div>
              </div>
            </div>

            <div class="tour-features">
              <h3>Что включено:</h3>
              <ul class="features-list">
                <li><Icon name="lucide:check" class="check-icon" /> Авиаперелет туда и обратно</li>
                <li><Icon name="lucide:check" class="check-icon" /> Проживание в отеле 4*</li>
                <li><Icon name="lucide:check" class="check-icon" /> Завтраки в отеле</li>
                <li><Icon name="lucide:check" class="check-icon" /> Экскурсионная программа</li>
                <li><Icon name="lucide:check" class="check-icon" /> Трансферы аэропорт-отель-аэропорт</li>
                <li><Icon name="lucide:check" class="check-icon" /> Медицинская страховка</li>
              </ul>
            </div>
          </div>

          <div class="booking-section">
            <Button 
              @click="goToBooking" 
              variant="default" 
              class="book-btn"
            >
              <Icon name="lucide:plane" class="book-icon" />
              Забронировать место
            </Button>
          </div>
        </div>
      </div>

      <div v-else class="error-message">
        <Icon name="lucide:alert-circle" class="error-icon" />
        <h2>Тур не найден</h2>
        <p>Информация о туре недоступна. Вернитесь к выбору туров.</p>
        <Button @click="goBack" variant="default" class="back-to-tours-btn">
          Вернуться к турам
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tour-info-page {
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.navigation {
  margin-bottom: 30px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #333333;
  }

  .back-icon {
    width: 16px;
    height: 16px;
  }
}

.tour-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.tour-image-section {
  .tour-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid #000000;
  }
}

.tour-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.tour-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #000000;
}

.tour-title {
  font-size: 36px;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.tour-price {
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  background: #f5f5f5;
  padding: 10px 20px;
  border-radius: 8px;
  border: 2px solid #000000;
}

.tour-description {
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    margin: 0 0 20px 0;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin: 0 0 15px 0;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f8f8f8;
  border: 1px solid #000000;
  border-radius: 8px;

  .info-icon {
    width: 20px;
    height: 20px;
    color: #000000;
    flex-shrink: 0;
  }

  .info-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .info-label {
    font-size: 12px;
    color: #666666;
    font-weight: 500;
  }

  .info-value {
    font-size: 16px;
    color: #000000;
    font-weight: 600;
  }
}

.tour-features {
  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      color: #000000;

      .check-icon {
        width: 18px;
        height: 18px;
        color: #000000;
        flex-shrink: 0;
      }
    }
  }
}

.booking-section {
  padding-top: 20px;
  border-top: 2px solid #000000;
}

.book-btn {
  width: 100%;
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #333333;
    transform: translateY(-2px);
  }

  .book-icon {
    width: 20px;
    height: 20px;
  }
}

.error-message {
  text-align: center;
  padding: 60px 20px;
  max-width: 500px;
  margin: 0 auto;

  .error-icon {
    width: 60px;
    height: 60px;
    color: #000000;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #000000;
    margin: 0 0 15px 0;
  }

  p {
    font-size: 16px;
    color: #666666;
    margin: 0 0 30px 0;
  }

  .back-to-tours-btn {
    background: #000000;
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #333333;
    }
  }
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .tour-details {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .tour-title {
    font-size: 28px;
  }

  .tour-price {
    font-size: 24px;
    padding: 8px 16px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .tour-image {
    height: 250px;
  }

  .tour-header {
    align-items: center;
    gap: 15px;
  }
}
</style>
