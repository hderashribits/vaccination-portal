import Student from '../models/Student.js';
import csv from 'csv-parser';
import fs from 'fs';

// Utility function to strip unwanted Unicode characters (like BOM)
const stripUnicode = (str) => {
  if (!str) return '';
  return str.replace(/^\uFEFF/, '').trim();
};

export const handleCSVUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'CSV file is required' });
  }

  const method = req.method;
  const results = [];
  const errors = [];
  const created = [];
  const updated = [];
  const deleted = [];
  const fetched = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        // Handle BOM in column name
        const rollNoRaw = row.rollNo || row['﻿rollNo'];
        const rollNo = stripUnicode(rollNoRaw);

        if (!rollNo) {
          errors.push({ row, error: 'Missing rollNo' });
          continue;
        }

        // Convert string "TRUE"/"FALSE" to Boolean
        const cleanRow = {
          ...row,
          rollNo,
          vaccinated: row.vaccinated?.toLowerCase() === 'true'
        };

        try {
          if (method === 'POST') {
            const existing = await Student.findOne({ rollNo });
            if (existing) {
              await Student.updateOne({ rollNo }, cleanRow);
              updated.push(rollNo);
            } else {
              const newStudent = new Student(cleanRow);
              await newStudent.save();
              created.push(rollNo);
            }
          } else if (method === 'PUT' || method === 'PATCH') {
            const existing = await Student.findOne({ rollNo });
            if (existing) {
              await Student.updateOne({ rollNo }, cleanRow);
              updated.push(rollNo);
            } else {
              errors.push({ row, error: 'RollNo not found for update' });
            }
          } else if (method === 'DELETE') {
            const deletedStudent = await Student.findOneAndDelete({ rollNo });
            if (deletedStudent) {
              deleted.push(rollNo);
            } else {
              errors.push({ row, error: 'RollNo not found for deletion' });
            }
          } else if (method === 'GET') {
            const student = await Student.findOne({ rollNo });
            if (student) {
              fetched.push(student);
            } else {
              errors.push({ row, error: 'RollNo not found' });
            }
          } else {
            errors.push({ row, error: `Unsupported method ${method}` });
          }
        } catch (err) {
          errors.push({ row, error: err.message });
        }
      }

      const summary = {
        created: created.length,
        updated: updated.length,
        deleted: deleted.length,
        fetched: fetched.length,
        errors: errors.length
      };

      const details = {
        created,
        updated,
        deleted,
        fetched,
        errors
      };

      return res.status(200).json({ message: 'CSV processed', summary, details });
    });
};
