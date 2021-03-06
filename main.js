const canvas = document.querySelector('#imgCanvas');
const ctx = canvas.getContext('2d');
const image = new Image();
const imageContainer = document.querySelector('#strImage');
image.onload = img => {
	canvas.width = image.width * 0.08;
	canvas.height = image.height * 0.08;
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	const newImageData = [];
	const imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
	
	const newImgData = [];
	let j = 0;
	for(i=0; i < imageData.data.length; i+=4){
		if(i % (canvas.width * 4) == 0){
			newImageData.push([]);
			j++;
		}


		newImageData[j-1].push({
			red: imageData.data[i],
			green: imageData.data[i+1],
			blue: imageData.data[i+2],
			alpha: imageData.data[i+3]
		})

	}

	drawImageByStr(newImageData);
}


image.crossOrigin = "Anonymous";
// image.src = 'https://cdn.vox-cdn.com/thumbor/gD8CFUq4EEdI8ux04KyGMmuIgcA=/0x86:706x557/920x613/filters:focal(0x86:706x557):format(webp)/cdn.vox-cdn.com/imported_assets/847184/stevejobs.png';
// image.src = 'https://static.wikia.nocookie.net/naruto/images/f/fa/Naruto_Uzumaki_Part_2_Thumbnail.png/revision/latest/scale-to-width-down/1000?cb=20210224080204';
image.src = 'https://scontent.ftbs2-1.fna.fbcdn.net/v/t31.0-8/17917842_1480833575316211_7520964219115053598_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=osArQAtTkSgAX9WliiX&_nc_oc=AQmCmZBapJspBZ_L2wAe8uBcO1ZrHY2-VWUe-D4wesiF2r1Nkmd-H8Tajl_OhFVJp6Y&_nc_ht=scontent.ftbs2-1.fna&oh=302d8df389b135295f707b525b56f304&oe=6066EA70';


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
