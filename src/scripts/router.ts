function router(page) {
    console.log(page)
    $.ajax({
        type: "GET",
        url: "http://localhost:3002/router",
        data: { page: page.replace("/admin/", "admin-").replace("/", "") },
        success: response => {
            $("title")[0].innerHTML = `${page.replace("/admin/", "").charAt(0).toUpperCase() + page.replace("/admin/", "").slice(1)} • Fyre`;
            $("#progress").width((50 + Math.random() * 30) + "%");
            $(".content")?.html(response);
            $(".admin-content")?.html(response);
        },
        error: () => {
            $("title")[0].innerHTML = `Error • Fyre`;
            $("#progress").width((50 + Math.random() * 30) + "%");
            $(".content").html(`There was an error fetching that page.`);
            $(".admin-content")?.html(`There was an error fetching that page.`);
        }
    });
}

const nav = $(".nav");
nav.map(a =>
    nav[a].addEventListener("click", e => {
        const href = (e.target as any).href?.split("/"),
            admin = window.location.pathname.includes("/admin") ? "/admin/" : "";
        
        if(!href) return;
        if(href[href.length - 1] == "fyre") return e.preventDefault();
        if(href[href.length - 1] == "login") return;
        if(href[href.length - 1] == "logout") return;
        if(href[href.length - 1] == "admin") return;

        e.preventDefault();
        console.log(href[href.length - 1])
        window.history.pushState(null, null, admin + href[href.length - 1]);

        $("#progress").css("width", "0%");
        $("#progress").css("display", "block");
        $("#progress").width((50 + Math.random() * 30) + "%");


        setTimeout(() => router(admin + href[href.length - 1]), 300);
    })
);

function adminDirect(page) {
    const admin = window.location.pathname.includes("/admin") ? "/admin/" : "";

    $("#progress").css("width", "0%");
    $("#progress").css("display", "block");
    $("#progress").width((50 + Math.random() * 30) + "%");

    window.history.pushState(null, null, admin + page)
    router(admin + page);
}

if(window.location.pathname === "/admin") adminDirect("home");