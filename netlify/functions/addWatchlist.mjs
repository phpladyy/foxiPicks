import supabase from "./supabaseClient.mjs";

const addWatchlist = async (req) => {
  const { session, movieArray } = await req.json();
  const { error } = await supabase
    .from("profiles")
    .update({ watch_list: movieArray })
    .eq("id", session);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
};

export default addWatchlist;
