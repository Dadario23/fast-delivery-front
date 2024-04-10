import { updateUser } from '../src/services/dataUsers';
import axios from 'axios';

jest.mock('axios');

describe('updateUser function', () => {
  it('should update user successfully', async () => {
    const mockResponseData = { message: 'Usuario actualizado correctamente' };

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValueOnce({
      data: mockResponseData,
    });

    const updatedUser = await updateUser();

    expect(updatedUser).toEqual(mockResponseData);
  });

  it('should handle errors when updating user', async () => {
    const errorMessage = 'Error updating user';

    (axios.put as jest.MockedFunction<typeof axios.put>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(updateUser()).rejects.toThrow(errorMessage);
  });
});

