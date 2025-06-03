<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"></script>

<script>

	// Mengambil data dari URL web app Google Apps Script

	var url = 'https://script.google.com/macros/s/AKfycby1sXkAVRLv9fOrXv-YvZUMyxSDFCD4i-ul6juPcjHx8EVVVzbOr0msr8Xa5iNqHTc0/exec';

	var dataArray = [];

	fetch(url)

		.then(response => response.json())

		.then(data => {

			$("#halaman").show();

			$("#loading").hide();

			sessionStorage.setItem('sekolah',data.setting[0]["Nama Sekolah"]);

			sessionStorage.setItem('alamat',data.setting[0]["Alamat Sekolah"]);

			sessionStorage.setItem('logo',data.setting[0]["Logo Sekolah"]);

			sessionStorage.setItem('judul',data.setting[0]["Judul Halaman"]);

			sessionStorage.setItem('waktu pengumuman',data.setting[0]["Waktu Pengumuman"]);

			dataArray = data.data;

			data.data.some(function(item) {

				$('#dataUser').append(","+item.Username);

			});

			loadSetting();

			//console.log(data.data);

		})

		.catch(error => {

			console.error('Error:', error);

			alert('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');

		});

</script>
