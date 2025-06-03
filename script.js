<script>
$(document).ready(function(){
	// Tempatkan kode Anda di sini
	
});

function loadSetting(){
	//proses logo dari Google Drive
	var urlLogo = sessionStorage.getItem('logo');
	var idLogo = urlLogo.match(/[-\w]{25,}/)[0];
	var logoSekolah = 'https://lh3.googleusercontent.com/d/' + idLogo;

	$('#logoSekolah').attr('src', logoSekolah);
	$('.sekolah').html(sessionStorage.getItem('sekolah'));
	var tahunSekarang = new Date().getFullYear();
	$("#cpr").html("&copy; " + tahunSekarang + " | " + sessionStorage.getItem('sekolah') + "<br/>" + sessionStorage.getItem('alamat'));

	// waktu pengumuman
	var dateString = sessionStorage.getItem('waktu pengumuman');
	var date = new Date(dateString.replace(' ', 'T'));
	var wa = date.getTime();
	sessionStorage.setItem('waktuAkhir',wa);
	loadCountDown();
	//console.log(dataArray);
}

function loadCountDown(){
	var x = setInterval(function() {
		var waktuAkhir = sessionStorage.getItem('waktuAkhir');
		var sekarang = new Date().getTime();
		var selisih = waktuAkhir - sekarang;
		  
		// Time calculations for days, hours, minutes and seconds
		var hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
		var jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
		var detik = Math.floor((selisih % (1000 * 60)) / 1000);
		  
		// Output the result in an element with id="demo"
		document.getElementById("hari").innerHTML = hari;
		document.getElementById("jam").innerHTML = jam;
		document.getElementById("menit").innerHTML = menit;
		document.getElementById("detik").innerHTML = detik;
		  
		// If the count down is over, write some text 
		if (selisih < 0) {
		  clearInterval(x);
		  document.getElementById("hitungmundur").style.display="none";
		  document.getElementById("peringatan").innerHTML = "Silakan Login dengan NIS dan Password";
		  document.getElementById("konten").style.display="block";
		  document.getElementById("cpr").style.display="block";
		}else{
		  document.getElementById("hitungmundur").style.display="block";
		  document.getElementById("konten").style.display="none";
		  document.getElementById("cpr").style.display="block";
		}
	 }, 1000);
}

function login(){
	document.getElementById("loading").style.display="block";
	nis = document.getElementById("nis").value;
	pass = document.getElementById("pass").value;
	if(nis == "" || pass == ""){
    document.getElementById("loading").style.display="none";
		document.getElementById("peringatan").innerHTML = "TIDAK BOLEH KOSONG";
	}else{
		//if(dataArray[373].Username == nis){
			//console.log('ok');
		//}
		var container = document.getElementById("dataUser");
		var numbers = container.innerText.split(',');
		var position = numbers.indexOf(nis);
		if(position < 0){
			document.getElementById("loading").style.display="none";
			document.getElementById("peringatan").innerHTML = "Username Tidak Ditemukan";
		}else{
			position = position -1;
			if(dataArray[position].Password == pass){
				//console.log('oke');
				document.getElementById("loading").style.display="none";
				$('#tampilNama').html(dataArray[position].Nama);
				$('#tampilNisn').html(dataArray[position].NIS);
				$('#tampilKelas').html(dataArray[position].Kelas);
				if(dataArray[position].Hasil=="LULUS"){hasile = "<div style='color:green'>"+dataArray[position].Hasil+"</div>"}else{hasile = "<div style='color:red'>"+dataArray[position].Hasil+"</div>"}
				$('#tampilLulus').html(hasile);
				
				if(dataArray[position].Foto==null || dataArray[position].Foto==""){
					$('#fotoSiswa').attr('src', '');
					$('#fotoSiswa').hide();
				}else{
					if (isURL(dataArray[position].Foto)) {
						var urlFotoSiswa = dataArray[position].Foto;
						var idFotoSiswa = urlFotoSiswa.match(/[-\w]{25,}/)[0];
						var fotoSiswa = 'https://lh3.googleusercontent.com/d/' + idFotoSiswa;
						$('#fotoSiswa').attr('src', fotoSiswa);
						$('#fotoSiswa').show();
					}else{
						$('#fotoSiswa').attr('src', '');
						$('#fotoSiswa').hide();
					}
				}
				if(dataArray[position].SKL==null || dataArray[position].SKL==""){
					$("#tampilSKL").html("");
				}else{
					if (isURL(dataArray[position].SKL)) {
						$("#tampilSKL").html("<a href='"+dataArray[position].SKL+"' target='_blank'>DOWNLOAD SKL</a>");
					}else{
						$("#tampilSKL").html("");
					}
				}
				
				document.getElementById("pengumuman").style.display="block";
				document.getElementById("konten").style.display="none";
			}else{
				//console.log('gagal');
				document.getElementById("loading").style.display="none";
				document.getElementById("peringatan").innerHTML = "Passoword Salah";
			}
		}
	}
}

