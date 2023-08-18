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

<h4 id="example-pages">Example Pages</h4>

<p>If you want to get inspiration or just show something directly to your clients, you can jump start your development with our pre-built example pages. You will be able to quickly set up the basic structure for your web project.</p>

<h2 id="table-of-contents">Table of Contents</h2>

<ul>
  <li><a href="#demo">Demo</a></li>
  <li><a href="#quick-start">Quick Start</a></li>
  <li><a href="#documentation">Documentation</a></li>
  <li><a href="#file-structure">File Structure</a></li>
  <li><a href="#browser-support">Browser Support</a></li>
  <li><a href="#resources">Resources</a></li>
  <li><a href="#reporting-issues">Reporting Issues</a></li>
  <li><a href="#technical-support-or-questions">Technical Support or Questions</a></li>
  <li><a href="#licensing">Licensing</a></li>
  <li><a href="#useful-links">Useful Links</a></li>
</ul>

<h2 id="demo">Demo</h2>

<ul>
  <li><a href="https://demos.creative-tim.com/vue-argon-design-system">Index Page</a></li>
  <li><a href="https://demos.creative-tim.com/vue-argon-design-system/#/landing">Landing page</a></li>
  <li><a href="https://demos.creative-tim.com/vue-argon-design-system/#/profile">Profile Page</a></li>
  <li><a href="https://demos.creative-tim.com/vue-argon-design-system/#/login">Login Page</a></li>
  <li><a href="https://demos.creative-tim.com/vue-argon-design-system/#/register">Register Page</a></li>
</ul>

<p><a href="https://demos.creative-tim.com/argon-design-system">View More</a></p>

<h2 id="quick-start">Quick start</h2>

<ul>
  <li><a href="https://github.com/creativetimofficial/vue-argon-design-system/archive/master.zip">Download from Github</a>.</li>
  <li><a href="https://www.creative-tim.com/product/vue-argon-design-system">Download from Creative Tim</a>.</li>
  <li>Clone the repo: <code class="highlighter-rouge">git clone https://github.com/creativetimofficial/vue-argon-design-system.git</code>.</li>
</ul>

<h2 id="documentation">Documentation</h2>

<p>The documentation for the Vue Argon Design System is hosted at our <a href="https://demos.creative-tim.com/vue-argon-design-system">website</a>.</p>

<h2 id="file-structure">File Structure</h2>

<p>Within the download you’ll find the following directories and files:</p>

<div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>argon/
|-- vue-argon-design-system
    |-- App.vue
    |-- main.js
    |-- router.js
    |-- assets
    |   |-- scss
    |   |   |-- argon.scss
    |   |   |-- bootstrap
    |   |   |-- custom
    |   |-- vendor
    |       |-- font-awesome
    |       |   |-- css
    |       |   |   |-- font-awesome.css
    |       |   |   |-- font-awesome.min.css
    |       |   |-- fonts
    |       |       |-- FontAwesome.otf
    |       |       |-- fontawesome-webfont.eot
    |       |       |-- fontawesome-webfont.svg
    |       |       |-- fontawesome-webfont.ttf
    |       |       |-- fontawesome-webfont.woff
    |       |       |-- fontawesome-webfont.woff2
    |       |-- nucleo
    |           |-- css
    |           |   |-- nucleo-svg.css
    |           |   |-- nucleo.css
    |           |-- fonts
    |               |-- nucleo-icons.eot
    |               |-- nucleo-icons.svg
    |               |-- nucleo-icons.ttf
    |               |-- nucleo-icons.woff
    |               |-- nucleo-icons.woff2
    |-- components
    |   |-- Badge.vue
    |   |-- BaseButton.vue
    |   |-- BaseCheckbox.vue
    |   |-- BaseInput.vue
    |   |-- BaseNav.vue
    |   |-- BaseRadio.vue
    |   |-- BaseSlider.vue
    |   |-- BaseSwitch.vue
    |   |-- Card.vue
    |   |-- CloseButton.vue
    |   |-- Icon.vue
    |   |-- NavbarToggleButton.vue
    |-- layout
    |   |-- AppFooter.vue
    |   |-- AppHeader.vue
    |-- plugins
    |   |-- argon-kit.js
    |   |-- globalComponents.js
    |   |-- globalDirectives.js
    |-- views
        |-- Components.vue
        |-- Landing.vue
        |-- Login.vue
        |-- Profile.vue
        |-- Register.vue
        |-- components
            |-- BasicElements.vue
            |-- Carousel.vue
            |-- CustomControls.vue
            |-- DownloadSection.vue
            |-- Examples.vue
            |-- Hero.vue
            |-- Icons.vue
            |-- Inputs.vue
            |-- JavascriptComponents.vue
            |-- Navigation.vue

