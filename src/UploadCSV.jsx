import React, { useState } from 'react';
import { importCSV } from './mocks/mock';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

function UploadCSV() {
  const [file, setFile] = useState(null);
  const [dataType, setDataType] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = () => {
    if (!file || !dataType) {
      setMessage('Sila pilih fail CSV dan jenis data.');
      return;
    }
    importCSV(file, dataType, (updatedData) => {
      setMessage(`Berjaya mengimport ${updatedData.length} rekod untuk ${dataType}.`);
      setFile(null);
      setDataType('');
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Muat Naik Data CSV</h1>
      <div className="space-y-4">
        <Select onValueChange={setDataType}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Jenis Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="students">Pelajar</SelectItem>
            <SelectItem value="lecturers">Pensyarah</SelectItem>
            <SelectItem value="subjects">Subjek</SelectItem>
            <SelectItem value="exams">Peperiksaan</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button onClick={handleUpload}>Muat Naik</Button>
        {message && <p className={message.includes('Berjaya') ? 'text-green-500' : 'text-red-500'}>{message}</p>}
      </div>
    </div>
  );
}

export default UploadCSV;
