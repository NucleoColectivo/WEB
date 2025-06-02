// Esperar a que el contenido cargue
window.addEventListener('DOMContentLoaded', () => {
  // Activar íconos Lucide
  if (window.lucide) lucide.createIcons();

  // Scroll animado con offset para enlaces internos
  document.querySelectorAll('.nav-bar a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Menú hamburguesa responsive
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-items');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('show');
      toggle.textContent = isOpen ? '✖' : '☰';
    });
  }

  // Cambio de idioma dinámico
  let currentLang = 'es';
  const langToggle = document.getElementById('lang-toggle');

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      langToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';

      document.querySelectorAll('[data-es]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
      });
    });
  }

  // Animación scroll con IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section .step, .section h2, .section ul, .section p, .section img')
    .forEach(el => {
      el.classList.add('step');
      observer.observe(el);
    });
});
<a class="boton-pago" href="#" onclick="donar('Adobe CC')">💝 Donar</a>

function donar(nombreHerramienta) {
  const mensaje = idioma === 'es'
    ? `Hola, quiero donar ${nombreHerramienta} para el colectivo.`
    : `Hi, I want to donate ${nombreHerramienta} for the collective.`;
  window.open(`https://wa.me/573017089007?text=${encodeURIComponent(mensaje)}`, '_blank');
}
