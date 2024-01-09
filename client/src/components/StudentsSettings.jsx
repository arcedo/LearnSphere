import React from 'react';

export default function StudentsSettings() {
  return (
    <div>
      <h2 className='font-sora text-4xl font-extrabold'>Students</h2>
      <div className='flex flex-col mt-8'>
        <table className='border-2 border-gray-800 rounded-xl'>
          <thead>
            <tr>
              <th className='font-sora font-bold text-xl'>First name</th>
              <th className='font-sora font-bold text-xl'>Last name</th>
              <th className='font-sora font-bold text-xl'>Username</th>
              <th className='font-sora font-bold text-xl'>Email</th>
              <th className='font-sora font-bold text-xl'>Phone</th>
              <th className='font-sora font-bold text-xl'>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='font-sora font-bold text-xl'>John Doe</td>
              <td className='font-sora font-bold text-xl'></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
