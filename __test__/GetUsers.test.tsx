import { getUsers } from '../src/services/dataUsers'; 
import axios from 'axios'; 

jest.mock('axios');

describe('getUsers function', () => {
  it('should fetch users successfully', async () => {
    const mockUsersData = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]; 
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockUsersData });
    const users = await getUsers();
    expect(users).toEqual(mockUsersData);
  });

  it('should handle errors when fetching users', async () => {
    const errorMessage = 'Error fetching users'; 
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error(errorMessage));
    await expect(getUsers()).rejects.toThrow(errorMessage);
  });
});





