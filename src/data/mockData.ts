export const mockCourses = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS 101',
    instructor: 'Dr. Sarah Johnson',
    semester: 'Fall 2024',
    description: 'Fundamental concepts of computer science including algorithms, data structures, and programming.',
    students: 45,
    progress: 75,
    color: 'bg-blue-600',
  },
  {
    id: '2',
    name: 'Calculus II',
    code: 'MATH 202',
    instructor: 'Prof. Michael Chen',
    semester: 'Fall 2024',
    description: 'Advanced calculus covering integration techniques, series, and multivariable calculus.',
    students: 38,
    progress: 60,
    color: 'bg-purple-600',
  },
  {
    id: '3',
    name: 'Modern Physics',
    code: 'PHYS 301',
    instructor: 'Dr. Emily Rodriguez',
    semester: 'Fall 2024',
    description: 'Introduction to quantum mechanics, relativity, and atomic physics.',
    students: 32,
    progress: 85,
    color: 'bg-green-600',
  },
  {
    id: '4',
    name: 'World Literature',
    code: 'LIT 150',
    instructor: 'Prof. James Wilson',
    semester: 'Fall 2024',
    description: 'Survey of world literature from ancient times to the present.',
    students: 50,
    progress: 90,
    color: 'bg-orange-600',
  },
  {
    id: '5',
    name: 'Data Structures & Algorithms',
    code: 'CS 250',
    instructor: 'Dr. Sarah Johnson',
    semester: 'Fall 2024',
    description: 'In-depth study of data structures and algorithm design and analysis.',
    students: 41,
    progress: 70,
    color: 'bg-indigo-600',
  },
];

export const mockAssignments = [
  {
    id: '1',
    title: 'Binary Search Trees Implementation',
    course: 'Introduction to Computer Science',
    dueDate: 'Dec 3, 2024',
    status: 'pending' as const,
    points: 100,
  },
  {
    id: '2',
    title: 'Integration Techniques Problem Set',
    course: 'Calculus II',
    dueDate: 'Dec 5, 2024',
    status: 'pending' as const,
    points: 50,
  },
  {
    id: '3',
    title: 'Quantum Mechanics Lab Report',
    course: 'Modern Physics',
    dueDate: 'Dec 10, 2024',
    status: 'submitted' as const,
    points: 75,
  },
  {
    id: '4',
    title: 'Literary Analysis Essay',
    course: 'World Literature',
    dueDate: 'Nov 28, 2024',
    status: 'graded' as const,
    points: 100,
    grade: 92,
  },
  {
    id: '5',
    title: 'Sorting Algorithms Comparison',
    course: 'Data Structures & Algorithms',
    dueDate: 'Nov 25, 2024',
    status: 'graded' as const,
    points: 80,
    grade: 75,
  },
  {
    id: '6',
    title: 'Multivariable Calculus Project',
    course: 'Calculus II',
    dueDate: 'Nov 30, 2024',
    status: 'graded' as const,
    points: 120,
    grade: 108,
  },
];

export const mockAnnouncements = [
  {
    id: '1',
    title: 'Final Exam Schedule Posted',
    course: 'Introduction to Computer Science',
    date: '2 days ago',
  },
  {
    id: '2',
    title: 'Office Hours This Week',
    course: 'Calculus II',
    date: '3 days ago',
  },
  {
    id: '3',
    title: 'Guest Lecture on Thursday',
    course: 'Modern Physics',
    date: '5 days ago',
  },
];

