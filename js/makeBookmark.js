function makeMark(c,r){
    let itemInside = document.createElement("div");

    itemInside.innerText = r.toString() + c.toString();
    itemInside.id = r.toString() + c.toString();
    itemInside.setAttribute("link", "https://vk.com/im?sel=c" + itemInside.id)

    console.log(itemInside.innerText)
    return itemInside
}