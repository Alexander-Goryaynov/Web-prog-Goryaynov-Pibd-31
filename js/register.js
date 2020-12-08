let specSymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '>', '<',
    '/', '\\', '.', ',', '[', ']', '{', '}', '~', ':', ';', '|', '№'];

function register() {
    const form = document.forms[0];
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let data = new FormData(form);
        let str = 'Регистрация прошла успешно';
        let doRedirect = false;
        let icon = "error";
        if (data.get('password').length < 8) {
            str = 'Пароль слишком короткий';
        } else if (! (containsNumericSymbols(data.get('password')) &&
                containsSpecSymbols(data.get('password')))) {
            str = 'Пароль должен содержать хотя бы 1 цифру и 1 символ';
        } else if (containsNumericSymbols(data.get('name'))) {
            str = 'ФИО не может содержать цифр';
        } else if (data.get('name').split(" ").length !== 3) {
            str = 'ФИО должно состоять из трёх слов';
        } else {
            icon = "success";
            doRedirect = true;
        }
        Swal.fire({
            title: str,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        })
        if (doRedirect) {
            setTimeout(function () {
                window.location.href = "login.html";
            }, 1800);
        }
    });
    form.addEventListener("formdata", event => {
        console.log(event.formData);
    });
}


function containsSpecSymbols(password) {
    for (let i = 0; i < specSymbols.length; i++) {
        if (password.indexOf(specSymbols[i]) > -1) {
            return true;
        }
    }
    return false;
}


function containsNumericSymbols(password) {
    for (let i = 0; i < password.length; i++) {
        let asciiCode = password[i].charCodeAt(0);
        if (asciiCode >= 48 && asciiCode <= 57) {
            return true;
        }
    }
    return false;
}
