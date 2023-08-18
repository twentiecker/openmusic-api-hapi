<h1>Openmusic API v3.0</h1>

<h2>Kriteria OpenMusic API versi 3</h2>
<p>Terdapat 4 kriteria utama yang harus Anda penuhi dalam membuat proyek OpenMusic API.</p>

<h3>Kriteria 1 : Ekspor Lagu Pada Playlist</h3>
<p>API yang Anda buat harus tersedia fitur ekspor lagu pada playlist melalui route:</p>
<ul>
  <li>Method : <strong>POST</strong></li>
  <li>URL : <strong>/export/playlists/{playlistId}</strong></li>
  <li>Body Request:</li>
  <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
  {
    "targetEmail": string
  }
  </code></pre></div></div>
</ul>
<p>Ketentuan:</p>
<ul>
  <li>Wajib menggunakan message broker dengan menggunakan RabbitMQ. 
    <ul>
      <li>Nilai host server RabbitMQ wajib menggunakan environment variable <strong>RABBITMQ_SERVER</strong></li>
    </ul>
  </li>
  <li>Hanya pemilik Playlist yang boleh mengekspor lagu.</li>
  <li>Wajib mengirimkan program consumer.</li>
  <li>Hasil ekspor berupa data json.</li>
  <li>Dikirimkan melalui email menggunakan nodemailer. 
    <ul>
      <li>Kredensial alamat dan password email pengirim wajib menggunakan environment variable <strong>MAIL_ADDRESS</strong> dan <strong>MAIL_PASSWORD</strong>.</li>
      <li>Serta, nilai host dan port dari server SMTP juga wajib menggunakan environment variable <strong>MAIL_HOST</strong> dan <strong>MAIL_PORT</strong>.</li>
    </ul>
  </li>
</ul>
<p>Response yang harus dikembalikan:</p>
<ul>
  <li>Status Code: 201</li>
  <li>Response Body:</li>
  <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
  {
    "status": "success",
    "message": "Permintaan Anda sedang kami proses",
  }
  </code></pre></div></div>
</ul>
<p>Struktur data JSON yang diekspor adalah seperti ini:</p>
<div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
  {
    "playlist": {
      "id": "playlist-Mk8AnmCp210PwT6B",
      "name": "My Favorite Coldplay Song",
      "songs": [
        {
          "id": "song-Qbax5Oy7L8WKf74l",
          "title": "Life in Technicolor",
          "performer": "Coldplay"
        },
        {
          "id": "song-poax5Oy7L8WKllqw",
          "title": "Centimeteries of London",
          "performer": "Coldplay"
        },
        {
          "id": "song-Qalokam7L8WKf74l",
          "title": "Lost!",
          "performer": "Coldplay"
        }
      ]
    }
  }
  </code></pre></div></div>

<h3>Kriteria 2 : Mengunggah Sampul Album</h3>
<p>API yang Anda buat harus dapat mengunggah sampul album melalui route:</p>
<ul>
  <li>Method : <strong>POST</strong></li>
  <li>URL : <strong>/albums/{id}/covers (Form data)</strong></li>
  <li>Body Request (Form data):</li>
  <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
  {
    "cover": file
  }
  </code></pre></div></div>
</ul>
<p>Ketentuan:</p>
<ul>
  <li>Tipe konten yang diunggah harus merupakan MIME types dari images.</li>
  <li>Ukuran file cover maksimal 512000 Bytes.</li>
  <li>Anda bisa menggunakan File System (lokal) atau S3 Bucket dalam menampung object. 
    <ul>
      <li>Bila menggunakan S3 Bucket, nama bucket wajib menggunakan variable environment <strong>AWS_BUCKET_NAME</strong>.</li>
    </ul>
  </li>
</ul>
<p>Response yang harus dikembalikan:</p>
<ul>
  <li>Status Code: 201</li>
  <li>Response Body:</li>
  <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
  {
    "status": "success",
    "message": "Sampul berhasil diunggah"
  }
  </code></pre></div></div>
