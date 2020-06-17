function toggleHidden(id) {
    var x = document.getElementById(id);
    if (x.className === "hidden") {
        x.className = "show";
    } else {
        x.className = "hidden";
    }
}