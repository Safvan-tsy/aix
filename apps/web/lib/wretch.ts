import wretch from "wretch";
import AbortAddon from "wretch/addons/abort";

export const ServerApi = wretch(`https://aix-backend.onrender.com/api`).addon(
  AbortAddon()
);