export const mockModules = [
  {
    id: '1',
    title: 'Module 1: Introduction to Algorithms',
    description: 'Learn the fundamentals of algorithm design and analysis',
    progress: 100,
    lessons: [
      { id: '1-1', title: 'What is an Algorithm?', type: 'video' as const, duration: '15 min', completed: true },
      { id: '1-2', title: 'Algorithm Complexity', type: 'reading' as const, duration: '20 min', completed: true },
      { id: '1-3', title: 'Big O Notation', type: 'video' as const, duration: '25 min', completed: true },
      { id: '1-4', title: 'Practice Problems', type: 'assignment' as const, duration: '45 min', completed: true },
    ],
  },
  {
    id: '2',
    title: 'Module 2: Data Structures',
    description: 'Explore common data structures and their applications',
    progress: 75,
    lessons: [
      { id: '2-1', title: 'Arrays and Lists', type: 'video' as const, duration: '18 min', completed: true },
      { id: '2-2', title: 'Stacks and Queues', type: 'video' as const, duration: '22 min', completed: true },
      { id: '2-3', title: 'Trees and Graphs', type: 'reading' as const, duration: '30 min', completed: true },
      { id: '2-4', title: 'Hash Tables', type: 'video' as const, duration: '20 min', completed: false },
      { id: '2-5', title: 'Data Structures Quiz', type: 'assignment' as const, duration: '40 min', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Module 3: Sorting and Searching',
    description: 'Master essential sorting and searching algorithms',
    progress: 40,
    lessons: [
      { id: '3-1', title: 'Bubble Sort and Selection Sort', type: 'video' as const, duration: '16 min', completed: true },
      { id: '3-2', title: 'Merge Sort and Quick Sort', type: 'video' as const, duration: '24 min', completed: true },
      { id: '3-3', title: 'Binary Search', type: 'reading' as const, duration: '15 min', completed: false },
      { id: '3-4', title: 'Search Trees', type: 'video' as const, duration: '28 min', completed: false },
      { id: '3-5', title: 'Sorting Algorithm Implementation', type: 'assignment' as const, duration: '60 min', completed: false },
    ],
  },
];

export type ActivityType = 'submission' | 'late_submission' | 'comment' | 'access' | 'grade_posted';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  studentName: string;
  course: string;
  courseId: string;
  description: string;
  timestamp: Date;
  isLate?: boolean;
}

export interface AttentionItem {
  id: string;
  priority: 'high' | 'medium' | 'low';
  type: 'grading' | 'late_submission' | 'inactive_students' | 'upcoming_deadline';
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  count?: number;
  dueDate?: string;
}

export interface CourseStats {
  courseId: string;
  courseName: string;
  courseCode: string;
  pendingReviews: number;
  averageGrade: number;
  activeStudents: number;
  totalStudents: number;
  submissionRate: number;
  attendance: number;
  attendanceTrend: number[];
  atRisk: number;
}

// Activity feed items (last 24-48 hours)
export const mockActivityFeed: ActivityItem[] = [
  {
    id: 'a1',
    type: 'submission',
    studentName: 'Sarah Chen',
    course: 'Introduction to Computer Science',
    courseId: '1',
    description: 'submitted "Binary Search Trees Implementation"',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  },
  {
    id: 'a2',
    type: 'comment',
    studentName: 'Michael Park',
    course: 'Data Structures & Algorithms',
    courseId: '5',
    description: 'commented on "Sorting Algorithms Comparison"',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: 'a3',
    type: 'late_submission',
    studentName: 'Alex Johnson',
    course: 'Introduction to Computer Science',
    courseId: '1',
    description: 'submitted "Binary Search Trees Implementation" (Late)',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    isLate: true,
  },
  {
    id: 'a4',
    type: 'access',
    studentName: '15 students',
    course: 'Data Structures & Algorithms',
    courseId: '5',
    description: 'accessed "Module 3: Sorting and Searching"',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 'a5',
    type: 'submission',
    studentName: 'Emma Wilson',
    course: 'Data Structures & Algorithms',
    courseId: '5',
    description: 'submitted "Sorting Algorithms Comparison"',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: 'a6',
    type: 'grade_posted',
    studentName: 'System',
    course: 'Introduction to Computer Science',
    courseId: '1',
    description: 'You posted grades for "Algorithm Analysis Quiz"',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: 'a7',
    type: 'submission',
    studentName: 'David Kim',
    course: 'Data Structures & Algorithms',
    courseId: '5',
    description: 'submitted "Hash Table Implementation"',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: 'a8',
    type: 'access',
    studentName: '23 students',
    course: 'Introduction to Computer Science',
    courseId: '1',
    description: 'accessed "Final Exam Study Guide"',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
];

// Items requiring teacher's attention
export const mockAttentionItems: AttentionItem[] = [
  {
    id: 'att1',
    priority: 'high',
    type: 'grading',
    title: 'Assignments to grade',
    description: '8 submissions waiting for review',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    count: 8,
    dueDate: 'Today',
  },
  {
    id: 'att2',
    priority: 'high',
    type: 'upcoming_deadline',
    title: 'Assignment deadline approaching',
    description: '3 students haven\'t submitted yet',
    courseId: '5',
    courseName: 'Data Structures & Algorithms',
    count: 3,
    dueDate: 'Tomorrow',
  },
  {
    id: 'att3',
    priority: 'medium',
    type: 'inactive_students',
    title: 'Inactive students',
    description: '2 students haven\'t accessed course in 7 days',
    courseId: '5',
    courseName: 'Data Structures & Algorithms',
    count: 2,
  },
  {
    id: 'att4',
    priority: 'medium',
    type: 'late_submission',
    title: 'Late submissions received',
    description: '4 late submissions need review',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    count: 4,
  },
];

// Course overview statistics
export const mockCourseStats: CourseStats[] = [
  {
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    courseCode: 'CS 101',
    pendingReviews: 8,
    averageGrade: 87,
    activeStudents: 42,
    totalStudents: 45,
    submissionRate: 82,
    attendance: 82,
    attendanceTrend: [78, 80, 85, 82],
    atRisk: 3,
  },
  {
    courseId: '5',
    courseName: 'Data Structures & Algorithms',
    courseCode: 'CS 250',
    pendingReviews: 3,
    averageGrade: 82,
    activeStudents: 38,
    totalStudents: 41,
    submissionRate: 76,
    attendance: 88,
    attendanceTrend: [85, 86, 89, 88],
    atRisk: 1,
  },
  {
    courseId: '3',
    courseName: 'Modern Physics',
    courseCode: 'PHYS 301',
    pendingReviews: 1,
    averageGrade: 91,
    activeStudents: 31,
    totalStudents: 32,
    submissionRate: 94,
    attendance: 94,
    attendanceTrend: [91, 93, 95, 94],
    atRisk: 0,
  },
  {
    courseId: '4',
    courseName: 'World Literature',
    courseCode: 'LIT 150',
    pendingReviews: 5,
    averageGrade: 88,
    activeStudents: 48,
    totalStudents: 50,
    submissionRate: 90,
    attendance: 86,
    attendanceTrend: [84, 85, 88, 86],
    atRisk: 5,
  },
  {
    courseId: '2',
    courseName: 'Calculus II',
    courseCode: 'MATH 202',
    pendingReviews: 2,
    averageGrade: 79,
    activeStudents: 35,
    totalStudents: 38,
    submissionRate: 71,
    attendance: 75,
    attendanceTrend: [72, 74, 76, 75],
    atRisk: 3,
  },
];

