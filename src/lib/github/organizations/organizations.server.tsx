import { token } from "@/lib/helper";
import React from "react";

export default async function Organizations() {
  const perPage = 90;
  const repos = await fetch(
    `https://api.github.com/organizations?per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  //   if (!Array.isArray(repos)) {
  //     return <p className="text-red-500">No repositories found for {username}</p>;
  //   }

  return repos;
}
