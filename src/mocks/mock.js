import Papa from 'papaparse';

// Mock data for students, subjects, grades, lecturers, and exams
const initialData = {
  students: [
    { id: 1, name: "Ahmad Zaki bin Hassan", matric: "PPISMP001", semester: "Semester III" },
    { id: 2, name: "Nurul Aina binti Abdullah", matric: "PPISMP002", semester: "Semester III" },
    { id: 3, name: "Siti Fatimah binti Ismail", matric: "PPISMP003", semester: "Semester II" },
    { id: 4, name: "Muhammad Ali bin Rahim", matric: "PPISMP004", semester: "Semester III" },
    { id: 5, name: "Aisyah binti Zulkifli", matric: "PPISMP005", semester: "Semester II" }
  ],
  subjects: [
    { id: 1, code: "MPU101", name: "Pendidikan Islam" },
    { id: 2, code: "MAT201", name: "Matematik Asas" },
    { id: 3, code: "BM301", name: "Bahasa Melayu Lanjutan" }
  ],
  grades: [
    { id: 1, studentId: 1, subjectId: 1, semester: "Semester III", score: 85, grade: "A" },
    { id: 2, studentId: 1, subjectId: 2, semester: "Semester III", score: 78, grade: "B+" },
    { id: 3, studentId: 2, subjectId: 1, semester: "Semester III", score: 92, grade: "A+" },
  ],
  lecturers: [
    { id: 1, name: "Dr. Aminah binti Salleh", email: "aminah@ipgm.edu.my", department: "Pendidikan Islam" },
    { id: 2, name: "Prof. Madya Zulkifli bin Ahmad", email: "zulkifli@ipgm.edu.my", department: "Matematik" },
    { id: 3, name: "Pn. Siti Hajar binti Omar", email: "sitihajar@ipgm.edu.my", department: "Bahasa Melayu" }
  ],
  exams: [
    { id: 1, month: "Julai", year: "2025", semester: "Semester III" },
    { id: 2, month: "Februari", year: "2025", semester: "Semester II" }
  ],
  auth: { username: "admin", password: "admin123" }
};

// Helper to get grading scale
const getGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  return "D";
};

// LocalStorage helpers
const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initialData[key];
};

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Parse CSV and update data
const importCSV = (file, dataType, callback) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      let updatedData;
      switch (dataType) {
        case 'students':
          updatedData = result.data.map((row, index) => ({
            id: parseInt(row.id) || index + 1,
            name: row.name,
            matric: row.matric,
            semester: row.semester
          }));
          saveData('students', updatedData);
          break;
        case 'lecturers':
          updatedData = result.data.map((row, index) => ({
            id: parseInt(row.id) || index + 1,
            name: row.name,
            email: row.email,
            department: row.department
          }));
          saveData('lecturers', updatedData);
          break;
        case 'subjects':
          updatedData = result.data.map((row, index) => ({
            id: parseInt(row.id) || index + 1,
            code: row.code,
            name: row.name
          }));
          saveData('subjects', updatedData);
          break;
        case 'exams':
          updatedData = result.data.map((row, index) => ({
            id: parseInt(row.id) || index + 1,
            month: row.month,
            year: row.year,
            semester: row.semester
          }));
          saveData('exams', updatedData);
          break;
        default:
          break;
      }
      callback(updatedData);
    }
  });
};

export { initialData, getGrade, getData, saveData, importCSV };
