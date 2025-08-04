'use client';

import { EmployeeTable } from '@/components/dashboard/EmployeesTable';
import { Header } from '@/components/dashboard/Header';
import { Paginator } from '@/components/dashboard/Paginator';
import { Employee } from '@/lib/types';
import { useState, useEffect } from 'react';
// import { DashboardHeader } from '@/components/dashboard';
// import { EmployeeTable } from '@/components/dashboard/employee-table';
// import { TablePagination } from '@/components/dashboard/table-pagination';
// import { EmployeeRow as EmployeeRowComponent } from '@/components/dashboard/employee-row';

const initialEmployees: Employee[] = [
  {
    id: '163-1',
    name: 'Selivanova Vera',
    surname: 'Selivanova',
    position: 'Designer',
    experience: '3 years',
    team: 15,
    bday: 'Aug 15, 1986',
    email: 'abramov@gmail.com',
    mobile: '+375(29)-298-44-44',
    address: 'Minsk, Pobeditelay, 135',
    status: 'Full-time',
    checked: false,
    expanded: false,
  },
  {
    id: '163-2',
    name: 'Abramov Andrey',
    surname: 'Abramov',
    position: 'Product manager',
    experience: '3 years',
    team: 10,
    bday: 'Apr 20, 1987',
    email: 'abramov@gmail.com',
    mobile: '+375(29)-298-44-44',
    address: 'Minsk, Pobeditelay, 135',
    status: 'Full-time',
    checked: true,
    expanded: true,
  },
  {
    id: '163-3',
    name: 'Durov Dmitriy',
    surname: 'Durov',
    position: 'Designer',
    experience: '3 years',
    team: 35,
    bday: 'Apr 10, 1988',
    email: 'abramov@gmail.com',
    mobile: '+375(29)-298-44-44',
    address: 'Minsk, Derzinskogo, 47',
    status: 'Full-time',
    checked: false,
    expanded: false,
  },
  {
    id: '163-4',
    name: 'Antonov Maksim',
    surname: 'Antonov',
    position: 'Product manager',
    experience: '3 years',
    team: 21,
    bday: 'Dec 28, 1984',
    email: 'abramov@gmail.com',
    mobile: '+375(29)-298-44-44',
    address: 'Minsk, Pobeditelay, 135',
    status: 'Full-time',
    checked: false,
    expanded: false,
  },
];

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 4; // Based on the initial data and image

  // useEffect(() => {
  //   // Establish WebSocket connection
  //   // NOTE: For this to work in your local environment, you need to run the Node.js WebSocket server
  //   // provided in `scripts/websocket-server.js` separately.
  //   // In the v0 preview, this connection will likely fail as there's no local server running.
  //   const ws = new WebSocket('ws://localhost:8080');

  //   ws.onopen = () => {
  //     console.log('WebSocket connected');
  //   };

  //   ws.onmessage = (event) => {
  //     const newEmployee: Employee = JSON.parse(event.data);
  //     setEmployees((prevEmployees) => [
  //       ...prevEmployees,
  //       { ...newEmployee, checked: false, expanded: false },
  //     ]);
  //   };

  //   ws.onclose = () => {
  //     console.log('WebSocket disconnected');
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  const handleToggleExpand = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id
          ? { ...emp, expanded: !emp.expanded }
          : { ...emp, expanded: false }
      )
    );
  };

  const handleToggleCheck = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, checked: !emp.checked } : emp
      )
    );
  };

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const totalPages = Math.ceil(employees.length / employeesPerPage);
  const currentEmployees = employees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <Header />
      <EmployeeTable
        employees={currentEmployees}
        onToggleExpand={handleToggleExpand}
        onToggleCheck={handleToggleCheck}
        onSaveEmployee={handleSaveEmployee}
      />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        totalEmployees={employees.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

