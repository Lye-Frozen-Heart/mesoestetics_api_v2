export function validateUser(user) {
  if (typeof user !== "object" || user === null) return false;

  const { username, password, email, role } = user;

  return (
    typeof username === "string" &&
    typeof password === "string" &&
    typeof email === "string" &&
    (role === "Regular" || role === "Admin")
  );
}
