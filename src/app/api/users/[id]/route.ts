import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/users';
// Import functions from the shared mock data store
import { 
    findUserById, 
    updateUser as updateUserInStore, 
    checkEmailExists 
} from '@/lib/mockUserData';

// Remove local mockUsers array definition


// GET handler for fetching a single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    // Find user using the shared function
    const user = findUserById(userId); 

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

    // Find the existing user
    const existingUser = findUserById(userId);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Basic validation (add more as needed)
    // Use shared function to check for email conflict, excluding the current user
    if (updatedData.email && checkEmailExists(updatedData.email, userId)) {
       return NextResponse.json({ message: "Email already exists for another user" }, { status: 409 }); // Conflict
    }

    // Merge existing data with updated data
    const userToUpdate: User = {
      ...existingUser,
      ...updatedData,
      // Ensure sensitive or non-editable fields are handled correctly
      id: existingUser.id, // Keep original ID
      createdAt: existingUser.createdAt, // Keep original creation date
      updatedAt: new Date().toISOString(), // Update timestamp
      // Don't allow password to be updated to empty string if not provided
      // Also ensure the password field exists on the User type
      password: updatedData.password || existingUser.password, 
    };

    // Update user using the shared function
    const success = updateUserInStore(userId, userToUpdate);

    if (!success) {
        // This shouldn't happen if findUserById succeeded, but handle defensively
        return NextResponse.json({ message: "User not found during update attempt" }, { status: 404 });
    }

    return NextResponse.json(userToUpdate, { status: 200 });

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
