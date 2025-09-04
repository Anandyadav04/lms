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
      { 
        id: 'l1', 
        title: 'Intro to React', 
        videoUrl: '/videos/reactintro.mp4',
        transcript: `“Hi, in this video I’ll introduce you to React and cover the core concepts every React developer should learn. These concepts are chosen because they’re useful for building real-world apps and are often asked in interviews.

So, what is React? It’s a JavaScript library for building user interfaces, used by companies like Facebook and Netflix. It makes building UIs faster and easier.

With React, we often build single page applications. Unlike traditional websites that load a new page for every request, SPAs use one template and just update components inside the DOM.

The main building blocks are components—independent, reusable pieces of UI. Components can be class-based or functional, but today functional components with hooks are most common.

React uses JSX, which looks like HTML but allows embedding JavaScript directly inside curly braces. JSX is compiled into regular JS/HTML before it runs in the browser.

For navigation, we use React Router. It keeps the UI in sync with the URL so we can have multiple “pages” in our SPA.

Data flows through props, which are like parameters passed from parent to child components. But too much passing down is called prop drilling, and there are better solutions for global state.

We also have state, which holds data for a component. Updating state re-renders the component. In functional components, we use useState.

Every component has a lifecycle: mounting, updating, and unmounting. Class components use lifecycle methods, while functional components use the useEffect hook.

Hooks are functions that let us use state and lifecycle in functional components. The most common are useState and useEffect, but React also lets us build custom hooks.

For larger apps, we need state management. Instead of passing props everywhere, we can use the Context API or tools like Redux to handle global state.

Behind the scenes, React uses a virtual DOM, which updates only the parts of the UI that change, instead of re-rendering the entire DOM.

When rendering lists, always provide a unique key prop so React can track items efficiently.

Event handling in React is similar to JavaScript, but with camelCase syntax. We don’t use addEventListener; instead, we attach functions directly.

For forms, React keeps inputs controlled by state using handlers like onChange and onSubmit.

Sometimes we need conditional rendering, for example showing a username only if a user is logged in. This can be done with logical operators or ternaries.

Finally, there are three main commands to know:

npx create-react-app to create a new project,

npm start to run the dev server,

npm run build for a production build.

Those are the core React concepts you should master.`
      },
      { 
        id: 'l2', 
        title: 'Components & Props', 
        videoUrl: '/videos/props.mp4',
        transcript: `[00:00:00] Understanding Components
In this lesson, we'll dive deeper into React components and learn how to use props to pass data between them.

[00:02:30] Functional vs Class Components
React offers two main ways to create components: functional components and class components. We'll focus on functional components with hooks.

[00:05:45] Using Props
Props (short for properties) allow you to pass data from parent components to child components. They are read-only and help make your components reusable.`
      }
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
      { 
        id: 'l1', 
        title: 'Node Introduction', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] Introduction to Node.js
Welcome to Node.js! In this lesson, we'll explore what Node.js is and why it's become so popular for server-side development.

[00:02:15] JavaScript on the Server
Node.js allows us to run JavaScript on the server side, using the same language we use for client-side development.

[00:05:30] The Event Loop
One of Node.js's key features is its non-blocking, event-driven architecture. We'll explore how the event loop works.`
      }
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
      { 
        id: 'l1', 
        title: 'What is AI?', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] Defining Artificial Intelligence
Welcome to the world of AI! In this first lesson, we'll explore what artificial intelligence really means and its various forms.

[00:03:20] History of AI
Let's take a brief journey through the history of AI, from its beginnings in the 1950s to the modern deep learning revolution.

[00:07:45] Types of AI
We'll discuss the different types of AI: narrow AI, general AI, and superintelligent AI, and where current technology stands.`
      },
      { 
        id: 'l2', 
        title: 'AI in the Real World', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] Practical AI Applications
In this lesson, we'll explore how AI is being used in various industries today, from healthcare to finance to entertainment.

[00:04:15] Case Studies
We'll look at specific case studies of successful AI implementations and the problems they solve.`
      }
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
      { 
        id: 'l1', 
        title: 'Intro to ML', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] Machine Learning Fundamentals
Welcome to Machine Learning with Python! In this first lesson, we'll cover the basic concepts and types of machine learning.

[00:03:30] Supervised vs Unsupervised Learning
We'll explore the difference between supervised learning (with labeled data) and unsupervised learning (finding patterns in unlabeled data).

[00:08:15] Python for ML
Why Python has become the language of choice for machine learning and data science.`
      },
      { 
        id: 'l2', 
        title: 'Linear Regression', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] Linear Regression Basics
In this lesson, we dive into one of the most fundamental machine learning algorithms: linear regression.

[00:04:20] Implementing in Python
We'll implement linear regression using scikit-learn and visualize our results with matplotlib.`
      }
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
      { 
        id: 'l1', 
        title: 'Neural Networks Basics', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] Introduction to Neural Networks
Welcome to deep learning! In this lesson, we'll explore the basic building blocks of neural networks.

[00:05:15] Neurons and Layers
We'll break down how artificial neurons work and how they're organized into layers to form neural networks.

[00:10:30] Activation Functions
Understanding different activation functions like sigmoid, tanh, and ReLU, and when to use each.`
      },
      { 
        id: 'l2', 
        title: 'Convolutional Neural Networks', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] CNN Architecture
In this lesson, we'll explore Convolutional Neural Networks, which are particularly powerful for image processing tasks.

[00:06:45] Convolution Layers
How convolution layers work to detect features in images, from simple edges to complex patterns.`
      }
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
      { 
        id: 'l1', 
        title: 'Intro to NLP', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] What is Natural Language Processing?
Welcome to NLP! In this lesson, we'll explore how computers can understand, interpret, and generate human language.

[00:04:30] NLP Applications
We'll look at real-world applications of NLP, including chatbots, translation, sentiment analysis, and more.`
      },
      { 
        id: 'l2', 
        title: 'Text Classification', 
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        transcript: `[00:00:00] Text Classification Techniques
In this lesson, we'll learn how to categorize text into different classes or categories.

[00:05:15] Building a Classifier
We'll build a simple text classifier using Python and scikit-learn, and evaluate its performance.`
      }
    ]
  }
];