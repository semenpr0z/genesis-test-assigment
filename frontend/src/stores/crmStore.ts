import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api/api.js'

interface Parameter {
    id: number;
    name: string;
    entity_type: string;
}

export const useCrmStore = defineStore('crmStore', () => {
    const parameters = ref<Parameter[]>([]);
    const selectedParameter = ref<string | null>('Не выбрано');
    const isLoading = ref(false);

    const addParameter = (parameter: Parameter): void => {
        parameters.value.push(parameter);
    };

    const createResource = async (resource: 'leads' | 'contacts' | 'companies'): Promise<void> => {
        isLoading.value = true;
        try {
            const response = await api.post(`/${resource}`);
            const data: Parameter = response.data;
            addParameter(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        parameters,
        selectedParameter,
        isLoading,
        addParameter,
        createLead: () => createResource('leads'),
        createContact: () => createResource('contacts'),
        createCompany: () => createResource('companies')
    };
});
