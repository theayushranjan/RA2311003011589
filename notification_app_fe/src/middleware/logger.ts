export type FrontendPackage = 
  | "api" 
  | "component" 
  | "hook" 
  | "page" 
  | "state" 
  | "style" 
  | "auth" 
  | "config" 
  | "middleware" 
  | "utils";

const LOG_API = "/api/log";

let authToken: string = "";

export const setLoggerToken = (token: string) => {
  authToken = token;
};

export const Log = async (
  stack: "frontend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg: FrontendPackage,
  message: string
) => {
  try {
    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message, token: authToken }),
    });
  } catch {
    // silent fail — never break app for logging
  }
};
