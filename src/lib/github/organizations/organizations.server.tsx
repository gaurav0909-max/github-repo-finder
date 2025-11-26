import { token } from "@/lib/helper";
import React from "react";

export default async function Organizations() {
  const perPage = 90;
  const response = await fetch(
    `https://api.github.com/organizations?per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch organizations: ${response.statusText}`);
  }

  const repos = await response.json();

  if (!Array.isArray(repos)) {
    throw new Error('Invalid response: expected array of organizations');
  }

  return repos;
}
