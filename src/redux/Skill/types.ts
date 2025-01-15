import { Level } from '../Level/types';

export interface SkillTag {
  title: string;
}

// Интерфейс для навыка
export interface Skill {
  id: string; // Уникальный идентификатор навыка
  name: string; // Название навыка
  userId: string; // Идентификатор пользователя
  rootLevel?: string; // Корневой уровень навыка (id)
  tags?: Record<string, any>[]; // Массив тегов
  order: number; // Порядок навыка
  levels?: Level[]; // Массив уровней навыка
  createdAt?: string; // Временная метка создания
  updatedAt?: string; // Временная метка обновления
}

export const SKILL_LEVELS_JSON_SCHEMA = {
  name: 'skill_levels_schema',
  schema: {
    type: 'object',
    properties: {
      levels: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            completed: { type: 'boolean', default: false },
            description: {
              type: 'string',
              description: 'Editor.js JSON string including task, description, and resources'
            }
          },
          required: ['completed', 'description']
        }
      }
    },
    required: ['levels']
  }
};
export interface SkillState {
  skills: Skill[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}
export const initialState: SkillState = { skills: [], status: 'idle', error: null };
