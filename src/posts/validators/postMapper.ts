export function validatePost(post) {
  if (typeof post !== "object" || post === null) return false;

  const { title, description } = post;

  return typeof title === "string" && typeof description === "string";
}
