// Shared background helper for plain-HTML app
(function(){
  function applyBackgroundToElement(el, val){
    if(!el) return;
    if(!val){ el.style.backgroundImage=''; el.style.backgroundColor=''; return; }
    if(val.startsWith('data:') || val.startsWith('http') || val.startsWith('blob:')){
      el.style.backgroundImage = `url("${val}")`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    } else {
      el.style.backgroundImage = '';
      el.style.backgroundColor = val;
    }
  }

  window.initBackground = function(pageKey){
    try{
      const key = 'bg_' + pageKey;
      const value = localStorage.getItem(key);
      const container = document.querySelector('.bg-container') || document.body;
      applyBackgroundToElement(container, value);

      // if printable page, also set <img class="bg-img"> src for reliable printing
      const bgImg = document.querySelector('.bg-img');
      if(bgImg){
        if(value && (value.startsWith('data:') || value.startsWith('http') || value.startsWith('blob:'))){
          bgImg.src = value;
          bgImg.style.display = 'block';
        } else {
          // non-image: hide image; fallback to CSS background color handled on container
          bgImg.removeAttribute('src');
          bgImg.style.display = value ? 'block' : 'none';
        }
      }
    }catch(e){ console.error('initBackground error', e) }
  };

  window.saveBackground = function(pageKey, value){
    if(!pageKey) return;
    if(value === undefined || value === null){ localStorage.removeItem('bg_' + pageKey); return; }
    localStorage.setItem('bg_' + pageKey, value);
  };
})();
