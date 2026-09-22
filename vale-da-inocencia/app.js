(() => {
  "use strict";

  const config = window.VALE_CONFIG || Object.freeze({
    endpoint: "https://script.google.com/macros/s/AKfycbzl-7h50AjRmlLxazmFExWjVovo85eLhyxup5OZA7fHMhP69mL26HnWf2v7JwjGexov1g/exec",
    pdfUrl: "https://fantasticoseditora.github.io/sof/vale-da-inocencia/downloads/o-vale-da-inocencia.pdf?v=thalles-gomes-waichert",
    epubUrl: "https://fantasticoseditora.github.io/sof/vale-da-inocencia/downloads/o-vale-da-inocencia.epub?v=thalles-gomes-waichert"
  });
  const form = document.querySelector("#leadForm");
  const frame = document.querySelector("#captureFrame");
  const unlockPanel = document.querySelector("#unlockPanel");
  const status = document.querySelector("#formStatus");
  const phone = document.querySelector("#whatsapp");
  const submitButton = form.querySelector("button[type='submit']");
  const pdfButton = document.querySelector("#pdfButton");
  const epubButton = document.querySelector("#epubButton");
  const downloadNote = document.querySelector("#downloadNote");

  const endpointIsConfigured = () =>
    typeof config.endpoint === "string" &&
    /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(config.endpoint.trim());

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 11);

  const formatPhone = (value) => {
    const digits = normalizePhone(value);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return digits.replace(/(\d{2})(\d+)/, "($1) $2");
    if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  phone.addEventListener("input", () => {
    phone.value = formatPhone(phone.value);
  });

  const campaignData = () => {
    const query = new URLSearchParams(window.location.search);
    return {
      origem: "Landing Page",
      campanha: "vale-da-inocencia",
      utm_source: query.get("utm_source") || "direto",
      utm_medium: query.get("utm_medium") || "",
      utm_campaign: query.get("utm_campaign") || "",
      utm_content: query.get("utm_content") || "",
      referrer: document.referrer || "",
      landing_url: window.location.href
    };
  };

  const showStatus = (message, type = "error") => {
    status.textContent = message;
    status.className = `form-status is-visible is-${type}`;
  };

  const configureDownload = (element, url) => {
    if (typeof url === "string" && /^https?:\/\//.test(url.trim())) {
      element.href = url.trim();
      element.removeAttribute("aria-disabled");
      return true;
    }
    element.href = "#";
    element.setAttribute("aria-disabled", "true");
    return false;
  };

  const unlockDownloads = () => {
    const pdfReady = configureDownload(pdfButton, config.pdfUrl);
    const epubReady = configureDownload(epubButton, config.epubUrl);
    downloadNote.hidden = pdfReady || epubReady;
    frame.hidden = true;
    unlockPanel.hidden = false;
    unlockPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (form.elements.website.value) return;

    if (!endpointIsConfigured()) {
      showStatus("A captura ainda aguarda a conexão do endpoint privado. Tente novamente quando a ação estiver oficialmente disponível.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Liberando acesso…";
    status.className = "form-status";

    const payload = {
      nome: form.elements.nome.value.trim(),
      email: form.elements.email.value.trim().toLowerCase(),
      whatsapp: normalizePhone(phone.value),
      obra: "O Vale da Inocência",
      consentimento_acesso: form.elements.consentimento.checked,
      consentimento_marketing: form.elements.marketing.checked,
      ...campaignData()
    };

    try {
      await fetch(config.endpoint.trim(), {
        method: "POST",
        mode: "no-cors",
        cache: "no-store",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      unlockDownloads();
    } catch (error) {
      showStatus("Não foi possível registrar seus dados agora. Verifique sua conexão e tente novamente.");
      submitButton.disabled = false;
      submitButton.textContent = "Liberar meu acesso";
    }
  });
})();
