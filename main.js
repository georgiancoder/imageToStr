const canvas = document.querySelector('#imgCanvas');
const ctx = canvas.getContext('2d');
const image = new Image();
const imageContainer = document.querySelector('#strImage');
const strCanvas = document.querySelector('#strImage');
const strCtx = strCanvas.getContext('2d');
const vid = document.querySelector('#vid');

vid.onplay = () => {
	canvas.width = vid.clientWidth * 0.2;
	canvas.height = vid.clientHeight * 0.2;
	loop();

}


var constraints = { audio: false, video: { width: 500, height: 300 } };


navigator.mediaDevices.getUserMedia(constraints).then(
	(mediaStream) => {
		vid.srcObject = mediaStream;
	}
).catch(error => {
	console.log(error);
})


vid.addEventListener('loadeddata', () => {
	vid.play();
});


function loop() {
	if (!vid.paused && !vid.ended) {
		ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
		frameToStr();
		setTimeout(loop, 1000 / 60);
	}
}

function frameToStr() {

	const imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
	const newImgData = imageDataToPixelObj(imageData);

	drawByStr(newImgData);
}

function imageDataToPixelObj(imageData){
	const newImageData = [];
	let j = 0;
	for(let i = 0; i < imageData.data.length; i+=4){
		if(i % (canvas.width * 4) == 0){
			newImageData.push([]);
			j++;
		}

		let lightness = parseInt((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3);

		newImageData[j-1].push({
			red: imageData.data[i],
			green: imageData.data[i + 1],
			blue: imageData.data[i + 2],
			alpha: imageData.data[i+3]
		});
	}


	return newImageData;
}



image.crossOrigin = "Anonymous";
// image.src = 'https://cdn.vox-cdn.com/thumbor/gD8CFUq4EEdI8ux04KyGMmuIgcA=/0x86:706x557/920x613/filters:focal(0x86:706x557):format(webp)/cdn.vox-cdn.com/imported_assets/847184/stevejobs.png';
// image.src = 'https://static.wikia.nocookie.net/naruto/images/f/fa/Naruto_Uzumaki_Part_2_Thumbnail.png/revision/latest/scale-to-width-down/1000?cb=20210224080204';
// image.src = 'https://scontent.ftbs2-1.fna.fbcdn.net/v/t31.0-8/17917842_1480833575316211_7520964219115053598_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=osArQAtTkSgAX9WliiX&_nc_oc=AQmCmZBapJspBZ_L2wAe8uBcO1ZrHY2-VWUe-D4wesiF2r1Nkmd-H8Tajl_OhFVJp6Y&_nc_ht=scontent.ftbs2-1.fna&oh=302d8df389b135295f707b525b56f304&oe=6066EA70';


function drawByStr(data){
	const symbol = "10";
	strCtx.font = '15px serif';
	strCanvas.width = meassureText(data[0].length, symbol);
	strCanvas.height = data.length * 11.9;
	strCtx.clearRect(0, 0, strCanvas.width, strCanvas.height);
	strCtx.fillStyle = 'black';
	strCtx.fillRect(0,0,strCanvas.width, strCanvas.height);
	const symbolWidth = meassureText(1,symbol);
	data.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			strCtx.fillStyle = `rgb(${col.red},${col.green},${col.blue})`;
			strCtx.fillText(symbol,colIndex * (symbolWidth + 3.9), rowIndex * 12);
		})
	})
}

function meassureText(strLength, str){
	const text = new Array(strLength).fill(str);
	return strCtx.measureText(text.toString().replaceAll(',','')).width;
}

function drawImageByStr(data){
	data.forEach(row => {
		const div = document.createElement("div")
		row.forEach(col => {
			const span = document.createElement('span')
			span.innerText = '10';
			span.style.color = `rgba(${col.red},${col.green},${col.blue},${col.alpha})`;
			div.appendChild(span);
		})
		imageContainer.appendChild(div)
	});
}

function animate(){
	const divs = imageContainer.querySelectorAll('div');

	let interval = setInterval(() => {
		divs.forEach(div => {
			const spans = div.querySelectorAll('span')
			spans.forEach((span, spanIndex) => {
				setTimeout(() => {
					span.innerText = Number(span.innerText) + 1;
				},100 * spanIndex)
			})
		})
	}, 1000)
}
