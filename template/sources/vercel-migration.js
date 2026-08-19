(function(){
  function qs(name){ return new URLSearchParams(location.search).get(name) || ''; }
  function isJP(){ return document.documentElement.lang.toLowerCase().indexOf('ja')===0 || /lang2/.test(location.pathname); }

  document.addEventListener('DOMContentLoaded', function(){
    // Make mobile search work as a real static search on Vercel.
    var input=document.getElementById('key_m');
    if(input){
      input.addEventListener('keydown', function(e){
        if(e.key==='Enter'){
          e.preventDefault();
          var key=input.value.trim();
          var placeholder=isJP() ? '検索...' : '搜尋...';
          if(!key || key===placeholder){ alert(isJP() ? 'データがありません。' : '目前沒有資料！'); return; }
          location.href=(isJP() ? 'index4191.html' : 'index9df4.html')+'?key='+encodeURIComponent(key);
        }
      });
    }

    // Filter the mirrored search result pages by ?key= instead of relying on PHP.
    if(/(?:index9df4|index4191)\.html$/.test(location.pathname)){
      var key=qs('key').trim().toLowerCase();
      if(key){
        var items=Array.prototype.slice.call(document.querySelectorAll('.list > ul > li'));
        var matches=0;
        items.forEach(function(li){
          var ok=li.textContent.toLowerCase().indexOf(key)!==-1;
          li.style.display=ok ? '' : 'none';
          if(ok) matches++;
        });
        if(matches===0){
          var list=document.querySelector('.list');
          if(list){
            var p=document.createElement('p');
            p.className='vercel-search-empty';
            p.textContent=isJP() ? '該当するデータがありません。' : '目前沒有符合的資料。';
            p.style.padding='30px 0';
            list.appendChild(p);
          }
        }
      }
    }

    // Prefill contact subject when arriving from a product inquiry button.
    var product=qs('product');
    var form=document.getElementById('theForm');
    if(form && product){
      var topic=form.querySelector('input[name="data[3]"]');
      if(topic && !topic.value) topic.value=(isJP() ? '製品について：' : '產品詢問：')+product;
    }

    // Preserve the original layout; submission feedback is an alert only.
    var sent=qs('sent'), error=qs('error');
    if(sent==='1'){
      alert(isJP() ? 'お問い合わせを送信しました。' : '訊息已成功送出。');
      history.replaceState({}, document.title, location.pathname);
    }else if(error){
      alert(isJP() ? '送信に失敗しました。もう一度お試しください。' : '送出失敗，請稍後再試。');
      history.replaceState({}, document.title, location.pathname);
    }
  });
})();
