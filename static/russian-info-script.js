// From https://infowarship.pages.dev/howto-en:
(function () {
    function showInfoPopup() {
        if (document.querySelector("iframe#infowarship")) return;

        var el = document.createElement('iframe');

        var w = 600;
        var h = 600;
        var left = (window.innerWidth/2)-(w/2);
        var top = (window.innerHeight/2)-(h/2);

        if (left < 0 || top < 0) {
        el.style = 'top: 0px; left: 0px; width: 100%; height: 100%;';
        } else {
        el.style.width = w + 'px';
        el.style.height = h + 'px';
        el.style.top = top + 'px';
        el.style.left = left + 'px';
        }

        el.style.position = 'fixed';
        el.src = '/russian-info-popup.html';
        el.id = 'infowarship';
        document.body.appendChild(el);
    }

    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', showInfoPopup);
    } else {
        showInfoPopup();
    }
})();