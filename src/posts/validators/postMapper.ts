export function validatePost(post) {
  if (typeof post !== "object" || post === null) return false;

  const { title, problem_description, solution_description } = post;

  return typeof title === "string" && typeof problem_description === "string" && typeof solution_description === "string";
}
