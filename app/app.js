$(function() {
    var MAX_PASSWORDS = 10;
    var DEFAULT_LENGTH = 8;
    var length = DEFAULT_LENGTH;

    // Generate button - click event
    $("#generate").click(render);

    // Increment button - click event
    $("#increment").click(function() {
        if (length < 40) {
            length++;
        }
        render();
    });

    // Decrement button - click event
    $("#decrement").click(function() {
        if (length > 3) {
            length--;
        }
        render();
    });

    function render() {
        renderPasswords(MAX_PASSWORDS, length);
    }

    // Render on load
    render();
});

// Renders template and inserts html into the DOM
function renderPasswords(count, length) {
    var passwords = generatePasswords(count, length).map(function(p) {
        return {password: p};
    });
    var html = ich.passwords({passwords: passwords});
    $("#password-list").html(html);
}

// Returns an array of passwords
function generatePasswords(count, length) {
    var passwords = [];
    for (var i = 0; i < count; i++) {
        var pw = GPW.pronounceable(length);

        // Skip password if its not the correct length
        // (GPW does not always return the correct password length)
        if (pw.length !== length) {
            i--;
        } else {
            passwords.push(pw);
        }
    }
    return passwords;
}
