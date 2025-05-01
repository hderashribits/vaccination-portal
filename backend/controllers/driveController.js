import Drive from '../models/Drive.js';
import mongoose from 'mongoose';

// Helper: Minimum scheduling gap
const MIN_DAYS_NOTICE = 15;

const isDateValid = (date) => {
  const now = new Date();
  const scheduledDate = new Date(date);
  const diffDays = Math.floor((scheduledDate - now) / (1000 * 60 * 60 * 24));
  return diffDays >= MIN_DAYS_NOTICE;
};

const hasConflict = async (date) => {
  const existing = await Drive.findOne({ date: new Date(date) });
  return !!existing;
};

// CREATE
export const createDrive = async (req, res) => {
  try {
    const { vaccineName, date, availableDoses, applicableClasses } = req.body;

    if (!isDateValid(date)) {
      return res.status(400).json({ error: `Drive must be scheduled at least ${MIN_DAYS_NOTICE} days in advance.` });
    }

    if (await hasConflict(date)) {
      return res.status(400).json({ error: 'A drive is already scheduled on this date.' });
    }

    const drive = new Drive({ vaccineName, date, availableDoses, applicableClasses });
    await drive.save();
    res.status(201).json(drive);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// READ ALL
export const getAllDrives = async (req, res) => {
  try {
    const drives = await Drive.find().sort({ date: 1 });
    res.status(200).json(drives);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// UPDATE (Only if future date)
export const updateDrive = async (req, res) => {
  try {
    const { id } = req.params;
    const drive = await Drive.findById(id);

    if (!drive) return res.status(404).json({ error: 'Drive not found' });

    if (new Date(drive.date) < new Date()) {
      return res.status(400).json({ error: 'Cannot edit a past drive' });
    }

    Object.assign(drive, req.body);
    await drive.save();
    res.status(200).json(drive);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// MARK EXPIRED (cron job or endpoint)
export const expirePastDrives = async () => {
  await Drive.updateMany(
    { date: { $lt: new Date() }, expired: false },
    { $set: { expired: true } }
  );
};
