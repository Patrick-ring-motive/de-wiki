
export default function transformBody(resBody, ct, hostWiki, hostTarget, hostProxy) {

  if ((ct.indexOf('javascript') > -1)) {
    resBody = resBody.replaceAll(hostWiki, hostProxy);

    resBody = resBody.replaceAll(hostTarget, hostProxy);
  }


  resBody = resBody.replace('<head>', `<head modified><modified/>
      <script src="https://de-wiki.vercel.app/de-wiki/static/links.js"></script>
      <link rel="stylesheet" href="https://de-wiki.vercel.app/de-wiki/static/mods.css">`);


  return resBody;
}