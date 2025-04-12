const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/api/auth/google`;
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/api/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
      //throw new Error('Not authenticated');
    }

    return await response.json();
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
};

export const logout = async () => {
  await fetch(`${API_URL}/api/logout`, { credentials: 'include' });
  window.location.href = '/';
};

export const createPostApi = async (payload) => {
  console.log('payload', payload);
  // try {
  //   const response = await fetch(`${API_URL}/api/me`, {
  //     credentials: 'include',
  //   });

  //   if (!response.ok) {
  //     return null;
  //     //throw new Error('Not authenticated');
  //   }

  //   return await response.json();
  // } catch (error) {
  //   console.error('Auth check failed:', error);
  //   return null;
  // }
};
