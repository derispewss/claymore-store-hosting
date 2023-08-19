var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.js'
document.head.appendChild(script);
// config pesanan
    const firebaseConfig = {
            apiKey: "AIzaSyAqcpfYhABJxpUxNBiLUVbKJUpc8UnZ66o",
            authDomain: "claymore-store.firebaseapp.com",
            databaseURL: "https://claymore-store-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "claymore-store",
            storageBucket: "claymore-store.appspot.com",
            messagingSenderId: "524081879273",
            appId: "1:524081879273:web:e4f501d6beeb26c4a83878",
            measurementId: "G-FYBG2BB4NN"
        };
        // Inisialisasi Firebase
        firebase.initializeApp(firebaseConfig);

        // Referensi ke Realtime Database
        var database = firebase.database();
        var invoicesRef = database.ref("invoices");

        // Menangani pengiriman form invoice
        document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Mencegah pengiriman form

        // mengambil form dari form
        const inputId = document.getElementById('input-id').value; 
        const inputServer = document.getElementById('input-server').value; 
        const nominalOrder2 = document.getElementById('select1-order');
        const order = document.getElementById('select1-order').value;
        const payment= document.getElementById('select2-pay').value;

        var index = nominalOrder2.selectedIndex;
        var nominalOrder = nominalOrder2.options[index].textContent;

        var invoice = {
            UID_GAME: inputId,
            SERVER: inputServer,
            ORDER : nominalOrder,
            PAYMENT: payment
        };

        // global no admin
        const admin = '6282324075079'

        // Fungsi untuk mendapatkan nama hari dalam bahasa Indonesia
        function getNamaHari(hari) {
        const daftarNamaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return daftarNamaHari[hari];
        }
        // Fungsi untuk mendapatkan tanggal dan waktu sekarang dalam format bahasa Indonesia
        function getNowDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const dayOfWeek = getNamaHari(now.getDay());
            return `${dayOfWeek}, ${day}-${month}-${year} ${hours}:${minutes}:${seconds} WIB`;
        }
        
            // Membuat array berisi huruf kapital dan angka kapital
            var data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                        'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
                        '4', '5', '6', '7', '8', '9'];
            // Fungsi untuk mengacak array
            function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
            }
            // Mengacak array data
            var dataAcak = shuffleArray(data);

            // Mengambil 10 karakter pertama dari hasil acakan
            var hasilAcakan = dataAcak.slice(0, 10).join('');

            // Menentukan ID yang akan digunakan
            var customId = "CSX" + hasilAcakan; // Contoh: INVOICE_1625556182934
        
            // Menyimpan invoice ke Firebase Realtime Database dengan ID yang telah ditentukan
            invoicesRef.child(customId).set(invoice)

            const web = "https://claymorestore.shop/chek-invoice"

                if (invoice) {
                    // Tampilkan SweetAlert2 loading
                    Swal.fire({
                        title: 'Sedang memperoses pesanan anda...',
                        allowOutsideClick: true,
                        showConfirmButton: false,
                        willOpen: () => {
                        Swal.showLoading();
                        },
                        didOpen: async () => {
                        // Tunggu selama 5 detik
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        Swal.hideLoading();
                        var dataDate2 = getNowDateTime();
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil Membuat pesanan Anda',
                            text: 'Dengan no Invoice :\n' + customId,
                            text: dataDate2 + '\n-\n' + customId,
                            timer: 3500, // Durasi alert success
                            timerProgressBar: true,
                            showConfirmButton: false
                        }).then(() => {
                        setTimeout(() => {
                        if (payment === 'QRIS') {
                        Swal.fire({
                            title: 'qris - TOKO DERIS',
                            text: 'silahkan bayar & screenshot \ndengan nominal Rp.' + order + ',-',
                            imageUrl: '/images/qris.png',
                            imageWidth: 300,
                            imageHeight: 300,
                            imageAlt: 'qris.jpg',
                            timer: 180000, // Timer dalam milidetik (3 menit = 180000 ms)
                            timerProgressBar: true,
                            confirmButtonText: 'Saya sudah bayar !' // Menghilangkan tombol OK
                            }).then(() => {
                            var dataDate = getNowDateTime();
                            var whatsapp = `https://api.whatsapp.com/send?phone=${admin}&text=*CLAYMORESTORE.SHOP*%0A${dataDate}%0ADengan Nomor invoice :%0A*${customId}*%0A%0A*FORMAT ORDER FREE FIRE*%0A%0AID : ${inputId}%0ANama Item : ${nominalOrder}%0ANominal Pembelian : *Rp.${order},-*%0APembayaran : ${payment}%0A%0AKalian bisa chek : %0A_${web}_%0A%0A_Powered by claymorestore.shop_`
                            window.location.href = whatsapp, '_blank';
                            })
                        } else if (payment === 'BCA') {
                            var dataDate = getNowDateTime();
                            var whatsapp = `https://api.whatsapp.com/send?phone=${admin}&text=*CLAYMORESTORE.SHOP*%0A${dataDate}%0ADengan Nomor invoice :%0A*${customId}*%0A%0A*FORMAT ORDER GENSHIN IMPACT*%0A%0AID : ${inputId}%0ANama Item : ${nominalOrder}%0ANominal Pembelian : *Rp.${order},-*%0APembayaran : ${payment}%0A%0AKalian bisa chek : %0A_${web}_%0A%0A_Powered by claymorestore.shop_`
                            window.location.href = whatsapp, '_blank';
                        } else if (payment === 'GOPAY') {
                            var dataDate = getNowDateTime();
                            var whatsapp = `https://api.whatsapp.com/send?phone=${admin}&text=*CLAYMORESTORE.SHOP*%0A${dataDate}%0ADengan Nomor invoice :%0A*${customId}*%0A%0A*FORMAT ORDER GENSHIN IMPACT*%0A%0AID : ${inputId}%0ANama Item : ${nominalOrder}%0ANominal Pembelian : *Rp.${order},-*%0APembayaran : ${payment}%0A%0AKalian bisa chek : %0A_${web}_%0A%0A_Powered by claymorestore.shop_`
                            window.location.href = whatsapp, '_blank';
                        } else if (payment === 'DANA') {
                            var dataDate = getNowDateTime();
                            var whatsapp = `https://api.whatsapp.com/send?phone=${admin}&text=*CLAYMORESTORE.SHOP*%0A${dataDate}%0ADengan Nomor invoice :%0A*${customId}*%0A%0A*FORMAT ORDER GENSHIN IMPACT*%0A%0AID : ${inputId}%0ANama Item : ${nominalOrder}%0ANominal Pembelian : *Rp.${order},-*%0APembayaran : ${payment}%0A%0AKalian bisa chek : %0A_${web}_%0A%0A_Powered by claymorestore.shop_`
                            window.location.href = whatsapp, '_blank';
                        } else if (payment === 'OVO') {
                            var dataDate = getNowDateTime();
                            var whatsapp = `https://api.whatsapp.com/send?phone=${admin}&text=*CLAYMORESTORE.SHOP*%0A${dataDate}%0ADengan Nomor invoice :%0A*${customId}*%0A%0A*FORMAT ORDER GENSHIN IMPACT*%0A%0AID : ${inputId}%0ANama Item : ${nominalOrder}%0ANominal Pembelian : *Rp.${order},-*%0APembayaran : ${payment}%0A%0AKalian bisa chek : %0A_${web}_%0A%0A_Powered by claymorestore.shop_`
                            window.location.href = whatsapp, '_blank';
                        }
                        }, 500);
                        });
                        }
                    });
                } ;
                // Mengosongkan form
                document.getElementById("myForm").reset();
    });