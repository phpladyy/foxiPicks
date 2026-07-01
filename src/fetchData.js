export async function fetchData(session,fetchUrl){
        const res = await fetch(fetchUrl, {
      method: "POST",
      body: JSON.stringify({ session }),
    });
    const { data, error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
    return data;
}