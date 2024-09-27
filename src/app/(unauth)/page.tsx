'use client';

import { useState } from 'react';

import { FormGenerator } from '@/components';
import type { IFormDTO } from '@/components/FormGenerator/types';
import { getBaseUrl } from '@/utils/Helpers';

const fetcher = (url: string): Promise<IFormDTO[]> =>
  fetch(url, { cache: 'no-cache' }).then(res => res.json());

export default function Main() {
  const [formScheme, setFormScheme] = useState<IFormDTO[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormScheme([]);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string) as IFormDTO[];
          setFormScheme(jsonData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setErrorMessage('Invalid JSON file. Please upload a valid form schema.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleApiLoad = async () => {
    setFormScheme([]);
    try {
      const data = await fetcher(`${getBaseUrl()}/api/form`);
      setFormScheme(data);
    } catch (error) {
      console.error('Error fetching form schema:', error);
      setErrorMessage('Failed to load form schema from API. Please try again later.');
    }
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative grow">
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
          <div className="flex cursor-pointer items-center justify-center rounded bg-blue-50 px-4 py-2 text-blue-700 transition duration-300 hover:bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 size-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap text-sm font-semibold">Upload File</span>
          </div>
        </div>
        <span className="font-medium text-gray-500">or</span>
        <button
          type="button"
          onClick={handleApiLoad}
          className="flex items-center whitespace-nowrap rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 size-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clipRule="evenodd" />
          </svg>
          Load from API
        </button>
      </div>
      {formScheme.length > 0 && <FormGenerator formScheme={formScheme} />}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}
