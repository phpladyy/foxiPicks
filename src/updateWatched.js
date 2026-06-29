export async function updateWatched(session, watched, operation, movie, id) {
  const res = await fetch(`/.netlify/functions/${operation}`, {
    method: "POST",
    body: JSON.stringify({ session, watched }),
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}
