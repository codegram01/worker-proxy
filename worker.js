export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);

      const proxyUrl = url.searchParams.get('proxyUrl'); 
  
      if (!proxyUrl) {
        return new Response('Bad request: Missing `proxyUrl` query param. Useage: you can call proxy like this https://proxy.wingram.org?proxyUrl=https://example.com', { status: 400 });
      }
  
      const newRequest = new Request(request)
      // newRequest.headers.set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0");
      newRequest.headers.delete("User-Agent")
  
      let res = await fetch(proxyUrl, newRequest);
  
      res = new Response(res.body, res)

      res.headers.set("Access-Control-Allow-Origin",  "*");
      
      return res;
    },
  };