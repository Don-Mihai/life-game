interface Level {
  completed: boolean;
  description: string;
  icon?: string;
}

export interface SkillTag {
  title: string;
}

// Интерфейс для навыка
export interface SkillI {
  id: string; // Используем id вместо _id для фронтенда
  name: string;
  userId: string; // Предполагаем, что userId будет строкой на фронтенде
  levels: Level[];
  tags: SkillTag[];
  order: number;
  createdAt: string; // Даты будут строками в формате ISO
  updatedAt: string; // Даты будут строками в формате ISO
}
