void async function links(){

const hostProxy = 'de-wiki.oddjobhat.repl.co';
const hostTarget = 'de-m-wikipedia-org.translate.goog';
const hostWiki = 'de.m.wikipedia.org';

setInterval(async function(){
  
const href_list=document.querySelectorAll(`
[href*="`+hostWiki+`"],
[href*="`+hostTarget+`"]
`);
const href_list_length=href_list.length;

  for(let i=0;i<href_list_length;i++){try{
    href_list[i].href=href_list[i].href.replaceAll(hostWiki,hostProxy);
    href_list[i].href=href_list[i].href.replaceAll(hostTarget,hostProxy)  
  }catch(e){continue;}}
                                      
const src_list=document.querySelectorAll(`
[src*="`+hostWiki+`"],
[src*="`+hostTarget+`"]
`);
const src_list_length=src_list.length;

  for(let i=0;i<src_list_length;i++){try{
    src_list[i].src=src_list[i].src.replaceAll(hostWiki,hostProxy);
    src_list[i].src=src_list[i].src.replaceAll(hostTarget,hostProxy)  
  }catch(e){continue;}}


  
},100);
  

  
}?.();