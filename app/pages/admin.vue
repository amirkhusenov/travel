<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'

definePageMeta({
  middleware: 'admin'
})

interface BookingRequest {
  id: number
  name: string
  email: string
  phone: string
  tour_date: string
  seat_id: number
  notes: string | null
  status: boolean
  rejected?: boolean
  country?: string
}

const bookings = ref<BookingRequest[]>([])
const isLoading = ref(true)

const fetchBookings = async () => {
  try {
    const supabase = useSupabaseClient<any>()
    const { data, error } = await supabase
      .from('booking')
      .select('*')
      .order('tour_date', { ascending: false })

    if (error) {
      throw error
    }

    bookings.value = data || []
  } catch (error) {
    console.error('Ошибка при загрузке бронирований:', error)
  } finally {
    isLoading.value = false
  }
}

const updateBookingStatus = async (id: number, approved: boolean) => {
  try {
    const supabase = useSupabaseClient<any>()
    
    if (approved) {
      const { error } = await supabase
        .from('booking')
        .update({ status: true })
        .eq('id', id)

      if (error) {
        throw error
      }

      const booking = bookings.value.find(b => b.id === id)
      if (booking) {
        booking.status = true
      }
      
      if (process.client && booking) {
        const latestBooking = localStorage.getItem('latestBooking')
        if (latestBooking) {
          try {
            const bookingData = JSON.parse(latestBooking)
            if (bookingData.seat_id === booking.seat_id && bookingData.email === booking.email) {
              bookingData.status = true
              bookingData.rejected = false
              localStorage.setItem('latestBooking', JSON.stringify(bookingData))
              console.log('Обновлен localStorage для одобренной заявки')
            }
          } catch (error) {
            console.error('Ошибка при обработке localStorage:', error)
          }
        }
      }
      
      alert('Заявка успешно одобрена!')
    } else {
      const { error: updateError } = await supabase
        .from('booking')
        .update({ status: false, rejected: true })
        .eq('id', id)

      if (updateError) {
        throw updateError
      }

      const booking = bookings.value.find(b => b.id === id)
      if (booking) {
        booking.status = false
        booking.rejected = true
      }
      
      if (process.client && booking) {
        const latestBooking = localStorage.getItem('latestBooking')
        if (latestBooking) {
          try {
            const bookingData = JSON.parse(latestBooking)
            if (bookingData.seat_id === booking.seat_id && bookingData.email === booking.email) {
              bookingData.status = false
              bookingData.rejected = true
              localStorage.setItem('latestBooking', JSON.stringify(bookingData))
              console.log('Обновлен localStorage для отклоненной заявки')
            }
          } catch (error) {
            console.error('Ошибка при обработке localStorage:', error)
          }
        }
      }
      
      alert('Заявка успешно отклонена!')
    }

    await fetchBookings()

  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error)
    alert('Произошла ошибка при обновлении статуса')
  }
}

const getStatusColor = (status: boolean, rejected?: boolean) => {
  if (rejected) return '#ef4444'
  return status ? '#10b981' : '#f59e0b'
}

const getStatusText = (status: boolean, rejected?: boolean) => {
  if (rejected) return 'Отказано'
  return status ? 'Подтверждено' : 'Ожидание'
}

const logout = () => {
  if (process.client) {
    localStorage.removeItem('adminSession')
    localStorage.removeItem('adminLoginTime')
    navigateTo('/admin-login')
  }
}


onMounted(() => {
  fetchBookings()
})
</script>

