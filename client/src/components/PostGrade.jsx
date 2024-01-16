async function getStudents() {

}

export default function postGrades({ currentProject, currentActivity }) {
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>Post Grades</h2>
            <strong className="text-xl font-normal font-montserrat">./{currentProject}/{currentActivity.name}</strong>
            <div className="border-4 border-white rounded-md mt-2">
                <table>
                    <thead className='border-b-4 border-white'>
                        <tr>
                            <th className='w-4/12 pt-3 pb-3 pl-3 font-extrabold text-left'>Student</th>
                            <th className='w-1/12 pt-2 pb-2 font-extrabold'>Skill 1</th>
                            <th className='w-1/12 pt-2 pb-2 font-extrabold'>Skill 2</th>
                            <th className='w-1/12 pt-2 pb-2 font-extrabold'>Skill 3</th>
                            <th className='w-1/12 pt-2 pb-2 pr-3 font-extrabold'>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {getStudents().map((student) => (
                            <tr>
                                <td>{student.name}</td>
                                <td><input type="number" /></td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
            <button className='w-36 border-2 border-white rounded-md mt-4 px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'>
                    Save grades
            </button>
        </div>
    );
}