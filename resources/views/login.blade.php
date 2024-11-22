<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx') <!-- React app -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div id="root"></div> <!-- React app mounts here -->
</body>
</html>