function loginx(){
	document.getElementById("loading").style.display="block";
	nis = document.getElementById("nis").value;
	pass = document.getElementById("pass").value;
	if(nis == "" || pass == ""){
    document.getElementById("loading").style.display="none";
		document.getElementById("peringatan").innerHTML = "TIDAK BOLEH KOSONG";
	}else{
		// baca data spreadhsheet dengan Google Apps Script
		// Mengambil data dari URL web app Google Apps Script
		fetch(url)
			.then(response => response.json())
			.then(data => {
				//console.log(data.data);
                data.data.some(function(item) {
                    if(item.Username === nis && item.Password === pass){
						//alert('Login berhasil!');
						$('#tampilNama').html(item.Nama);
						$('#tampilNisn').html(item.NIS);
						$('#tampilKelas').html(item.Kelas);
						if(item.Hasil=="LULUS"){hasile = "<div style='color:green'>"+item.Hasil+"</div>"}else{hasile = "<div style='color:red'>"+item.Hasil+"</div>"}
						$('#tampilLulus').html(hasile);
						
						if(item.Foto==null || item.Foto==""){
							$('#fotoSiswa').attr('src', '');
							$('#fotoSiswa').hide();
						}else{
							if (isURL(item.Foto)) {
								var urlFotoSiswa = item.Foto;
								var idFotoSiswa = urlFotoSiswa.match(/[-\w]{25,}/)[0];
								var fotoSiswa = 'https://lh3.googleusercontent.com/d/' + idFotoSiswa;
								$('#fotoSiswa').attr('src', fotoSiswa);
								$('#fotoSiswa').show();
							}else{
								$('#fotoSiswa').attr('src', '');
								$('#fotoSiswa').hide();
							}
						}
						if(item.SKL==null || item.SKL==""){
							$("#tampilSKL").html("");
						}else{
							if (isURL(item.SKL)) {
								$("#tampilSKL").html("<a href='"+item.SKL+"' target='_blank'>DOWNLOAD SKL</a>");
							}else{
								$("#tampilSKL").html("");
							}
						}
						
						document.getElementById("pengumuman").style.display="block";
						document.getElementById("konten").style.display="none";
					} else {
						$('#peringatan').html('NIS atau password salah. Silakan coba lagi.');
					}
				});
                document.getElementById("loading").style.display="none";
			})
			.catch(error => {
				console.error('Error:', error);
				alert('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
                document.getElementById("loading").style.display="none";
			});
	}
}

function  hapusPeringatan(){
  document.getElementById("peringatan").innerHTML = "Silakan Login dengan NIS dan Password";
}

function awal(){
	document.getElementById("nis").value = "";
	document.getElementById("pass").value = "";
	document.getElementById("konten").style.display="block";
	document.getElementById("pengumuman").style.display="none";
	document.getElementById("peringatan").innerHTML = "Anda sudah logout.";
}

function isURL(str) {
    var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(str);
}
</script>
