import React, { useState, useEffect } from 'react';
import Edit from '../assets/img/pencil.svg';
import Delete from '../assets/img/delete.svg';

export default function StudentsSettings({handleAddStudentDivVisible, handleModifyStudentDivVisible, handleDeleteStudentDivVisible, handleImportCsvVisible, setStudents, students}) {
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='flex flex-wrap items-center w-full mx-auto justify-between'>
        <h2 className='font-sora text-4xl font-extrabold'>Students</h2>
        <div className='flex items-center justify-between mt-3 md:mt-0 gap-3'>
          <button onClick={handleAddStudentDivVisible} className='bg-white text-black hover:bg-black hover:text-white border-2 border-white transition-colors duration-300 rounded-2xl px-5 py-2 font-sora font-extrabold'>
              Add student
          </button>
          <button onClick={handleImportCsvVisible} className='bg-white text-black hover:bg-black hover:text-white border-2 border-white transition-colors duration-300 rounded-2xl px-5 py-2 font-sora font-extrabold'>
              Import CSV
          </button>
        </div>
      </div>
      <div className='flex flex-col mt-8 rounded-xl border-4 border-white overflow-auto'>
        <table className=''>
          <thead className='border-b-4 border-white'>
            <tr className='text-left font-sora font-bold text-xl'>
              <th className='font-sora font-bold text-xl px-5'>First name</th>
              <th className='pt-3 pb-3 pr-3'>Last name</th>
              <th className='pt-3 pb-3 pr-3'>Username</th>
              <th className='pt-3 pb-3 pr-3'>Email</th>
              <th className='pt-3 pb-3 pr-3'>Phone</th>
              <th className='pt-3 pb-3 pr-3'>Group</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.idStudent}
                className={`border-gray-700 ${index !== students.length - 1 ? 'border-b-2' : ''}`}
              >
                <td className='font-sora pt-3 pb-3 px-5'>{student.firstName}</td>
                <td className='font-sora pt-3 pb-3 pr-3'>{student.lastName}</td>
                <td className='font-sora pt-3 pb-3 pr-3'>{student.userName}</td>
                <td className='font-sora pt-3 pb-3 pr-3'>{student.email}</td>
                <td className='font-sora pt-3 pb-3 pr-3'>{student.phoneNumber}</td>
                <td className='font-sora pt-3 pb-3 pr-3'>{student.idStudentGroup}</td>
                <td className='font-sora pt-3 pb-3 pr-3'>
                  <button onClick={() => handleModifyStudentDivVisible(student)}>
                    <img src={Edit} alt='edit' className='w-8 h-8 mr-1' />
                  </button>
                  <button onClick={() => handleDeleteStudentDivVisible(student)}>
                    <img src={Delete} alt='delete' className='w-8 h-8 ml-1' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
