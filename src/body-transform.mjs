
export default function transformBody(resBody,ct,hostWiki,hostTarget,hostProxy){

if ((ct.indexOf('javascript') > -1)) {
       resBody = resBody.replaceAll(hostWiki, hostProxy);

        resBody = resBody.replaceAll(hostTarget, hostProxy);
      }


      resBody = resBody.replace('<head>', `<head modified><modified/>
      <script src="https://patrick-ring-motive.github.io/de-wiki/static/links.js"></script>
      <link rel="stylesheet" href="https://patrick-ring-motive.github.io/de-wiki/static/mods.css">`);

  resBody = resBody.replace('</body>', `<script src="https://patrick-ring-motive.github.io/de-wiki/static/search.js"></script><modified/></BODY>`);

  return resBody;
}