function loadImage(url, callback) {
  const img = new Image();
  img.onload = () => callback(null, img);
  img.onerror = () => callback(new Error('Failed to load image'));
  img.src = url;
}

// loadImage('/path/to/jsdk.jpg', (err, img) => {
//   if(err){
//     console.error('Some error happened', err);
//     return;
//   }
//   document.body.appendChild(img);
// });

function promisify(func) {
  return function (...args) {
    const context = this;
    const executorFunction = (resolve, reject) => {
      const callback = (err, data) => (err ? reject(err) : resolve(data));
      func.call(context, ...args, callback);
    };
    return new Promise(executorFunction);
  };
}

const loadImgCall = promisify(loadImage);

loadImgCall()
  .then((img) => document.body.appendChild(img))
  .catch((err) => console.error('Some error happened', err));
