export type Tool = string | string[]

export type ShowcaseMeta = {
  name: string;
  description: string;
  path: string;
  thumbnailType: "image" | "video"
  thumbnailName: string;
  links?: {
    name: string,
    url: string,
  }[],
  details?: {
    firstHalf: string;
    secondHalf: string;
  }
  role?: string;
  collaborators?: string[];
  duration?: {
    start: Date;
    end: Date;
  };
  tools?: Tool[];
  caseStudy?: boolean;
}

export const showcases: Record<string, ShowcaseMeta> = {
  "f1-tyre-strategy-optimizer": {
    name: "Formula 1 tyre strategy optimizer",
    description: "Project",
    path: "/assets/showcase/f1-tyre-strategy-optimizer",
    thumbnailType: "image",
    thumbnailName: "image.webp",
    links: [
      {
        name: "Github",
        url: "https://github.com/SonicRay241/F1-Tyre-Strategy-Optimizer"
      }
    ],
    details: {
      firstHalf: "This project presents a Formula 1 tyre strategy optimizer developed using Pyomo, a Python-based optimization framework. The system formulates race strategy planning as a Mixed-Integer Linear Programming (MILP) problem to minimize total race time. It optimizes tyre compound selection, stint lengths, and pit stop decisions while adhering to Formula 1 sporting regulations.",
      secondHalf: "Race data is collected from the OpenF1 API, including lap times, tyre compounds, and degradation patterns. The model incorporates key constraints such as mandatory compound usage, tyre availability, stint limits, and pit stop time penalties. By solving the MILP model, the optimizer produces an optimal race strategy detailing tyre usage per stint, number of pit stops, and estimated total race time, demonstrating the effectiveness of mathematical optimization for motorsport strategy analysis."
    },
    tools: [
      "Pyomo",
      "Sklearn",
      ["OpenF1 API", "https://openf1.org"],
    ],
    collaborators: [
      "Andreas Immanuel Lukito",
      "Malvin Ferdinand Tanzil"
    ],
    caseStudy: true
  },
  "telkom-intern": {
    name: "Telkom vocational high school",
    description: "Full stack intern",
    path: "/assets/showcase/telkom-intern",
    thumbnailType: "image",
    thumbnailName: "image.jpg",
    role: "Full Stack Intern",
    details: {
      firstHalf: "During the internship at Telkom Vocational High School Makassar, my team and I developed a School Visitor Tracking System using Laravel, MySQL, and Bootstrap to help school administrators efficiently manage visitor activity.",
      secondHalf: "The application allows staff to record visitor check-ins and check-outs, along with the purpose of their visit, providing a clear overview of daily visitor flow."
    },
    tools: [
      "Bootstrap",
      "Laravel",
      "MySQL",
    ],
    collaborators: [
      "Ali Akbar (Head of IT)",
      "Software Development Team"
    ],
    duration: {
      start: new Date("2022-01-01"),
      end: new Date("2022-03-01")
    }
  },
  "movie-recommendation-model": {
    name: "Movie recommendation system",
    description: "Project",
    path: "/assets/showcase/movie-recommendation-model",
    thumbnailType: "image",
    thumbnailName: "image.jpg",
    links: [
      {
        name: "Github",
        url: "https://github.com/SonicRay241/md-aol"
      }
    ],
    details: {
      firstHalf: "This project demonstrates a content-based recommendation system that suggests similar items using cosine similarity.",
      secondHalf: "The system is deployed with FastAPI as a backend API and Streamlit as a user-friendly frontend interface."
    },
    tools: [
      "FastAPI",
      "Sklearn",
      "Streamlit",
    ]
  },
  "obesity-classifier": {
    name: "Obesity classifier",
    description: "Project",
    path: "/assets/showcase/obesity-prediction",
    thumbnailType: "image",
    thumbnailName: "image.jpg",
    links: [
      {
        name: "Github",
        url: "https://github.com/SonicRay241/md-project"
      }
    ],
    details: {
      firstHalf: "This project demonstrates a complete machine learning pipeline for predicting obesity levels using user-provided health metrics.",
      secondHalf: "The model is deployed using FastAPI as a backend API and Streamlit as a user-friendly frontend interface."
    },
    tools: [
      "FastAPI",
      "Sklearn",
      "Streamlit",
      "XGBoost",
    ]
  },
  "manna-kofie": {
    name: "Manna Kofie",
    description: "Project",
    path: "/assets/showcase/manna-kofie",
    thumbnailType: "image",
    thumbnailName: "image.jpg",
    details: {
      firstHalf: "I developed a coffee shop web application that enables customers to order coffee online and receive real-time notifications when their order is ready, powered by Convex DB for live data synchronization.",
      secondHalf: "The platform includes an admin dashboard where staff can manage ingredient stocks. Ingredient availability is directly tied to product availability—if an ingredient runs out, the user's interface automatically updates in real time to mark the corresponding coffee items as sold out."
    },
    tools: [
      "Convex",
      "NextJS",
    ],
    collaborators: [
      "Andreas Immanuel Lukito (CEO)"
    ]
  },
  "realtime-pricing-pipeline": {
    name: "Realtime pricing pipeline",
    description: "Project",
    path: "/assets/showcase/realtime-pricing-pipeline",
    thumbnailType: "video",
    thumbnailName: "video.mp4",
    links: [
      {
        name: "Github",
        url: "https://github.com/SonicRay241/project-omega"
      }
    ],
    details: {
      firstHalf: "This project demonstrates a real-time data pipeline that calculates product prices based on stock and demand of each product.",
      secondHalf: "The system integrates Flask for AI model deployment, RabbitMQ-Stream for real-time message streaming, and ElysiaJS as the backend consumer and server."
    },
    collaborators: [
      "Andreas Immanuel Lukito"
    ],
    tools: [
      "ElysiaJS",
      "Flask",
      "RabbitMQ Stream",
      "Websocket",
    ]
  },
  "air-quality-lstm": {
    name: "Air quality LSTM",
    description: "Project",
    path: "/assets/showcase/air-quality-lstm",
    thumbnailType: "image",
    thumbnailName: "image.jpg",
    links: [
      {
        name: "Github",
        url: "https://github.com/SonicRay241/time-series-air-quality-prediction"
      }
    ],
    details: {
      firstHalf: "This project demonstrates a deep learning model for predicting air temperature based on historical air quality and environmental data.",
      secondHalf: "The model is built with PyTorch using an LSTM (Long Short-Term Memory) architecture and visualized with Matplotlib."
    },
    tools: [
      "PyTorch",
      "Sklearn",
    ]
  },
  "hotel-booking-prediction": {
    name: "Hotel booking confirmation predictor",
    description: "Project",
    path: "/assets/showcase/hotel-booking-prediction",
    thumbnailType: "image",
    thumbnailName: "image.jpg",
    links: [
      {
        name: "Github",
        url: "https://github.com/SonicRay241/streamlit-booking-prediction"
      }
    ],
    details: {
      firstHalf: "This project demonstrates a machine learning model that predicts whether a hotel booking will be confirmed or canceled.",
      secondHalf: "The model is trained using XGBoost and deployed with Streamlit as a simple, interactive web application."
    },
    tools: [
      "FastAPI",
      "Sklearn",
      "Streamlit",
      "XGBoost",
    ]
  },
}
