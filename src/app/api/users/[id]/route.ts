import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/users';

// NOTE: In a real app, this data would come from a database.
// For mock purposes, we need access to the same in-memory array.
// Ideally, this would be in a shared module, but for simplicity,
// we'll redefine it here. Changes in one route won't affect the other
// unless we implement a more sophisticated in-memory store.
// For now, GET will work, but PUT here won't update the list fetched by GET /api/users.
// This highlights the limitation of simple in-memory mocks for related operations.
// A better mock would use a singleton pattern or a simple file-based store.

let mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'Murad',
    email: 'murad@gmail.com',
    phoneNumber: '(555) 123-4567',
    role: 'Admin',
    status: 'Active',
    createdAt: '2025-02-18T10:30:00Z',
    updatedAt: '2025-02-18T10:30:00Z'
  },
  {
    id: 'user-2',
    username: 'Shafiq Islam',
    email: 'shafiqislam@gmail.com',
    phoneNumber: '(555) 987-6543',
    role: 'Customer',
    status: 'Active',
    createdAt: '2025-02-20T14:45:00Z',
    updatedAt: '2025-02-20T14:45:00Z',
    orderCount: 5,
    reviewCount: 2
  },
  {
    id: 'user-3',
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '(555) 555-5555',
    role: 'Customer',
    status: 'Inactive',
    createdAt: '2025-02-22T09:20:00Z',
    updatedAt: '2025-02-22T09:20:00Z',
    orderCount: 1
  },
  {
    id: 'user-4',
    username: 'Jane Smith',
    email: 'janesmith@gmail.com',
    phoneNumber: '(555) 111-2222',
    role: 'Customer',
    status: 'Banned',
    createdAt: '2025-02-24T14:10:00Z',
    updatedAt: '2025-02-24T14:10:00Z'
  },
  {
    id: 'user-5',
    username: 'Admin User',
    email: 'admin@druckland.com',
    phoneNumber: '(555) 333-4444',
    role: 'Admin',
    status: 'Active',
    createdAt: '2025-02-25T16:30:00Z',
    updatedAt: '2025-02-25T16:30:00Z'
  }
];


// GET handler for fetching a single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT handler for updating a user by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const updatedData: Partial<User> = await request.json();

    const userIndex = mockUsers.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Basic validation (add more as needed)
    if (updatedData.email && mockUsers.some(user => user.email === updatedData.email && user.id !== userId)) {
       return NextResponse.json({ message: "Email already exists for another user" }, { status: 409 }); // Conflict
    }

    // Merge existing data with updated data
    const updatedUser = {
      ...mockUsers[userIndex],
      ...updatedData,
      // Ensure sensitive or non-editable fields are handled correctly
      id: mockUsers[userIndex].id, // Keep original ID
      createdAt: mockUsers[userIndex].createdAt, // Keep original creation date
      updatedAt: new Date().toISOString(), // Update timestamp
      // Don't allow password to be updated to empty string if not provided
      password: updatedData.password || mockUsers[userIndex].password, 
    };

    // Update the in-memory array
    mockUsers[userIndex] = updatedUser;

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error: any) {
    console.error("Error updating user:", error);
     if (error instanceof SyntaxError) {
       return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Note: A DELETE handler could also be added here for /api/users/[id] if needed,
// although the main route /api/users currently handles bulk/single delete via query params.