</code></pre></div></div>

<h2 id="browser-support">Browser Support</h2>

<p>At present, we officially aim to support the last two versions of the following browsers:</p>

<p><img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64" />
<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64" />
<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64" />
<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64" />
<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64" /></p>

<h2 id="resources">Resources</h2>

<ul>
  <li>Demo: <a href="https://demos.creative-tim.com/argon-design-system">https://demos.creative-tim.com/vue-argon-design-system</a></li>
  <li>Download: <a href="https://www.creative-tim.com/product/vue-argon-design-system">https://www.creative-tim.com/product/vue-argon-design-system</a></li>
  <li>License Agreement: <a href="https://www.creative-tim.com/license">https://www.creative-tim.com/license</a></li>
  <li>Support: <a href="https://www.creative-tim.com/contact-us">https://www.creative-tim.com/contact-us</a></li>
  <li>Issues: <a href="https://github.com/creativetimofficial/vue-argon-design-system/issues">Github Issues Page</a></li>
</ul>

<h2 id="reporting-issues">Reporting Issues</h2>

<p>We use GitHub Issues as the official bug tracker for the Vue Argon Design System. Here are some advices for our users that want to report an issue:</p>

<ol>
  <li>Make sure that you are using the latest version of the Vue Argon Design System. Check the CHANGELOG from your copy on our <a href="https://www.creative-tim.com">website</a>.</li>
  <li>Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.</li>
  <li>Some issues may be browser specific, so specifying in what browser you encountered the issue might help.</li>
</ol>

<h2 id="technical-support-or-questions">Technical Support or Questions</h2>

<p>If you have questions or need help integrating the product please <a href="https://www.creative-tim.com/contact-us">contact us</a> instead of opening an issue.</p>

<h2 id="licensing">Licensing</h2>

<ul>
  <li>
    <p>Copyright © 2018 Creative Tim (https://www.creative-tim.com)</p>
  </li>
  <li>
    <p>Licensed under MIT (https://github.com/creativetimofficial/vue-argon-design-system/blob/master/LICENSE.md)</p>
  </li>
</ul>

<h2 id="useful-links">Useful Links</h2>

<ul>
  <li><a href="https://www.creative-tim.com/bootstrap-themes">More products</a> from Creative Tim</li>
  <li><a href="https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w">Tutorials</a></li>
  <li><a href="https://www.creative-tim.com/bootstrap-themes/free">Freebies</a> from Creative Tim</li>
  <li><a href="https://www.creative-tim.com/affiliates/new">Affiliate Program</a> (earn money)</li>
</ul>

<h2 id="social-media">Social Media</h2>

<ul>
  <li>Twitter: <a href="https://twitter.com/CreativeTim">https://twitter.com/CreativeTim</a></li>
  <li>Facebook: <a href="https://www.facebook.com/CreativeTim">https://www.facebook.com/CreativeTim</a></li>
  <li>Dribbble: <a href="https://dribbble.com/creativetim">https://dribbble.com/creativetim</a></li>
  <li>Google+: <a href="https://plus.google.com/+CreativetimPage">https://plus.google.com/+CreativetimPage</a></li>
  <li>Instagram: <a href="https://www.instagram.com/CreativeTimOfficial">https://www.instagram.com/CreativeTimOfficial</a></li>
</ul>
