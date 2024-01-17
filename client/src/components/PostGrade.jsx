import React, { useState, useEffect } from 'react';

export default function PostGrades({ currentProject, postGradesDivVisible, currentActivity, students }) {
    const [finalGrades, setFinalGrades] = useState({});

    useEffect(() => {
        // Set initial state of finalGrades after students data is fetched
        if (students) {
            const initialGrades = {};
            students.forEach((student) => {
                student.skills.forEach((skill) => {
                    const gradeValue = skill.grade !== null && skill.grade !== undefined ? skill.grade.toString() : '0';
                    initialGrades[`${student.idStudent}-${skill.idSkill}`] = gradeValue;
                });
            });
            setFinalGrades(initialGrades);
        }
    }, [students]);

    const handleGradeChange = (studentId, skillId, newGrade) => {
        const updatedFinalGrades = { ...finalGrades, [`${studentId}-${skillId}`]: newGrade };
        setFinalGrades(updatedFinalGrades);
    };

    const saveGradesToDatabase = async () => {
        try {
            // Prepare the data to be sent to the server
            const gradesData = Object.entries(finalGrades).map(([key, value]) => {
                const [studentId, skillId] = key.split('-');
                return {
                    studentId: parseInt(studentId),
                    skillId: parseInt(skillId),
                    grade: parseFloat(value),
                };
            });

            // Make a PUT request to update the grades in the database
            await fetch(`http://localhost:3001/activities/${currentActivity.idActivity}/skills`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grades: gradesData }),
            });
            // Convert HTMLCollection to array and clear input values
            const inputs = Array.from(document.getElementsByClassName('setEmpty'));
            inputs.forEach((input) => (input.value = ''));
            postGradesDivVisible();
        } catch (error) {
            console.error('Error saving grades:', error);
        }
    };

    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>Post Grades</h2>
            <strong className="text-xl font-normal font-montserrat">./{currentProject.title}/{currentActivity.name}</strong>
            <div className="border-4 border-white rounded-md mt-2 overflow-auto">
                <table className='w-full'>
                    <thead className='border-b-4 border-white w-full py-2'>
                        <tr className=''>
                            <th className='w-4/12 text-left pl-5 font-sora'>Student</th>
                            {currentActivity.skills ? (
                                currentActivity.skills.map((actSkill) => {
                                    const matchingSkill = currentProject.skills.find(skill => skill.idSkill === actSkill.idSkill) || null;
                                    return matchingSkill ? (
                                        <th key={matchingSkill.idSkill} className='w-2/12 py-2.5 font-sora'>
                                            {matchingSkill.skillName} | {actSkill.globalPercentage + '%'}
                                        </th>
                                    ) : null;
                                })
                            ) : null}
                            <th className='w-2/12 font-sora'>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students ? (
                            students.map((student) => {
                                return (
                                    <tr key={student.idStudent} className='border-b-2 border-gray-800 '>
                                        <td className='pl-5 w-4/12 font-montserrat'>{student.firstName} {student.lastName}</td>
                                        {student.skills ? (
                                            student.skills.map((stuSkill) => {
                                                const matchingSkill = currentProject.skills.find(
                                                    (skill) => skill.idSkill === stuSkill.idSkill
                                                );
                                                return matchingSkill ? (
                                                    <td key={matchingSkill.idSkill} className='w-2/12 text-center'>
                                                        <input
                                                            className='setEmpty rounded-md w-20 font-montserrat px-2.5 py-1 bgSidebar my-2.5 text-center border-gray-600 border-2'
                                                            type='number'
                                                            min={0}
                                                            max={10}
                                                            defaultValue={
                                                                stuSkill.grade || 0
                                                            }
                                                            onChange={(e) =>
                                                                handleGradeChange(
                                                                    student.idStudent,
                                                                    matchingSkill.idSkill,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                ) : null;
                                            })
                                        ) : null}
                                        <td className='w-2/12 font-sora text-center'>
                                            {currentActivity.skills.reduce((sum, actSkill) => {
                                                const matchingSkill = currentProject.skills.find(skill => skill.idSkill === actSkill.idSkill);
                                                const skillGrade = parseFloat(finalGrades[`${student.idStudent}-${matchingSkill.idSkill}`] || 0);
                                                const skillPercentage = actSkill.globalPercentage / 100;
                                                return sum + (matchingSkill ? skillGrade * skillPercentage : 0);
                                            }, 0).toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : null}
                    </tbody>
                </table>
            </div>
            <button
                className='w-36 border-2 border-white rounded-md mt-4 px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'
                onClick={() => {
                    setFinalGrades({});
                    saveGradesToDatabase();
                }}
            >
                Save grades
            </button>
        </div >
    );
}