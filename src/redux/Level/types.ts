import { OrganizationChartNodeData } from 'primereact/organizationchart';

// Интерфейс для уровня навыка
export interface Level {
  id: string; // Уникальный идентификатор уровня
  name: string; // Название уровня
  description?: string; // Описание уровня в формате JSON
  icon?: string; // Иконка для уровня
  completed: boolean; // Завершён ли уровень
  parentId?: string | null; // Родительский уровень (id)
  children: string[]; // Дочерние уровни (id)
  createdAt?: string; // Временная метка создания
  updatedAt?: string; // Временная метка обновления
}

interface LevelState {
  levelsTree: OrganizationChartNodeData;
}

export const initialState: LevelState = { levelsTree: { children: [] } as OrganizationChartNodeData };
