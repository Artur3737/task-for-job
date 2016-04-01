(function () {
	var container = document.querySelector('#main_container'),
		container_rain = document.querySelector('#container_rain'),
		container_phone = container.querySelector('#phone_img_container'),
		close_button = container.querySelector('#close_button'),
		internals = container.querySelector('#internals'),
		internals_wrapper = container.querySelector('#internals_highlight_wrapper'),
		containerFrame = container.querySelector('#internals_frame'),
		phoneWrapper = container.querySelector('#phone_wrapper'),
		frame = document.createElement('img'),
		flashDiv = document.createElement('div'),
		copys = document.querySelectorAll('.description'),
		imgPhone = document.createElement('img'),
		flash = document.createElement('div'),
		caseFlash = container.querySelector('#case_flash'),
		dragbar = container.querySelector('#dragbar'),
		img_bynow = container.querySelector('#img_bynow'),
		video_container = container.querySelector('#video_container'),
		video = container.querySelector('#videoYoutube'),
		highlights = container.querySelector('#highlights'),
		range = container.querySelector('#range'),
		timer1s,
		loadingLable,
		window_height,
		window_width,
		first_drop,
		second_drop,
		third_drop,
		fourth_drop,
		randomClass,
		randomDrop,
		uslesDrop,
		is_rain_start = false,
		create_drops = null,
		delete_drops = null,
		i,
		x = 0,
		y = 0,
		h;
		
	imgPhone.src = "./images/phone/phone_sprite.png";
	imgPhone.classList.add('phoneImg');
	container_phone.appendChild(imgPhone);

	internals_wrapper.classList.add('internals_wrapper');

	containerFrame.appendChild(flashDiv);

	frame.src = "./images/internals_frame.png";
	frame.classList.add('frame');
	internals.appendChild(frame);

	flash.classList.add('flash');

	loadingLable = document.createElement('div');
	loadingLable.classList.add('loadingLable');
	container.insertBefore(loadingLable, container.firstChild);

//---------------- DOM is ready --------------------------

		window.onload = function () {
			// alert('DOM is ready');
			phoneWrapper.style.top = '14px';
			dragbar.style.top = '18px';
			copys[0].classList.add('active');
			img_bynow.style.opacity = '1';
			video_container.style.opacity = '1';
			highlights.style.display = 'block';
			loadingLable.classList.add('hideText');
		};

		close_button.addEventListener('click', function () {
			window.close()
		});

//-----------------           -----------------------------

	range.addEventListener('input', function (e) {
		var rangeValue = range.value;

			imgPhone.style.transform = 'translateY(-'+ rangeValue * 221 +'px)';
			// console.log(rangeValue);                   
			textBust(rangeValue,copys);
			trackingInternals(rangeValue);
			trackingFlash(rangeValue);
			rain(rangeValue);
			trackingVideo(rangeValue);
			onOffVideo(rangeValue);
	});

// --------------- Sidebar text ---------------------------

		function textBust (rangeValue, copys) {
			if(rangeValue <= 3){
				swichText(copys, copys[0]);
			}else if(rangeValue > 3 && rangeValue <= 20){
				swichText(copys, copys[1]);
			}else if(rangeValue > 21 && rangeValue <= 44){
				swichText(copys, copys[2]);
			}else if(rangeValue > 45 && rangeValue < 60){
				swichText(copys, copys[3]);
			};
		};

		function swichText (copys, el) {
			for(i = 0; i < copys.length; i++){
				copys[i].classList.remove('active');
			};
			el.classList.add('active');
		};
//----------------- internals  -------------------------------

		function trackingInternals (rangeValue) {
			if(rangeValue > 57 && rangeValue < 59){
				internals.style.opacity = '1';
				internals.style.transition = '1s';
				flashDiv.classList.add('card_highlight');
				// internals.classList.add('active');
			}else{
				internals.style.opacity = '0';
				internals.style.transition = '0s';
				flashDiv.classList.remove('card_highlight');
				// internals.classList.remove('active');
			}
		};

//------------------- flash  --------------------------------
	
		function trackingFlash (rangeValue) {
			if(rangeValue == 29 ) {
				caseFlash.appendChild(flash);
				addFlash();
			};
		};

		function addFlash () {
			timer1s = setTimeout(function () {
				caseFlash.removeChild(flash);
			},500);
		};

//-------------------- video -----------------------

		function trackingVideo (rangeValue) {
			if(rangeValue <= 0){
				video_container.style.opacity = '1';
				video_container.style.transition = '.5s';
				highlights.style.display = 'block';
			}else{
				video_container.style.opacity = '0';
				video_container.style.transition = '0s';
				highlights.style.display = 'none'
			}
		};

		function onOffVideo (rangeValue) {
    		rangeValue == 0 ? toggleVideo() : toggleVideo('played');
    	};
    	
		function toggleVideo(state) {
		    var iframe = video_container.getElementsByTagName("iframe")[0].contentWindow;

		    func = state == 'played' ? 'pauseVideo' : 'playVideo';
		    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
		};

//------------------------- rain ----------------------

				function rain (rangeValue) {
					if(rangeValue > 3 && rangeValue <= 19){
						container_rain.style.opacity = '1';
						if(!is_rain_start){
							createDrop();
							// delUslesDrop();
						};
					}else{
						is_rain_start = false;
						container_rain.innerHTML = '';
						clearInterval(create_drops);
						// clearInterval(delete_drops);
						container_rain.style.opacity = '0';
						container_rain.style.transition = '1s';
					};
				};
				

				function choosedDrop () {
					for(h = 0; h < 4; h++){
						randomClass = Math.floor(Math.random()*4);
						if(randomClass == 0){
							randomClass = 'first_drop';
						}else if (randomClass == 1){
							randomClass = 'second_drop';
						}else if(randomClass == 2) {
							randomClass = 'third_drop'
						}else if(randomClass == 3) {
							randomClass = 'fourth_drop'
						};
					};
				};

				window_height = (container_rain.offsetHeight);
				window_width = (container_rain.offsetWidth);

				function randPosition () {
					randomPosition_top = Math.floor((Math.random()* window_height)- 30);
					randomPosition_left = Math.floor((Math.random()* window_width)- 30);
				};

				function createDrop () {
					is_rain_start = true;
					create_drops = setInterval(function () {
						x++;
						// y++;
						choosedDrop();
						randPosition();
						randomDrop = document.createElement('div');
						randomDrop.id ="drop_" + x;
						container_rain.appendChild(randomDrop)
						randomDrop.classList.add(randomClass);
						randomDrop.style.top = randomPosition_top + 'px';
						randomDrop.style.left = randomPosition_left + 'px';
					},75);
				};
				
				// function delUslesDrop () {
				// 	delete_drops = setInterval(function (){
				// 		uslesDrop = container_rain.querySelector('#drop_'+ y );
				// 			container_rain.removeChild(uslesDrop);
				// 	},200);
				// };

} ());