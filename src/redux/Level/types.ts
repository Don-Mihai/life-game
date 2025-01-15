import { TreeNode } from 'primereact/treenode';

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
  skillId: string; // Идентификатор навыка
}

interface NodeTreeData {
  id: string;
  parentId: string;
  image: string;
  name: string;
  description: string;
}

export interface TreeNodeI extends TreeNode {
  data: NodeTreeData;
}

interface LevelState {
  levelsTree: TreeNodeI;
}

export const initialState: LevelState = { levelsTree: { children: [], data: {} as NodeTreeData } as TreeNodeI };

export interface UpdateNodePositionPayload {
  levelId: string;
  newParentId: string;
  oldParentId: string;
}
