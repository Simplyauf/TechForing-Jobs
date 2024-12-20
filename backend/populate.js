const mongoose = require("mongoose");
const User = require("./models/User");
const Job = require("./models/Job");
require("dotenv").config();

const jobTitles = {
  Development: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Software Architect",
  ],
  "Sales & Marketing": [
    "Marketing Manager",
    "Sales Representative",
    "Digital Marketing Specialist",
    "Content Marketing Manager",
    "Sales Director",
    "Brand Manager",
  ],
  Creative: [
    "UI/UX Designer",
    "Graphic Designer",
    "Art Director",
    "Motion Designer",
    "Product Designer",
    "Visual Designer",
  ],
  "Human Resource": [
    "HR Manager",
    "Recruitment Specialist",
    "HR Business Partner",
    "Training Coordinator",
    "Compensation Analyst",
    "Employee Relations Manager",
  ],
};

const locations = [
  "Remote",
  "New York, NY",
  "San Francisco, CA",
  "Chicago, IL",
  "Austin, TX",
  "Seattle, WA",
];

const generateRandomJobs = (count = 20) => {
  const jobs = [];
  const categories = Object.keys(jobTitles);

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const titles = jobTitles[category];

    jobs.push({
      title: titles[Math.floor(Math.random() * titles.length)],
      category,
      description: `We are looking for a talented ${
        titles[Math.floor(Math.random() * titles.length)]
      } to join our team.`,
      requirements: `3+ years of relevant experience in ${category}`,
      location: locations[Math.floor(Math.random() * locations.length)],
    });
  }

  return jobs;
};

const populateDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Job.deleteMany({});
    console.log("Cleared existing data");

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    console.log("Test user created");

    const randomJobs = generateRandomJobs(20);
    const jobsWithUser = randomJobs.map((job) => ({
      ...job,
      createdBy: user._id,
    }));

    await Job.create(jobsWithUser);
    console.log("Sample jobs created");

    console.log("Database populated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1);
  }
};

populateDB();
