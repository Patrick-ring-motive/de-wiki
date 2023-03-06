export default function handleRequest(req,hostTarget,fun){

  req.headers.host = hostTarget;
  req.headers.referer = hostTarget;
  /* start reading the body of the request*/
  let bdy = "";
  req.on('readable', function() {
    bdy += req.read();
  });
  /* finish reading the body of the request*/
 return req.on('end',fun);

}