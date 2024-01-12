import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MyButton from '../components/MyButton';
import { getLoggedUser } from '../utils/auth';
import AccountSettings from '../components/AccountSettings';
import StudentsSettings from '../components/StudentsSettings';
import GroupSettings from '../components/GroupSettings';
import LoginStatusChecker from '../components/LogginStatusChecker';
import AddStudent from '../components/AddStudent';
import ModifyStudent from '../components/ModifyStudent';
import DeleteStudent from '../components/DeleteStudent';
import AddGroup from '../components/AddGroup';

async function addStudent() {
  const firstNameInput = document.getElementById('addFirstName');
  const lastNameInput = document.getElementById('addLastName');
  const dniInput = document.getElementById('addDni');
  const phoneNumberInput = document.getElementById('addPhoneNumber');
  const passwordInput = document.getElementById('addPassword');
  const idGroupInput = document.getElementById('addIdGroup');

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const dni = dniInput.value;
  const phoneNumber = phoneNumberInput.value;
  const userPassword = passwordInput.value;
  const idStudentGroup = idGroupInput.options[idGroupInput.selectedIndex].value;

  if (!firstName || !lastName || !dni || !phoneNumber || !userPassword || !idStudentGroup) {
    return { status: false, error: 'Missing fields' };
  } else {
    const username = `${firstName.substring(0, 3).toLowerCase()}${lastName.substring(0, 3).toLowerCase()}`;
    const email = `${username}@lsphere.net`;
    const profilePicture = `/src/assets/profilePictures/${username}.png`;
    const bio = '';

    const student = {
      firstName,
      lastName,
      dni,
      phoneNumber,
      userPassword,
      idStudentGroup,
      userName: username,
      email,
      profilePicture,
      bio,
    };

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ students: [student] })
      }

      const response = await fetch(`http://localhost:3001/students`, options);

      if (response.status === 200) {
        // Reset input fields on successful submission
        firstNameInput.value = '';
        lastNameInput.value = '';
        dniInput.value = '';
        phoneNumberInput.value = '';
        passwordInput.value = '';
        idGroupInput.value = ''; // Reset the selected group as needed

        return await response.json();
      } else {
        return { status: false, error: 'Error adding student' };
      }
    } catch (error) {
      console.error('Error adding student:', error);
      return { status: false, error: 'Error adding student' };
    }
  }
}

async function modifyStudent(idStudent) {
  const firstName = document.getElementById('modFirstName').value;
  const lastName = document.getElementById('modLastName').value;
  const dni = document.getElementById('modDni').value;
  const phoneNumber = document.getElementById('modPhoneNumber').value;
  const userPassword = document.getElementById('modPassword').value;
  const idStudentGroup = document.getElementById('modIdGroup').value;
  const bio = document.getElementById('modBio').value;

  if (!firstName || !lastName || !dni || !phoneNumber || !userPassword || !idStudentGroup) {
    return { status: false, error: 'Missing fields' };
  } else {
    const username = `${firstName.substring(0, 3).toLowerCase()}${lastName.substring(0, 3).toLowerCase()}`;
    const email = `${username}@lsphere.net`;
    const profilePicture = `/src/assets/profilePictures/${username}.png`;

    const modifiedStudent = {
      firstName,
      lastName,
      dni,
      phoneNumber,
      userPassword,
      idStudentGroup,
      userName: username,
      email,
      profilePicture,
      bio,
    };
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(modifiedStudent),
      };
      const response = await fetch(`http://localhost:3001/students/${idStudent}`, options);

      if (response.status === 200) {
        return await response.json();
      } else {
        return { status: false, error: 'Error modifying student' };
      }
    } catch (error) {
      console.error('Error modifying student:', error);
      return { status: false, error: 'Error modifying student' };
    }
  }
}

async function deleteStudent(idStudent) {
  const response = await fetch(`http://localhost:3001/students/${idStudent}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  return await response.json();
}

async function addGroup() {
  const nameInput = document.getElementById('addName');
  const name = nameInput.value;
  
  if (!name) {
    return { status: false, error: 'Missing field' };
  } else {
    const group = {
      name,
    };

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(group)
      }

      const response = await fetch(`http://localhost:3001/groups`, options);

      if (response.status === 200) {
        // Reset input fields on successful submission
        nameInput.value = '';

        return await response.json();
      } else {
        return { status: false, error: 'Error adding group' };
      }
    }
    catch (error) {
      console.error('Error adding group:', error);
      return { status: false, error: 'Error adding group' };
    }
  }
}

