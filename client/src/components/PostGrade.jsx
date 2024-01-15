async function getStudents() { }

export default function postGrades({ currentProject, currentActivity }) {
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>Post Grades</h2>
            <strong className="text-xl font-normal font-montserrat">./{currentProject}/{currentActivity.name}</strong>
            <div>

            </div>
        </div>
    );
}