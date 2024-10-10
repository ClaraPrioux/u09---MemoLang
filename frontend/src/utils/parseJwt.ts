// utils/parseJwt.ts

/**
 * Parses a JWT token and returns the decoded payload.
 * @param token - The JWT token as a string.
 * @returns The decoded payload as an object, or null if the token is invalid.
 */
function parseJwt(token: string): { [key: string]: string } | null {
  if (!token) {
    return null; // Return null if token is not provided
  }

  try {
    const base64Url = token.split(".")[1]; // Get the payload part (second part of the token)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
    const jsonPayload = decodeURIComponent(escape(window.atob(base64))); // Decode Base64 string

    return JSON.parse(jsonPayload); // Parse JSON string to object
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null; // Return null if parsing fails
  }
}

export default parseJwt;
