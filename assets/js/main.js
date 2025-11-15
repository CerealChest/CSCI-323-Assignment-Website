// main.js - loads data JSON and wires theme & interactivity
(function(){
  const profilePath = '/data/profile.json';
  const pubsPath = '/data/publications.json';
  const projectsPath = '/data/projects.json';

  // Utilities
  function $id(id){return document.getElementById(id)}
  function el(tag, attrs){ const e = document.createElement(tag); if(attrs) Object.assign(e, attrs); return e }

  // Apply current year to footers
  const year = new Date().getFullYear();
  ['footer-year','footer-year-about','footer-year-research','footer-year-pubs','footer-year-projects','footer-year-contact'].forEach(id=>{
    const elid = $id(id);
    if(elid) elid.textContent = year;
  });

  // Theme toggle
  const themeToggleButtons = document.querySelectorAll('.theme-toggle');
  function currentTheme(){ return localStorage.getItem('site-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');}
  function applyTheme(t){
    if(t === 'light') document.documentElement.style.colorScheme = 'light';
    else document.documentElement.style.colorScheme = 'dark';
    localStorage.setItem('site-theme', t);
  }
  themeToggleButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const next = currentTheme() === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  });
  // initialize theme
  applyTheme(currentTheme());

  // Fetch and render profile
  fetch(profilePath).then(r=>{
    if(!r.ok) throw new Error('Profile fetch failed');
    return r.json();
  }).then(profile=>{
    // Brand & hero
    if($id('brand-name')) $id('brand-name').textContent = profile.name;
    if($id('brand-title')) $id('brand-title').textContent = profile.title;
    if($id('hero-name')) $id('hero-name').textContent = profile.name;
    if($id('hero-title')) $id('hero-title').textContent = profile.title + ' — ' + profile.location;
    if($id('hero-bio')) $id('hero-bio').textContent = profile.summary;
    if($id('hero-institution')) $id('hero-institution').textContent = profile.institution;
    if($id('hero-keywords')) $id('hero-keywords').textContent = profile.keywords.join(', ');
    if($id('meta-keywords')) $id('meta-keywords').setAttribute('content', profile.keywords.join(', '));
    // Contact page
    if($id('contact-email')) $id('contact-email').textContent = profile.email;
    if($id('mailto-link')) $id('mailto-link').href = `mailto:${profile.email}`;
    if($id('copy-email')) $id('copy-email').addEventListener('click', ()=>{
      navigator.clipboard?.writeText(profile.email).then(()=>{
        alert('Email copied to clipboard: ' + profile.email);
      }, ()=>{ alert('Failed to copy — please copy manually: ' + profile.email)});
    });

    // About page fields
    if($id('about-title')) $id('about-title').textContent = profile.title;
    if($id('about-bio')) $id('about-bio').textContent = profile.summary;
    if($id('about-keywords')){
      $id('about-keywords').innerHTML = '';
      profile.keywords.forEach(k=>{
        const li = el('li'); li.textContent = k; $id('about-keywords').appendChild(li);
      });
    }
    // Research keywords
    if($id('research-keywords-list')){
      $id('research-keywords-list').innerHTML='';
      profile.keywords.forEach(k=>{
        const li = el('li'); li.textContent = k; $id('research-keywords-list').appendChild(li);
      });
    }
    // Brand avatar if provided
    if(profile.avatar && document.querySelectorAll('.brand-avatar').length){
      document.querySelectorAll('.brand-avatar').forEach(img=>{
        img.src = profile.avatar;
      });
      document.querySelectorAll('.hero-avatar').forEach(img=>{
        img.src = profile.avatar;
      });
      document.querySelectorAll('.about-avatar').forEach(img=>{
        img.src = profile.avatar;
      });
    }
  }).catch(err=>{
    // silently fail but keep the sample text
    console.warn('Profile load failed:', err);
  });

  // Publications
  function renderPublications(listElId, pubs){
    const container = $id(listElId);
    if(!container) return;
    container.innerHTML = '';
    pubs.forEach(pub=>{
      const item = el('div', {className:'card'});
      const title = el('div'); title.innerHTML = `<strong>${pub.title}</strong>`;
      const meta = el('div'); meta.className = 'muted'; meta.textContent = `${pub.authors} — ${pub.venue} (${pub.year})`;
      const abstract = el('p'); abstract.textContent = pub.abstract || '';
      const links = el('div');
      if(pub.url){
        const a = el('a'); a.href = pub.url; a.target = '_blank'; a.rel='noopener'; a.className='button'; a.textContent = 'View';
        links.appendChild(a);
      }
      item.appendChild(title); item.appendChild(meta); if(pub.abstract) item.appendChild(abstract); item.appendChild(links);
      container.appendChild(item);
    });
  }

  fetch(pubsPath).then(r=>r.ok ? r.json() : Promise.reject('no pubs')).then(pubs=>{
    renderPublications('publications-list', pubs.slice(0,3));
    renderPublications('publications-full', pubs);
  }).catch(err=>{
    console.warn('Publications load failed', err);
  });

  // Projects
  function renderProjects(listElId, projects){
    const container = $id(listElId);
    if(!container) return;
    container.innerHTML = '';
    projects.forEach(p=>{
      const card = document.createElement('article'); card.className = 'card';
      const title = document.createElement('h3'); title.innerText = p.title;
      const meta = document.createElement('div'); meta.className = 'muted'; meta.innerText = p.tech ? p.tech.join(', ') : '';
      const desc = document.createElement('p'); desc.innerText = p.description;
      const actions = document.createElement('div');
      if(p.url){
        const a = document.createElement('a'); a.href = p.url; a.target = '_blank'; a.rel='noopener'; a.className='button'; a.innerText='Open';
        actions.appendChild(a);
      }
      card.appendChild(title); card.appendChild(meta); card.appendChild(desc); card.appendChild(actions);
      container.appendChild(card);
    });
  }

  fetch(projectsPath).then(r=>r.ok ? r.json() : Promise.reject('no projects')).then(projects=>{
    renderProjects('projects-list', projects.slice(0,3));
    renderProjects('projects-full', projects);
    renderProjects('research-projects', projects.slice(0,6));
  }).catch(err=>{
    console.warn('Projects load failed', err);
  });

})();