</ul>
<p>Respons dari endpoint <strong>GET /albums/{id}</strong> harus menampilkan properti coverUrl. Itu berarti, alamat atau nama sampul album harus disimpan di dalam database. Berikut respons yang harus dikembalikan oleh endpoint <strong>GET /albums/{id}</strong>:</p>
<div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
  {
    "status": "success",
    "data": {
      "album": {
        "id": "album-Mk8AnmCp210PwT6B",
        "name": "Viva la Vida",
        "coverUrl": "http://...."
      }
    }
  }
  </code></pre></div></div>
<p>Ketentuan:</p>
<ul>
  <li>URL gambar harus dapat diakses dengan baik.</li>
  <li>Bila album belum memiliki sampul, maka coverUrl bernilai null.</li>
  <li>Bila menambahkan sampul pada album yang sudah memiliki sampul, maka sampul lama akan tergantikan.</li>
</ul>

<h3>(Updated!) Kriteria 3 : Menyukai Album</h3>
<p>API harus memiliki fitur menyukai, batal menyukai, serta melihat jumlah yang menyukai album. Berikut spesifikasinya:</p>
<ol>
  <li>Menyukai album.</li>
  <ul>
    <li>Endpoint: POST /albums/{id}/likes</li>
    <li>Status Code: 201</li>
    <li>Response Body:</li>
    <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
    {
      "status": "success",
      "message": *any
    }
    </code></pre></div></div>
  </ul>
  <li>Batal menyukai album.</li>
  <ul>
    <li>Endpoint: DELETE /albums/{id}/likes</li>
    <li>Status Code: 200</li>
    <li>Response Body:</li>
    <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
    {
      "status": "success",
      "message": *any
    }
    </code></pre></div></div>
  </ul>
  <li>Melihat jumlah yang menyukai album.</li>
  <ul>
    <li>Endpoint: GET /albums/{id}/likes</li>
    <li>Status Code: 200</li>
    <li>Response Body:</li>
    <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
    {
      "status": "success",
      "data": 
        likes: number
    }
    </code></pre></div></div>
  </ul>
</ol>
<p>Keterangan:</p>
<ul>
  <li>Menyukai atau batal menyukai album merupakan resource strict sehingga dibutuhkan autentikasi untuk mengaksesnya. Hal ini bertujuan untuk mengetahui apakah pengguna sudah menyukai album.</li>
  <li>Pastikan pengguna hanya bisa menyukai album yang sama sebanyak 1 kali. Kembalikan dengan response code 400 jika pengguna mencoba menyukai album yang sama.</li>
</ul>

<h3>Kriteria 4 : Menerapkan Server-Side Cache</h3>
<p>API yang Anda buat harus tersedia fitur ekspor lagu pada playlist melalui route:</p>
<ul>
  <li>Menerapkan server-side cache pada jumlah yang menyukai sebuah album (GET /albums/{id}/likes).</li>
  <li>Cache harus bertahan selama 30 menit.</li>
  <li>Respons yang dihasilkan dari cache harus memiliki custom header properti <strong>X-Data-Source</strong> bernilai “cache”.</li>
  <li>Cache harus dihapus setiap kali ada perubahan jumlah like pada album dengan id tertentu.</li>
  <li>Memory caching engine wajib menggunakan Redis atau Memurai (Windows).
    <ul>
      <li>Nilai host server Redis wajib menggunakan environment variable <strong>REDIS_SERVER</strong></li>
    </ul>
  </li>
</ul>

<h3>Kriteria 5 : Pertahankan Fitur OpenMusic API versi 2 dan 1</h3>
<p>Pastikan fitur dan kriteria OpenMusic API versi 2 dan 1 tetap dipertahankan seperti:</p>
<ul>
  <li>Pengelolaan Data Album</li>
  <li>Pengelolaan Data Song</li>
  <li>Fitur Registrasi dan Autentikasi Pengguna</li>
  <li>Pengelolaan Data Playlist</li>
  <li>Menerapkan Foreign Key</li>
  <li>Menerapkan Data Validation</li>
  <li>Penanganan Eror (Error Handling)</li>
</ul>