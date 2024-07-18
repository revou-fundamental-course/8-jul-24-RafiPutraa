function calculateBMI() {
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const age = parseInt(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);

  if (!weight || !height || !age) {
    alert("Harap isi semua data!");
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category = "";
  let risks = "";
  if (bmi < 18.5) {
    category = "Anda kekurangan berat badan";
    risks = `
              <h3>Risiko Kesehatan:</h3>
              <ul>
                  <li>Malnutrisi</li>
                  <li>Osteoporosis</li>
                  <li>Anemia</li>
              </ul>
          `;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Berat badan Anda normal";
    risks = `
              <h3>Risiko Kesehatan:</h3>
              <ul>
                  <li>Risiko kesehatan rendah</li>
              </ul>
          `;
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Anda memiliki berat badan berlebih";
    risks = `
              <h3>Risiko Kesehatan:</h3>
              <ul>
                  <li>Penyakit jantung</li>
                  <li>Diabetes tipe 2</li>
                  <li>Tekanan darah tinggi</li>
              </ul>
          `;
  } else {
    category = "Anda mengalami obesitas";
    risks = `
              <h3>Risiko Kesehatan:</h3>
              <ul>
                  <li>Penyakit jantung</li>
                  <li>Diabetes tipe 2</li>
                  <li>Tekanan darah tinggi</li>
                  <li>Stroke</li>
                  <li>Osteoartritis</li>
              </ul>
          `;
  }

  const resultText = `Jenis Kelamin: ${gender}<br>Berat Badan: ${weight} kg<br>Usia: ${age} tahun<br>Tinggi Badan: ${height} cm<br><br><strong>BMI: ${bmi.toFixed(2)}</strong><br>${category}`;
  document.getElementById("result").innerHTML = resultText;
  document.getElementById("risks").innerHTML = risks;

  generateSuggestions(bmi);
}

function resetForm() {
  document.getElementById("gender").value = "pria";
  document.getElementById("weight").value = "";
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("risks").innerHTML = "";
  document.getElementById("calories-result").innerHTML = "";
  document.getElementById("suggestions").innerHTML = "";
}

function downloadResult() {
  const result = document.getElementById("result").innerHTML;
  const risks = document.getElementById("risks").innerText;
  if (result === "") {
    alert("Tidak ada hasil untuk diunduh!");
    return;
  }

  const blob = new Blob([result.replace(/<br>/g, "\n") + "\n\n" + risks], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "hasil_BMI.txt";
  link.click();
}

function calculateCalories() {
  const weight = parseFloat(document.getElementById("weight").value);
  const age = parseInt(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const activityLevel = document.getElementById("activity-level").value;

  if (!weight || !height || !age) {
    alert("Harap isi semua bidang!");
    return;
  }

  let bmr;
  if (document.getElementById("gender").value === "pria") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  let calories;
  switch (activityLevel) {
    case "sedentary":
      calories = bmr * 1.2;
      break;
    case "light":
      calories = bmr * 1.375;
      break;
    case "moderate":
      calories = bmr * 1.55;
      break;
    case "active":
      calories = bmr * 1.725;
      break;
    case "very-active":
      calories = bmr * 1.9;
      break;
  }

  document.getElementById("calories-result").innerHTML = `Kebutuhan Kalori Harian: <strong>${calories.toFixed(2)}</strong> kkal`;
}

function generateSuggestions(bmi) {
  let suggestions = "";

  if (bmi < 18.5) {
    suggestions = `
              <h3>Saran Diet dan Olahraga:</h3>
              <ul>
                  <li>Perbanyak asupan kalori dengan makanan sehat tinggi protein dan karbohidrat kompleks.</li>
                  <li>Lakukan latihan kekuatan untuk membangun otot.</li>
                  <li>Konsultasikan dengan ahli gizi untuk rencana diet yang sesuai.</li>
              </ul>
          `;
  } else if (bmi >= 18.5 && bmi && bmi < 24.9) {
    suggestions = `
              <h3>Saran Diet dan Olahraga:</h3>
              <ul>
                  <li>Pertahankan diet seimbang dengan berbagai macam nutrisi.</li>
                  <li>Teruskan rutinitas olahraga yang mencakup latihan kardio dan kekuatan.</li>
                  <li>Jaga hidrasi dengan cukup minum air.</li>
              </ul>
          `;
  } else if (bmi >= 25 && bmi < 29.9) {
    suggestions = `
              <h3>Saran Diet dan Olahraga:</h3>
              <ul>
                  <li>Kurangi asupan kalori, terutama dari gula dan lemak jenuh.</li>
                  <li>Lakukan lebih banyak aktivitas kardio untuk membakar kalori.</li>
                  <li>Tambahkan latihan kekuatan untuk meningkatkan metabolisme.</li>
              </ul>
          `;
  } else {
    suggestions = `
              <h3>Saran Diet dan Olahraga:</h3>
              <ul>
                  <li>Konsultasikan dengan dokter atau ahli gizi untuk rencana penurunan berat badan yang aman.</li>
                  <li>Fokus pada diet rendah kalori dengan banyak buah, sayuran, dan protein tanpa lemak.</li>
                  <li>Lakukan latihan kardio secara rutin untuk membakar kalori dan meningkatkan kesehatan jantung.</li>
              </ul>
          `;
  }

  document.getElementById("suggestions").innerHTML = suggestions;
}
