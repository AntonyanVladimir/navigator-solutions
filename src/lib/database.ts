const redact = (value: string) => {
  try {
    const parsed = new URL(value);
    if (parsed.password) {
      parsed.password = "***";
    }
    return {
      host: parsed.hostname,
      database: parsed.pathname.replace(/^\//, ""),
      display: `${parsed.protocol}//${parsed.username ? `${parsed.username}@` : ""}${parsed.hostname}${parsed.port ? `:${parsed.port}` : ""}${parsed.pathname}`,
    };
  } catch (error) {
    console.error("Invalid VITE_DATABASE_URL", error);
    return null;
  }
};

export const reportDatabaseTarget = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (!import.meta.env.DEV) {
    return;
  }

  const connectionString = import.meta.env.VITE_DATABASE_URL;

  if (!connectionString) {
    console.warn("VITE_DATABASE_URL is not configured. Database features are disabled.");
    return;
  }

  const info = redact(connectionString);
  if (!info) {
    return;
  }

  console.info(`Database configured for host ${info.host} (db: ${info.database}).`);
  return info;
};
