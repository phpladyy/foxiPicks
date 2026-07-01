export async function updateTable(session, movieArray, operation) {

  const res = await fetch(`/.netlify/functions/${operation}`, {
    method: "POST",
    body: JSON.stringify({ session, movieArray }),
  });

  const data = await res.json();
  console.log(data);
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}
