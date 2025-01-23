<script setup lang="ts">
import CustomSelect from './components/CustomSelect.vue';
import Button from './components/Button.vue';
import List from './components/List.vue';
import {useCrmStore} from './stores/crmStore';
import {storeToRefs} from 'pinia';

const crmStore = useCrmStore();
const {parameters, selectedParameter, isLoading} = storeToRefs(crmStore);

// Маппинг сущностей на методы хранилища
const entityActions: Record<string, () => Promise<void>> = {
  Сделка: crmStore.createLead,
  Контакт: crmStore.createContact,
  Компания: crmStore.createCompany,
};

const handleCreate = async () => {
  if (selectedParameter.value && selectedParameter.value !== 'Не выбрано') {
    crmStore.isLoading = true;
    try {
      await entityActions[selectedParameter.value](); // Вызов метода по маппингу
      selectedParameter.value = 'Не выбрано'; // Сброс выбора
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      crmStore.isLoading = false;
    }
  }
};
</script>

<template>
  <main class="main">
    <div class="content-wrapper">
      <header class="page-header">
        <h1 class="page-title">amoCRM</h1>
        <p class="page-description">Тестовое задание к вакансии Full stack JS-developer (Генезис)</p>
      </header>

      <div class="control-panel">
        <div class="select-wrapper">
          <label class="control-label">Тип сущности</label>
          <CustomSelect
              v-model="selectedParameter"
              :options="['Не выбрано', 'Сделка', 'Контакт', 'Компания']"
          />
        </div>
        <div class="button-wrapper">
          <label class="control-label">Действие</label>
          <Button
              label="Создать"
              loadingText="Создание"
              :loading="isLoading"
              :disabled="selectedParameter == 'Не выбрано'"
              @click="handleCreate"
          />
        </div>
      </div>

      <div class="list-section">
        <List :parameters="parameters"/>
      </div>
    </div>
  </main>
</template>


<style scoped>
.main {
  min-height: 100vh;
  background-color: #f8faff;
  padding: 40px 20px;
  box-sizing: border-box;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  color: #1a75ff;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-description {
  color: #6c757d;
  font-size: 16px;
  margin: 0;
}

.control-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(26, 117, 255, 0.08);
  border: 1px solid #e6f0ff;
  animation: fade-in 0.3s ease-out;
}

.control-label {
  display: block;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.select-wrapper,
.button-wrapper {
  display: flex;
  flex-direction: column;
}

.list-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(26, 117, 255, 0.08);
  border: 1px solid #e6f0ff;
  animation: slide-up 0.4s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media screen and (max-width: 768px) {
  .main {
    padding: 24px 16px;
  }

  .content-wrapper {
    gap: 24px;
  }

  .page-title {
    font-size: 24px;
  }

  .control-panel {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }

  .list-section {
    padding: 16px;
  }
}
</style>
