<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

interface Seat {
  id: number
  isOccupied: boolean
  isSelected: boolean
}

interface BookingForm {
  name: string
  seat_id: number | null
  email: string
  phone: string
  tour_date: string
  notes: string
  country: string
}

interface BookingData {
  name: string
  seat_id: number | null
  email: string
  phone: string
  tour_date: string
  notes: string | null
  status: boolean
  rejected?: boolean
  country: string
}

interface Tour {
  id: number
  city: string
  price: number
  country: string
  image: string
}

const route = useRoute()
const tourId = route.params.tourId as string
const tour = ref<Tour | null>(null)

const selectedSeat = ref<number | null>(null)
const showBookingForm = ref(false)
const isSubmitting = ref(false)
const bookingSuccess = ref(false)

const form = ref<BookingForm>({
  name: '',
  seat_id: null,
  email: '',
  phone: '',
  tour_date: '',
  notes: '',
  country: ''
})

const getStorageKey = (key: string) => `tour_${tourId}_${key}`

const seats = ref<Seat[]>([
  { id: 1, isOccupied: false, isSelected: false },
  { id: 2, isOccupied: false, isSelected: false },
  { id: 3, isOccupied: false, isSelected: false },
  { id: 4, isOccupied: false, isSelected: false },
  { id: 5, isOccupied: false, isSelected: false },
  { id: 6, isOccupied: false, isSelected: false },
  { id: 7, isOccupied: false, isSelected: false },
  { id: 8, isOccupied: false, isSelected: false },
  
  { id: 9, isOccupied: false, isSelected: false },
  { id: 10, isOccupied: false, isSelected: false },
  { id: 11, isOccupied: false, isSelected: false },
  { id: 12, isOccupied: false, isSelected: false },
  { id: 13, isOccupied: false, isSelected: false },
  { id: 14, isOccupied: false, isSelected: false },
  { id: 15, isOccupied: false, isSelected: false },
  { id: 16, isOccupied: false, isSelected: false },
  
  { id: 17, isOccupied: false, isSelected: false },
  { id: 18, isOccupied: false, isSelected: false },
  { id: 19, isOccupied: false, isSelected: false },
  { id: 20, isOccupied: false, isSelected: false },
  { id: 21, isOccupied: false, isSelected: false },
  { id: 22, isOccupied: false, isSelected: false },
  { id: 23, isOccupied: false, isSelected: false },
  { id: 24, isOccupied: false, isSelected: false },
  { id: 25, isOccupied: false, isSelected: false },
  { id: 26, isOccupied: false, isSelected: false },
  { id: 27, isOccupied: false, isSelected: false },
  { id: 28, isOccupied: false, isSelected: false },
  { id: 29, isOccupied: false, isSelected: false },
  { id: 30, isOccupied: false, isSelected: false },
  { id: 31, isOccupied: false, isSelected: false },
  { id: 32, isOccupied: false, isSelected: false },

  { id: 33, isOccupied: false, isSelected: false },
  { id: 34, isOccupied: false, isSelected: false },
  { id: 35, isOccupied: false, isSelected: false },
  { id: 36, isOccupied: false, isSelected: false },
  { id: 37, isOccupied: false, isSelected: false },
  { id: 38, isOccupied: false, isSelected: false },
  { id: 39, isOccupied: false, isSelected: false },
  { id: 40, isOccupied: false, isSelected: false },
  { id: 41, isOccupied: false, isSelected: false },
  { id: 42, isOccupied: false, isSelected: false },
  { id: 43, isOccupied: false, isSelected: false },
  { id: 44, isOccupied: false, isSelected: false },
  { id: 45, isOccupied: false, isSelected: false },
  { id: 46, isOccupied: false, isSelected: false },
  { id: 47, isOccupied: false, isSelected: false },
  { id: 48, isOccupied: false, isSelected: false },

])

const selectSeat = (seatId: number) => {
  const seat = seats.value.find(s => s.id === seatId)
  if (seat && !seat.isOccupied) {
    if (selectedSeat.value) {
      const prevSeat = seats.value.find(s => s.id === selectedSeat.value)
      if (prevSeat) prevSeat.isSelected = false
    }
    
    seat.isSelected = true
    selectedSeat.value = seatId
  }
}

const continueBooking = () => {
  if (selectedSeat.value) {
    showBookingForm.value = true
  } else {
    alert('Пожалуйста, выберите место')
  }
}

