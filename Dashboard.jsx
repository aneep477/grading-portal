import React, { useState, useEffect } from 'react';
import { getData, getGrade } from './mocks/mock';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [semester, setSemester] = useState('All');

  useEffect(() => {
    setStudents(getData('students'));
    setGrades(getData('grades'));
    setSubjects(getData('subjects'));
  }, []);

  const filteredGrades = semester === 'All' ? grades : grades.filter(g => g.semester === semester);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Penilaian Pelajar</h1>
      <Select onValueChange={setSemester} defaultValue="All">
        <SelectTrigger className="w-48 mb-4">
          <SelectValue placeholder="Pilih Semester" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">Semua Semester</SelectItem>
          <SelectItem value="Semester II">Semester II</SelectItem>
          <SelectItem value="Semester III">Semester III</SelectItem>
        </SelectContent>
      </Select>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Matrik</TableHead>
            {subjects.map(subject => (
              <TableHead key={subject.id}>{subject.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.matric}</TableCell>
              {subjects.map(subject => {
                const grade = filteredGrades.find(g => g.studentId === student.id && g.subjectId === subject.id);
                return <TableCell key={subject.id}>{grade ? `${grade.score} (${grade.grade})` : '-'}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Dashboard;
