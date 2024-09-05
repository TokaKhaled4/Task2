var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    items = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning'),
    dots = document.querySelectorAll('.pagination .dot'); 

let timeRunning = 3000;
let timeAutoNext = 5000;
let currentIndex = 0; 
let runNextAuto; 

nextBtn.onclick = function() {
    showSlider('next');
};

prevBtn.onclick = function() {
    showSlider('prev');
};


function updatePagination(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        currentIndex = (currentIndex + 1) % sliderItemsDom.length;
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        currentIndex = (currentIndex - 1 + sliderItemsDom.length) % sliderItemsDom.length;
    }

   
    updatePagination(currentIndex);

    clearTimeout(runNextAuto);
    runningTime.style.animation = 'none'; 
    runningTime.offsetHeight; 
    runningTime.style.animation = `runningTime ${timeRunning / 1000}s linear 1 forwards`; // Restart the animation

    
    startSlider();
}

function stopSlider() {
    clearTimeout(runNextAuto);
    runningTime.style.animationPlayState = 'paused';
}

function startSlider() {
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
    runningTime.style.animationPlayState = 'running';
}


dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        while (currentIndex !== index) {
            showSlider('next');
        }
        clearTimeout(runNextAuto); 
    });
});


updatePagination(currentIndex);


startSlider();


carousel.addEventListener('mouseenter', stopSlider);
carousel.addEventListener('mouseleave', startSlider);


