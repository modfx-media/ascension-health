import type { Access } from "payload";

export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Public visitors only see published documents. Logged-in editors see drafts. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true;
  return {
    _status: {
      equals: "published",
    },
  };
};