const submitBooking = async () => {
  if (!form.value.name || !form.value.email || !form.value.phone || !form.value.tour_date || !form.value.country) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }

  isSubmitting.value = true

  try {
    const supabase = useSupabaseClient<any>()
    
    const bookingData: BookingData = {
      name: form.value.name,
      seat_id: selectedSeat.value || 0,
      email: form.value.email,
      phone: form.value.phone,
      tour_date: form.value.tour_date,
      notes: form.value.notes || null,
      status: false,
      rejected: false,
      country: form.value.country
    }
    
    console.log('Отправляемые данные:', bookingData)
    
    const { data, error } = await supabase
      .from('booking')
      .insert([ bookingData ])      
      .select()

    if (error) {
      throw error
    }

    const seat = seats.value.find(s => s.id === selectedSeat.value)
    if (seat) {
      seat.isOccupied = true
      seat.isSelected = false
    }

    localStorage.setItem(getStorageKey('seats'), JSON.stringify(seats.value))

    bookingSuccess.value = true
    showBookingForm.value = false
    
      if (data && data.length > 0 && data[0]) {
        const bookingInfo = {
          name: form.value.name,
          seat_id: selectedSeat.value,
          email: form.value.email,
          phone: form.value.phone,
          tour_date: form.value.tour_date,
          notes: form.value.notes,
          status: false,
          rejected: false,
          country: form.value.country
        }
        
        localStorage.setItem('latestBooking', JSON.stringify(bookingInfo))
      }
    
    form.value = {
      name: '',
      seat_id: null,
      email: '',
      phone: '',
      tour_date: '',
      notes: '',
      country: ''
    }
    
    selectedSeat.value = null

  } catch (error) {
    console.error('Ошибка при бронировании:', error)
    alert('Произошла ошибка при бронировании. Попробуйте еще раз.')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  showBookingForm.value = false
  bookingSuccess.value = false
}

const goToMain = () => {
  navigateTo('/main')
}

const loadTourData = () => {
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
    
    form.value.country = decodeURIComponent(country)
  }
}

const loadSeatsState = () => {
  if (process.client) {
    const savedSeats = localStorage.getItem(getStorageKey('seats'))
    if (savedSeats) {
      try {
        seats.value = JSON.parse(savedSeats)
      } catch (error) {
        console.error('Ошибка при загрузке состояния мест:', error)
      }
    }
  }
}

onMounted(() => {
  loadTourData()
  loadSeatsState()
})
</script>

<template>
  <div class="booking-page">
    <div v-if="bookingSuccess" class="success-message">
      <div class="success-content">
        <Icon name="lucide:check-circle" class="success-icon" />
        <h2>Заявка отправлена!</h2>
        <p>Ваша заявка на бронирование отправлена на рассмотрение. Ожидайте подтверждения от администратора.</p>
        <Button @click="goToMain" variant="default" class="back-btn">
          Вернуться к выбору туров
        </Button>
      </div>
    </div>

    <div v-else-if="showBookingForm" class="booking-form-container">
      <div class="form-header">
        <h2>Заполните данные для бронирования</h2>
        <p>Место №{{ selectedSeat }} - BOEING 737-800</p>
        <p v-if="tour">Тур: {{ tour.city }}, {{ tour.country }}</p>
      </div>

      <form @submit.prevent="submitBooking" class="booking-form">
        <div class="form-group">
          <label for="name">Имя *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Введите ваше имя"
          />
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Введите ваш email"
          />
        </div>

        <div class="form-group">
          <label for="phone">Телефон *</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            placeholder="Введите ваш телефон"
          />
        </div>

        <div class="form-group">
          <label for="tour_date">Дата тура *</label>
          <input
            id="tour_date"
            v-model="form.tour_date"
            type="date"
            required
          />
        </div>

        <div class="form-group">
          <label for="country">Страна тура *</label>
          <input
            id="country"
            v-model="form.country"
            type="text"
            required
            placeholder="Введите страну тура"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="notes">Комментарии (опционально)</label>
          <textarea
            id="notes"
            v-model="form.notes"
            placeholder="Дополнительные пожелания или комментарии"
            rows="3"
          ></textarea>
        </div>

        <div class="form-actions">
          <Button 
            type="button" 
            variant="ghost" 
            @click="goBack"
            class="cancel-btn"
          >
            Отмена
          </Button>
          <Button 
            type="submit" 
            variant="default"
            :disabled="isSubmitting"
            class="submit-btn"
          >
            {{ isSubmitting ? 'Бронируем...' : 'Забронировать' }}
          </Button>
        </div>
      </form>
    </div>

    <div v-else>
      <div class="header">
        <h1 class="title">Выберите место на схеме самолета</h1>
        <div class="aircraft-info">
          <span class="aircraft-model">Самолет: BOEING 737-800</span>
          <Icon name="lucide:info" class="info-icon" />
        </div>
        <div v-if="tour" class="tour-info">
          <span class="tour-details">Тур: {{ tour.city }}, {{ tour.country }} - ${{ tour.price }}</span>
        </div>
      </div>

      <div class="legend">
        <div class="legend-item">
          <div class="seat-indicator free"></div>
          <span>свободное</span>
        </div>
        <div class="legend-item">
          <div class="seat-indicator occupied"></div>
          <span>занятое</span>
        </div>
        <div class="legend-item">
          <div class="seat-indicator selected"></div>
          <span>выбранное</span>
        </div>
      </div>

      <div class="aircraft-layout">
        <div class="aircraft-container">
          <div class="seat-section left">
            <div 
              v-for="seat in seats.slice(0, 16)" 
              :key="seat.id"
              class="seat"
              :class="{
                'occupied': seat.isOccupied,
                'selected': seat.isSelected
              }"
              @click="selectSeat(seat.id)"
            >
              {{ seat.id }}
            </div>
          </div>

          <div class="aisle"></div>

          <div class="seat-section center">
            <div 
              v-for="seat in seats.slice(16, 32)" 
              :key="seat.id"
              class="seat"
              :class="{
                'occupied': seat.isOccupied,
                'selected': seat.isSelected
              }"
              @click="selectSeat(seat.id)"
            >
              {{ seat.id }}
            </div>
          </div>

          <div class="aisle"></div>

          <div class="seat-section right">
            <div 
              v-for="seat in seats.slice(32, 48)" 
              :key="seat.id"
              class="seat"
              :class="{
                'occupied': seat.isOccupied,
                'selected': seat.isSelected
              }"
              @click="selectSeat(seat.id)"
            >
              {{ seat.id }}
            </div>
          </div>
        </div>

        <div class="front-indicator">
          <Icon name="lucide:plane" class="plane-icon" />
        </div>
      </div>
      <div class="continue-btn-container">
      <Button @click="goToMain" variant="ghost" class="continue-btn-link">Вернуться назад</Button>      
      <Button 
        class="continue-btn" variant="default"
        @click="continueBooking"
      >
        Продолжить
      </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.booking-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  color: #000000;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin: 0 0 10px 0;
}

