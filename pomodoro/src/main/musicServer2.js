function startMusicServer(callback) {
  console.log('start music server...');
  
  const server = http.createServer((req, res) => {
    const musicUrl = decodeURIComponent(req.url);
    const extname = path.extname(musicUrl);
    if (allowKeys.indexOf(extname) < 0) {
      return notFound(res);
    }

    const filename = path.basename(musicUrl);
    const fileUrl = path.join(store.get(constant.MUSIC_PATH), filename);
    if (!fs.existsSync(fileUrl)) {
      return notFound(res);
    }

    const stat = fs.lstatSync(fileUrl);
    const source = fs.createReadStream(fileUrl);
    res.writeHead(200, {
      'Content-Type': allowFiles[extname],
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'max-age=' + (365 * 24 * 60 * 60 * 1000),
      'Last-Modified': String(stat.mtime).replace(/\([^\x00-\xff]+\)/g, '').trim(),
    });
    source.pipe(res);
  }).listen(0, () => {
    callback(server.address().port);
  });

  return server;
}