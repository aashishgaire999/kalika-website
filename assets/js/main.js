document.addEventListener('DOMContentLoaded',()=>{

  /* SLIDER */
  const slides=document.querySelectorAll('.gallery-slide');
  const dotsWrap=document.getElementById('dots');
  const progBar=document.getElementById('prog-bar');
  const DURATION=4500;
  let cur=0,autoTimer=null,isPaused=false;
  if(slides.length&&dotsWrap){
    slides.forEach((_,i)=>{
      const d=document.createElement('button');
      d.className='dot'+(i===0?' on':'');
      d.setAttribute('aria-label',`Slide ${i+1}`);
      d.addEventListener('click',()=>goTo(i));
      dotsWrap.appendChild(d);
    });
    function goTo(n){
      slides[cur].classList.remove('active');
      document.querySelectorAll('.dot')[cur].classList.remove('on');
      cur=(n+slides.length)%slides.length;
      slides[cur].classList.add('active');
      document.querySelectorAll('.dot')[cur].classList.add('on');
      resetProg();
    }
    function resetProg(){
      clearTimeout(autoTimer);
      if(progBar){progBar.style.transition='none';progBar.style.width='0%';requestAnimationFrame(()=>requestAnimationFrame(()=>{progBar.style.transition=`width ${DURATION}ms linear`;progBar.style.width='100%';}));}
      if(!isPaused)autoTimer=setTimeout(()=>goTo(cur+1),DURATION);
    }
    const slider=document.getElementById('slider');
    document.getElementById('prev-btn')?.addEventListener('click',()=>goTo(cur-1));
    document.getElementById('next-btn')?.addEventListener('click',()=>goTo(cur+1));
    if(slider){
      slider.addEventListener('mouseenter',()=>{isPaused=true;clearTimeout(autoTimer);});
      slider.addEventListener('mouseleave',()=>{isPaused=false;resetProg();});
      let tx=0,ty=0;
      slider.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
      slider.addEventListener('touchend',e=>{const dx=tx-e.changedTouches[0].clientX;const dy=ty-e.changedTouches[0].clientY;if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>40)dx>0?goTo(cur+1):goTo(cur-1);},{passive:true});
    }
    resetProg();
  }

  /* NAV SCROLL */
  const nav=document.getElementById('nav');
  if(nav)window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>8),{passive:true});

  /* HAMBURGER */
  const hbg=document.getElementById('hamburger');
  const mob=document.getElementById('mobile-nav');
  if(hbg&&mob){
    hbg.addEventListener('click',()=>{const o=mob.classList.toggle('open');hbg.setAttribute('aria-expanded',o);});
    mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mob.classList.remove('open')));
  }

  /* EN/JP TOGGLE */
  const T={
    'nav-link-services':['サービス','Services'],
    'nav-link-partner':['実績','Track Record'],
    'nav-link-team':['チーム','Team'],
    'nav-link-process':['ご依頼の流れ','How It Works'],
    'nav-link-contact':['お問い合わせ','Contact'],
    'mob-services':['サービス','Services'],
    'mob-partner':['実績','Track Record'],
    'mob-team':['チーム','Team'],
    'mob-process':['ご依頼の流れ','How It Works'],
    'mob-contact':['お問い合わせ','Contact'],
    'nav-cta-text':['無料相談','Free Consult'],
    'hero-eyebrow':['5★ リゾート認定 · 宮崎 · 九州','5★ RESORT CERTIFIED · MIYAZAKI · KYUSHU'],
    'hero-h1-line1':['ホテル清掃の','Professional'],
    'hero-h1-line2':['プロフェッショナル','Hotel Cleaning'],
    'hero-h1-sub':['九州全域のホテル・リゾートに信頼されるサービス','Trusted by hotels & resorts across all of Kyushu'],
    'hcb-label':['すぐにご連絡ください','CONTACT US NOW'],
    'hcb-phone-sub':['月〜土 8:00 – 18:00','Mon–Sat 8:00 – 18:00'],
    'hcb-email-sub':['24時間以内にご返信','24-hour response guaranteed'],
    'btn-primary-text':['無料相談を申し込む','Request Free Consult'],
    'gb-jp-1':['在籍スタッフ','On our team'],
    'gb-jp-2':['5つ星実績','5-star certified'],
    'gb-jp-3':['対応体制','Always ready'],
    'tb-jp-1':['在籍スタッフ数','Staff members'],
    'tb-jp-2':['5つ星パートナー','5-star partner'],
    'tb-jp-3':['九州エリア取引先','Kyushu clients'],
    'tb-jp-4':['対応体制','Response ready'],
    'partner-title':['九州を代表する5つ星リゾートに選ばれました','Selected by Kyushu\'s Premier 5-Star Resort'],
    'partner-desc':['九州の5つ星リゾートホテルに清掃パートナーとしてご採用いただいた実績があります。5つ星施設が求める品質基準を毎日実現していることが、私たちの最大の実績です。','A 5-star resort hotel in Kyushu selected KALIKA as a cleaning partner. Delivering 5-star quality standards every single day is our greatest achievement.'],
    'btn-partner-text':['お問い合わせ →','Contact Us →'],
    'sec-services-tag':['SERVICES · サービス','OUR SERVICES'],
    'sec-services-h2':['サービス内容','Our Services'],
    'sec-services-sub':['九州全域のホテル・旅館向け清掃・ハウスキーピングサービス','Full-service hotel cleaning & housekeeping across Kyushu'],
    'svc-jp-1':['客室清掃','Guest Room Cleaning'],
    'svc-en-1':['GUEST ROOM CLEANING','GUEST ROOM CLEANING'],
    'svc-desc-1':['チェックアウト後の迅速・丁寧な清掃。リネン交換・アメニティ補充・細部まで5つ星水準で対応します。','Swift, thorough post-checkout cleaning. Linen changes, amenity restocking, and meticulous detail — 5-star standard every time.'],
    'svc-jp-2':['ハウスキーピング支援','Housekeeping Support'],
    'svc-en-2':['HOUSEKEEPING SUPPORT','HOUSEKEEPING SUPPORT'],
    'svc-desc-2':['繁忙期の人員調整から客室ステータス管理まで、ホテル様の運営をトータルサポートします。','From peak-season staffing to room status management — full operational support tailored to your hotel.'],
    'svc-jp-3':['共用エリア清掃','Public Area Cleaning'],
    'svc-en-3':['PUBLIC AREA CLEANING','PUBLIC AREA CLEANING'],
    'svc-desc-3':['ロビー・廊下・レストランなど、すべての共用スペースを常に清潔に保ちます。','Lobbies, corridors, restaurants and more — every guest-facing space kept spotless around the clock.'],
    'svc-jp-4':['定期深層清掃','Deep Cleaning'],
    'svc-en-4':['DEEP CLEANING','DEEP CLEANING'],
    'svc-desc-4':['エアコン・カーペット・浴室の専門清掃で施設の長期品質を維持します。','Scheduled deep cleans for HVAC, carpets, and bathrooms — protecting your facility\'s long-term condition.'],
    'svc-jp-5':['スタッフ派遣','Staffing Solutions'],
    'svc-en-5':['STAFFING SOLUTIONS','STAFFING SOLUTIONS'],
    'svc-desc-5':['研修済み・多言語対応スタッフを柔軟に派遣。フルタイム・スポット対応可能です。','Trained, multilingual staff dispatched flexibly. Full-time or spot coverage — we adapt to your schedule.'],
    'svc-jp-6':['お気軽にご相談ください','Let\'s Talk'],
    'svc-en-6':['FREE CONSULTATION','FREE CONSULTATION'],
    'svc-desc-6':['どのサービスが最適かわからない場合も、まずはご相談ください。最適なプランをご提案します。','Not sure which service fits? Just reach out — we\'ll recommend the right plan for your property.'],
    'sec-why-tag':['WHY CHOOSE US · 選ばれる理由','WHY CHOOSE KALIKA'],
    'sec-why-h2':['私たちが選ばれる理由','Why Hotels Choose Us'],
    'sec-why-sub':['九州のホテル業界でKALIKAが選ばれる理由','What sets KALIKA apart from other cleaning companies in Kyushu'],
    'wc-jp-1':['多言語対応チーム','Multilingual Team'],
    'wc-en-1':['MULTILINGUAL TEAM','MULTILINGUAL TEAM'],
    'wc-desc-1':['日本語・英語・その他言語に対応。外資系ホテルや外国人ゲストの多い施設でも安心してお任せいただけます。','Japanese, English and more. Perfect for international hotel brands and properties with foreign guests.'],
    'wc-jp-2':['教育された専門スタッフ','Trained Professionals'],
    'wc-en-2':['TRAINED PROFESSIONALS','TRAINED PROFESSIONALS'],
    'wc-desc-2':['全スタッフがホテル業界水準の研修を修了。5つ星施設で認められた清掃技術とマナーを徹底しています。','Every staff member completes hotel-industry training. The same standards trusted by a 5-star resort.'],
    'wc-jp-3':['柔軟なスケジュール対応','Flexible Scheduling'],
    'wc-en-3':['FLEXIBLE SCHEDULING','FLEXIBLE SCHEDULING'],
    'wc-desc-3':['繁忙期・スポット対応・早朝深夜まで柔軟に対応。ホテル様の稼働状況に合わせたプランを提案します。','Peak seasons, spot requests, early mornings — we flex to match your occupancy, not the other way around.'],
    'wc-jp-4':['品質検査システム','Quality Inspection'],
    'wc-en-4':['QUALITY INSPECTION','QUALITY INSPECTION'],
    'wc-desc-4':['清掃後の品質チェックを全室実施。デジタル管理で常に安定したサービス水準をお届けします。','Post-clean quality checks on every room. Digital tracking ensures consistent standards, every time.'],
    'wc-jp-5':['ホテル業界の専門知識','Hotel Expertise'],
    'wc-en-5':['HOTEL EXPERTISE','HOTEL EXPERTISE'],
    'wc-desc-5':['フロント連携・客室ステータス管理など、ホテル現場を深く理解した専門チームが対応します。','Front desk coordination, room status management — our team understands hotel operations from the inside.'],
    'wc-jp-6':['信頼の法人体制','Reliable Corporate Structure'],
    'wc-en-6':['RELIABLE CORPORATE','RELIABLE CORPORATE'],
    'wc-desc-6':['宮崎法務局に正式登記した株式会社。保険・コンプライアンス・個人情報管理まで万全の体制です。','Officially registered corporation in Miyazaki. Full insurance, compliance, and data protection in place.'],
    'sec-team-tag':['OUR TEAM · チーム紹介','MEET THE TEAM'],
    'sec-team-h2':['チーム紹介','Our Team'],
    'sec-team-sub':['私たちの清掃を支えるプロフェッショナルたち','Real professionals behind every room we clean'],
    'team-role-jp-1':['代表取締役','Representative Director'],
    'team-desc-1':['宮崎市を拠点に株式会社KALIKAを設立。九州のホテル業界に信頼される清掃サービスを届けることを使命としている。','Founded KALIKA in Miyazaki with a mission to deliver reliable, professional cleaning services to Kyushu\'s hotel industry.'],
    'team-name-2':['運営マネージャー','Operations Manager'],
    'team-role-jp-2':['運営管理責任者','Operations Lead'],
    'team-desc-2':['日々の清掃オペレーション全体を統括。スタッフのスケジュール管理・品質チェック・ホテルとの調整を担当。','Oversees all daily cleaning operations — staff scheduling, quality checks, and hotel coordination.'],
    'team-name-3':['現場スーパーバイザー','Floor Supervisor'],
    'team-role-jp-3':['フロアスーパーバイザー','Floor Lead'],
    'team-desc-3':['各フロアの清掃品質を直接確認。スタッフ指導・フロント報告・緊急対応まで現場全体を取り仕切る。','Directly inspects cleaning quality on every floor. Manages staff, reports to front desk, handles emergencies.'],
    'team-name-4':['清掃スタッフチーム','Cleaning Staff Team'],
    'team-role-jp-4':['30名以上の専門スタッフ','30+ Professionals'],
    'team-desc-4':['フルタイム・パートタイム含む30名以上が在籍。全員が研修修了済み。多言語対応スタッフも在籍しています。','30+ full-time and part-time staff, all training-certified. Multilingual team members available.'],
    'team-note':['実際のチーム写真を掲載することで、日本人クライアントの信頼感が大幅に向上します。写真が揃い次第このセクションを更新してください。','Adding real team photos significantly increases trust with Japanese clients. Update this section once photos are ready.'],
    'sec-process-tag':['HOW IT WORKS · ご依頼の流れ','HOW IT WORKS'],
    'sec-process-h2':['ご依頼の流れ','How It Works'],
    'sec-process-sub':['お電話から清掃開始まで、シンプルな4ステップ','4 simple steps from first call to service start'],
    'ps-jp-1':['無料相談','Free Consult'],
    'ps-en-1':['FREE CONSULT','FREE CONSULT'],
    'ps-desc-1':['電話・LINE・フォームからお気軽にご連絡ください。','Call, LINE, or fill out our form — whichever is easiest for you.'],
    'ps-jp-2':['現地視察・お見積り','Site Visit'],
    'ps-en-2':['SITE VISIT','SITE VISIT'],
    'ps-desc-2':['施設へ伺い、規模・ニーズに合わせたお見積りをご提案します。','We visit your property and provide a clear, detailed quote.'],
    'ps-jp-3':['プラン作成・ご契約','Custom Plan'],
    'ps-en-3':['CUSTOM PLAN','CUSTOM PLAN'],
    'ps-desc-3':['稼働状況・ご要望に合わせたオーダーメイドプランを作成します。','A cleaning schedule built around your occupancy and requirements.'],
    'ps-jp-4':['サービス開始','Service Begins'],
    'ps-en-4':['SERVICE BEGINS','SERVICE BEGINS'],
    'ps-desc-4':['研修済みチームが対応開始。初日から品質検査を実施します。','Trained team starts immediately. Quality checks built in from day one.'],
    'sec-contact-tag':['CONTACT · お問い合わせ','GET IN TOUCH'],
    'sec-contact-h2':['お問い合わせ・無料相談','Contact Us'],
    'sec-contact-sub':['24時間以内にご返信 · 日英対応可能','We respond within 24 hours · Japanese & English supported'],
    'cpc-label':['お電話はこちら','CALL US FIRST'],
    'cpc-hours':['月〜土 8:00–18:00','Mon–Sat 8:00–18:00'],
    'cta-line-text':['LINEでお問い合わせ（公式アカウント）','Chat on LINE (Official Account)'],
    'ci-director-sub':['代表取締役','Representative Director'],
    'cf-note-text':['送信後24時間以内にご返信いたします。日英対応可能。','We\'ll reply within 24 hours. Japanese & English supported.'],
    'f-desc':['九州全域のホテル・リゾート・旅館に信頼される清掃・ハウスキーピングサービス。','Professional cleaning & housekeeping trusted by hotels and resorts across Kyushu.'],
    'fc-1-1':['客室清掃','Guest Room Cleaning'],
    'fc-1-2':['ハウスキーピング支援','Housekeeping Support'],
    'fc-1-3':['共用エリア清掃','Public Area Cleaning'],
    'fc-1-4':['定期深層清掃','Deep Cleaning'],
    'fc-1-5':['スタッフ派遣','Staffing Solutions'],
    'fc-2-1':['会社概要','About Us'],
    'fc-2-2':['チーム紹介','Our Team'],
    'fc-2-3':['実績・パートナー','Track Record'],
    'fc-2-4':['採用情報','Careers'],
    'fc-3-1':['お電話でのご相談','Call Us'],
    'fc-3-2':['LINEでのご相談','LINE Chat'],
    'fc-3-3':['お問い合わせフォーム','Inquiry Form'],
    'fc-3-4':['プライバシーポリシー','Privacy Policy'],
  };

  const langBtns=document.querySelectorAll('.lang-btn');
  function applyLang(lang){
    const i=lang==='en'?1:0;
    Object.entries(T).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v[i];});
    document.documentElement.lang=lang==='en'?'en':'ja';
    localStorage.setItem('kalika-lang',lang);
  }
  langBtns.forEach(btn=>btn.addEventListener('click',()=>{
    langBtns.forEach(b=>{b.classList.remove('on');b.setAttribute('aria-pressed','false');});
    btn.classList.add('on');btn.setAttribute('aria-pressed','true');
    applyLang(btn.dataset.lang);
  }));
  const saved=localStorage.getItem('kalika-lang');
  if(saved==='en'){
    document.querySelector('[data-lang="jp"]')?.classList.remove('on');
    const enBtn=document.querySelector('[data-lang="en"]');
    if(enBtn){enBtn.classList.add('on');applyLang('en');}
  }

  /* SCROLL REVEAL */
  const animEls=document.querySelectorAll('[data-animate]');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -32px 0px'});
    animEls.forEach(el=>obs.observe(el));
  }else{animEls.forEach(el=>el.classList.add('visible'));}

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{
    const t=document.querySelector(link.getAttribute('href'));
    if(t){e.preventDefault();const off=(nav?nav.offsetHeight:66)+12;window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-off,behavior:'smooth'});}
  }));

  /* ACTIVE NAV */
  const sections=document.querySelectorAll('section[id],div[id]');
  const navLinks=document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    let c='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)c=s.id;});
    navLinks.forEach(l=>l.classList.toggle('active',l.getAttribute('href')===`#${c}`));
  },{passive:true});

  /* FORM */
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      let valid=true;
      ['hotel-name','contact-name','email','message'].forEach(id=>{
        const f=document.getElementById(id);
        if(f){f.style.borderColor='';if(!f.value.trim()){f.style.borderColor='#c0392b';valid=false;}}
      });
      if(!valid)return;
      const btn=document.getElementById('cf-submit-btn');
      btn.textContent='送信中...';btn.disabled=true;
      setTimeout(()=>{
        btn.textContent='✓ 送信しました！';btn.style.background='var(--green)';
        form.reset();
        setTimeout(()=>{btn.textContent='送信する — Send Inquiry';btn.style.background='';btn.disabled=false;},3000);
      },1200);
    });
    form.querySelectorAll('input,textarea').forEach(f=>f.addEventListener('input',()=>f.style.borderColor=''));
  }

});
