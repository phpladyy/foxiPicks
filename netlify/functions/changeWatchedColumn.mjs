import supabase from "./supabaseClient.mjs";

const changeWatchedColumn = async (req) => {
  const { session, movieArray } = await req.json();
  const { error } = await supabase
    .from("profiles")
    .update({ watched_movies: movieArray })
    .eq("id", session);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
};

export default changeWatchedColumn;

