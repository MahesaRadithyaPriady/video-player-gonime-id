function timeToSeconds(time) {
  const [hh, mm, ss] = time.split(":");
  return parseFloat(hh) * 3600 + parseFloat(mm) * 60 + parseFloat(ss);
}
export async function vttToArray(vttFile) {
  const response = await fetch(vttFile);
  const text = await response.text();

  const lines = text.split("\n").map((line) => line.trim());
  const subtitles = [];
  let index = 0;

  while (index < lines.length) {
    if (lines[index] === "WEBVTT" || lines[index] === "") {
      index++; // Lewati header atau baris kosong
      continue;
    }

    // Format waktu VTT: 00:00:01.000 --> 00:00:04.000
    const timeMatch = lines[index].match(
      /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/
    );

    if (timeMatch) {
      const start = timeToSeconds(timeMatch[1]); // Konversi waktu ke detik
      const end = timeToSeconds(timeMatch[2]);
      index++;

      let subtitleText = "";
      while (index < lines.length && lines[index] !== "") {
        subtitleText += lines[index] + " ";
        index++;
      }

      subtitles.push({ start, end, text: subtitleText.trim() });
    }

    index++;
  }

  return subtitles;
}
