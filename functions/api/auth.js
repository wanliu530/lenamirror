export default async function onRequest(context) {
  const { env, request } = context;
  const clientId = env.GITHUB_CLIENT_ID;
  const origin = new URL(request.url).origin;
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", `${origin}/api/callback`);
  authUrl.searchParams.set("scope", "repo");
  return Response.redirect(authUrl.toString(), 302);
}