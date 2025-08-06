'use client'

import { useState, useEffect, useMemo } from 'react'
import { Header } from '@/components/dashboard/Header'
import { EmployeeTable } from '@/components/dashboard/EmployeesTable'
import { Paginator } from '@/components/dashboard/Paginator'
import { AddEmployeeDialog } from '@/components/dashboard/AddEmployeeDialog'
import { toast } from 'sonner'
import { type Employee, EmployeeSchema } from '@/lib/types'
import initialEmployees from '@/data/employees.json'

type SortConfig = {
  key: keyof Employee | null
  direction: 'asc' | 'desc'
}

type ColumnFilters = {
  nameId: string
  position: string
  team: string
  bday: string
  emailMobile: string
  address: string
  status: string
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [currentPage, setCurrentPage] = useState(1)
  const employeesPerPage = 10

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)

  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false)

  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    nameId: '',
    position: 'All',
    team: '',
    bday: '',
    emailMobile: '',
    address: '',
    status: 'All',
  })
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  })

  const availablePositions = useMemo(() => {
    const positions = new Set<string>()
    employees.forEach((emp) => positions.add(emp.position))
    return Array.from(positions).sort()
  }, [employees])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      const newEmployeeData = JSON.parse(event.data)
      const parsedEmployee = EmployeeSchema.safeParse({
        ...newEmployeeData,
        id: `163-${employees.length + 1}`,
        checked: false,
        expanded: false,
      })

      if (parsedEmployee.success) {
        setEmployees((prevEmployees) => [...prevEmployees, parsedEmployee.data])
        toast(`${parsedEmployee.data.name} has joined the team.`)
      } else {
        console.error(
          'Invalid employee data received from WebSocket:',
          parsedEmployee.error
        )
      }
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      ws.close()
    }
  }, [employees.length])

  const handleToggleExpand = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id
          ? { ...emp, expanded: !emp.expanded }
          : { ...emp, expanded: false }
      )
    )
  }

  const handleToggleCheck = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, checked: !emp.checked } : emp
      )
    )
  }

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    )
    toast(`${updatedEmployee.name}'s details have been successfully updated.`)
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== id)
    )
    toast(`Employee with ID ${id} has been removed.`)
  }

  const handleAddEmployee = (
    newEmployeeData: Omit<Employee, 'id' | 'checked' | 'expanded'>
  ) => {
    const newId = `163-${employees.length + 1}`
    const newEmployee: Employee = {
      ...newEmployeeData,
      id: newId,
      checked: false,
      expanded: false,
    }
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee])
    setIsAddEmployeeDialogOpen(false)
    toast(`${newEmployee.name} has been successfully added.`)
  }

  const handleColumnFilterChange = (
    key: keyof ColumnFilters,
    value: string
  ) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }))
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => ({ ...emp, expanded: false }))
    )
    setCurrentPage(1)
  }

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term)
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => ({ ...emp, expanded: false }))
    )
    setCurrentPage(1)
  }

  const handleSetCategoryFilter = (category: string) => {
    setCategoryFilter(category)
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => ({ ...emp, expanded: false }))
    )
    setCurrentPage(1)
  }

  const handleSort = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees

    if (showSelectedOnly) {
      filtered = filtered.filter((emp) => emp.checked)
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.position.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.address.toLowerCase().includes(lowerCaseSearchTerm)
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((emp) =>
        emp.position.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    }

    if (columnFilters.nameId) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(columnFilters.nameId.toLowerCase()) ||
          emp.id.toLowerCase().includes(columnFilters.nameId.toLowerCase())
      )
    }
    if (columnFilters.position !== 'All') {
      filtered = filtered.filter(
        (emp) => emp.position === columnFilters.position
      )
    }
    if (columnFilters.team) {
      filtered = filtered.filter((emp) =>
        String(emp.team).includes(columnFilters.team)
      )
    }
    if (columnFilters.bday) {
      filtered = filtered.filter((emp) =>
        emp.bday.toLowerCase().includes(columnFilters.bday.toLowerCase())
      )
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
      )
    }
    if (columnFilters.address) {
      filtered = filtered.filter((emp) =>
        emp.address.toLowerCase().includes(columnFilters.address.toLowerCase())
      )
    }
    if (columnFilters.status !== 'All') {
      filtered = filtered.filter((emp) => emp.status === columnFilters.status)
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (sortConfig.key === 'bday') {
            const dateA = new Date(aValue)
            const dateB = new Date(bValue)
            if (dateA < dateB) return sortConfig.direction === 'asc' ? -1 : 1
            if (dateA > dateB) return sortConfig.direction === 'asc' ? 1 : -1
            return 0
          }
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
          return 0
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
          return 0
        }
        return 0
      })
    }

    return filtered
  }, [
    employees,
    showSelectedOnly,
    searchTerm,
    categoryFilter,
    columnFilters,
    sortConfig,
  ])

  const totalPages = Math.ceil(
    filteredAndSortedEmployees.length / employeesPerPage
  )
  const currentEmployees = filteredAndSortedEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  )

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={handleSetSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={handleSetCategoryFilter}
        showSelectedOnly={showSelectedOnly}
        setShowSelectedOnly={setShowSelectedOnly}
        onAddEmployeeClick={() => setIsAddEmployeeDialogOpen(true)}
        availablePositions={availablePositions}
      />
      <EmployeeTable
        employees={currentEmployees}
        onToggleExpand={handleToggleExpand}
        onToggleCheck={handleToggleCheck}
        onSaveEmployee={handleSaveEmployee}
        onDeleteEmployee={handleDeleteEmployee}
        columnFilters={columnFilters}
        sortConfig={sortConfig}
        onSort={handleSort}
        onColumnFilterChange={handleColumnFilterChange}
        availablePositions={availablePositions}
      />
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
        availablePositions={availablePositions}
      />
    </>
  )
}
