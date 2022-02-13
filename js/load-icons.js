function loadIcon(id) {
    let link = document.getElementById(id).getAttribute("link")
    let google_img = new Image()
    let fav_link = getOpenLink(getDomain(link)) + "/favicon.ico"
    google_img.src = "https://s2.googleusercontent.com/s2/favicons?domain=" + getOpenLink(link) + "&sz=128"
    google_img.onload = () => waitToLoadFavicon(google_img, fav_link, id)
    google_img.onerror = () => waitToLoadFavicon(google_img, fav_link, id)
}

function waitToLoadFavicon(google_img, fav_link, id) {
    let fav_img = new Image()
    fav_img.src = fav_link
    fav_img.onload = () => remakeIcon(google_img, fav_img, id)
    fav_img.onerror = () => remakeIcon(google_img, fav_img, id)
}

function waitToLoadFinal(imgFinal, id){
    let img = new Image()
    img.src = imgFinal.src
    img.onload = () => saveLocal(img, id)
    img.onerror = () => saveLocal(img, id)
}

function remakeIcon(google_img, fav_img, id) {
    let imgOld = document.getElementById("icon-" + id)
    // console.log("id=" + id + " gw=" + google_img.src + " fw=" + fav_img.src)
    if (google_img.naturalWidth >= fav_img.naturalWidth) {
        imgOld.src = google_img.src
    } else {
        imgOld.src = fav_img.src
    }
    // console.log(imgOld)
    // waitToLoadFinal(imgOld, id)
}

function saveLocal(img, id){
    let cur_img64 = getBase64Image(img)
    chrome.storage.local.set({["icon-div-" + id]: cur_img64}, function () {
        console.log("Local image saved: ", cur_img64)
    })
}

// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//     var dataURL = canvas.toDataURL(); //(img.src
//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

// function toDataURL(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         var reader = new FileReader();
//         reader.onloadend = function() {
//             callback(reader.result);
//         }
//         reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
// }

// toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
//     console.log('RESULT:', dataUrl)
// })

// function getBase64FromImageUrl(url) {
//     var img = new Image();
//     img.setAttribute('crossOrigin', 'anonymous');
//     img.onload = function () {
//         var canvas = document.createElement("canvas");
//         canvas.width =this.width;
//         canvas.height =this.height;
//         var ctx = canvas.getContext("2d");
//         ctx.drawImage(this, 0, 0);
//         var dataURL = canvas.toDataURL("image/png");
//         alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
//     };
//     img.src = url;
// }

function loadAllIcons(cols, rows) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let id = r.toString() + c.toString()
            loadIcon(id)
            // let cur_img64 = getBase64Image(cur_image)
            // console.log(cur_img64)
            // let cur_image = document.getElementById("icon-" + id)
            // let cur_img64 = getBase64Image(cur_image)
            // chrome.storage.local.set({["icon-div-" + id]: cur_img64}, function () {
            //     console.log("Local image saved: ", cur_img64)
            // })
        }
    }
}

// function loadLocalIcons(cols, rows) {
//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//             let id = r.toString() + c.toString()
//             chrome.storage.local.get(["icon-div-"+ id], function (result) {
//                 let localImg = result["icon-div-"+ id]
//                 let imgTemplate = document.getElementById("icon-" + id)
//                 imgTemplate.src = localImg.src
//             })
//         }
//     }
// }

// const getBase64Image = (url) => {
//     const img = new Image();
//     // img.setAttribute('crossOrigin', 'anonymous');
//     img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);
//         const dataURL = canvas.toDataURL("image/png");
//         console.log(dataURL)
//     }
//     img.src = url
// }
//
// getBase64Image('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png')