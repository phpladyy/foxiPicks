import supabase from "./supabaseClient.mjs";

const login = async (req) => {
  const { access_token } = await req.json();
  const googleRes = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    },
  );
  const userData = await googleRes.json();

  if (!userData.id) {
    return Response.json({ error: "Invalid Google token" }, { status: 401 });
  }

  // checking if profile exists
  const { data: existingProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.id)
    .maybeSingle();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  if (existingProfile) {
    return Response.json({ profile: existingProfile, sessionId: userData.id });
  }

  //  creating new profile handler
  const { data: newProfile, error: insertError } = await supabase
    .from("profiles")
    .insert([
      {
        id: userData.id,
        name: userData.name,
        avatar: userData.picture,
        watched_movies: [],
      },
    ])
    .select()
    .maybeSingle();

  if (insertError)
    return Response.json({ error: insertError.message }, { status: 500 });

  return Response.json({ profile: newProfile, sessionId: userData.id });
};

export default login;
