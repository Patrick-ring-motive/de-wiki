void async function searchRedirect(){

  const search_form = document.querySelector('form[action="/w/index.php"]');
  search_form.onclick = function(){window.location.href='/w/index.php?search';};
  search_form.removeAttribute('action');
  search_form.removeAttribute('method');
  
}?.();