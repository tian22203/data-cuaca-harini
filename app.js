yasync function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "❗Mohon masukkan nama kota!";
    return;
  }

  const apiKey = "5c07495b9ba60c5bbe1655be364c5fb8";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = "❗Kota tidak ditemukan!";
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Suhu: <b>${data.main.temp}°C</b></p>
      <p>Kelembapan: ${data.main.humidity}%</p>
      <p>Cuaca: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `;
  } catch (error) {
    resultDiv.innerHTML = "❗Gagal mengambil data API!";
  }
}
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuaca Saat Ini</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            min-height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s;
        }

        .container {
            background: white;
            padding: 25px;
            border-radius: 20px;
            width: 380px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            text-align: center;
            animation: fadeIn 0.7s ease;
        }

        @keyframes fadeIn {
            from {opacity: 0; transform: translateY(10px);}
            to {opacity: 1; transform: translateY(0);}
        }

        input {
            width: 80%;
            padding: 10px;
            border-radius: 10px;
            border: 1px solid #ddd;
            font-size: 16px;
        }

        button {
            margin-top: 10px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
        }

        button:hover {
            background: #0056b3;
        }

        #result img {
            width: 110px;
            margin-top: -10px;
        }

        .info-box {
            text-align: left;
            margin-top: 10px;
            background: #f3f3f3;
            padding: 10px;
            border-radius: 10px;
        }

        .forecast-card {
            background: #f3f3f3;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 10px;
            text-align: left;
        }

        .forecast-card img {
            width: 60px;
        }
    </style>

</head>
<body>

    <div class="container">
        <h2>🌦 Cek Cuaca Saat Ini</h2>

        <input type="text" id="city" placeholder="Masukkan nama kota...">
        <br>
        <button onclick="getWeather()">Cek Cuaca</button>

        <div id="result" style="margin-top: 20px;"></div>
    </div>

    <script>

        // 🔵 BACKGROUND BERUBAH SESUAI KONDISI CUACA
        function changeBackground(condition) {
            const body = document.body;

            if (condition.includes("hujan")) {
                body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
            } 
            else if (condition.includes("awan")) {
                body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
            } 
            else if (condition.includes("cerah")) {
                body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
            } 
            else {
                body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
            }
        }


        // 🔵 PRAKIRAAN CUACA 5 HARI (3 JAM SEKALI → PILIH JAM 12:00)
        async function getForecast(city) {
            const apiKey = "5c07495b9ba60c5bbe1655be364c5fb8";
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=id&appid=${apiKey}`;

            const forecastDiv = document.createElement("div");
            forecastDiv.id = "forecast";
            forecastDiv.style.marginTop = "20px";

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod !== "200") {
                    forecastDiv.innerHTML = "❗Prakiraan cuaca tidak dapat diambil.";
                    return forecastDiv;
                }

                const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

                let html = `<h3>📅 Prakiraan 5 Hari Mendatang</h3>`;

                daily.forEach(day => {
                    const date = new Date(day.dt_txt);

                    html += `
                        <div class="forecast-card">
                            <p><b>${date.toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long' })}</b></p>
                            <p>🌡 Suhu: ${day.main.temp}°C</p>
                            <p>💧 Kelembapan: ${day.main.humidity}%</p>
                            <p>🌦 Cuaca: ${day.weather[0].description}</p>
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                        </div>
                    `;
                });

                forecastDiv.innerHTML = html;
                return forecastDiv;

            } catch (error) {
                forecastDiv.innerHTML = "❗Gagal mengambil data prakiraan!";
                return forecastDiv;
            }
        }


        // 🔵 INI FUNGSI MILIK KAMU → SAYA PERLUAS & TAMBAHKAN FITUR
        async function getWeather() {
            const city = document.getElementById("city").value;
            const resultDiv = document.getElementById("result");

            if (!city) {
                resultDiv.innerHTML = "❗Mohon masukkan nama kota!";
                return;
            }

            const apiKey = "5c07495b9ba60c5bbe1655be364c5fb8";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod === "404") {
                    resultDiv.innerHTML = "❗Kota tidak ditemukan!";
                    return;
                }

                const kondisi = data.weather[0].description;

                // 🔥 Ubah background sesuai cuaca
                changeBackground(kondisi);

                // 🔥 Tampilkan cuaca saat ini
                resultDiv.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

                    <div class="info-box">
                        <p><b>🌡 Suhu:</b> ${data.main.temp}°C</p>
                        <p><b>📉 Suhu Minimum:</b> ${data.main.temp_min}°C</p>
                        <p><b>📈 Suhu Maksimum:</b> ${data.main.temp_max}°C</p>
                        <p><b>💧 Kelembapan:</b> ${data.main.humidity}%</p>
                        <p><b>🌤 Cuaca:</b> ${kondisi}</p>
                        <p><b>💨 Angin:</b> ${data.wind.speed} m/s</p>
                    </div>
                `;

                // 🔥 Tambahkan prakiraan 5 hari ke depan
                const forecast = await getForecast(city);
                resultDiv.appendChild(forecast);

            } catch (error) {
                resultDiv.innerHTML = "❗Gagal mengambil data API!";
            }
        }

    </script>

</body>
</html>