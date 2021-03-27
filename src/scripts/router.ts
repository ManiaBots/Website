function router(page) {
    $.ajax({
        type: "GET",
        url: "router",
        data: { page: page.replace("/", "") },
        success: response => {
            $("title")[0].innerHTML = `${page.charAt(0).toUpperCase() + page.slice(1)} • Fyre`;
            $("#progress").width((50 + Math.random() * 30) + "%");
            $(".content").html(response);
        },
        error: () => {
            $("title")[0].innerHTML = `Error • Fyre`;
            $("#progress").width((50 + Math.random() * 30) + "%");
            $(".content").html(`There was an error fetching that page.`);
        }
    });
}

const nav = $(".nav");
nav.map(a =>
    nav[a].addEventListener("click", e => {
        const href = (e.target as any).href.split("/");
        if(href[href.length - 1] == "login") return;
        if(href[href.length - 1] == "logout") return;

        e.preventDefault();
        window.history.pushState(null, null, href[href.length - 1]);

        $("#progress").css("width", "0%");
        $("#progress").css("display", "block");
        $("#progress").width((50 + Math.random() * 30) + "%");

        setTimeout(() => router(href[href.length - 1]), 300);
    })
);