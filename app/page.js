'use client'
{/*
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function PetCenter() {
  const [pets, setPets] = useState([])
  const [openDropdownId, setOpenDropdownId] = useState(null)

  // Fetch pets from the API when the component mounts
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets')
        const data = await response.json()
        setPets(data)
      } catch (error) {
        console.error('Error fetching pets:', error)
      }
    }

    fetchPets()
  }, [])

  // Function to update the health condition of a pet
  const updateHealthCondition = async (id, newCondition) => {
    try {
      const response = await fetch('/api/send_it_back', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pet_id: id, health_condition: newCondition }),
      });

      if (response.ok) {
        // Update the state if the request was successful
        setPets(pets.map(pet => 
          pet.pet_id === id ? { ...pet, health_condition: newCondition } : pet
        ));
        alert(`This pet (ID: ${id})'s health condition has been updated to ${newCondition}`);      } else {
        const errorData = await response.json();
        console.error('Error updating health condition:', errorData.error);
      }

      // Close the dropdown after updating
      setOpenDropdownId(null);
    } catch (error) {
      console.error('Error updating health condition:', error);
    }
  };

  // Function to toggle the dropdown for a specific pet
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pet Center</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Health Condition</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.pet_id}>
                <td>{pet.name}</td>
                <td>{pet.breed}</td>
                <td>{pet.age}</td>
                <td>{pet.health_condition}</td>
                <td>{pet.status}</td>
                <td>
                  <div className="relative">
                    <button 
                      onClick={() => toggleDropdown(pet.pet_id)}
                      className="btn btn-sm m-1 flex items-center"
                    >
                      Update Health
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </button>
                    {openDropdownId === pet.pet_id && (
                      <ul className="absolute mt-1 bg-white border rounded shadow-lg w-36 z-10">
                        {['Poor', 'Good', 'Underweight'].map((condition) => (
                          <li key={condition}>
                            <button
                              onClick={() => updateHealthCondition(pet.pet_id, condition)}
                              className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                            >
                              {condition}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
*/}

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function PetCenter() {
  const [pets, setPets] = useState([])
  const [openDropdownId, setOpenDropdownId] = useState(null)

  // Fetch pets from the API when the component mounts
  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets')
      const data = await response.json()
      setPets(data)
    } catch (error) {
      console.error('Error fetching pets:', error)
    }
  }

  useEffect(() => {
    fetchPets()
  }, [])

  // Function to update the health condition of a pet
  const updateHealthCondition = async (id, newCondition) => {
    try {
      const response = await fetch('/api/send_it_back', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pet_id: id, health_condition: newCondition }),
      });

      if (response.ok) {
        alert(`This pet (ID: ${id})'s health condition has been updated to ${newCondition}`);
        // Re-fetch pets to update the table
        await fetchPets();
      } else {
        const errorData = await response.json();
        console.error('Error updating health condition:', errorData.error);
      }

      // Close the dropdown after updating
      setOpenDropdownId(null);
    } catch (error) {
      console.error('Error updating health condition:', error);
    }
  };

  // Function to toggle the dropdown for a specific pet
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pet Center</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Health Condition</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.pet_id}>
                <td>{pet.name}</td>
                <td>{pet.breed}</td>
                <td>{pet.age}</td>
                <td>{pet.health_condition}</td>
                <td>{pet.status}</td>
                <td>
                  <div className="relative">
                    <button 
                      onClick={() => toggleDropdown(pet.pet_id)}
                      className="btn btn-sm m-1 flex items-center"
                    >
                      Update Health
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </button>
                    {openDropdownId === pet.pet_id && (
                      <ul className="absolute mt-1 bg-white border rounded shadow-lg w-36 z-10">
                        {['Poor', 'Good', 'Underweight'].map((condition) => (
                          <li key={condition}>
                            <button
                              onClick={() => updateHealthCondition(pet.pet_id, condition)}
                              className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                            >
                              {condition}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