<template>
  <div class="admin-page">
    <div class="header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="title">Панель администратора</h1>
          <p class="subtitle">Управление бронированиями</p>
        </div>
        <Button 
          @click="logout"
          variant="ghost"
          class="logout-btn"
        >
          <Icon name="lucide:log-out" class="btn-icon" />
          Выйти
        </Button>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      <Icon name="lucide:loader-2" class="loading-icon" />
      <span>Загрузка...</span>
    </div>

    <div v-else-if="bookings.length === 0" class="empty-state">
      <Icon name="lucide:inbox" class="empty-icon" />
      <h3>Нет бронирований</h3>
      <p>Пока нет заявок на бронирование</p>
    </div>

    <div v-else class="bookings-list">
      <div 
        v-for="booking in bookings" 
        :key="booking.id"
        class="booking-card"
      >
        <div class="booking-header">
          <div class="booking-info">
            <h3>{{ booking.name }}</h3>
            <p>Место №{{ booking.seat_id }}</p>
            <p v-if="booking.country" class="country-info">Страна: {{ booking.country }}</p>
          </div>
          <div 
            class="status-badge"
            :style="{ backgroundColor: getStatusColor(booking.status, booking.rejected) }"
          >
            {{ getStatusText(booking.status, booking.rejected) }}
          </div>
        </div>

        <div class="booking-details">
          <div class="detail-row">
            <Icon name="lucide:mail" class="detail-icon" />
            <span>{{ booking.email }}</span>
          </div>
          <div class="detail-row">
            <Icon name="lucide:phone" class="detail-icon" />
            <span>{{ booking.phone }}</span>
          </div>
          <div class="detail-row">
            <Icon name="lucide:calendar" class="detail-icon" />
            <span>Дата тура: {{ booking.tour_date }}</span>
          </div>
          <div v-if="booking.notes" class="detail-row">
            <Icon name="lucide:message-square" class="detail-icon" />
            <span>{{ booking.notes }}</span>
          </div>
        </div>

        <div v-if="!booking.status && !booking.rejected" class="booking-actions">
          <Button 
            @click="updateBookingStatus(booking.id, true)"
            variant="default"
            class="approve-btn"
          >
            <Icon name="lucide:check" class="btn-icon" />
            Одобрить
          </Button>
          <Button 
            @click="updateBookingStatus(booking.id, false)"
            variant="ghost"
            class="reject-btn"
          >
            <Icon name="lucide:x" class="btn-icon" />
            Отклонить
          </Button>
        </div>
      </div>
    </div>

    <div class="back-link">
      <NuxtLink to="/main" class="back-btn">
        <Icon name="lucide:arrow-left" class="back-icon" />
        Вернуться на главную
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 40px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .header-text {
    text-align: left;

    .title {
      font-size: 36px;
      font-weight: 700;
      color: #000;
      margin: 0 0 10px 0;
    }

    .subtitle {
      color: #666;
      font-size: 18px;
      margin: 0;
    }
  }

  .logout-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }

    .btn-icon {
      width: 16px;
      height: 16px;
    }
  }
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 15px;

  .loading-icon {
    width: 40px;
    height: 40px;
    color: #4a90e2;
    animation: spin 1s linear infinite;
  }

  span {
    color: #666;
    font-size: 16px;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;

  .empty-icon {
    width: 60px;
    height: 60px;
    color: #ccc;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 24px;
    color: #333;
    margin: 0 0 10px 0;
  }

  p {
    color: #666;
    font-size: 16px;
    margin: 0;
  }
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.booking-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  .booking-info {
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #000;
      margin: 0 0 5px 0;
    }

    p {
      color: #666;
      font-size: 14px;
      margin: 0;
    }

    .country-info {
      color: #4a90e2;
      font-weight: 600;
      font-size: 13px;
      margin-top: 4px;
    }
  }

  .status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #374151;

  .detail-icon {
    width: 16px;
    height: 16px;
    color: #6b7280;
  }
}

.booking-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;

  .approve-btn {
    background: #10b981;
    color: white;
    border: none;

    &:hover {
      background: #059669;
    }
  }

  .reject-btn {
    background: #ef4444;
    color: white;
    border: none;

    &:hover {
      background: #dc2626;
    }
  }

  .btn-icon {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
}

.back-link {
  margin-top: 40px;
  text-align: center;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f3f4f6;
  color: #374151;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }

  .back-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 768px) {
  .admin-page {
    padding: 15px;
  }

  .header {
    .header-content {
      flex-direction: column;
      text-align: center;
    }

    .header-text {
      text-align: center;
    }

    .title {
      font-size: 28px;
    }
  }

  .booking-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .booking-actions {
    flex-direction: column;
  }
}
</style>
