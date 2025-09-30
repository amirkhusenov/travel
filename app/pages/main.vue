<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

interface Tour {
  id: number
  city: string
  price: number
  country: string
  image: string
}

interface CountriesResponse {
  [key: string]: string
}

interface BookingInfo {
  name: string
  email: string
  phone: string
  tour_date: string
  seat_id: number
  notes: string
  status: boolean
  rejected?: boolean
  country?: string
}

const tours = ref<Tour[]>([])
const latestBooking = ref<BookingInfo | null>(null)

const totalTours = computed(() => tours.value.length)

const generateRandomPrice = () => {
  const prices = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700]
  return prices[Math.floor(Math.random() * prices.length)]
}

const getImage = (index: number) => {
  const images = ['/card-1.jpg', '/card-2.jpg', '/card-3.jpg']
  return images[index % images.length]
}

const fetchCountries = async () => {
  try {
    const data = await $fetch<CountriesResponse>('https://namaztimes.kz/ru/api/country')
    
    if (data && Object.keys(data).length > 0) {
      const countriesArray = Object.entries(data).slice(10, 16)
      
      const countries = countriesArray.map(([id, name], index: number) => ({
        id: index + 1,
        city: name.toUpperCase(),
        price: generateRandomPrice(),
        country: name,
        image: getImage(index)
      })).filter(
        (tour): tour is Tour =>
          typeof tour.price === 'number' &&
          typeof tour.image === 'string'
      )
      
      tours.value = countries
    }
  } catch (error) {
    console.error('Ошибка при загрузке стран:', error)
  }
}

const loadLatestBooking = () => {
  if (process.client) {
    const bookingData = localStorage.getItem('latestBooking')
    if (bookingData) {
      try {
        latestBooking.value = JSON.parse(bookingData)
      } catch (error) {
        console.error('Ошибка при парсинге данных бронирования:', error)
      }
    }
  }
}


const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusText = (status: boolean, rejected?: boolean) => {
  if (rejected) return 'Отказано'
  return status ? 'Подтверждено' : 'Ожидание подтверждения'
}

const getStatusIcon = (status: boolean, rejected?: boolean) => {
  if (rejected) return 'lucide:x-circle'
  return status ? 'lucide:check-circle' : 'lucide:clock'
}

const getStatusClass = (status: boolean, rejected?: boolean) => {
  if (rejected) return 'status-rejected'
  return status ? 'status-approved' : 'status-pending'
}

onMounted(() => {
  fetchCountries()
  loadLatestBooking()
})
</script>

<template>
  <div class="tours-page container-custom">
    <div class="navigation">
      <NuxtLink to="./">                            
            <Button variant="ghost" class="cta">
                Назад
            </Button>
      </NuxtLink>
      <NuxtLink to="/admin">                            
            <Button variant="ghost" class="admin-btn">
                Админ-панель
            </Button>
      </NuxtLink>
    </div>
    
    <div v-if="latestBooking" class="booked-tour">
      <h1 class="title">Ваше последнее бронирование</h1>
      <div class="booking-card">
        <div class="booking-header">
          <Icon name="lucide:plane" class="plane-icon" />
          <div class="booking-info">
            <h3>BOEING 737-800</h3>
            <p>Место №{{ latestBooking.seat_id }}</p>
          </div>
        </div>
        
        <div class="booking-details">
          <div class="detail-row">
            <Icon name="lucide:user" class="detail-icon" />
            <span>{{ latestBooking.name }}</span>
          </div>
          <div class="detail-row">
            <Icon name="lucide:mail" class="detail-icon" />
            <span>{{ latestBooking.email }}</span>
          </div>
          <div class="detail-row">
            <Icon name="lucide:phone" class="detail-icon" />
            <span>{{ latestBooking.phone }}</span>
          </div>
          <div class="detail-row">
            <Icon name="lucide:calendar" class="detail-icon" />
            <span>Дата тура: {{ formatDate(latestBooking.tour_date) }}</span>
          </div>
          <div v-if="latestBooking.country" class="detail-row">
            <Icon name="lucide:map-pin" class="detail-icon" />
            <span>Страна: {{ latestBooking.country }}</span>
          </div>
          <div v-if="latestBooking.notes" class="detail-row">
            <Icon name="lucide:message-square" class="detail-icon" />
            <span>{{ latestBooking.notes }}</span>
          </div>
        </div>
        
        <div class="booking-status" :class="getStatusClass(latestBooking.status, latestBooking.rejected)">
          <Icon :name="getStatusIcon(latestBooking.status, latestBooking.rejected)" class="status-icon" />
          <span>{{ getStatusText(latestBooking.status, latestBooking.rejected) }}</span>
        </div>
      </div>
    </div>
    
    <div class="header">
      <p class="title">Доступные туры<span class="count">({{ totalTours }})</span></p>
    </div>

    <div class="tours-grid">
      <Card
        v-for="tour in tours"
        :key="tour.id"
        :tour="tour"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  margin-bottom: 30px;
}

.title {
  font-size: 48px;
  font-weight: 700;
  color: #000;
  margin: 0;
  
  .count {
    font-size: 24px;
    font-weight: 400;
    color: #718096;
  }
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.tours-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.booked-tour {
  margin-bottom: 40px;
  
  .title {
    font-size: 36px;
    margin-bottom: 20px;
  }
}

.booking-card {
  background: transparent;
  padding: 30px;
  color: white;
  color: #000;
  border: 1px solid #E5E1E0;
  position: relative;
  overflow: hidden;

}

.booking-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  
  .plane-icon {
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0);
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .booking-info {
    h3 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 5px 0;
    }
    
    p {
      font-size: 16px;
      margin: 0;
      opacity: 0.9;
    }
  }
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  
  .detail-icon {
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }
}

.booking-status {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  width: fit-content;
  
  .status-icon {
    width: 20px;
    height: 20px;
  }

  &.status-pending {
    background: rgba(245, 158, 11, 0.2);
    
    .status-icon {
      color: #f59e0b;
    }
  }

  &.status-approved {
    background: rgba(16, 185, 129, 0.2);
    
    .status-icon {
      color: #10b981;
    }
  }

  &.status-rejected {
    background: rgba(239, 68, 68, 0.2);
    
    .status-icon {
      color: #ef4444;
    }
  }
}


.navigation {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.cta {
  padding: 10px 20px;
  border-radius: 10px;
  background: #000;
  color: white;
  font-weight: 500;
  text-decoration: none;
}

.admin-btn {
  padding: 10px 20px;
  border-radius: 10px;
  background: #dc2626;
  color: white;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    background: #b91c1c;
  }
}

@media (max-width: 768px) {  
  .title {
    font-size: 36px;
    
    .count {
      font-size: 20px;
    }
  }
  
  .tours-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .filters {
    gap: 8px;
  }
  
  .booked-tour .title {
    font-size: 28px;
  }
  
  .booking-card {
    padding: 20px;
  }
  
  .booking-header {
    .booking-info h3 {
      font-size: 20px;
    }
  }
  
  .detail-row {
    font-size: 14px;
  }
}
</style>