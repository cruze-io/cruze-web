const loadScript = (src, callback) => {
    let body = document.getElementsByTagName('body')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onreadystatechange = callback;
    script.onload = callback;
    body.appendChild(script);
}

export default loadScript
