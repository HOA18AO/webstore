function getApiUrl() {
  return (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3008"
  );
}

async function getHealth() {
  try {
    const res = await fetch(`${getApiUrl()}/health`, { cache: "no-store" });
    return await res.json();
  } catch (err) {
    return {
      error: "API unreachable",
      detail: err instanceof Error ? err.message : String(err),
      hint: "Is the server running on " + getApiUrl() + "?",
    };
  }
}

export default async function Home() {
  const data = await getHealth();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}