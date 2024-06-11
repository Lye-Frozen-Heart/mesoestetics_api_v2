export function validatePost(post) {
  if (typeof post !== "object" || post === null) return false;

  const { title, description, status } = post;

  return (
    typeof title === "string" &&
    typeof description === "string" &&
    (status === "Cancelled" ||
      status === "Hidden" ||
      status === "Accepted" ||
      status === "Seen" ||
      status === "Resolved" ||
      status === "OnAir")
  );
}
