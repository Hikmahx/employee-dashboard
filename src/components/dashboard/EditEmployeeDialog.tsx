'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { EmployeeForm } from './EmployeeForm';
import type { Employee } from '@/lib/types';

type EditEmployeeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onSaveEmployee: (employee: Employee) => void;
};

export function EditEmployeeDialog({
  isOpen,
  onClose,
  employee,
  onSaveEmployee,
}: EditEmployeeDialogProps) {
  if (!employee) return null;

  const handleSave = (updatedEmployee: Employee) => {
    onSaveEmployee(updatedEmployee);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[700px] bg-white'>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Make changes to {employee.name}&apos;s details.
          </DialogDescription>
        </DialogHeader>
        <EmployeeForm employee={employee} onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
}
