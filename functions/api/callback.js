export default async function onRequest(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;
  const origin = url.origin;

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
  });
  const data = await tokenRes.json();
  const token = data.access_token;

  return new Response(`
<!DOCTYPE html>
<html>
<body>
<script>
const token = "${token ?? ""}";
const siteOrigin = "${origin}";
window.location.href = siteOrigin + "/admin#token=" + token;
</script>
</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}