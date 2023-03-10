import fetch from 'node-fetch';
import http from 'http';
import transformBody from './src/body-transform.mjs';


const hostProxy = 'de-wiki.weblet.repl.co';
const hostTarget = 'de-m-wikipedia-org.translate.goog';//'1-de--wiki-webserve-workers-dev.translate.goog';
const hostTranslate = 'de-m-wikipedia-org.translate.goog';
const hostWiki = 'de.m.wikipedia.org';



http.createServer(onRequest).listen(3000);

async function onRequest(req, res) {
  let translator = '_x_tr_sl=de&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp';
  let path = req.url.replaceAll('*', '');
  let pat = path.split('?')[0].split('#')[0];

  //console.log(path);

  /*respond to ping from uptime robot*/
  if (path == '/ping') {
    res.statusCode = 200;
    return res.end();
  }

  if (pat == '/robots.txt') {
    res.statusCode = 200;
    return res.end(
      `User-agent: *
Allow: /`);

  }

  req.headers.host = hostTarget;
  req.headers.referer = hostTarget;
  /* start reading the body of the request*/
  let bdy = "";
  req.on('readable', function() {
    bdy += req.read();
  });

  req.on('end', async function() {


    /* start copying over the other parts of the request */
    let options = {
      method: req.method,
      headers: req.headers
    };
    /* fetch throws an error if you send a body with a GET request even if it is empty */
    if ((req.method != 'GET') && (req.method != 'HEAD') && (bdy.length > 0)) {
      options = {
        method: req.method,
        headers: req.headers,
        body: bdy
      };
    }
    /* finish copying over the other parts of the request */

    /* fetch from your desired target */
    let response = new Response();
    try {
      response = await fetch('https://' + hostTarget + path, options);

    } catch (e) {

      response = await fetch('https://' + hostWiki + path, options);

    }
    /* copy over response headers */

    res.headers = response.headers;

    /* check to see if the response is not a text format */
    let ct = response.headers.get('content-type');

    if ((ct) && (ct.indexOf('image') == -1) && (ct.indexOf('video') == -1) && (ct.indexOf('audio') == -1)) {

      if (path.indexOf(translator) == -1) {
        /* if not a text response then redirect straight to target */
        if (path.indexOf('?') == -1) {
          translator = '?' + translator;
        } else {
          translator = '&' + translator;
        }
        res.setHeader('location', 'https://' + hostProxy + path + translator);
        res.statusCode = 301;
        return res.end();

      }

      /* Copy over target response and return */
      let resBody = await response.text();



      res.end(transformBody(resBody, ct, hostWiki, hostTarget, hostProxy));


    } else {

      /* if not a text response then redirect straight to target */
      res.setHeader('location', 'https://' + hostTarget + path);
      res.statusCode = 301;
      res.end();

    }

  });


}