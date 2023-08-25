        // configurasi 
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

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Reference to Firebase Auth
        var auth = firebase.auth();

        // Handler for "Send Verification Code" button
        document.getElementById("sendCodeBtn").addEventListener("click", function() {
            var phoneNumber = document.getElementById("phoneNumber").value;

            var appVerifier = new firebase.auth.RecaptchaVerifier('sendCodeBtn', {
                'size': 'invisible',
                'callback': function(response) {
                    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
                    .then(function(confirmationResult) {
                    // Tampilkan SweetAlert2 loading
                    Swal.fire({
                        title: 'sedang mengirimkan otp anda...',
                        allowOutsideClick: true,
                        showConfirmButton: false,
                        willOpen: () => {
                        Swal.showLoading();
                        },
                        didOpen: async () => {
                        // Tunggu selama 3 detik
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        Swal.hideLoading();
                        Swal.fire({
                        icon: 'success',
                        title: 'OTP telah terkirim !',
                        text: 'chek notifikasi pesan di smartphone kalian.',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                        });
                        }
                        });
                        document.getElementById("phone-section").style.display = "none";
                        document.getElementById("code-section").style.display = "block";
                        window.confirmationResult = confirmationResult;
                    }).catch(function(error) {
                        console.error("Error sending verification code:", error);
                    });
                }
            });
            appVerifier.verify();
        });

        // Handler for "Verify Code" button
        document.getElementById("verifyCodeBtn").addEventListener("click", function() {
            var verificationCode = document.getElementById("verificationCode").value;
            window.confirmationResult.confirm(verificationCode).then(function(result) {
                    // Tampilkan SweetAlert2 loading
                    Swal.fire({
                        title: 'sedang validasi otp anda...',
                        allowOutsideClick: true,
                        showConfirmButton: false,
                        willOpen: () => {
                        Swal.showLoading();
                        },
                        didOpen: async () => {
                        // Tunggu selama 3 detik
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        Swal.hideLoading();
                        Swal.fire({
                        icon: 'success',
                        title: 'Kode OTP telah tervalidasi !',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.href = 'admin/blank', '_blank';
                        })
                    }
                });
            }).catch(function(error) {
                    Swal.fire({
                    icon: 'error',
                    title: 'Failed !',
                    text: 'Code OTP is fail.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                    });
            });
        });
