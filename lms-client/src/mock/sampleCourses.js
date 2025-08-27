export const sampleCourses = [
  {
    id: 'c1',
    title: 'React Basics',
    subtitle: 'Learn the fundamentals of React',
    description: 'JSX, components, props, state, hooks, and routing.',
    imageUrl: '/images/react1.jpg',
    duration: '8 hours',
    level: 'Beginner',
    category: 'Web Development',
    lessons: [
      { id: 'l1', title: 'Intro to React', videoUrl: '/videos/videoplayback.mp4' }, // correct path if inside public/videos
      { id: 'l2', title: 'Components & Props', videoUrl: '/videos/props.mp4' }
    ]
  },
  {
    id: 'c2',
    title: 'Node & Express',
    subtitle: 'APIs with Node.js',
    description: 'Build REST APIs and connect to databases using Node.js and Express.',
    imageUrl: '/images/Nodejs.jpg',
    duration: '10 hours',
    level: 'Intermediate',
    category: 'Backend',
    lessons: [
      { id: 'l1', title: 'Node Introduction', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'c3',
    title: 'Introduction to Artificial Intelligence',
    subtitle: 'The basics of AI and its applications',
    description: 'Understand AI concepts like search, reasoning, and intelligent agents.',
    imageUrl: '/images/ai.jpeg',
    duration: '12 hours',
    level: 'Beginner',
    category: 'AI',
    lessons: [
      { id: 'l1', title: 'What is AI?', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l2', title: 'AI in the Real World', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'c4',
    title: 'Machine Learning with Python',
    subtitle: 'Supervised and unsupervised learning',
    description: 'Train models with scikit-learn, perform regression, classification, and clustering.',
    imageUrl: '/images/MLwithPython.png',
    duration: '15 hours',
    level: 'Intermediate',
    category: 'AI',
    lessons: [
      { id: 'l1', title: 'Intro to ML', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l2', title: 'Linear Regression', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'c5',
    title: 'Deep Learning with TensorFlow',
    subtitle: 'Neural networks and deep learning',
    description: 'Build and train deep learning models using TensorFlow and Keras.',
    imageUrl: '/images/deeplearning.jpeg',
    duration: '20 hours',
    level: 'Advanced',
    category: 'AI',
    lessons: [
      { id: 'l1', title: 'Neural Networks Basics', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l2', title: 'Convolutional Neural Networks', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'c6',
    title: 'Natural Language Processing',
    subtitle: 'Text and language AI',
    description: 'Process and analyze text using NLP techniques like tokenization and sentiment analysis.',
    imageUrl: '/images/nlp.png',
    duration: '18 hours',
    level: 'Intermediate',
    category: 'AI',
    lessons: [
      { id: 'l1', title: 'Intro to NLP', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l2', title: 'Text Classification', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  }
];
