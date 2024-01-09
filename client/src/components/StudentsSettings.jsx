import React, { useState, useEffect } from 'react';

export default function StudentsSettings() {
  const [students, setStudents] = useState([]);

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
      <div className='flex gap-4 justify-start items-center'>
        <h2 className='font-sora text-4xl font-extrabold'>Students</h2>
        <button className='w-32 border-2 border-white rounded-md px-4 py-2 hover:bg-white hover:text-black transition-all'>
            Add student
        </button>
      </div>
      <div className='flex flex-col mt-8'>
        <table className='border-4 border-white'>
          <thead className='border-b-4 border-white'>
            <tr className='text-left'>
              <th className='font-sora font-bold text-xl'>First name</th>
              <th className='font-sora font-bold text-xl'>Last name</th>
              <th className='font-sora font-bold text-xl'>Username</th>
              <th className='font-sora font-bold text-xl'>Email</th>
              <th className='font-sora font-bold text-xl'>Phone</th>
              <th className='font-sora font-bold text-xl'>Group</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.idStudent} className='border-b-2 border-gray-700'>
                <td className='font-sora pt-3 pb-3'>{student.firstName}</td>
                <td className='font-sora pt-3 pb-3'>{student.lastName}</td>
                <td className='font-sora pt-3 pb-3'>{student.userName}</td>
                <td className='font-sora pt-3 pb-3'>{student.email}</td>
                <td className='font-sora pt-3 pb-3'>{student.phoneNumber}</td>
                <td className='font-sora pt-3 pb-3'>{student.idStudentGroup}</td>
                <td className='font-sora pt-3 pb-3'>
                  <button className='border-2 border-white rounded-md px-4 py-2 hover:bg-white hover:text-black transition-all'>
                    Edit
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
