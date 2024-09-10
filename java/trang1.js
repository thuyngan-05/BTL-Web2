/*document.querySelector('.button').addEventListener('click', function () {
    const username = document.querySelector('.user input').value;
    const password = document.querySelector('.password input').value;

    // Kiểm tra nếu username và password không rỗng
    if (username && password) {
        // Chuyển hướng đến trang chủ của trang web sau khi đăng nhập thành công
        window.open("/trang2.html", "_blank");
        // window.location.href = '/html/trang2.html'; 
    } else {
        alert("Vui lòng nhập đầy đủ username và password.");
    }
});*/

// // Bắt sự kiện click chuột trên nút button
window.onload = function() {
    let button = document.getElementById("button");
    
    button.onclick = function() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if(username && password){
            window.open("trang2.html", "_blank");
        }
        else{
            alert("Vui lòng nhập đầy đủ username và password.");
        }
    }
}