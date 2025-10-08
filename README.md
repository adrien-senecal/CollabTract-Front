# CollabTract FrontEnd

**Smart Door-to-Door and Flyering Route Planner**

CollabTract is a modern web application designed to help optimize door-to-door distribution routes and flyering campaigns. Built with Next.js and TypeScript, it provides an intuitive interface for planning and managing distribution routes efficiently.

## 🚀 Features

- **Route Planning**: Optimize door-to-door distribution routes
- **Flyering Campaigns**: Plan and manage flyering campaigns
- **Interactive Maps**: Visual route planning with interactive maps
- **City Search**: Advanced city search functionality
- **Real-time Analytics**: Track campaign performance with charts and metrics
- **Responsive Design**: Mobile-first design for field workers
- **Dark/Light Mode**: Theme switching for better user experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts
- **Maps**: JSVectorMap
- **Package Manager**: pnpm
- **Deployment**: Docker support

## 📋 Prerequisites

- Node.js 18+
- pnpm 10.18.1+
- Docker (optional)

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/adrien-senecal/CollabTract-Front.git
cd nextjs-admin-dashboard-main
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup

1. Build the Docker image:

```bash
docker build -t collabtract-frontend .
```

2. Run the container:

```bash
docker run -p 3000:3000 collabtract-frontend
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Charts/         # Chart components
│   ├── CitySearch/     # City search functionality
│   ├── FormElements/   # Form components
│   ├── Layouts/        # Layout components
│   └── Tables/         # Table components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🌟 Key Components

- **Route Planning**: Interactive route optimization
- **City Search**: Advanced location search with autocomplete
- **Analytics Dashboard**: Performance metrics and charts
- **Campaign Management**: Plan and track flyering campaigns

## 🔧 Configuration

The application supports various configuration options:

- **API Configuration**: Set in `src/config/api.ts`
- **Theme Configuration**: Dark/light mode support
- **Map Configuration**: Customizable map settings

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**CollabTract** - Optimizing distribution routes, one campaign at a time.
