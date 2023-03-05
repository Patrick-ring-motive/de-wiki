import fetch from 'node-fetch';
import http from 'http';

const hostProxy = 'de-wiki.oddjobhat.repl.co';
const hostTarget = 'de-m-wikipedia-org.translate.goog';
const hostWiki = 'de.m.wikipedia.org';
const translator = '?_x_tr_sl=de&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp';


http.createServer(onRequest).listen(3000);

async function onRequest(req, res) {

  let path = req.url;

  console.log(path);

  /*respond to ping from uptime robot*/
  if (path == '/ping') {
    res.statusCode = 200;
    return res.end();
  }



  req.headers.host = hostTarget;
  req.headers.referer = hostTarget;



  /* start reading the body of the request*/
  let bdy = "";
  req.on('readable', function() {
    bdy += req.read();
  });
  req.on('end', async function() {
    /* finish reading the body of the request*/

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
      try{
      response = await fetch('https://' + hostTarget + req.url, options);
      }catch(e){
      response = await fetch('https://' + hostWiki + req.url, options);
      }
    /* copy over response headers 

    
    */


    res.headers = response.headers;

    /* check to see if the response is not a text format */
    let ct = response.headers.get('content-type');

    if ((ct) && (ct.indexOf('image') == -1) && (ct.indexOf('video') == -1) && (ct.indexOf('audio') == -1)) {

        if (path.indexOf(translator) == -1) {
    /* if not a text response then redirect straight to target */
    res.setHeader('location', 'https://' + hostProxy + path.split('?')[0] + translator);
    res.statusCode = 302;
    res.end();

  }

      /* Copy over target response and return */
      let resBody = await response.text();

      resBody = resBody.replaceAll('hostWiki', 'hostProxy');

      resBody = resBody.replaceAll('hostTarget', 'hostProxy');

      resBody = resBody.replace('<head>','<head><script src="https://patrick-ring-motive.github.io/de-wiki/static/links.js"></script><link rel="stylesheet" href="https://patrick-ring-motive.github.io/de-wiki/static/mods.css">');
      
      res.end(resBody);


    } else {

      /* if not a text response then redirect straight to target */
      res.setHeader('location', 'https://' + hostTarget + req.url);
      res.statusCode = 302;
      res.end();

    }
  });


}