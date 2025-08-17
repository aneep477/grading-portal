import React, { useState, useEffect } from 'react';
import { getData, saveData, getGrade } from './mocks/mock';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

function Assessment() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ studentId: '', subjectId: '', semester: '', score: '' });

  useEffect(() => {
    setStudents(getData('students'));
    setSubjects(getData('subjects'));
    setGrades(getData('grades'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGrade = {
      id: grades.length + 1,
      studentId: parseInt(form.studentId),
      subjectId: parseInt(form.subjectId),
      semester: form.semester,
      score: parseInt(form.score),
      grade: getGrade(form.score)
    };
    const updatedGrades = [...grades, newGrade];
    setGrades(updatedGrades);
    saveData('grades', updatedGrades);
    setForm({ studentId: '', subjectId: '', semester: '', score: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kemas Kini Penilaian</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select onValueChange={(value) => setForm({ ...form, studentId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Pelajar" />
          </SelectTrigger>
          <SelectContent>
            {students.map(student => (
              <SelectItem key={student.id} value={student.id.toString()}>{student.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setForm({ ...form, subjectId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Subjek" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id.toString()}>{subject.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setForm({ ...form, semester: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Semester II">Semester II</SelectItem>
            <SelectItem value="Semester III">Semester III</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Skor (0-100)"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
        />
        <Button type="submit">Simpan</Button>
      </form>
    </div>
  );
}

export default Assessment;
