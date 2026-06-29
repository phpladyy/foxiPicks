import supabase from "./supabaseClient.mjs";

const getProfile = async (req) => {
  const { session } = await req.json();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session)
    .maybeSingle();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data });
};

export default getProfile;
