import { User } from '@/types/users';

// Shared in-memory store for mock users
// NOTE: This data will reset every time the server restarts in development.
// For true persistence, a database or file storage would be needed.
let mockUsersStore: User[] = [
    {
        id: 'user-1',
        username: 'Murad',
        email: 'murad@gmail.com',
        phoneNumber: '(555) 123-4567',
        role: 'Admin',
        status: 'Active',
        createdAt: '2025-02-18T10:30:00Z',
        updatedAt: '2025-02-18T10:30:00Z',
        password: 'password1' // Added for consistency if needed
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
        reviewCount: 2,
        password: 'password2'
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
        orderCount: 1,
        password: 'password3'
    },
    {
        id: 'user-4',
        username: 'Jane Smith',
        email: 'janesmith@gmail.com',
        phoneNumber: '(555) 111-2222',
        role: 'Customer',
        status: 'Banned',
        createdAt: '2025-02-24T14:10:00Z',
        updatedAt: '2025-02-24T14:10:00Z',
        password: 'password4'
    },
    {
        id: 'user-5',
        username: 'Admin User',
        email: 'admin@druckland.com',
        phoneNumber: '(555) 333-4444',
        role: 'Admin',
        status: 'Active',
        createdAt: '2025-02-25T16:30:00Z',
        updatedAt: '2025-02-25T16:30:00Z',
        password: 'password5'
    }
];

// Export the store directly (simple approach)
// Or export functions to interact with it for better encapsulation
export const getUsers = () => mockUsersStore;
export const findUserById = (id: string) => mockUsersStore.find(u => u.id === id);
export const addUser = (user: User) => { mockUsersStore.push(user); };
export const updateUser = (id: string, updatedUser: User) => {
    const index = mockUsersStore.findIndex(u => u.id === id);
    if (index !== -1) {
        mockUsersStore[index] = updatedUser;
        return true;
    }
    return false;
};
export const deleteUsers = (ids: string[]) => {
    const initialLength = mockUsersStore.length;
    mockUsersStore = mockUsersStore.filter(user => !ids.includes(user.id));
    return initialLength - mockUsersStore.length; // Return count of deleted users
};
export const checkEmailExists = (email: string, excludeId?: string) => {
    return mockUsersStore.some(user => user.email === email && user.id !== excludeId);
};
