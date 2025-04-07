import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/users';

// In-memory store for mock users (replace with database interaction later)
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const searchQuery = searchParams.get('search') || '';
    const statusFilter = searchParams.get('status') || 'All';
    const roleFilter = searchParams.get('role') || 'All';
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // --- Filtering ---
    let filteredUsers = mockUsers.filter(user => {
      // Status filter
      if (statusFilter !== 'All' && user.status !== statusFilter) {
        return false;
      }
      // Role filter
      if (roleFilter !== 'All' && user.role !== roleFilter) {
        return false;
      }
      // Search filter (username, email, role)
      if (searchQuery) {
        const lowerSearch = searchQuery.toLowerCase();
        if (
          !user.username.toLowerCase().includes(lowerSearch) &&
          !user.email.toLowerCase().includes(lowerSearch) &&
          !user.role.toLowerCase().includes(lowerSearch)
        ) {
          return false;
        }
      }
      return true;
    });

    // --- Sorting ---
    filteredUsers.sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (sortField) {
        case 'username':
          valA = a.username;
          valB = b.username;
          break;
        case 'email':
          valA = a.email;
          valB = b.email;
          break;
        case 'role':
          valA = a.role;
          valB = b.role;
          break;
        case 'status':
          valA = a.status;
          valB = b.status;
          break;
        case 'createdAt':
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
          break;
        default:
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
    });

    // --- Pagination ---
    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return NextResponse.json({
      users: paginatedUsers,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Simulate POST operation (adds to in-memory array)
export async function POST(request: NextRequest) {
  try {
    const newUserPartial: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = await request.json();

    // Basic validation (add more as needed)
    if (!newUserPartial.username || !newUserPartial.email || !newUserPartial.role || !newUserPartial.status) {
      return NextResponse.json({ message: "Missing required fields (username, email, role, status)" }, { status: 400 });
    }

    // Check for duplicate email (simple check for mock data)
    if (mockUsers.some(user => user.email === newUserPartial.email)) {
       return NextResponse.json({ message: "Email already exists" }, { status: 409 }); // Conflict
    }

    const newUser: User = {
      ...newUserPartial,
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // Generate a pseudo-unique ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Add default values for optional fields if not provided
      phoneNumber: newUserPartial.phoneNumber || '',
      orderCount: newUserPartial.orderCount || 0,
      reviewCount: newUserPartial.reviewCount || 0,
      profilePicture: newUserPartial.profilePicture || undefined,
    };

    mockUsers.push(newUser);

    return NextResponse.json(newUser, { status: 201 }); // 201 Created

  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error instanceof SyntaxError) {
       return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


// Simulate DELETE operation (modifies in-memory array)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsToDelete = searchParams.getAll('id'); // Expecting one or more 'id' parameters

    if (!idsToDelete || idsToDelete.length === 0) {
      return NextResponse.json({ message: "No user IDs provided for deletion" }, { status: 400 });
    }

    const initialLength = mockUsers.length;
    mockUsers = mockUsers.filter(user => !idsToDelete.includes(user.id));
    const deletedCount = initialLength - mockUsers.length;

    if (deletedCount === 0) {
        return NextResponse.json({ message: "No matching users found to delete" }, { status: 404 });
    }

    return NextResponse.json({ message: `Successfully deleted ${deletedCount} user(s)` }, { status: 200 });

  } catch (error) {
    console.error("Error deleting users:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
