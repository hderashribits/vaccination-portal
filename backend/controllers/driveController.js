import Drive from '../models/Drive.js';
import dayjs from 'dayjs';

// CREATE Drive
export const createDrive = async (req, res) => {
  try {
    const { vaccineName, date, availableDoses, applicableClasses } = req.body;

    const driveDate = dayjs(date);
    const today = dayjs();

    if (driveDate.diff(today, 'day') < 15) {
      return res.status(400).json({ error: 'Drive must be scheduled at least 15 days in advance' });
    }

    const existing = await Drive.findOne({ date: driveDate.toDate() });
    if (existing) {
      return res.status(409).json({ error: 'Another drive already scheduled on this date' });
    }

    const drive = new Drive({ vaccineName, date, availableDoses, applicableClasses });
    await drive.save();

    res.status(201).json(drive);
  } catch (err) {
    console.error('Error creating drive:', err.message);
    res.status(400).json({ error: 'Server error: ' + err.message });
  }
};

export const deleteDrive = async (req, res) => {
  try {
    const { vaccineName, date } = req.body;

    if (!vaccineName || !date) {
      return res.status(400).json({ error: 'vaccineName and date are required' });
    }

    // Convert date to start and end of day
    const start = new Date(date);
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);

    // Case-insensitive vaccineName match and date range match
    const deleted = await Drive.findOneAndDelete({
      vaccineName: new RegExp(`^${vaccineName}$`, 'i'),
      date: { $gte: start, $lte: end }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Drive not found' });
    }

    res.status(200).json({ message: 'Drive deleted successfully', drive: deleted });
  } catch (err) {
    console.error('Error deleting drive:', err.message);
    res.status(400).json({ error: 'Server error: ' + err.message });
  }
};



// READ ALL
export const getAllDrives = async (req, res) => {
  try {
    const drives = await Drive.find().sort({ date: 1 });
    res.status(200).json(drives);
  } catch (err) {
    res.status(400).json({ error: 'Server error: ' + err.message });
  }
};

export const getAllVaccineNames = async (req, res) => {
  try {
    const vaccineNames = await Drive.distinct('vaccineName');
    res.status(200).json(vaccineNames);
  } catch (err) {
    console.error('Error fetching vaccine names:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// UPDATE Drive by ID or vaccineName/date combo
export const updateDrive = async (req, res) => {
  try {
    const { id, vaccineName, date, newData } = req.body;

    let drive;
    if (id) {
      drive = await Drive.findById(id);
    } else if (vaccineName && date) {
      drive = await Drive.findOne({ vaccineName, date });
    } else {
      return res.status(400).json({ error: 'Must provide either ID or vaccineName + date' });
    }

    if (!drive) {
      return res.status(404).json({ error: 'Drive not found' });
    }

    // Check if the drive date is in the past
    if (dayjs(drive.date).isBefore(dayjs(), 'day')) {
      return res.status(400).json({ error: 'Cannot update a past drive' });
    }

    //  Validate newData fields
    if (newData.availableDoses !== undefined && newData.availableDoses < 0) {
      return res.status(400).json({ error: 'Available doses cannot be negative' });
    }

    // Update drive fields
    if (newData.vaccineName !== undefined) drive.vaccineName = newData.vaccineName;
    if (newData.date !== undefined) drive.date = newData.date;
    if (newData.availableDoses !== undefined) drive.availableDoses = newData.availableDoses;
    if (newData.applicableClasses !== undefined) drive.applicableClasses = newData.applicableClasses;

    await drive.save();

    res.status(200).json({ message: 'Drive updated successfully', drive });
  } catch (err) {
    console.error('Error updating drive:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

