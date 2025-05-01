import Student from '../models/Student.js';
import Drive from '../models/Drive.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Total students
    const totalStudents = await Student.countDocuments();

    // Vaccinated students
    const vaccinatedCount = await Student.countDocuments({ vaccinated: true });

    // Vaccination percentage
    const vaccinatedPercentage = totalStudents > 0
      ? ((vaccinatedCount / totalStudents) * 100).toFixed(2)
      : '0.00';

    // Upcoming drives within next 30 days
    const today = new Date();
    const next30 = new Date();
    next30.setDate(today.getDate() + 30);

    const upcomingDrives = await Drive.find({
      date: { $gte: today, $lte: next30 }
    }).sort({ date: 1 });

    res.status(200).json({
      students: {
        total: totalStudents,
        vaccinated: vaccinatedCount,
        vaccinatedPercentage,
      },
      upcomingDrives,
      navigation: {
        manageStudents: '/students',
        manageDrives: '/drives',
        viewReports: '/reports'
      },
      message: upcomingDrives.length === 0 ? 'No drives scheduled in the next 30 days.' : undefined
    });

  } catch (err) {
    console.error('Dashboard stats error:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
