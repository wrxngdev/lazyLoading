var scroller = document.querySelector("#scroller");
var template = document.querySelector("#template");

var loaded = document.querySelector("#loaded");

var sentinel = document.querySelector("#sentinel");
var counter = 0;

function loadItems() {
    fetch(`/load?c=${counter}`).then(response => {
        response.json().then((data) => {
            if(!data.length) {
                sentinel.innerHTML = "No more posts";
            }

            for(var i = 0; i <= data.length; i++) {
                let template_clone = template.content.cloneNode(true);
                template_clone.querySelector("#title").innerHTML = `${data[i][0]}: ${data[i][1]}`;
                template_clone.querySelector("#content").innerHTML = data[i][2];
                scroller.appendChild(template_clone);
                counter +=1;
                loaded.innerHTML = `${counter} items loaded`;
            }
        });
    });
}

var observer = new IntersectionObserver(entries => {
    if(entries[0].intersectionRatio <= 0) {
        return;
    }
    loadItems();
});

observer.observe(sentinel);