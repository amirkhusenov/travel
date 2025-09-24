<script setup lang="ts">
interface Tour {
  id: number
  city: string
  price: number
  country: string
  image: string
}

interface Props {
  tour: Tour
}

defineProps<Props>()
</script>

<template>
  <div class="tour-card">
    <div class="card-header">
      <span class="date">22<span>.04</span></span>
      <NuxtLink to="./booking">
          <button class="arrow-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
      </NuxtLink>                            
    </div>
    
    <div class="tour-image">
      <img :src="tour.image" :alt="tour.city" />
    </div>
    
    <div class="tour-info">
      <span class="city">{{ tour.city }}</span>
      <span class="price">${{ tour.price }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tour-card {
  padding: 20px;
  border: 1px solid #E5E1E0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 14px;
  color: #000;
  font-weight: 600;
  span {
    color: #a0aec0;
    font-weight: 400;
  };
}

.arrow-btn {
  width: 32px;
  height: 32px;
  background-color: #000;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #a0aec0;
  }
}

.tour-image {
  margin: 50px;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
}

.tour-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.price {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
@media (max-width: 1200px) {
  .tour-image {
    margin: 20px;
  }
}
@media (max-width: 756px) {
  .tour-image {
    margin: 15px 5px;
  }
}
</style>