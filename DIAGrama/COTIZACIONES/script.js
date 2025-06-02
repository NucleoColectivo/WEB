let idioma = 'es';

function cambiarIdioma() {
  idioma = idioma === 'es' ? 'en' : 'es';
  document.querySelectorAll('.es').forEach(el => {
    el.style.display = idioma === 'es' ? 'inline' : 'none';
  });
  document.querySelectorAll('.en').forEach(el => {
    el.style.display = idioma === 'en' ? 'inline' : 'none';
  });
  document.getElementById('titulo').textContent = idioma === 'es'
    ? ' Cotizador de Servicios Digitales'
    : ' Digital Services Estimator';
  document.getElementById('total-label').textContent = idioma === 'es'
    ? 'Total estimado:'
    : 'Estimated total:';
  document.querySelectorAll('.boton-pago').forEach(btn => {
    btn.textContent = idioma === 'es'
      ? btn.textContent.replace('Pay now', 'Pagar ahora').replace('Send', 'Enviar')
      : btn.textContent.replace('Pagar ahora', 'Pay now').replace('Enviar', 'Send');
  });
}

function calcularTotal() {
  const filas = document.querySelectorAll("tbody tr");
  let totalCOP = 0;
  let totalUSD = 0;
  filas.forEach(fila => {
    const checkbox = fila.querySelector("input[type='checkbox']");
    const qtyInput = fila.querySelector("input[type='number']");
    const precioElem = fila.querySelector(".precio");
    const subtotalElem = fila.querySelector(".subtotal");

    if (checkbox && checkbox.checked && precioElem && qtyInput) {
      const qty = parseInt(qtyInput.value) || 0;
      const cop = parseFloat(precioElem.dataset.cop);
      const usd = parseFloat(precioElem.dataset.usd);
      subtotalElem.textContent = "$" + (cop * qty).toLocaleString();
      totalCOP += cop * qty;
      totalUSD += usd * qty;
    } else if (subtotalElem) {
      subtotalElem.textContent = "0";
    }
  });
  document.getElementById("total-cop").textContent = "$" + totalCOP.toLocaleString();
  document.getElementById("total-usd").textContent = "$" + totalUSD.toFixed(2);
}

function confirmarPago() {
  const cop = document.getElementById("total-cop").textContent;
  const usd = document.getElementById("total-usd").textContent;
  const mensaje = idioma === 'es'
    ? `¿Deseas pagar ${cop} COP / ${usd} USD?`
    : `Do you want to pay ${cop} COP / ${usd} USD?`;
  if (confirm(mensaje)) {
    const resumen = idioma === 'es'
      ? `Hola, quiero pagar ${cop} COP (${usd} USD)`
      : `Hello, I want to pay ${cop} COP (${usd} USD)`;
    window.location.href = "https://wa.me/573017089007?text=" + encodeURIComponent(resumen);
  }
}

function enviarFormulario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensajeText = document.getElementById("mensaje").value;
  const asunto = idioma === 'es' ? "Formulario de contacto" : "Contact Form";
  const cuerpo = encodeURIComponent(
    `${idioma === 'es' ? 'Nombre' : 'Name'}: ${nombre}%0A${idioma === 'es' ? 'Correo' : 'Email'}: ${email}%0A${idioma === 'es' ? 'Mensaje' : 'Message'}: ${mensajeText}`
  );
  window.location.href = `mailto:nucleo.colectivo.art@gmail.com?subject=${asunto}&body=${cuerpo}`;
}

function descargarPDF() {
  const element = document.getElementById('contenido');
  const opt = {
    margin:       0.75,
    filename:     'cotizacion_nucleo.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

document.addEventListener("DOMContentLoaded", () => {
  calcularTotal();
});

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
