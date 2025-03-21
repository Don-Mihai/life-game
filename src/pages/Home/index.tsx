import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Секция Hero с фоновым изображением, анимированным заголовком и кнопкой
const HeroSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '80vh',
        backgroundImage: 'url("https://source.unsplash.com/random/1600x900?technology")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Затемняющий слой */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      />
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography variant="h2" align="center" color="white" gutterBottom>
            Управление навыками и статистикой
          </Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          <Typography variant="h5" align="center" color="white" gutterBottom>
            Универсальная платформа для развития и отслеживания прогресса
          </Typography>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button variant="contained" color="primary" size="large">
            Начать сейчас
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

// Данные для карточек возможностей
const features = [
  {
    title: 'Отслеживание навыков',
    description: 'Добавляйте и систематизируйте навыки по областям и уровням.',
    image: 'https://source.unsplash.com/random/300x200?skills'
  },
  {
    title: 'Материалы для обучения',
    description: 'Интеграция курсов, книг и статей для быстрого освоения.',
    image: 'https://source.unsplash.com/random/300x200?education'
  },
  {
    title: 'Рекомендации ИИ',
    description: 'Получайте персонализированные рекомендации для развития.',
    image: 'https://source.unsplash.com/random/300x200?ai'
  },
  {
    title: 'Геймификация',
    description: 'Игровой подход для мотивации и визуализации прогресса.',
    image: 'https://source.unsplash.com/random/300x200?game'
  }
];

// Секция с возможностями приложения
const FeaturesSection = () => {
  return (
    <Container sx={{ py: 8 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Ключевые возможности
        </Typography>
      </motion.div>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05 }} style={{ height: '100%' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" image={feature.image} alt={feature.title} sx={{ height: 140 }} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">{feature.description}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Секция с описанием проблем, которые решает приложение
const ProblemsSection = () => {
  const problems = [
    'Упрощение визуализации развития персонажей для авторов книг.',
    'Систематизация навыков для геймеров и людей, стремящихся к личному развитию.',
    'Контроль выполнения задач и планирование свободного времени.',
    'Быстрый выбор направлений для обучения и развития компетенций.'
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
      <Container>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Решаемые проблемы
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {problems.map((problem, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div whileHover={{ x: 10 }}>
                <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
                  <Typography variant="body1">{problem}</Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Главная страница, объединяющая все секции
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ProblemsSection />
    </div>
  );
};

export default HomePage;
