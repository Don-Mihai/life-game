import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const autoFitColumns = (data, worksheet) => {
  const columnWidths = Object.keys(data[0]).map((key) => {
    const maxContentWidth = Math.max(
      ...data.map((row) => (row[key] ? row[key].toString().length : 0)), // Длина данных
      key.length // Длина заголовка
    );
    return { wch: maxContentWidth + 2 }; // Дополнительно +2 для отступов
  });

  worksheet['!cols'] = columnWidths;
};

export const exportToExcel = (skills) => {
  const fullDescriptions = [];
  const currentStatistics = [];

  skills.forEach((skill) => {
    let currentLevelIndex = -1;

    skill.levels.forEach((level, index) => {
      if (level.completed) {
        currentLevelIndex = index;
      }
    });

    skill.levels.forEach((level, index) => {
      fullDescriptions.push({
        Skill: index === 0 ? skill.name : '',
        Level: index + 1,
        Description: level.description,
        Task: level.task,
        Resources: level.resources,
        Completed: level.completed ? 'Yes' : 'No'
      });
    });

    if (currentLevelIndex >= 0) {
      const currentLevel = skill.levels[currentLevelIndex];
      currentStatistics.push({
        Skill: skill.name,
        CurrentLevel: currentLevelIndex + 1,
        Description: currentLevel.description
      });
    }
  });

  const workbook = XLSX.utils.book_new();

  // Полное описание
  const fullDescriptionsSheet = XLSX.utils.json_to_sheet(fullDescriptions);
  autoFitColumns(fullDescriptions, fullDescriptionsSheet);
  XLSX.utils.book_append_sheet(workbook, fullDescriptionsSheet, 'Full Descriptions');

  // Текущая статистика
  const currentStatisticsSheet = XLSX.utils.json_to_sheet(currentStatistics);
  autoFitColumns(currentStatistics, currentStatisticsSheet);
  XLSX.utils.book_append_sheet(workbook, currentStatisticsSheet, 'Current Statistics');

  // Сохранение файла
  XLSX.writeFile(workbook, 'skills.xlsx');
};

pdfMake.vfs = pdfFonts.vfs; // Подключение стандартных шрифтов

export const exportToPDF = (skills) => {
  const content = [];

  skills.forEach((skill) => {
    // Добавляем название навыка
    content.push({ text: skill.name, style: 'header' });

    // Добавляем уровни навыка
    skill.levels.forEach((level, index) => {
      content.push({
        text: `  Уровень ${index + 1}: ${level.description}`,
        style: 'subheader'
      });
      content.push({ text: `    Задача: ${level.task}`, margin: [20, 0, 0, 5] });
      content.push({
        text: `    Ресурсы: ${level.resources}`,
        margin: [20, 0, 0, 5]
      });
      content.push({
        text: `    Завершено: ${level.completed ? 'Да' : 'Нет'}`,
        margin: [20, 0, 0, 10]
      });
    });
  });

  // Определение стилей документа
  const docDefinition = {
    content,
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 10]
      },
      subheader: {
        fontSize: 12,
        bold: false,
        margin: [0, 5, 0, 5]
      }
    },
    defaultStyle: {
      font: 'Roboto' // Встроенный шрифт с поддержкой кириллицы
    }
  };

  // Создание и сохранение PDF
  pdfMake.createPdf(docDefinition).download('skills.pdf');
};

export const exportToTXT = (skills) => {
  let content = '';

  skills.forEach((skill) => {
    // Добавляем название навыка
    content += `${skill.name}\n`;

    // Добавляем уровни
    skill.levels.forEach((level, index) => {
      content += `  Level ${index + 1}:\n`;
      content += `    Description: ${level.description}\n`;
      content += `    Task: ${level.task}\n`;
      content += `    Resources: ${level.resources}\n`;
      content += `    Completed: ${level.completed ? 'Yes' : 'No'}\n\n`;
    });

    content += '\n'; // Пробел между навыками
  });

  // Создаем и скачиваем файл
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'skills.txt';
  link.click();
};
