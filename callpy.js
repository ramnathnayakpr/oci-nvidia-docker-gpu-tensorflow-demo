const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
app.use(fileUpload());
app.use(express.static('.'));

app.get('/', (req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><head><title>OCI TensorFlow demo</title><style>body {background-image:url("./background.jpg");background-size: cover;}</style></head><body>');
    res.write("    <form ref='uploadForm' ");
    res.write("      id='uploadForm' ");
    res.write("      action='/' ");
    res.write("      method='post' ");
    res.write('      encType="multipart/form-data"> ');
    res.write('        <input type="file" name="file" onchange="this.form.submit()"/> ');
    res.write('    </form>');
    res.end('</body></html>');

})

app.post('/', function(req, res) {

    if (!req.files)
       return res.status(400).send('No files were uploaded.');

    let file = req.files.file;

    file.mv('/root/models/tutorials/image/imagenet/image.jpg', function(err) {
      if (err)
        return res.status(500).send(err);

    });

    const { spawn } = require('child_process');
    var startTime = process.hrtime();
    const pyProg = spawn('/usr/bin/python3',['classify_image.py','--image_file','image.jpg']);
    var nanoTimeElapsed = process.hrtime(startTime);
    var timeElapsed = nanoTimeElapsed[0] * 1e9 + nanoTimeElapsed[1] / 1000000.0

    pyProg.stdout.on('data', function(data) {

        var Convert = require('ansi-to-html');
        var convert = new Convert({newline:'true'});

        console.log(data.toString());
        console.log('%d millisec',timeElapsed);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head><title>OCI TensorFlow demo</title><style>body {background-image:url("./background.jpg");background-size: cover;}</style></head><body>');
        res.write("    <form ref='uploadForm' ");
        res.write("      id='uploadForm' ");
        res.write("      action='/' ");
        res.write("      method='post' ");
        res.write('      encType="multipart/form-data"> ');
        res.write('        <input type="file" name="file" onchange="this.form.submit()"/> ');
        res.write('    </form>');
        res.write('<img src="image.jpg" style="height: 100%; width: 100%; object-fit: contain"><h3>');
        res.write('<span style="position: absolute; top: 45px; left: 8px; background-color: black; color: yellow">');
        res.write(convert.toHtml(data.toString()));
        res.write(timeElapsed + ' millisec<span></h3></body></html>');
        res.end('');

    });
});

app.listen(80, () => console.log('app listening on port 80!'))