export default function Settings() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isAddStudentDivVisible, setAddStudentDivVisible] = useState(false);
  const [studentAdded, setStudentAdded] = useState(false);
  const [studentClicked, setStudentClicked] = useState({});
  const [students, setStudents] = useState([]);

  const [isAddGroupDivVisible, setAddGroupDivVisible] = useState(false);
  const [groupAdded, setGroupAdded] = useState(false);
  const [groupClicked, setGroupClicked] = useState({});
  const [groups, setGroups] = useState([]);

  const handleAddStudentDivVisible = () => {
    setAddStudentDivVisible(true);
    setTimeout(() => {
      const addStudentDiv = document.getElementById('addStudentDiv');
      addStudentDiv.classList.add('animate-fadeIn');
      addStudentDiv.classList.remove('hidden');  // Remove 'hidden' class
    }, 20);
  }

  const handleAddStudentClick = async () => {
    try {
      setAddStudentDivVisible(true);
      const result = await addStudent();
      setStudentAdded(result);
      if (result.status !== false) {
        setAddStudentDivVisible(false);
        try {
          const response = await fetch('http://localhost:3001/students');
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Modify student div visible or not
  const [isModifyStudentDivVisible, setModifyStudentDivVisible] = useState(false);
  const [studentModified, setStudentModified] = useState({});

  const handleModifyStudentDivVisible = (student) => {
    setStudentClicked(student);
    setModifyStudentDivVisible(true);
    setTimeout(() => {
      const modifyStudentDiv = document.getElementById('modifyStudentDiv');
      modifyStudentDiv.classList.add('animate-fadeIn');
      modifyStudentDiv.classList.remove('hidden'); // Remove 'hidden' class
    }, 20);
  };

  const handleModifyStudentClick = async () => {
    try {
      const result = await modifyStudent(studentClicked.idStudent);
      setStudentModified(result);
      if (result.status !== false) {
        setModifyStudentDivVisible(false);
        try {
          const response = await fetch('http://localhost:3001/students');
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete student div visible or not
  const [isDeleteStudentDivVisible, setDeleteStudentDivVisible] = useState(false);
  const handleDeleteStudentDivVisible = (student) => {
    setStudentClicked(student);
    setDeleteStudentDivVisible(true);
    setTimeout(() => {
      const deleteStudentDiv = document.getElementById('deleteStudentDiv');
      deleteStudentDiv.classList.add('animate-fadeIn');
      deleteStudentDiv.classList.remove('hidden');  // Remove 'hidden' class
    }, 20);
  }
  const closeDeleteStudentDivVisible = () => {
    setDeleteStudentDivVisible(false);
  }
  const handleDeleteStudentClick = async () => {
    try {
      const result = await deleteStudent(studentClicked.idStudent);
      if (result.affectedRows > 0) {
        setDeleteStudentDivVisible(false);
        try {
          const response = await fetch('http://localhost:3001/students');
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Add group div visible or not
  const handleAddGroupDivVisible = () => {
    setAddGroupDivVisible(true);
    setTimeout(() => {
      const addGroupDiv = document.getElementById('addGroupDiv');
      addGroupDiv.classList.add('animate-fadeIn');
      addGroupDiv.classList.remove('hidden');  // Remove 'hidden' class
    }, 20);
  }

  const handleAddGroupClick = async () => {
    try {
      setAddGroupDivVisible(true);
      const result = await addGroup();
      setGroupAdded(result);
      if (result.status !== false) {
        setAddGroupDivVisible(false);
        try {
          const response = await fetch('http://localhost:3001/groups');
          const data = await response.json();
          setGroups(data);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const defaultItem = "Account";
    setSelectedItem(defaultItem);
  }, []);

  const pullSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.title);
    if (item.title === "Log out") {
      localStorage.removeItem('loggedUser');
      navigate("/login");
    }
  };

  const loginStatus = LoginStatusChecker();
  if (loginStatus) {
    const exampleList = getLoggedUser().type === 'teacher'
      ? [
        { id: 1, title: "Account" },
        { id: 2, title: "Students" },
        { id: 3, title: "Groups"},
        { id: 4, title: "Log out" },
      ]
      : [
        { id: 1, title: "Account" },
        { id: 2, title: "Log out" },
      ];
    return (
      <div>
        <Header title={'Settings'} />
        <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
          {isAddStudentDivVisible && (
            <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setAddStudentDivVisible(false)}></div>
          )}
          <div id='addStudentDiv' className={`w-5/12 h-3/5 z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isAddStudentDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <AddStudent
              submitStudentFunction={handleAddStudentClick}
              studentAdded={studentAdded}
            />
          </div>
          {isModifyStudentDivVisible && (
            <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setModifyStudentDivVisible(false)}></div>
          )}
          <div id='modifyStudentDiv' className={`w-5/12 h-4/6 z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isModifyStudentDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <ModifyStudent submitStudentFunction={handleModifyStudentClick} studentModified={studentModified} currentData={studentClicked} />
          </div>
          {isDeleteStudentDivVisible && (
            <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setDeleteStudentDivVisible(false)}></div>
          )}
          <div id='deleteStudentDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isDeleteStudentDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <DeleteStudent studentName={{
              firstName: studentClicked.firstName,
              lastName: studentClicked.lastName
            }} submitFunction={handleDeleteStudentClick} setNotVisible={closeDeleteStudentDivVisible} />
          </div>
          {isAddGroupDivVisible && (
            <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setAddGroupDivVisible(false)}></div>
          )}
          <div id='addGroupDiv' className={`w-4/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isAddGroupDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <AddGroup
              submitGroupFunction={handleAddGroupClick}
              groupAdded={groupAdded}
            />
          </div>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={exampleList} selectedItem={selectedItem} onItemClick={handleItemClick} />
          <MyButton onButtonClick={pullSidebar} />
          <div className="settings-content w-11/12 mx-auto pl-5 pr-10 py-10 overflow-auto">
            {selectedItem === "Account" && <AccountSettings />}
            {selectedItem === "Students" && <StudentsSettings handleAddStudentDivVisible={handleAddStudentDivVisible} handleModifyStudentDivVisible={handleModifyStudentDivVisible} handleDeleteStudentDivVisible={handleDeleteStudentDivVisible} setStudents={setStudents} students={students} />}
            {selectedItem === "Groups" && <GroupSettings handleAddGroupDivVisible={handleAddGroupDivVisible} setGroups={setGroups} groups={groups}/>}
          </div>
        </section>
      </div>
    );
  }
}
