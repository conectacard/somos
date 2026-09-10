const CONFIG = {
    maps: "https://somosmx.org.mx/", 
    youtubeUrl: "https://www.youtube.com/watch?v=2aUmPNEiYyE",
    textos: {
        cat1: { t: "PREPARATE GRATIS, INCLUYENDO LA UNIVERSIDAD", c: "Educación de calidad: IA, Inglés y preparación para universidades (UNAM, IPN). Tu futuro es nuestra prioridad. Primero los niños y jóvenes." },
        cat2: { t: "DA CLIC A LA IMAGEN", c: "Aprende jugando. La IA es la herramienta que te abrirá las puertas del mercado laboral global. Desarrollamos tus capacidades técnicas." },
        cat3: { t: "OPINIÓN DE LA SOCIEDAD", c: "Testimonios de quienes creen en la educación como el motor de México. Tu voz es fundamental para el proyecto de nación." }
    },
    sucursales: {
        suc1: { nombre: "Asesor 1", wa: "(55) 8004-0055", maps: "https://somosmx.org.mx/" },
        suc2: { nombre: "Asesor 2", wa: "(55) 8004-0055", maps: "https://somosmx.org.mx/" },
        suc3: { nombre: "Asesor 3", wa: "(55) 8004-0055", maps: "https://somosmx.org.mx/" },
        suc4: { nombre: "Asesor 4", wa: "(55) 8004-0055", maps: "https://somosmx.org.mx/" },
        suc5: { nombre: "Asesor 5", wa: "(55) 8004-0055", maps: "https://somosmx.org.mx/" },
        suc6: { nombre: "Asesor 6", wa: "(55) 8004-0055", maps: "https://somosmx.org.mx/" }
    }
};

// Enlaces específicos para las imágenes de cat2
const LINK_MAPS_CAT2 = {
    "assets/gallery/cat2/1.jpg": "https://memorama-ingles.pideya.contact/",
    "assets/gallery/cat2/2.jpg": "https://anuario.pideya.contact/",
    "assets/gallery/cat2/3.jpg": "https://calendario.pideya.contact/",
    "assets/gallery/cat2/4.jpg": "https://portafolio.pideya.contact/",
    "assets/gallery/cat2/5.jpg": "https://demo-autos.pideya.contact/",
    "assets/gallery/cat2/6.jpg": "https://solitario.pideya.contact/"
};

let currentGallery = [];
let currentIndex = 0;
let isMuted = false;

function openYouTubeVideo() { 
    playClick(); 
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    let videoId = "zPL8_dxQ8ok"; 
    
    if(CONFIG.youtubeUrl.includes("shorts/")) { 
        videoId = CONFIG.youtubeUrl.split("shorts/")[1].split("?")[0]; 
    } else if(CONFIG.youtubeUrl.includes("v=")) { 
        videoId = CONFIG.youtubeUrl.split("v=")[1].split("&")[0]; 
    } else if(CONFIG.youtubeUrl.includes("youtu.be/")) {
        videoId = CONFIG.youtubeUrl.split("youtu.be/")[1].split("?")[0];
    }
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    overlay.style.display = 'flex';
}

