function validateLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === 'admin@gmail.com' && password === 'admin') {
        alert('Logged in as admin!');
        window.location.href = 'admin_dashboard.html';
    } else if (email === 'emp@gmail.com' && password === '12345678') {
        alert('Logged in as employee');
        window.location.href = 'emp_dashboard.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }

    return false;
}
