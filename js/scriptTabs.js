var tabs = document.querySelectorAll("a[data-tab-for]");
var contents = Array.from(document.querySelector('#pages').children);
var cardLinks = Array.from(document.querySelectorAll('.card-header a'));


console.log({tabs, contents, cardLinks})

tabs.forEach(tab => tab.addEventListener('click', tabClicked));
window.onpopstate = checkState;

history.replaceState({
    tabForId: tabs[0].dataset.tabFor 
}, tabs[0], tabs[0].dataset.tabFor); 

function showContent(id) {
    contents.forEach(content => {
        
        if (content.getAttribute('id') === id) content.classList.add('active');
        else content.classList.remove('active');
    });

    tabs.forEach(tab => {
       // console.log(tab,'tab')
        if (tab.dataset.tabFor === id) tab.classList.remove("active");
        else tab.classList.add("active");
    });

}

function tabClicked(e) {
    var contentId = e.target.dataset.tabFor;
    console.log(contentId, 'content');
    e.preventDefault();
    showContent(contentId);
    history.pushState({
        tabForId: contentId
    }, null, contentId);
}

function checkState(e) {
    // page reload
    if (e.state) {
        console.log(e.state.tabForId);
        showContent(e.state.tabForId);
    }
}



/*Contact form*/

window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your form HTML above
    var form = document.getElementById("ajax-contact");
    //var button = document.getElementById("submit-button");
    var status = document.getElementById("form-messages");

    // Success and Error functions for after the form is submitted

    // function validate() {
    //     var num = document.form.kwpln.value;
    //     console.log(num,'num')
    //     if (isNaN(num)) {
    //         document.getElementById("numloc").innerHTML = "Enter Numeric value only";
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }   

    function success() {
        form.reset();
        //button.style = "display: none ";
        status.style = "display: block";
        status.innerHTML = "Dziękujemy. Oddzwonimy o wskazanej porze.";
    }

    function error() {
        status.innerHTML = "Coś poszło nie tak!";
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});
window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your form HTML above
    var form = document.getElementById("contact");
    //var button = document.getElementById("contact-button");
    var status = document.getElementById("form-contact");

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        //button.style = "display: none ";
        status.style = "display: block";
        status.innerHTML = "Dziękujemy za wypełnienie formularza";
    }

    function error() {
        status.innerHTML = "Coś poszło nie tak!";
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});
window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your form HTML above
    var formWycena = document.getElementById("wycena-contact");
    //var buttonWycena = document.getElementById("submit-button-wycena");
    var statusWycena = document.getElementById("wycena-status");

    // Success and Error functions for after the form is submitted

    function success() {
        formWycena.reset();
        //buttonWycena.style = "display: none ";
        statusWycena.style = "display: block";
        statusWycena.innerHTML = "Dziękujemy za wypełnienie formularza. Zadzwonimy do Ciebie z informacją o wycenie."
    }

    function error() {
        statusWycena.innerHTML = "Coś poszło nie tak!";
    }

    // handle the form submission event

    formWycena.addEventListener("submit", function (ev) {
        ev.preventDefault();

        const moc = document.getElementById("moc");
        moc.addEventListener("input", function () {
            if (moc.validity.typeMismatch) {
                moc.setCustomValidity("I am expecting an e-mail address!");
            } else {
                moc.setCustomValidity("");
            }
        });
        var data = new FormData(formWycena);
        ajax(formWycena.method, formWycena.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}

/*Dynamic Contact form*/


window.onload = function () {

    function toggleModal() {

        const modal = document.querySelector('.dynamicForm');

        modal.classList.toggle('modal-hidden');
    }

    const closeForm = document.querySelector('.fa-times');
    const btn = document.querySelector('.actionbtn');

    btn.addEventListener('click', toggleModal);
    closeForm.addEventListener('click', toggleModal);

}