.aircraft-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #000000;
  font-size: 16px;
  margin-bottom: 10px;
}

.tour-info {
  margin-bottom: 10px;
  
  .tour-details {
    color: #000000;
    font-size: 16px;
    font-weight: 600;
  }
}

.info-icon {
  width: 16px;
  height: 16px;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000000;
  font-size: 14px;
}

.seat-indicator {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;

  &.free {
    background-color: #ffffff;
    border-color: #000000;
  }

  &.occupied {
    background-color: #000000;
    border-color: #000000;
  }

  &.selected {
    background-color: #333333;
    border-color: #000000;
  }
}

.aircraft-layout {
  position: relative;
  margin-bottom: 40px;
}

.aircraft-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 20px;
  padding: 30px;
  position: relative;
}

.seat-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  &.center {
    grid-template-columns: repeat(2, 1fr);
  }
}

.aisle {
  width: 30px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin: 0 10px;
}

.seat {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #ffffff;
  border: 2px solid #000000;
  color: #000000;

  &:hover:not(.occupied) {
    background-color: #f0f0f0;
    transform: scale(1.05);
  }

  &.occupied {
    background-color: #000000;
    border-color: #000000;
    color: #ffffff;
    cursor: not-allowed;
  }

  &.selected {
    background-color: #333333;
    border-color: #000000;
    color: #ffffff;
    transform: scale(1.1);
  }
}

.front-indicator {
  position: absolute;
  top: 10px;
  right: 20px;
  width: 30px;
  height: 30px;
  background-color: #000000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plane-icon {
  width: 16px;
  height: 16px;
  color: white;
  transform: rotate(-90deg);
}
.continue-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.continue-btn-link {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
  display: block;
  background-color: #666666;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    background-color: #555555;
  }

  &:active {
    transform: translateY(0);
  }
}
.continue-btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}


.booking-form-container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  color: #000000;
  border: 2px solid #000000;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #000;
    margin: 0 0 10px 0;
  }

  p {
    color: #666;
    font-size: 16px;
    margin: 0 0 5px 0;
  }
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    color: #333;
    font-size: 14px;
  }

  input, textarea {
    padding: 12px 16px;
    border: 2px solid #000000;
    border-radius: 10px;
    font-size: 16px;
    transition: border-color 0.2s ease;
    background: #ffffff;

    &:focus {
      outline: none;
      border-color: #333333;
      background: #ffffff;
    }

    &::placeholder {
      color: #666666;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;

  .cancel-btn {
    flex: 1;
    background: #ffffff;
    color: #000000;
    border: 2px solid #000000;

    &:hover {
      background: #f0f0f0;
    }
  }

  .submit-btn {
    flex: 2;
    background: #000000;
    color: #ffffff;

    &:hover:not(:disabled) {
      background: #333333;
    }

    &:disabled {
      background: #666666;
      cursor: not-allowed;
    }
  }
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.success-content {
  text-align: center;
  max-width: 500px;
  padding: 40px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .success-icon {
    width: 60px;
    height: 60px;
    color: #000000;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #000;
    margin: 0 0 15px 0;
  }

  p {
    color: #666666;
    font-size: 16px;
    margin: 0 0 30px 0;
  }

  .back-btn {
    background: #000000;
    color: #ffffff;
    padding: 12px 30px;
    border-radius: 10px;
    font-weight: 600;

    &:hover {
      background: #333333;
    }
  }
}

@media (max-width: 768px) {
  .booking-page {
    padding: 15px;
  }

  .title {
    font-size: 24px;
  }

  .aircraft-container {
    padding: 20px;
    gap: 15px;
  }

  .seat {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }

  .aisle {
    width: 20px;
    margin: 0 5px;
  }

  .legend {
    gap: 20px;
  }

  .booking-form-container {
    padding: 20px;
  }

  .form-header h2 {
    font-size: 24px;
  }

  .form-actions {
    flex-direction: column;
  }
  .front-indicator {
    display: none;
  }
}
</style>
