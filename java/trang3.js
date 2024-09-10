// Chức năng tìm kiếm bài hát
$(document).ready(function() {
    // Lắng nghe sự kiện khi nhấn Enter trong ô input
    $('.find input[type="text"]').on('keypress', function(element) {
        if (element.which === 13) { // Kiểm tra nếu phím nhấn là Enter
            $('.find button').click(); // Gọi sự kiện click của nút tìm kiếm
        }
    });

    // Lắng nghe sự kiện khi nhấp chuột vào nút tìm kiếm
    $('.find button').on('click', function() {
        let search = $('.find input[type="text"]').val().toLowerCase();

        $('.songs .song').each(function() {
            // Lấy tên bài hát chuyển thành chữ thường
            let songName = $(this).find('span').text().toLowerCase(); 
            if (songName.includes(search)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});


// Bắt sự kiện click chuột trên biểu tượng House hoặc chữ "Trang chủ"
let trangChu = document.querySelectorAll('a[href="#trangchu"]');

for (let link of trangChu) {
    link.onclick = function() {
        window.open("/trang2.html", "_blank");
    }
}


// Chức năng của các nút icon-music
let songs = document.querySelectorAll('.song');

for (let i = 0; i < songs.length; i++) {
    let audio = songs[i].querySelector('.audio');
    let playIcon = songs[i].querySelector('.fa-circle-play');
    let replayIcon = songs[i].querySelector('.fa-arrow-rotate-right');
    let backIcon = songs[i].querySelector('.fa-backward-fast');
    let nextIcon = songs[i].querySelector('.fa-forward-fast');
    let repeatIcon = songs[i].querySelector('.fa-repeat');
    let progress = songs[i].querySelector('.progress-bar');
    let volume = songs[i].querySelector('.volume-control');
    let currTime = songs[i].querySelector('.current-time');
    let totalTime = songs[i].querySelector('.total-time');
    
    let isPlaying = false;
    let isRepeat = false;

    // Hàm định dạng thời gian từ giây thành phút:giây
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secondsLeft = Math.floor(seconds % 60);
        if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;
        return `${minutes}:${secondsLeft}`;
    }

    // Hàm dừng tất cả các bài hát ngoại trừ bài hát hiện tại
    function stopOtherSongs(index) {
        for (let j = 0; j < songs.length; j++) {
            if (j !== index) {
                let otherAudio = songs[j].querySelector('.audio');
                let otherPlayIcon = songs[j].querySelector('.fa-circle-pause, .fa-circle-play');
                otherAudio.pause();
                otherAudio.currentTime = 0;
                if (otherPlayIcon) {
                    otherPlayIcon.classList.remove('fa-circle-pause');
                    otherPlayIcon.classList.add('fa-circle-play');
                }
songs[j].classList.remove('playing');
            }
        }
    }

    // Cập nhật lớp 'playing' khi phát bài hát mới
    function updatePlayingClass() {
        songs[i].classList.add('playing');
    }

    // Cập nhật thanh tiến trình khi thời gian phát thay đổi
    audio.addEventListener('timeupdate', function() {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currTime.textContent = formatTime(audio.currentTime); 
    });

    // Cập nhật tổng thời gian khi audio được tải xong  
    audio.addEventListener('loadedmetadata', function() {
        totalTime.textContent = formatTime(audio.duration);
    });

    // Cập nhật thời gian phát khi thanh tiến trình thay đổi
    progress.addEventListener('input', function() {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    // Cập nhật âm lượng khi điều khiển âm lượng thay đổi
    volume.addEventListener('input', function() {
        audio.volume = volume.value;
    });

    // Phát lại bài hát từ đầu
    replayIcon.addEventListener('click', function() {
        audio.currentTime = 0;
        audio.play();
        isPlaying = true;
        togglePlayPause(playIcon, isPlaying);
        updatePlayingClass(); // Đánh dấu bài hát đang phát
    });

    // Phát bài hát trước đó
    backIcon.addEventListener('click', function() {
        if (i > 0) {
            stopOtherSongs(i - 1);
            let prevAudio = songs[i - 1].querySelector('.audio');
            let prevIcon = songs[i - 1].querySelector('.fa-circle-play');
            prevAudio.play();
            togglePlayPause(prevIcon, true);
            songs[i - 1].classList.add('playing');
        }
    });

    // Phát hoặc tạm dừng bài hát hiện tại
    playIcon.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
        } else {
            stopOtherSongs(i);
            audio.play();
            updatePlayingClass(); // Đánh dấu bài hát đang phát
        }
        isPlaying = !isPlaying;
        togglePlayPause(playIcon, isPlaying);
    });

    // Phát bài hát tiếp theo
    nextIcon.addEventListener('click', function() {
        if (i < songs.length - 1) {
            stopOtherSongs(i + 1);
            let nextAudio = songs[i + 1].querySelector('.audio');
            let nextIcon= songs[i + 1].querySelector('.fa-circle-play');
            nextAudio.play();
            togglePlayPause(nextIcon, true);
            songs[i + 1].classList.add('playing');
        }
    });

    // Lặp lại bài hát
    repeatIcon.addEventListener('click', function() {
        isRepeat = !isRepeat;
        audio.loop = isRepeat;
    });

    // Hàm chuyển đổi biểu tượng play/pause
    function togglePlayPause(icon, isPlaying) {
        if (isPlaying) {
            icon.classList.remove('fa-circle-play');
icon.classList.add('fa-circle-pause');
        } else {
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
        }
    }
}


// Hiển thị album tương ứng với ảnh được click
window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    let albumName = params.get('album');

    let albums = document.querySelectorAll('.duongdomic, .sontung, .hieuthu2, .captain, .haidangdoo, .rhyder, .tlinh');

    for(let album of albums){
        if(album.classList.contains(albumName)){
            album.style.display = 'block';
        }
        else{
            album.style.display = 'none';
        }
    }
}