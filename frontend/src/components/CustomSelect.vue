<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps<{
  modelValue: string | null;
  options: string[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void;
}>();

const selected = ref<string | null>(props.modelValue || null);
const open = ref(false);

const selectOption = (option: string) => {
  if (selected.value === option) {
    return;
  }
  emit('update:modelValue', option);
  open.value = false;
};

watch(
    () => props.modelValue,
    (newValue) => {
      selected.value = newValue;
    }
);


</script>

<template>
  <div class="custom-select" tabindex="0" @blur="open = false">
    <div class="selected" :class="{ open }" @click="open = !open">
      <span class="selected-text">{{ selected || 'Выберите значение' }}</span>
      <span class="arrow" :class="{ up: open }">▼</span>
    </div>

    <div class="items" :class="{ 'select-hide': !open }">
      <div
          v-for="(option, index) in options"
          :key="index"
          class="item"
          :class="{ active: option === selected }"
          :disabled="option === selected"
          @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  display: block;
  width: 100%;
  min-width: 200px;
  max-width: 100%;
}

.selected {
  cursor: pointer;
  padding: 12px 16px;
  border: 2px solid #e6f0ff;
  border-radius: 6px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}

.selected:hover {
  border-color: #4d94ff;
  background-color: #f5f9ff;
}

.selected.open {
  border-color: #1a75ff;
  box-shadow: 0 0 0 3px rgba(26, 117, 255, 0.1);
}

.selected-text {
  color: #2c3e50;
  flex-grow: 1;
  margin-right: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selected .arrow {
  font-size: 12px;
  color: #4d94ff;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.selected .arrow.up {
  transform: rotate(180deg);
}

.items {
  position: absolute;
  z-index: 1000;
  background: white;
  border: 2px solid #e6f0ff;
  border-radius: 6px;
  margin-top: 8px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 6px 12px rgba(26, 117, 255, 0.1);
  transition: all 0.3s ease;
}

.items::-webkit-scrollbar {
  width: 8px;
}

.items::-webkit-scrollbar-track {
  background: #f5f9ff;
  border-radius: 4px;
}

.items::-webkit-scrollbar-thumb {
  background: #4d94ff;
  border-radius: 4px;
}

.items.select-hide {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}

.item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #2c3e50;
}

.item:hover {
  background-color: #f5f9ff;
  color: #1a75ff;
}

.item.active {
  background-color: #e6f0ff;
  color: #4d94ff;
  cursor: not-allowed;
}

.item.active:hover {
  background-color: #e6f0ff;
}

@media screen and (max-width: 480px) {
  .selected {
    padding: 10px 12px;
  }

  .item {
    padding: 10px 12px;
  }
}
</style>

