import supabase from "./supabaseClient.mjs";

const addWatched = async (req) => {
  const { session, watched, movie } = await req.json();

  const { error } = await supabase
    .from("profiles")
    .update({ watched_movies: [...watched, movie] })
    .eq("id", session);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
};

export default addWatched;
