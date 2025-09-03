import {
  Search,
  Home,
  Users,
  Bell,
  Settings,
  Calendar,
  Database,
  LogOut,
  User,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Briefcase,
  Globe,
  FileText,
  Map,
  UserPlus,
  Rocket,
  Zap,
  Code,
  Gamepad2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "/client/dashboard.css"


// Simple Character Fade-in Animation
const AnimatedFadeText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5000); // Replay every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={className} key={key}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${key}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1, // Medium-fast pace: 100ms between characters
            ease: "easeOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
};

export default function Dashboard() {
  // Sample analytics data
  const progressData = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 68 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 78 },
    { day: "Sat", value: 92 },
    { day: "Sun", value: 89 },
  ];

  const skillData = [
    { name: "Coding", value: 35, color: "#9747FF" },
    { name: "Design", value: 25, color: "#C48DB1" },
    { name: "Writing", value: 20, color: "#FAD12A" },
    { name: "Other", value: 20, color: "#82A2CB" },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg p-4 md:p-6 lg:p-8 rounded-[60px]">
      <div className="max-w-[1440px] mx-auto min-h-[calc(100vh-2rem)] flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Sidebar */}
        <div className="flex lg:flex-col items-center gap-4 md:gap-6 pt-2 lg:pt-4 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible">
          {/* Logo Section */}
          <div className="w-16 h-16 md:w-[85px] md:h-[85px] bg-gradient-to-br from-dashboard-light-pink/80 to-dashboard-light-pink/60 hover:from-dashboard-light-pink hover:to-dashboard-light-pink/80 rounded-full flex flex-col items-center justify-center flex-shrink-0 p-2 transition-all duration-300 hover:scale-105 shadow-lg border-2 border-dashboard-light-pink/30 backdrop-blur-sm">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F31ad3fbbd9314a689a12169e6153fbb7%2F9a2cc3cf73454d2483264384b0ff4120?format=webp&width=800"
              alt="Baby Collab Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-black font-outfit font-bold text-[10px] md:text-xs text-center hidden lg:block drop-shadow-lg">
            BabyCollab
          </div>

          {/* Navigation Icons */}
          <div className="flex lg:flex-col gap-4 md:gap-6 items-center">
            {/* Home Icon Container */}
            <div className="w-16 md:w-[85px] h-32 md:h-[293px] bg-gradient-to-br from-dashboard-purple/60 to-dashboard-purple/40 hover:from-dashboard-purple/80 hover:to-dashboard-purple/60 rounded-[60px] flex flex-col items-center justify-center gap-2 md:gap-8 py-3 md:py-6 flex-shrink-0 transition-all duration-300 hover:scale-105 shadow-lg border-2 border-dashboard-purple/30 backdrop-blur-sm group">
              <div className="group/item relative p-2 md:p-4 cursor-pointer">
                <Home className="w-5 h-5 md:w-8 md:h-8 text-black group-hover/item:text-dashboard-yellow transition-all duration-300 group-hover/item:scale-125" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dashboard-yellow text-dashboard-purple text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap font-semibold shadow-lg">
                  Home
                </div>
              </div>
              <div className="group/item relative p-2 md:p-4 cursor-pointer">
                <Users className="w-5 h-5 md:w-8 md:h-8 text-black group-hover/item:text-dashboard-yellow transition-all duration-300 group-hover/item:scale-125" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dashboard-yellow text-dashboard-purple text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap font-semibold shadow-lg">
                  Social
                </div>
              </div>
              <div className="group/item relative p-2 md:p-4 cursor-pointer hidden md:block">
                <Calendar className="w-5 h-5 md:w-8 md:h-8 text-black group-hover/item:text-dashboard-yellow transition-all duration-300 group-hover/item:scale-125" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dashboard-yellow text-dashboard-purple text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap font-semibold shadow-lg">
                  Tasks
                </div>
              </div>
            </div>

            {/* Notification Icons */}
            <div className="w-16 md:w-[85px] h-20 md:h-[133px] bg-gradient-to-br from-dashboard-light-pink/60 to-dashboard-light-pink/40 hover:from-dashboard-light-pink/80 hover:to-dashboard-light-pink/60 rounded-[60px] flex flex-col items-center justify-center gap-2 md:gap-4 py-2 md:py-4 flex-shrink-0 transition-all duration-300 hover:scale-105 shadow-lg border-2 border-dashboard-light-pink/30 backdrop-blur-sm group">
              <div className="group/item relative p-2 md:p-3 cursor-pointer">
                <Database className="w-4 h-4 md:w-7 md:h-7 text-black group-hover/item:text-dashboard-yellow transition-all duration-300 group-hover/item:scale-125" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dashboard-yellow text-dashboard-purple text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap font-semibold shadow-lg">
                  Explore
                </div>
              </div>
              <div className="group/item relative p-2 md:p-3 cursor-pointer">
                <Bell className="w-4 h-4 md:w-6 md:h-7 text-black group-hover/item:text-dashboard-yellow transition-all duration-300 group-hover/item:scale-125" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dashboard-yellow text-dashboard-purple text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap font-semibold shadow-lg">
                  Notifications
                </div>
              </div>
            </div>

            {/* Settings Icons */}
            <div className="w-16 md:w-[85px] h-24 md:h-[159px] bg-gradient-to-br from-dashboard-blue/60 to-dashboard-blue/40 hover:from-dashboard-blue/80 hover:to-dashboard-blue/60 rounded-[60px] flex flex-col items-center justify-center gap-2 md:gap-4 py-2 md:py-4 flex-shrink-0 transition-all duration-300 hover:scale-105 shadow-lg border-2 border-dashboard-blue/30 backdrop-blur-sm group">
              <div className="group/item relative p-2 md:p-3 cursor-pointer">
                <LogOut className="w-4 h-4 md:w-7 md:h-7 text-black group-hover/item:text-dashboard-yellow transition-all duration-300 group-hover/item:scale-125" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dashboard-yellow text-dashboard-purple text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap font-semibold shadow-lg">
                  Exit
                </div>
              </div>
              <div className="group/item relative cursor-pointer">
                <div className="w-12 h-12 md:w-[71px] md:h-[71px] bg-gradient-to-br from-dashboard-yellow/80 to-dashboard-yellow/60 hover:from-dashboard-yellow hover:to-dashboard-yellow/80 rounded-full flex items-center justify-center transition-all duration-300 group-hover/item:scale-125 shadow-lg border-2 border-dashboard-yellow/30">
                  <User className="w-5 h-5 md:w-8 md:h-8 text-dashboard-purple group-hover/item:text-white transition-colors duration-300" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-dashboard-yellow text-dashboard-purple text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap font-semibold shadow-lg">
                  Profile
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col order-1 lg:order-2">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start justify-between mb-6 md:mb-8 gap-4 lg:gap-0">
            <div className="flex flex-col">
              <AnimatedFadeText
                text="Hi, Pranav!"
                className="text-dashboard-pink font-pixelify-sans font-bold text-2xl md:text-4xl lg:text-[42px] leading-tight md:leading-[52px] drop-shadow-lg"
              />
              <p className="text-dashboard-text-light font-pixelify-sans text-sm md:text-lg lg:text-xl font-light mt-1 md:mt-2">
                Let's take a look at what you have been up to
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-[407px] h-16 md:h-20 lg:h-[85px] bg-dashboard-light-pink rounded-[60px] flex items-center px-4 md:px-6 lg:px-8">
              <Search className="w-6 h-6 md:w-8 md:h-6 lg:w-10 lg:h-7 text-dashboard-purple mr-3 md:mr-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 bg-transparent text-black text-sm md:text-lg lg:text-xl font-outfit font-light placeholder-black focus:outline-none"
              />
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-auto lg:h-[458px]">
              {/* Analytics Dashboard */}
              <div className="flex-1 lg:w-[721px] h-48 md:h-64 lg:h-auto bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-[60px] p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                    <div className="p-1.5 bg-dashboard-purple/60 hover:bg-dashboard-purple rounded-lg transition-all duration-300 group-hover:scale-105 shadow-lg">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-dashboard-yellow transition-colors duration-300" />
                    </div>
                    <h3 className="text-black font-pixelify-sans font-bold text-sm md:text-lg group-hover:text-dashboard-yellow transition-colors duration-300 drop-shadow-lg">
                      Progress Analytics
                    </h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                    <div className="bg-gradient-to-br from-dashboard-yellow/80 to-dashboard-yellow/60 hover:from-dashboard-yellow hover:to-dashboard-yellow/80 rounded-2xl p-2 md:p-3 text-center transition-all duration-300 hover:scale-102 hover:shadow-lg cursor-pointer border border-dashboard-yellow/30 group backdrop-blur-sm">
                      <div className="text-black font-pixelify-sans font-bold text-sm md:text-lg group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                        127
                      </div>
                      <div className="text-black/90 text-[10px] md:text-xs group-hover:text-white transition-colors duration-300 font-medium">
                        Tasks Done
                      </div>
                      <div className="mt-1 text-black/80 text-[9px] md:text-xs font-semibold">
                        +12 week
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-dashboard-light-pink/80 to-dashboard-light-pink/60 hover:from-dashboard-light-pink hover:to-dashboard-light-pink/80 rounded-2xl p-2 md:p-3 text-center transition-all duration-300 hover:scale-102 hover:shadow-lg cursor-pointer border border-dashboard-light-pink/30 group backdrop-blur-sm">
                      <div className="text-black font-pixelify-sans font-bold text-sm md:text-lg group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                        89%
                      </div>
                      <div className="text-black/90 text-[10px] md:text-xs group-hover:text-white transition-colors duration-300 font-medium">
                        Goal Rate
                      </div>
                      <div className="mt-1 text-black/80 text-[9px] md:text-xs font-semibold">
                        ↑ 5% today
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-dashboard-purple/80 to-dashboard-purple/60 hover:from-dashboard-purple hover:to-dashboard-purple/80 rounded-2xl p-2 md:p-3 text-center transition-all duration-300 hover:scale-102 hover:shadow-lg cursor-pointer border border-dashboard-purple/30 group backdrop-blur-sm">
                      <div className="text-black font-pixelify-sans font-bold text-sm md:text-lg group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                        15
                      </div>
                      <div className="text-black/90 text-[10px] md:text-xs group-hover:text-white transition-colors duration-300 font-medium">
                        Streak Days
                      </div>
                      <div className="mt-1 text-black/80 text-[9px] md:text-xs font-semibold">
                        Best: 23
                      </div>
                    </div>
                  </div>

                  {/* Progress Chart and Bars */}
                  <div className="flex gap-3 md:gap-4 flex-1 min-h-0">
                    {/* Mini Chart */}
                    <div className="flex-1 bg-gradient-to-br from-dashboard-purple/40 to-dashboard-purple/20 hover:from-dashboard-purple/50 hover:to-dashboard-purple/30 rounded-xl p-2 md:p-3 transition-all duration-300 border border-dashboard-purple/30 backdrop-blur-sm shadow-lg min-w-0">
                      <div className="text-black text-xs font-semibold drop-shadow mb-2">
                        Weekly Progress
                      </div>
                      <div className="h-12 md:h-16 hover:scale-105 transition-transform duration-300">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={progressData}>
                            <defs>
                              <linearGradient
                                id="progressGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#FAD12A"
                                  stopOpacity={0.9}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#9747FF"
                                  stopOpacity={0.6}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#FAD12A"
                              strokeWidth={2}
                              fill="url(#progressGradient)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-black/80 text-[10px] mt-1 font-medium">
                        78 pts/day
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="group cursor-pointer bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-xl p-2 transition-all duration-300 border border-white/20">
                        <div className="flex justify-between text-black text-[10px] md:text-xs mb-1 group-hover:text-dashboard-yellow transition-colors duration-300">
                          <span className="font-semibold truncate">
                            Learning
                          </span>
                          <span className="font-bold">78%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2 md:h-3 shadow-inner group-hover:bg-white/40 transition-all duration-300">
                          <div
                            className="bg-gradient-to-r from-dashboard-purple via-dashboard-light-pink to-dashboard-pink h-2 md:h-3 rounded-full transition-all duration-500 group-hover:scale-y-105 group-hover:shadow-lg shadow-sm"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                        <div className="text-black/70 text-[9px] md:text-xs mt-0.5 font-medium">
                          Target: 85%
                        </div>
                      </div>

                      <div className="group cursor-pointer bg-gradient-to-r from-black/10 to-black/5 hover:from-black/20 hover:to-black/10 rounded-xl p-2 transition-all duration-300 border border-black/20">
                        <div className="flex justify-between text-black text-[10px] md:text-xs mb-1 group-hover:text-dashboard-yellow transition-colors duration-300">
                          <span className="font-semibold truncate">Social</span>
                          <span className="font-bold">92%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2 md:h-3 shadow-inner group-hover:bg-black/40 transition-all duration-300">
                          <div
                            className="bg-gradient-to-r from-dashboard-yellow via-dashboard-light-pink to-dashboard-yellow h-2 md:h-3 rounded-full transition-all duration-500 group-hover:scale-y-105 group-hover:shadow-lg shadow-sm"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                        <div className="text-black/70 text-[9px] md:text-xs mt-0.5 font-medium">
                          Excellent!
                        </div>
                      </div>

                      <div className="group cursor-pointer bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-xl p-2 transition-all duration-300 border border-white/20">
                        <div className="flex justify-between text-black text-[10px] md:text-xs mb-1 group-hover:text-dashboard-yellow transition-colors duration-300">
                          <span className="font-semibold truncate">
                            Projects
                          </span>
                          <span className="font-bold">65%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2 md:h-3 shadow-inner group-hover:bg-white/40 transition-all duration-300">
                          <div
                            className="bg-gradient-to-r from-dashboard-blue via-dashboard-purple to-dashboard-light-pink h-2 md:h-3 rounded-full transition-all duration-500 group-hover:scale-y-105 group-hover:shadow-lg shadow-sm"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="text-black/70 text-[9px] md:text-xs mt-0.5 font-medium">
                          2 left
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Explore Projects */}
              <div className="flex-1 h-48 md:h-64 lg:h-auto bg-gradient-to-br from-dashboard-purple/60 to-dashboard-purple/40 hover:from-dashboard-purple/80 hover:to-dashboard-purple/60 rounded-[60px] p-6 md:p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-dashboard-purple/30 group backdrop-blur-sm">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-dashboard-yellow/80 hover:bg-dashboard-yellow rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Rocket className="w-8 h-8 text-dashboard-purple group-hover:text-black transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-black font-pixelify-sans font-bold text-xl md:text-2xl group-hover:text-dashboard-yellow transition-colors duration-300 drop-shadow-lg">
                        Explore
                      </h3>
                      <p className="text-dashboard-light-pink/80 text-sm font-medium">
                        New Projects
                      </p>
                    </div>
                  </div>

                  {/* Project Categories */}
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 group/item hover:scale-105">
                      <Gamepad2 className="w-6 h-6 text-dashboard-yellow mb-2 group-hover/item:text-white transition-colors duration-300" />
                      <div className="text-black/90 text-sm font-semibold group-hover/item:text-white transition-colors duration-300">
                        Gaming
                      </div>
                      <div className="text-dashboard-light-pink/70 text-xs">
                        12 projects
                      </div>
                    </div>
                    <div className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 group/item hover:scale-105">
                      <Code className="w-6 h-6 text-dashboard-yellow mb-2 group-hover/item:text-white transition-colors duration-300" />
                      <div className="text-black/90 text-sm font-semibold group-hover/item:text-white transition-colors duration-300">
                        Coding
                      </div>
                      <div className="text-dashboard-light-pink/70 text-xs">
                        8 projects
                      </div>
                    </div>
                    <div className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 group/item hover:scale-105">
                      <Zap className="w-6 h-6 text-dashboard-yellow mb-2 group-hover/item:text-white transition-colors duration-300" />
                      <div className="text-black/90 text-sm font-semibold group-hover/item:text-white transition-colors duration-300">
                        AI/ML
                      </div>
                      <div className="text-dashboard-light-pink/70 text-xs">
                        5 projects
                      </div>
                    </div>
                    <div className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 group/item hover:scale-105">
                      <Globe className="w-6 h-6 text-dashboard-yellow mb-2 group-hover/item:text-white transition-colors duration-300" />
                      <div className="text-black/90 text-sm font-semibold group-hover/item:text-white transition-colors duration-300">
                        Web Dev
                      </div>
                      <div className="text-dashboard-light-pink/70 text-xs">
                        15 projects
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 flex-1 min-h-[300px] lg:min-h-0">
              {/* Left column with two stacked cards */}
              <div className="flex flex-col gap-4 md:gap-6 lg:w-[409px] mb-[38px]">
                <div className="h-24 md:h-32 lg:h-[151px] bg-gradient-to-br from-dashboard-light-pink/70 to-dashboard-light-pink/50 hover:from-dashboard-light-pink/90 hover:to-dashboard-light-pink/70 rounded-[60px] p-4 md:p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-dashboard-light-pink/30 group backdrop-blur-sm">
                  <div className="h-full flex items-center gap-3">
                    <div className="p-2 md:p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:text-dashboard-yellow transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-black font-pixelify-sans font-bold text-sm md:text-lg group-hover:text-dashboard-yellow transition-colors duration-300 drop-shadow-lg">
                        My Projects
                      </h3>
                      <p className="text-black/80 text-xs md:text-sm font-medium">
                        3 Active • 12 Completed
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-h-[120px] lg:min-h-0 bg-gradient-to-br from-dashboard-yellow/70 to-dashboard-yellow/50 hover:from-dashboard-yellow/90 hover:to-dashboard-yellow/70 rounded-[60px] p-4 md:p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-dashboard-yellow/30 group backdrop-blur-sm">
                  <div className="h-full flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 md:p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-dashboard-purple group-hover:text-black transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-dashboard-purple font-pixelify-sans font-bold text-lg md:text-xl group-hover:text-black transition-colors duration-300 drop-shadow-lg">
                          Ideation
                        </h3>
                        <p className="text-dashboard-purple/80 text-xs md:text-sm font-medium">
                          Brewing Place
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/20 hover:bg-white/30 rounded-lg p-2 text-center transition-all duration-300">
                        <div className="text-dashboard-purple font-bold text-sm">
                          7
                        </div>
                        <div className="text-dashboard-purple/80 text-xs">
                          Ideas
                        </div>
                      </div>
                      <div className="bg-white/20 hover:bg-white/30 rounded-lg p-2 text-center transition-all duration-300">
                        <div className="text-dashboard-purple font-bold text-sm">
                          2
                        </div>
                        <div className="text-dashboard-purple/80 text-xs">
                          Brewing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="flex-1 min-h-[200px] lg:min-h-0 bg-gradient-to-br from-white/15 to-white/5 rounded-[60px] p-4 md:p-6 mb-[23px] backdrop-blur-sm border border-white/20">
                <div className="h-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {/* Social Media Connector */}
                  <div className="bg-gradient-to-br from-dashboard-purple/60 to-dashboard-purple/40 hover:from-dashboard-purple/80 hover:to-dashboard-purple/60 rounded-2xl p-3 md:p-4 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg">
                    <div className="p-2 bg-white/20 rounded-lg mb-3 group-hover:bg-white/30 transition-all duration-300 w-fit">
                      <Globe className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-dashboard-yellow transition-colors duration-300" />
                    </div>
                    <h4 className="text-black font-pixelify-sans font-bold text-xs md:text-sm group-hover:text-dashboard-yellow transition-colors duration-300">
                      Social Media
                    </h4>
                    <p className="text-black/70 text-[10px] md:text-xs">
                      Connector
                    </p>
                  </div>

                  {/* Resume Optimization */}
                  <div className="bg-gradient-to-br from-dashboard-light-pink/60 to-dashboard-light-pink/40 hover:from-dashboard-light-pink/80 hover:to-dashboard-light-pink/60 rounded-2xl p-3 md:p-4 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg">
                    <div className="p-2 bg-white/20 rounded-lg mb-3 group-hover:bg-white/30 transition-all duration-300 w-fit">
                      <FileText className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-dashboard-yellow transition-colors duration-300" />
                    </div>
                    <h4 className="text-black font-pixelify-sans font-bold text-xs md:text-sm group-hover:text-dashboard-yellow transition-colors duration-300">
                      Resume
                    </h4>
                    <p className="text-black/70 text-[10px] md:text-xs">
                      Optimization
                    </p>
                  </div>

                  {/* Career Roadmap */}
                  <div className="bg-gradient-to-br from-dashboard-yellow/60 to-dashboard-yellow/40 hover:from-dashboard-yellow/80 hover:to-dashboard-yellow/60 rounded-2xl p-3 md:p-4 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg">
                    <div className="p-2 bg-white/20 rounded-lg mb-3 group-hover:bg-white/30 transition-all duration-300 w-fit">
                      <Map className="w-5 h-5 md:w-6 md:h-6 text-dashboard-purple group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="text-dashboard-purple font-pixelify-sans font-bold text-xs md:text-sm group-hover:text-white transition-colors duration-300">
                      Career
                    </h4>
                    <p className="text-dashboard-purple/70 text-[10px] md:text-xs group-hover:text-white/70 transition-colors duration-300">
                      Roadmap
                    </p>
                  </div>

                  {/* Friends */}
                  <div className="bg-gradient-to-br from-dashboard-blue/60 to-dashboard-blue/40 hover:from-dashboard-blue/80 hover:to-dashboard-blue/60 rounded-2xl p-3 md:p-4 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg">
                    <div className="p-2 bg-white/20 rounded-lg mb-3 group-hover:bg-white/30 transition-all duration-300 w-fit">
                      <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-dashboard-yellow transition-colors duration-300" />
                    </div>
                    <h4 className="text-black font-pixelify-sans font-bold text-xs md:text-sm group-hover:text-dashboard-yellow transition-colors duration-300">
                      Friends
                    </h4>
                    <p className="text-black/70 text-[10px] md:text-xs">
                      Connect & Share
                    </p>
                  </div>

                  {/* My Progress (Additional) */}
                  <div className="bg-gradient-to-br from-dashboard-medium-pink/60 to-dashboard-medium-pink/40 hover:from-dashboard-medium-pink/80 hover:to-dashboard-medium-pink/60 rounded-2xl p-3 md:p-4 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg">
                    <div className="p-2 bg-white/20 rounded-lg mb-3 group-hover:bg-white/30 transition-all duration-300 w-fit">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:text-dashboard-yellow transition-colors duration-300" />
                    </div>
                    <h4 className="text-black font-pixelify-sans font-bold text-xs md:text-sm group-hover:text-dashboard-yellow transition-colors duration-300">
                      My Progress
                    </h4>
                    <p className="text-black/70 text-[10px] md:text-xs">
                      Detailed View
                    </p>
                  </div>

                  {/* Profile Settings */}
                  <div className="bg-gradient-to-br from-dashboard-purple/60 to-dashboard-blue/40 hover:from-dashboard-purple/80 hover:to-dashboard-blue/60 rounded-2xl p-3 md:p-4 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg">
                    <div className="p-2 bg-white/20 rounded-lg mb-3 group-hover:bg-white/30 transition-all duration-300 w-fit">
                      <Settings className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:text-dashboard-yellow transition-colors duration-300" />
                    </div>
                    <h4 className="text-black font-pixelify-sans font-bold text-xs md:text-sm group-hover:text-dashboard-yellow transition-colors duration-300">
                      Profile
                    </h4>
                    <p className="text-black/70 text-[10px] md:text-xs">
                      Settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
