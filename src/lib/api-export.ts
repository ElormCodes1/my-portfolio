export type ExportFormat = "curl" | "python" | "fetch";

export function buildCurl(url: string, method: "GET" | "POST" = "GET"): string {
  if (method === "GET") {
    return `curl "${url}"`;
  }
  return `curl -X ${method} "${url}"`;
}

export function buildPython(url: string, method: "GET" | "POST" = "GET"): string {
  if (method === "GET") {
    return `import requests

response = requests.get("${url}")
response.raise_for_status()
print(response.json())`;
  }
  return `import requests

response = requests.post("${url}")
response.raise_for_status()
print(response.json())`;
}

export function buildFetch(url: string, method: "GET" | "POST" = "GET"): string {
  return `const response = await fetch("${url}", { method: "${method}" });
const data = await response.json();
console.log(data);`;
}

export function getExportSnippet(
  format: ExportFormat,
  url: string,
  method: "GET" | "POST" = "GET",
): string {
  switch (format) {
    case "curl":
      return buildCurl(url, method);
    case "python":
      return buildPython(url, method);
    case "fetch":
      return buildFetch(url, method);
  }
}
