<script setup lang="ts">
import {computed} from 'vue';

// Пропсы для управления кнопкой
const props = defineProps<{
  label: string;                      // Текст кнопки
  loading?: boolean;                  // Состояние загрузки
  disabled?: boolean;                 // Состояние отключения
  type?: 'button' | 'submit' | 'reset'; // Тип кнопки
  bgColor?: string;                   // Цвет фона кнопки
  textColor?: string;                 // Цвет текста кнопки
  loadingText?: string;               // Текст при загрузке
}>();

// Эмиттер событий
const emit = defineEmits<{
  (event: 'click'): void; // Событие клика
}>();

// Вычисляемый класс кнопки
const buttonClasses = computed(() => ({
  'btn': true,
  'btn-loading': props.loading,
  'btn-disabled': props.disabled,
  'btn-hoverable': !props.disabled && !props.loading,
}));

// Инлайн-стили для кастомизации
const buttonStyles = computed(() => ({
  backgroundColor: props.bgColor || '#007bff',
  color: props.textColor || '#ffffff',
}));

// Обработчик клика
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click');
  }
};
</script>

<template>
  <button
      :class="buttonClasses"
      :style="buttonStyles"
      :disabled="props.disabled || props.loading"
      :type="props.type || 'button'"
      @click="handleClick"
  >
    <span v-if="!props.loading" class="button-content">{{ label }}</span>
    <span v-else class="spinner-container">
      <span class="spinner"></span>
      <span class="loading-text">{{ props.loadingText || 'Загрузка' }}</span>
    </span>
  </button>
</template>

<style scoped>
/* Базовый стиль кнопки */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #1a75ff;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 48px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(26, 117, 255, 0.2);
  font-family: "Open Sans", serif;
}

/* Анимация нажатия */
.btn:active {
  transform: scale(0.98);
  box-shadow: 0 1px 2px rgba(26, 117, 255, 0.2);
}

/* Состояние hover */
.btn-hoverable:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(26, 117, 255, 0.3);
  transform: translateY(-1px);
}

/* Отключенное состояние */
.btn-disabled {
  background-color: #e6f0ff !important;
  color: #4d94ff !important;
  cursor: not-allowed;
  box-shadow: none !important;
  transform: none !important;
  opacity: 0.7;
}

/* Состояние загрузки */
.btn-loading {
  cursor: progress;
  background-color: #1a75ff !important;
}

/* Контент кнопки */
.button-content {
  position: relative;
  z-index: 1;
  display: inline-block;
  transition: transform 0.2s ease;
}

/* Спиннер и контейнер */
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin-right: 10px;
}

.loading-text {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.9;
}

/* Эффект пульсации при загрузке */
.btn-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
  );
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Адаптивность */
@media screen and (max-width: 480px) {
  .btn {
    height: 44px;
    padding: 10px 20px;
    font-size: 13px;
  }

  .spinner {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  .loading-text {
    font-size: 13px;
  }
}
</style>