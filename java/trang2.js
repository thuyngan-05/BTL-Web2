/* Bắt sự kiện click chuột trên ảnh album */
window.onload = function() {
    let albumImages = document.querySelectorAll('.album');

    for(let album of albumImages) {
        album.onclick = function() {
            let albumName = this.classList[1];
            window.open(`/trang3.html?album=${albumName}`, '_blank');        
        }
    }



    //TIMF KIEEMS
    let sInput = document.querySelector("input[type=text]");
    let schButton = document.querySelector("button");
    
    schButton.onclick = function() {
        // Xóa border cũ
        let items = document.querySelectorAll(".singer, .album, .hot-trend");
        for (let item of items) {
            item.style.border = "";
        }

        // Lấy giá trị tìm kiếm
        let sValue = sInput.value.toLowerCase();

        // Tìm kiếm trong tên singer, album, hot trend
        let timkiem = false;
        let allItems = document.querySelectorAll(".singer p, .album p, .hot-trend p");

        for (let item of allItems) {
            if (item.innerText.toLowerCase().includes(sValue)) {
                timkiem = true;
                item.parentElement.parentElement.style.border = "4px solid red";  // Bật border cho item tìm thấy
            }
        }

        // Nếu không tìm thấy
        if (!timkiem) {
            alert("Không tìm thấy");
        }
    }


    // Lấy các phần tử cần thiết
    let loveSongs = document.getElementById("yeuthich");
    let librarySongs = document.getElementById("thuvien");
    let heartIcon = document.querySelector(".fa-heart");
    let listIcon = document.querySelector(".fa-list");
    let heartText = document.querySelector("a[href='#yeuthich']");
    let listText = document.querySelector("a[href='#thuvien']");

    // Ẩn cả hai danh sách bài hát khi trang được tải
    loveSongs.style.display = "none";
    librarySongs.style.display = "none";
    // Hiện danh sách bài hát yêu thích và ẩn thư viện
    function showLoveList() {
        loveSongs.style.display = "block";
        librarySongs.style.display = "none";
    }

    // Hàm để hiện danh sách bài hát thư viện và ẩn yêu thích
    function showLibraryList() {
        loveSongs.style.display = "none";
        librarySongs.style.display = "block";
    }

    // Click cho biểu tượng heart và chữ "Yêu thích"
    heartIcon.onclick = showLoveList;
    heartText.onclick = showLoveList;

    // Click cho biểu tượng list và chữ "Thư viện"
    listIcon.onclick = showLibraryList;
    listText.onclick = showLibraryList;



}