function closeVideoLightbox() {
    playClick();
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    iframe.src = ""; 
    overlay.style.display = 'none';
}

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) { const src = imgElement.src; openLightbox(src, [src], true); }
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    if(cat !== 'cat4') renderGallery(cat);
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.innerText = CONFIG.textos[cat].t;
    grid.appendChild(titleHeader);
    
    const imgCount = (cat === 'cat3') ? 1 : (cat === 'cat1' || cat === 'cat2') ? 6 : 4;
    const imgs = [];
    for(let i = 1; i <= imgCount; i++) { imgs.push(`assets/gallery/${cat}/${i}.jpg`); }
    
    const rowGrid = document.createElement('div');
    rowGrid.className = 'quad-row-grid';
    if (cat === 'cat3') rowGrid.style.gridTemplateColumns = "1fr";
    imgs.forEach((src, index) => {
        const posClass = (index % 2 === 0) ? 'pos-left' : 'pos-right';
        rowGrid.appendChild(createPol(src, posClass, imgs, cat));
    });
    grid.appendChild(rowGrid);
    
    if (cat === 'cat3') {
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = "display: flex; flex-direction: column; gap: 15px; margin-top: 30px; margin-bottom: 40px; align-items: center; width: 100%;";
        videoContainer.innerHTML = `
            <a href="https://www.youtube.com/shorts/wxr6V7h471I" target="_blank" style="background: #000; color: #fff; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.1rem; border: 3px solid var(--brand-accent); display: inline-block;">Militante 1 Nombre del militante </a>
            <a href="https://www.youtube.com/shorts/SiIvIpKsSeo" target="_blank" style="background: #000; color: #fff; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.1rem; border: 3px solid var(--brand-accent); display: inline-block;">Militante 2 Nombre del militante</a>
            <a href="https://www.youtube.com/shorts/asmzMRnYuag" target="_blank" style="background: #000; color: #fff; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.1rem; border: 3px solid var(--brand-accent); display: inline-block;">Invitado 1 Nombre del invitado</a>
            <a href="https://www.youtube.com/shorts/7KtFef0i7_w" target="_blank" style="background: #000; color: #fff; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.1rem; border: 3px solid var(--brand-accent); display: inline-block;">Invitado 2 Nombre del invitado</a>
        `;
        grid.appendChild(videoContainer);
    }
    
    const btn = document.createElement('button');
    btn.className = 'btn-details-gold'; 
    btn.style.marginTop = "30px";
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> VER DETALLES`;
    btn.onclick = (e) => { e.stopPropagation(); openTextZoom(cat); };
    grid.appendChild(btn);
}

function createPol(src, pos, arr, cat) {
    const div = document.createElement('div');
    div.className = `polaroid-item ${pos}`;
    div.innerHTML = `<img src="${src}">`;
    
    div.onclick = (e) => { 
        e.stopPropagation(); 
        if (cat === 'cat2' && LINK_MAPS_CAT2[src]) {
            playClick();
            window.open(LINK_MAPS_CAT2[src], '_blank');
        } else {
            openLightbox(src, arr, false); 
        }
    };
    return div;
}

function openLightbox(src, arr, hideControls) {
    playClick();
    currentGallery = arr;
    currentIndex = arr.indexOf(src);
    const lightboxEl = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-image');
    if(hideControls) { lightboxEl.classList.add('hide-nav-arrows'); } else { lightboxEl.classList.remove('hide-nav-arrows'); }
    imgEl.src = src;
    lightboxEl.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function openTextZoom(cat) {
    playClick();
    document.getElementById('text-zoom-title').innerText = CONFIG.textos[cat].t;
    document.getElementById('text-zoom-content').innerText = CONFIG.textos[cat].c;
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }
function openBrandModal(modalId) { playClick(); const modal = document.getElementById(modalId); if (modal) modal.style.display = 'flex'; }
function closeBrandModal(modalId) { const modal = document.getElementById(modalId); if (modal) modal.style.display = 'none'; }
function playClickSound() { playClick(); }

function toggleAudioGlobal() {
    isMuted = !isMuted;
    const icon = document.getElementById('audio-icon');
    if (icon) icon.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
}

function playClick() { const snd = document.getElementById('sndFxClick'); if(snd && !isMuted) { snd.currentTime = 0; snd.play().catch(()=>{}); } }
function openNetworkCard(url) { playClick(); window.open(url, '_blank'); }

function abrirMenu() {
    playClick();
    document.getElementById('miMenuContacto').style.display = 'flex';
}

function cerrarMenu() {
    document.getElementById('miMenuContacto').style.display = 'none';
    document.querySelectorAll('.sucursal-panel-content').forEach(panel => panel.style.display = 'none');
}

function toggleSucursalAcordeon(sucKey) {
    playClick();
    const panel = document.getElementById(`${sucKey}-panel`);
    const estaVisible = panel.style.display === 'flex';
    document.querySelectorAll('.sucursal-panel-content').forEach(p => p.style.display = 'none');
    if (!estaVisible) {
        panel.style.display = 'flex';
    }
}

function inicializarAcordeon() {
    const contenedor = document.getElementById('contenedor-sucursales');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    Object.keys(CONFIG.sucursales).forEach((key, index) => {
        const suc = CONFIG.sucursales[key];
        const btn = document.createElement('button');
        btn.className = 'sucursal-accordion-btn';
        btn.innerHTML = `${index + 1}. ${suc.nombre.toUpperCase()}`;
        btn.onclick = () => toggleSucursalAcordeon(key);
        
        const panel = document.createElement('div');
        panel.id = `${key}-panel`;
        panel.className = 'sucursal-panel-content';
        panel.innerHTML = `
            <div class="sucursal-info-block">
                <p class="suc-domicilio"><i class="fas fa-user-tie"></i> Asesor Digital KIVO</p>
                <p class="suc-horario"><i class="far fa-clock"></i> Atención Personalizada</p>
            </div>
            <a href="https://wa.me/${suc.wa}?text=Hola!%20Me%20interesa%20conocer%20el%20proyecto%20KIVO." target="_blank" class="btn-menu whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            <a href="${suc.maps}" target="_blank" class="btn-menu maps-btn"><i class="fas fa-location-arrow"></i> Cómo Llegar</a>
        `;
        
        contenedor.appendChild(btn);
        contenedor.appendChild(panel);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarAcordeon();
});

async function shareExperienceRobust() {
    try { await navigator.share({ title: 'Proyecto KIVO', url: window.location.href }); }
    catch { playClick(); navigator.clipboard.writeText(window.location.href).then(() => { alert("¡Enlace de tarjeta copiado!"); }); }
}