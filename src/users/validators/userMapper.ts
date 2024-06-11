export function validateUser(user) {
  if (typeof user !== "object" || user === null) return false;

  const { username, password } = user;

  return typeof username === "string" && typeof password === "string";
}
