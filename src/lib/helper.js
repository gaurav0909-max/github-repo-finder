export const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

export const usernameWithoutSpaces = (username) => username.replace(/\s/g, "");
