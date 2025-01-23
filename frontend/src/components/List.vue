<script setup lang="ts">
import { User, Briefcase, DollarSign } from 'lucide-vue-next';

interface Parameter {
  id: number;
  name: string;
  entity_type: string;
}

const props = defineProps<{
  parameters: Parameter[];
}>();

const entityIcons: Record<string, typeof User | typeof Briefcase | typeof DollarSign | null> = {
  contacts: User,  // Иконка для контактов
  leads: DollarSign,  // Иконка для сделок
  companies: Briefcase,  // Иконка для компаний
};

const getIconByEntityType = (entityType: string) => {
  return entityIcons[entityType] || null;
};
</script>

<template>
  <div class="parameter-list">
    <h2 class="title">Список результатов</h2>
    <TransitionGroup
        v-if="parameters.length > 0"
        name="list"
        tag="ul"
        class="list"
    >
      <li v-for="parameter in parameters" :key="parameter.id" class="list-item">
        <div class="parameter-name-wrapper">
          <component
              :is="getIconByEntityType(parameter.entity_type)"
              class="entity-icon" :stroke="'#1a75ff'"
              :stroke-width="2"
              :width="24"
              :height="24"
          />
          <span class="parameter-name">
            {{ parameter.name || 'Название не указано' }}
          </span>
        </div>
        <span class="parameter-id">(ID: {{ parameter.id }})</span>
      </li>
    </TransitionGroup>
    <p v-else class="empty-message">Список пуст.</p>
  </div>
</template>

<style scoped>
.parameter-list {
  width: 100%;
  min-width: 200px;
  max-width: 100%;
  box-sizing: border-box;
}

.title {
  color: #1a75ff;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 600;
  border-bottom: 2px solid #e6f0ff;
  padding-bottom: 10px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 2px solid #e6f0ff;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e6f0ff;
  transition: all 0.3s ease;
  position: relative;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background-color: #f5f9ff;
}

.parameter-name-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.parameter-name {
  color: #2c3e50;
  font-weight: 500;
  margin-right: 12px;
}

.parameter-id {
  color: #4d94ff;
  font-size: 0.9em;
  flex-shrink: 0;
}

.empty-message {
  text-align: center;
  color: #6c757d;
  padding: 20px;
  background-color: #f5f9ff;
  border: 2px solid #e6f0ff;
  border-radius: 6px;
  margin: 0;
}

/* Анимации для TransitionGroup */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Анимация движения элементов при изменении порядка */
.list-move {
  transition: transform 0.5s ease;
}

/* Обеспечиваем плавное исчезновение элемента, не нарушая поток */
.list-leave-active {
  position: absolute;
  width: 100%;
  left: 0;
}

@media screen and (max-width: 480px) {
  .title {
    font-size: 1.25rem;
    margin-bottom: 15px;
  }

  .list-item {
    padding: 10px 12px;
    flex-direction: column;
    align-items: flex-start;
  }

  .parameter-name {
    margin-bottom: 4px;
  }

  .parameter-id {
    color: #6c757d;
  }
}
</style>
