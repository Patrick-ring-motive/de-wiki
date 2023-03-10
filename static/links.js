void async function links() {

  const hostProxy = window.location.host;
  const hostTarget = 'de-m-wikipedia-org.translate.goog';
  const hostWiki = 'de.m.wikipedia.org';

  setInterval(async function() {

    const href_list = document.querySelectorAll(`
[href*="`+ hostWiki + `"],
[href*="`+ hostTarget + `"]
`);
    const href_list_length = href_list.length;

    for (let i = 0; i < href_list_length; i++) {
      try {
        href_list[i].href = href_list[i].href.replaceAll(hostWiki, hostProxy);
        href_list[i].href = href_list[i].href.replaceAll(hostTarget, hostProxy)
      } catch (e) { continue; }
    }

    const src_list = document.querySelectorAll(`
[src*="`+ hostWiki + `"],
[src*="`+ hostTarget + `"]
`);
    const src_list_length = src_list.length;

    for (let i = 0; i < src_list_length; i++) {
      try {
        src_list[i].src = src_list[i].src.replaceAll(hostWiki, hostProxy);
        src_list[i].src = src_list[i].src.replaceAll(hostTarget, hostProxy)
      } catch (e) { continue; }
    }
const data_src_list = document.querySelectorAll(`
[data-src*="`+ hostWiki + `"],
[data-src*="`+ hostTarget + `"]
`);
    const data_src_list_length = data_src_list.length;

    for (let i = 0; i < data_src_list_length; i++) {
      try {
        data_src_list[i].setAttribute('data-src', data_src_list[i].getAttribute('data-src').replaceAll(hostWiki, hostProxy).replaceAll(hostTarget,hostProxy));
      
      } catch (e) { continue; }
    }

const style_list = document.querySelectorAll(`
[style*="`+ hostWiki + `"],
[style*="`+ hostTarget + `"]
`);
    const style_list_length = style_list.length;

    for (let i = 0; i < style_list_length; i++) {
      try {
        style_list[i].setAttribute('style', style_list[i].getAttribute('style').replaceAll(hostWiki, hostProxy).replaceAll(hostTarget,hostProxy));
      
      } catch (e) { continue; }
    }
    
    const lazy_images = document.querySelectorAll('.lazy-image-placeholder[data-src]');
    const lazy_images_length = lazy_images.length;
    for (let i = 0; i < lazy_images_length; i++) {
      try {
        lazy_images[i].style.backgroundImage = 'url("' + lazy_images[i].getAttribute('data-src') + '")';
        lazy_images[i].removeAttribute('data-src');
      } catch (e) { continue; }
    }



    const collapse = document.querySelectorAll('[class*="open-block open-block"]');
    const collapse_length = collapse.length;
    for (let i = 0; i < collapse_length; i++) {
      try {
        collapse[i].setAttribute('class', collapse[i].getAttribute('class').replaceAll('open-block', ''));
      } catch (e) { continue; }
    }


  }, 100);







}?.();