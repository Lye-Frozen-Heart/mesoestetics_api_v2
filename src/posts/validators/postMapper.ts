import { Tag, StatusEnum, NonSensitivePost } from "../../types";
export function validatePost(post: any): post is NonSensitivePost {
  if (typeof post !== "object" || post === null) return false;

  const { title, description, images, tags, status, likes } = post;

  return (
    typeof title === "string" &&
    typeof description === "string" &&
    Array.isArray(images) &&
    images.every((image) => typeof image === "string") &&
    Array.isArray(tags) &&
    tags.every((tag) => validateTag(tag)) &&
    Object.values(StatusEnum).includes(status) &&
    typeof likes === "number"
  );
}

export function validateTag(tag: string): tag is Tag {
  return typeof tag === "string";
}
