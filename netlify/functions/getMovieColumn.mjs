import supabase from "./supabaseClient.mjs";


const getMovieColumn = async (req) => {
    const url = new URL(req.url);
  const table = url.searchParams.get("t");
  const { session } = await req.json();
  const { data, error } = await supabase
    .from("profiles")
    .select(table)
    .eq("id", session);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) return Response.json({ watched: [] });

  return Response.json({ watched: data[0].watched_movies || [] });
};

export default getMovieColumn;
