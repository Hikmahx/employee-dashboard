'use client';

import type React from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { Employee } from '@/lib/types';
// import type { Employee } from '@/components/employee-dashboard'; // Import Employee type

type EmployeeEditFormProps = {
  employee: Employee;
  onSave: (employee: Employee) => void;
};

export function EmployeeForm({ employee, onSave }: EmployeeEditFormProps) {
  const [formData, setFormData] = useState(employee);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
      <div className='space-y-1'>
        <label htmlFor='surname' className='text-xs text-gray-500'>
          Surname
        </label>
        <Input
          id='surname'
          name='surname'
          value={formData.surname}
          onChange={handleChange}
          className='h-8'
        />
      </div>
      <div className='space-y-1'>
        <label htmlFor='position' className='text-xs text-gray-500'>
          Position
        </label>
        <Select
          name='position'
          value={formData.position}
          onValueChange={(val) => handleSelectChange('position', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Select position' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Designer'>Designer</SelectItem>
            <SelectItem value='Product manager'>Product manager</SelectItem>
            <SelectItem value='Engineer'>Engineer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1'>
        <label htmlFor='team' className='text-xs text-gray-500'>
          Team
        </label>
        <Select
          name='team'
          value={String(formData.team)}
          onValueChange={(val) => handleSelectChange('team', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Select team' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='15'>15</SelectItem>
            <SelectItem value='21'>21</SelectItem>
            <SelectItem value='35'>35</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1'>
        <label htmlFor='name' className='text-xs text-gray-500'>
          Name
        </label>
        <Input
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='h-8'
        />
      </div>
      <div className='space-y-1'>
        <label htmlFor='experience' className='text-xs text-gray-500'>
          Experience
        </label>
        <Select
          name='experience'
          value={formData.experience}
          onValueChange={(val) => handleSelectChange('experience', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Select experience' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1 year'>1 year</SelectItem>
            <SelectItem value='3 years'>3 years</SelectItem>
            <SelectItem value='5 years'>5 years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1'>
        <label htmlFor='bday' className='text-xs text-gray-500'>
          Bday
        </label>
        <div className='relative'>
          <Input
            id='bday'
            name='bday'
            value={formData.bday}
            onChange={handleChange}
            className='h-8 pr-8'
          />
          <Calendar className='absolute right-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </div>
      <div className='space-y-1'>
        <label htmlFor='email' className='text-xs text-gray-500'>
          E-mail
        </label>
        <Input
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='h-8'
        />
      </div>
      <div className='space-y-1'>
        <label htmlFor='mobile' className='text-xs text-gray-500'>
          Mobile
        </label>
        <Input
          id='mobile'
          name='mobile'
          value={formData.mobile}
          onChange={handleChange}
          className='h-8'
        />
      </div>
      <div className='space-y-1'>
        <label htmlFor='address' className='text-xs text-gray-500'>
          Address
        </label>
        <Select
          name='address'
          value={formData.address}
          onValueChange={(val) => handleSelectChange('address', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Select address' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Minsk, Pobeditelay, 135'>
              Minsk, Pobeditelay, 135
            </SelectItem>
            <SelectItem value='Minsk, Derzinskogo, 47'>
              Minsk, Derzinskogo, 47
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1'>
        <label htmlFor='status' className='text-xs text-gray-500'>
          Status
        </label>
        <Select
          name='status'
          value={formData.status}
          onValueChange={(val) => handleSelectChange('status', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Full-time'>Full-time</SelectItem>
            <SelectItem value='Part-time'>Part-time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='col-span-full flex justify-end'>
        <Button
          onClick={handleSubmit}
          className='bg-teal-500 hover:bg-teal-600 text-white'
        >
          Save
        </Button>
      </div>
    </div>
  );
}
