/**
 * Módulo de Interacción con la Portada y Vinilo
 */

const DEFAULT_COVER_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDlcz0ImBoy2zy89-viVJEp4_WQyqsy0_KSd2IYbtMU6JM-FyVtlShoB7v9cilGnTbGV-0SzPv2L_uFeNYcAnD6XnXjJlYFCRfrOyfchhGzw4uP0rKY0l9mYYIE89TG7bcnbOsvoXBNRBY29-ZXZtoVqLuMV7FsOYRqGrYKWCBALlIIhXwZrOZMcFpj4Okqmeyt_QVXRNGJm82t3PR9qMJfeL1wsSXXD0vBDtQ8qL8f';

function handleCoverChange(event) {
  const fileInput = event.target;
  const coverPreview = document.getElementById('coverPreview');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      if (coverPreview) {
        coverPreview.src = e.target.result;
      }
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

function restoreCover() {
  const coverPreview = document.getElementById('coverPreview');
  const coverFileInput = document.getElementById('coverFileInput');

  if (coverPreview) {
    coverPreview.src = DEFAULT_COVER_SRC;
  }
  if (coverFileInput) {
    coverFileInput.value = '';
  }
}