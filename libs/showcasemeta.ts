export type ShowcaseMeta = {
  name: string;
  description: string;
  path: string;
  thumbnailType: "image" | "video"
  thumbnailName: string;
}


export const showcases: ShowcaseMeta[] = [
  {
    name: "Movie recommendation system",
    description: "Project",
    path: "/assets/showcase/movie-recommendation-model",
    thumbnailType: "image",
    thumbnailName: "image.jpg"
  },
  {
    name: "Full Stack Intern",
    description: "Telkom Vocational High School",
    path: "/assets/showcase/telkom-intern",
    thumbnailType: "image",
    thumbnailName: "image.jpg"
  },
  {
    name: "Obesity classifier",
    description: "Project",
    path: "/assets/showcase/obesity-prediction",
    thumbnailType: "image",
    thumbnailName: "image.jpg"
  },
  {
    name: "Hotel booking predictor",
    description: "Project",
    path: "/assets/showcase/hotel-booking-prediction",
    thumbnailType: "image",
    thumbnailName: "image.jpg"
  },
  {
    name: "Realtime Pricing Pipeline",
    description: "Project",
    path: "/assets/showcase/realtime-pricing-pipeline",
    thumbnailType: "video",
    thumbnailName: "video.mp4"
  },
  {
    name: "Manna Kofie",
    description: "Project",
    path: "/assets/showcase/manna-kofie",
    thumbnailType: "image",
    thumbnailName: "image.jpg"
  },
  {
    name: "Air Quality LSTM",
    description: "Project",
    path: "/assets/showcase/air-quality-lstm",
    thumbnailType: "image",
    thumbnailName: "image.jpg"
  },
]