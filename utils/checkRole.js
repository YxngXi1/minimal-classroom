// app/utils/checkRole.js

export function getRoleFromQuery(searchParams) {
    return searchParams.get('role') || null;
  }
  
  export function getRoleFromSession() {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('role');
    }
    return null;
  }
  