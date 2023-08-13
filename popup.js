const urlInput = document.getElementById("urlInput");
const checkButton = document.getElementById("checkButton");
const resultParagraph = document.getElementById("result");

async function checkLink(url, apiKey) {
  const baseUrl = "https://www.virustotal.com/vtapi/v2/url/report";
  const params = {
    apikey: apiKey,
    resource: url,
  };

  try {
    const response = await axios.get(baseUrl, { params });
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return null;
  }
}

checkButton.addEventListener("click", async () => {
  const apiKey =
    "5d09310140e8baeb2623675248260464c8d23456a25e13469a7fb8738197cb28";

  const url = urlInput.value;
  resultParagraph.textContent = url;

  const result = await checkLink(url, apiKey);

  if (result && result.response_code === 1) {
    resultParagraph.textContent = `URL: ${url}\nPositivos: ${result.positives}\nTotal de Escaneos: ${result.total}\n`;
  } else {
    resultParagraph.textContent = "No se encontró información para la URL.";
  }
});
