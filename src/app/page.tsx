'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/dashboard/Header';
import { EmployeeTable } from '@/components/dashboard/EmployeesTable';
import { Paginator } from '@/components/dashboard/Paginator';
import { AddEmployeeDialog } from '@/components/dashboard/AddEmployeeDialog';
import { EmployeeGridCard } from '@/components/dashboard/EmployeeGridCard';
import { EditEmployeeDialog } from '@/components/dashboard/EditEmployeeDialog';
import { toast } from 'sonner';
import { type Employee, EmployeeSchema } from '@/lib/types';

type SortConfig = {
  key: keyof Employee | null;
  direction: 'asc' | 'desc';
};

type ColumnFilters = {
  nameId: string;
  position: string;
  team: string;
  bday: string;
  emailMobile: string;
  address: string;
  status: string;
};

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
  },
];

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 4;

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [layoutView, setLayoutView] = useState<'list' | 'grid'>('list');
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);

  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    nameId: '',
    position: 'All',
    team: '',
    bday: '',
    emailMobile: '',
    address: 'All',
    status: 'All',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });

  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(
    null
  );
  const [checkedEmployeeIds, setCheckedEmployeeIds] = useState<Set<string>>(
    new Set()
  );

  const [isEditEmployeeDialogOpen, setIsEditEmployeeDialogOpen] =
    useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080');

  //   ws.onopen = () => {
  //     console.log('WebSocket connected');
  //   };

  //   ws.onmessage = (event) => {
  //     const newEmployeeData = JSON.parse(event.data);
  //     // Validate incoming WebSocket data with Zod schema
  //     const parsedEmployee = EmployeeSchema.safeParse({
  //       ...newEmployeeData,
  //       id: `163-${employees.length + 1}`, // Assign a new ID for consistency
  //     });

  //     if (parsedEmployee.success) {
  //       setEmployees((prevEmployees) => [
  //         ...prevEmployees,
  //         parsedEmployee.data,
  //       ]);
  //       toast({
  //         title: 'New Employee Added via WebSocket',
  //         description: `${parsedEmployee.data.name} has joined the team.`,
  //       });
  //     } else {
  //       console.error(
  //         'Invalid employee data received from WebSocket:',
  //         parsedEmployee.error
  //       );
  //     }
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
  // }, [employees.length, toast]);

  const handleToggleExpand = (id: string) => {
    setExpandedEmployeeId((prevId) => (prevId === id ? null : id));
  };

  const handleToggleCheck = (id: string) => {
    setCheckedEmployeeIds((prevIds) => {
      const newIds = new Set(prevIds);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  };

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    toast(`${updatedEmployee.name}'s details have been successfully updated.`);
    setIsEditEmployeeDialogOpen(false);
    setEmployeeToEdit(null);
  };

  const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id'>) => {
    const newId = `163-${employees.length + 1}`; // Simple ID generation
    const newEmployee: Employee = { ...newEmployeeData, id: newId };
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    setIsAddEmployeeDialogOpen(false);
    toast(`${newEmployee.name} has been successfully added.`);
  };

  const handleColumnFilterChange = (
    key: keyof ColumnFilters,
    value: string
  ) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
    setExpandedEmployeeId(null);
    setCurrentPage(1);
  };

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term);
    setExpandedEmployeeId(null);
    setCurrentPage(1);
  };

  const handleSetCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    setExpandedEmployeeId(null);
    setCurrentPage(1);
  };

  const handleSort = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleEditEmployeeClick = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsEditEmployeeDialogOpen(true);
  };

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees;

    // Global search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.position.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.address.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Category filter (example, assuming 'position' maps to categories)
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((emp) =>
        emp.position.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    // Column filters
    if (columnFilters.nameId) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(columnFilters.nameId.toLowerCase()) ||
          emp.id.toLowerCase().includes(columnFilters.nameId.toLowerCase())
      );
    }
    if (columnFilters.position !== 'All') {
      filtered = filtered.filter(
        (emp) => emp.position === columnFilters.position
      );
    }
    if (columnFilters.team) {
      filtered = filtered.filter((emp) =>
        String(emp.team).includes(columnFilters.team)
      );
    }
    if (columnFilters.bday) {
      filtered = filtered.filter((emp) =>
        emp.bday.toLowerCase().includes(columnFilters.bday.toLowerCase())
      );
    }
    if (columnFilters.emailMobile) {
      filtered = filtered.filter(
        (emp) =>
          emp.email
            .toLowerCase()
            .includes(columnFilters.emailMobile.toLowerCase()) ||
          emp.mobile
            .toLowerCase()
            .includes(columnFilters.emailMobile.toLowerCase())
      );
    }
    if (columnFilters.address !== 'All') {
      filtered = filtered.filter(
        (emp) => emp.address === columnFilters.address
      );
    }
    if (columnFilters.status !== 'All') {
      filtered = filtered.filter((emp) => emp.status === columnFilters.status);
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          // Handle date sorting
          if (sortConfig.key === 'bday') {
            const dateA = new Date(aValue);
            const dateB = new Date(bValue);
            if (dateA < dateB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (dateA > dateB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
          }
          // Default string sorting
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          // Number sorting
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        }
        return 0;
      });
    }

    return filtered;
  }, [employees, searchTerm, categoryFilter, columnFilters, sortConfig]);

  const totalPages = Math.ceil(
    filteredAndSortedEmployees.length / employeesPerPage
  );
  const currentEmployees = filteredAndSortedEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={handleSetSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={handleSetCategoryFilter}
        layoutView={layoutView}
        setLayoutView={setLayoutView}
        onAddEmployeeClick={() => setIsAddEmployeeDialogOpen(true)}
      />
      {layoutView === 'list' ? (
        <EmployeeTable
          employees={currentEmployees}
          onToggleExpand={handleToggleExpand}
          onToggleCheck={handleToggleCheck}
          onSaveEmployee={handleSaveEmployee}
          columnFilters={columnFilters}
          sortConfig={sortConfig}
          onSort={handleSort}
          expandedEmployeeId={expandedEmployeeId}
          checkedEmployeeIds={checkedEmployeeIds}
          onColumnFilterChange={handleColumnFilterChange}
        />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {currentEmployees.map((employee) => (
            <EmployeeGridCard
              key={employee.id}
              employee={employee}
              onToggleExpand={handleToggleExpand}
              onToggleCheck={handleToggleCheck}
              onSaveEmployee={handleSaveEmployee}
              isExpanded={employee.id === expandedEmployeeId}
              isChecked={checkedEmployeeIds.has(employee.id)}
              onEditClick={handleEditEmployeeClick}
            />
          ))}
        </div>
      )}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        totalEmployees={filteredAndSortedEmployees.length}
        onPageChange={setCurrentPage}
      />
      <AddEmployeeDialog
        isOpen={isAddEmployeeDialogOpen}
        onClose={() => setIsAddEmployeeDialogOpen(false)}
        onAddEmployee={handleAddEmployee}
      />
      <EditEmployeeDialog
        isOpen={isEditEmployeeDialogOpen}
        onClose={() => setIsEditEmployeeDialogOpen(false)}
        employee={employeeToEdit}
        onSaveEmployee={handleSaveEmployee}
      />
    </>
  );
}
