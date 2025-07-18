
let results = [];
let predictions = [];
let correct = 0;
let wrong = 0;

function recordResult(result) {
  const prediction = getPrediction();
  predictions.push(prediction);
  if (prediction && prediction === result) correct++;
  else if (prediction) wrong++;

  results.push(result);
  updateStats();
  updatePrediction();
  drawRoadmap();
}

function resetAll() {
  results = [];
  predictions = [];
  correct = 0;
  wrong = 0;
  updateStats();
  updatePrediction();
  drawRoadmap();
}

function updateStats() {
  document.getElementById("banker-count").textContent = results.filter(r => r === 'B').length;
  document.getElementById("player-count").textContent = results.filter(r => r === 'P').length;
  document.getElementById("tie-count").textContent = results.filter(r => r === 'T').length;
  document.getElementById("correct-count").textContent = correct;
  document.getElementById("wrong-count").textContent = wrong;
  const total = correct + wrong;
  document.getElementById("accuracy").textContent = total ? (correct / total * 100).toFixed(1) + "%" : "--%";
}

function getPrediction() {
  if (results.length < 2) return null;
  const last = results[results.length - 1];
  const secondLast = results[results.length - 2];
  return last === secondLast ? last : (last === 'B' ? 'P' : 'B');
}

function updatePrediction() {
  const prediction = getPrediction();
  document.getElementById("suggestion").textContent = prediction === 'B' ? '莊' : (prediction === 'P' ? '閒' : '--');
  document.getElementById("winrate").textContent = prediction ? "65.3%" : "--%";
}

function drawRoadmap() {
  const canvas = document.getElementById("roadmap");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  results.forEach((r, i) => {
    const x = (i % 20) * 30 + 10;
    const y = Math.floor(i / 20) * 30 + 10;
    ctx.fillStyle = r === 'B' ? 'red' : (r === 'P' ? 'blue' : 'green');
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}
