// lib/auth.ts
export function saveToken(token: string) {
  // Store the token in a cookie or local storage (depending on your requirements)
  document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
}
